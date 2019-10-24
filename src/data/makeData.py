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
import json

# TODO: update the following lines of code
candidates = pd.read_csv("candidates.csv")
issue_areas = pd.read_csv("issue_areas.csv")
tax_types = pd.read_csv("tax_types.csv")

candidate_text = pd.read_excel("Candidate text.xlsx", sheet_name = "Master", 
                               usecols = "A:F", 
                               names = ["Candidate", "Tax1", "Tax2", "Issue1", "Issue2", "Text"])

master_lists = pd.read_excel("Candidate text.xlsx", sheet_name = "Lists (Don't delete!)",
                             usecols = "A:E",
                             names = ["Candidate_first", "Candidate_last", "Candidate_party", "Tax_types", "Issue_areas"])

# make master data jsons for candidate, issue areas and tax policies filter lists
candidates["selected"] = True
candidates.to_json("candidates.json", orient = "records")

issue_areas = master_lists["Issue_areas"][master_lists["Issue_areas"].notnull()]

issue_areas["selected"] = True
issue_areas.to_json("issue_areas.json", orient = "records")

tax_types = master_lists["Tax_types"][master_lists["Tax_types"].notnull()]

tax_types["selected"] = True
tax_types.to_json("tax_types.json", orient = "records")
    
# make skeleton json
data = []

for candidate in candidates["last_name"]:
    candidate_dict = {}
    
    candidate_dict["Name"] = candidate
    candidate_dict["Overview"] = ""
    candidate_dict["Issue areas"] = {}
    candidate_dict["Tax types"] = {}
    
    for issue in issue_areas:
        candidate_dict["Issue areas"][issue] = "None"
    
    for tp in tax_types:
        candidate_dict["Tax types"][tp] = "None"

    data.append(candidate_dict)

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
for row in data:
    candidate = row["Name"]
    for issue in row["Issue areas"]:
        text = candidate_ia_grouped.loc[(candidate_ia_grouped.Candidate == candidate) & (candidate_ia_grouped.Issue == issue), "Text"]
        if(len(text) > 0):
            row["Issue areas"][issue] = text.values[0]

    for tp in row["Tax types"]:
        text = candidate_tp_grouped.loc[(candidate_tp_grouped.Candidate == candidate) & (candidate_tp_grouped["Tax type"] == tp), "Text"]
        if(len(text) > 0):
            row["Tax types"][tp] = text.values[0]
            
    
with open("data.json", "w") as outfile:
    json.dump(data, outfile)