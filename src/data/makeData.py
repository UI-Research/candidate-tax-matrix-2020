#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Mon Oct 14 13:56:21 2019

This script generates JSON files of the text data needed for the Candidate
Tax Matrix.  It creates master data needed to populate the candidate, issue
areas and tax policies filter lists in the tool.  It also maps bullet points
from each candidate to the issue areas and tax policies they belong to in order
to generate a final JSON of all the candidate data to populate the cards with.

Inputs:
    candidates.csv
    issue_areas.csv
    tax_types.csv
    text_to_category_mapping.csv
    matrix_text.json
    
Ouputs:
    candidates.json
    issue_areas.json
    tax_types.json
    data.json
    
@author: afeng
"""
import pandas as pd
import numpy as np
import json


candidate_text = pd.read_excel("Candidate text_edited.xlsx", sheet_name = "Master", 
                               usecols = "A:F", 
                               names = ["Candidate", "Tax1", "Tax2", "Issue1", "Issue2", "Text"])

master_lists = pd.read_excel("Candidate text_edited.xlsx", sheet_name = "Lists (Don't delete!)",
                             usecols = "A:F",
                             names = ["Candidate_first", "Candidate_last", "Candidate_party", "Dropped_out", "Tax_types", "Issue_areas"])

# TEMPORARY: final overview data will look different after analyses are completed
overview_text = pd.read_csv("overviews.csv", index_col = "Candidate")

# filter out any blank rows from the data
candidate_text = candidate_text[pd.notnull(candidate_text.Text)]

# make master data jsons for candidate, issue areas and tax policies filter lists
candidates = master_lists[["Candidate_first", "Candidate_last", "Candidate_party", "Dropped_out"]]
candidates.rename(columns={"Candidate_first": "first_name", "Candidate_last":"last_name", "Candidate_party": "party", "Dropped_out": "dropped_out"}, inplace = True)
candidates["dropped_out"] = np.where(candidates.dropped_out == "Y", "Y", "N")
candidates["selected"] = True
candidates.to_json("candidates.json", orient = "records")

issue_areas = master_lists["Issue_areas"][master_lists["Issue_areas"].notnull()].to_frame()
issue_areas.rename(columns = {"Issue_areas": "name"}, inplace = True)
issue_areas["selected"] = True
issue_areas.to_json("issue_areas.json", orient = "records")

tax_types = master_lists["Tax_types"][master_lists["Tax_types"].notnull()].to_frame()
tax_types.rename(columns = {"Tax_types": "name"}, inplace = True)
tax_types["selected"] = True
tax_types.to_json("tax_types.json", orient = "records")
    
# make skeleton json
data = {}

for index, row in candidates.iterrows():    
    candidate_dict = {}
    
    candidate_dict["First name"] = row["first_name"]
    candidate_dict["Last name"] = row["last_name"]
    candidate_dict["Party"] = row["party"]
    candidate_dict["Dropped out"] = row["dropped_out"]
    try:
        candidate_dict["Overview"] = overview_text.loc[row.last_name, "Overview"]
    except:
        candidate_dict["Overview"] = ""
    candidate_dict["Issue areas"] = {}
    candidate_dict["Tax types"] = {}
    
    for issue in issue_areas["name"]:
        candidate_dict["Issue areas"][issue] = ["None"]
    
    for tp in tax_types["name"]:
        candidate_dict["Tax types"][tp] = ["None"]

    data[row.last_name] = candidate_dict

# group together all text items that apply to the same issue area or tax type
# per candidate and put them in a list
ia1 = candidate_text[["Candidate", "Issue1", "Text"]].rename(columns={"Issue1": "Issue"})
ia2 = candidate_text[["Candidate", "Issue2", "Text"]].rename(columns={"Issue2": "Issue"})
ia2.dropna(subset=["Issue"], inplace=True)
candidate_ia = pd.concat([ia1, ia2])
candidate_ia_grouped = candidate_ia.groupby(["Candidate", "Issue"])["Text"].apply(list).reset_index()

tp1 = candidate_text[["Candidate", "Tax1", "Text"]].rename(columns={"Tax1": "Tax type"})
tp2 = candidate_text[["Candidate", "Tax2", "Text"]].rename(columns={"Tax2": "Tax type"})
tp2.dropna(subset=["Tax type"], inplace=True)
candidate_tp = pd.concat([tp1, tp2])
candidate_tp_grouped = candidate_tp.groupby(["Candidate", "Tax type"])["Text"].apply(list).reset_index()

# populate json where applicable with text from spreadsheet
for candidate in data:
    for issue in data[candidate]["Issue areas"]:
        text = candidate_ia_grouped.loc[(candidate_ia_grouped.Candidate == candidate) & (candidate_ia_grouped.Issue == issue), "Text"]
        if(len(text) > 0):
            data[candidate]["Issue areas"][issue] = text.values[0]

    for tp in data[candidate]["Tax types"]:
        text = candidate_tp_grouped.loc[(candidate_tp_grouped.Candidate == candidate) & (candidate_tp_grouped["Tax type"] == tp), "Text"]
        if(len(text) > 0):
            data[candidate]["Tax types"][tp] = text.values[0]
            
    
with open("data.json", "w") as outfile:
    json.dump(data, outfile)