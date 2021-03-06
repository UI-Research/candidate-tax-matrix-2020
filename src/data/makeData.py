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
                               usecols = "A:F,N", 
                               names = ["Candidate", "Tax1", "Tax2", "Issue1", "Issue2", "Text", "Corrections"])

master_lists = pd.read_excel("Candidate text_edited.xlsx", sheet_name = "Lists (Don't delete!)",
                             usecols = "A:G",
                             names = ["Candidate_first", "Candidate_last", "Candidate_party", "Dropped_out", "Has_analysis", "Tax_types", "Issue_areas"])

# TEMPORARY: final overview data will look different after analyses are completed
overview_text = pd.read_csv("overviews.csv", index_col = "Candidate")

# filter out any blank rows from the data
candidate_text = candidate_text[pd.notnull(candidate_text.Text)]

# make master data jsons for candidate, issue areas and tax policies filter lists
candidates = master_lists[["Candidate_first", "Candidate_last", "Candidate_party", "Dropped_out", "Has_analysis"]]
candidates.rename(columns={"Candidate_first": "first_name", "Candidate_last":"last_name", "Candidate_party": "party", "Dropped_out": "dropped_out", "Has_analysis": "has_analysis"}, inplace = True)
candidates["dropped_out"] = np.where(candidates.dropped_out == "Y", "Y", "N")
candidates["has_analysis"] = np.where(candidates.has_analysis == "Y", "Y", "N")
candidates["selected"] = np.where(candidates.dropped_out == "Y", False, True)
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
    candidate_dict["Has analysis"] = row["has_analysis"]
    try:
        candidate_dict["Overview"] = overview_text.loc[row.last_name, "Overview"]
    except:
        candidate_dict["Overview"] = ""
    candidate_dict["Issue areas"] = {}
    candidate_dict["Tax types"] = {}
    
    for issue in issue_areas["name"]:
        candidate_dict["Issue areas"][issue] = {"Bullets": ["None"], "Corrections": ["None"]}
    
    for tp in tax_types["name"]:
        candidate_dict["Tax types"][tp] = {"Bullets": ["None"], "Corrections": ["None"]}

    data[row.last_name] = candidate_dict

# concatenate the two columns of issue areas or tax types into one stacked dataframe
ia1 = candidate_text[["Candidate", "Issue1", "Text", "Corrections"]].rename(columns={"Issue1": "Issue"})
ia2 = candidate_text[["Candidate", "Issue2", "Text", "Corrections"]].rename(columns={"Issue2": "Issue"})
ia2.dropna(subset=["Issue"], inplace=True)
candidate_ia = pd.concat([ia1, ia2])

tp1 = candidate_text[["Candidate", "Tax1", "Text", "Corrections"]].rename(columns={"Tax1": "Tax type"})
tp2 = candidate_text[["Candidate", "Tax2", "Text", "Corrections"]].rename(columns={"Tax2": "Tax type"})
tp2.dropna(subset=["Tax type"], inplace=True)
candidate_tp = pd.concat([tp1, tp2])

# add in asterisks to the end of the bullet points and beginning of corrections text
# then merge back onto candidate_ia/candidate_tp so that the grouped bullet points have the asterisks
ia_asterisks = candidate_ia.dropna(subset=["Corrections"])
ia_asterisks["n"] = ia_asterisks.groupby(["Candidate", "Issue"]).cumcount() + 1
ia_asterisks["superscripts"] = ia_asterisks["n"].apply(lambda x: "<sup>" + str(x) + "</sup>")
ia_asterisks["Corrections_w_star"] = ia_asterisks["superscripts"] + ia_asterisks["Corrections"]
ia_asterisks["Text_w_star"] = ia_asterisks["Text"] + ia_asterisks["superscripts"]

ia_final = candidate_ia.merge(ia_asterisks, how = "left")
ia_final["Text"] = np.where(pd.isna(ia_final["Text_w_star"]), ia_final["Text"], ia_final["Text_w_star"])
ia_final["Corrections"] = np.where(pd.isna(ia_final["Corrections_w_star"]), ia_final["Corrections"], ia_final["Corrections_w_star"])
ia_final.drop(["n", "superscripts", "Text_w_star", "Corrections_w_star"], axis = 1, inplace = True)

tp_asterisks = candidate_tp.dropna(subset=["Corrections"])
tp_asterisks["n"] = tp_asterisks.groupby(["Candidate", "Tax type"]).cumcount() + 1
tp_asterisks["superscripts"] = tp_asterisks["n"].apply(lambda x: "<sup>" + str(x) + "</sup>")
tp_asterisks["Corrections_w_star"] = tp_asterisks["superscripts"] + tp_asterisks["Corrections"]
tp_asterisks["Text_w_star"] = tp_asterisks["Text"] + tp_asterisks["superscripts"]

tp_final = candidate_tp.merge(tp_asterisks, how = "left")
tp_final["Text"] = np.where(pd.isna(tp_final["Text_w_star"]), tp_final["Text"], tp_final["Text_w_star"])
tp_final["Corrections"] = np.where(pd.isna(tp_final["Corrections_w_star"]), tp_final["Corrections"], tp_final["Corrections_w_star"])
tp_final.drop(["n", "superscripts", "Text_w_star", "Corrections_w_star"], axis = 1, inplace = True)

# group together all text items that apply to the same issue area or tax type
# per candidate and put them in a list
candidate_ia_grouped = ia_final.groupby(["Candidate", "Issue"])["Text"].apply(list).reset_index()
candidate_tp_grouped = tp_final.groupby(["Candidate", "Tax type"])["Text"].apply(list).reset_index()

# group together all corrections that apply to the same issue area or tax type
# per candidate and put them in a list
ia_corrections = ia_final[["Candidate", "Issue", "Corrections"]]
ia_corrections.dropna(subset=["Corrections"], inplace=True)
ia_corrections.drop_duplicates(inplace = True)
ia_corrections_grouped = ia_corrections.groupby(["Candidate", "Issue"])["Corrections"].apply(list).reset_index()

tp_corrections = tp_final[["Candidate", "Tax type", "Corrections"]]
tp_corrections.dropna(subset=["Corrections"], inplace=True)
tp_corrections.drop_duplicates(inplace=True)
tp_corrections_grouped = tp_corrections.groupby(["Candidate", "Tax type"])["Corrections"].apply(list).reset_index()



# populate json where applicable with text from spreadsheet
for candidate in data:
    for issue in data[candidate]["Issue areas"]:
        text = candidate_ia_grouped.loc[(candidate_ia_grouped.Candidate == candidate) & (candidate_ia_grouped.Issue == issue), "Text"]
        corrections = ia_corrections_grouped.loc[(ia_corrections_grouped.Candidate == candidate) & (ia_corrections_grouped.Issue == issue), "Corrections"]
        if(len(text) > 0):
            data[candidate]["Issue areas"][issue]["Bullets"] = text.values[0]
        if(len(corrections) > 0):
            data[candidate]["Issue areas"][issue]["Corrections"] = corrections.values[0]

    for tp in data[candidate]["Tax types"]:
        text = candidate_tp_grouped.loc[(candidate_tp_grouped.Candidate == candidate) & (candidate_tp_grouped["Tax type"] == tp), "Text"]
        corrections = tp_corrections_grouped.loc[(tp_corrections_grouped.Candidate == candidate) & (tp_corrections_grouped["Tax type"] == tp), "Corrections"]
        if(len(text) > 0):
            data[candidate]["Tax types"][tp]["Bullets"] = text.values[0]
        if(len(corrections) > 0):
            data[candidate]["Tax types"][tp]["Corrections"] = corrections.values[0]
    
with open("data.json", "w") as outfile:
    json.dump(data, outfile)