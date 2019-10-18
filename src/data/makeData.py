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
import numpy as np
import pandas as pd
import json

candidates = pd.read_csv("candidates.csv")
issue_areas = pd.read_csv("issue_areas.csv")
tax_types = pd.read_csv("tax_types.csv")

text_to_cat = pd.read_csv("text_to_category_mapping.csv")

with open("matrix_text.json") as json_file:
    text = json.load(json_file)

def makeBulletText(candidate, view, category):
    bullets = bullets_mapped[(bullets_mapped.candidate == candidate) & 
                             (bullets_mapped.type == view) &
                              (bullets_mapped.category == category)]
    if(len(bullets) > 0):
        bullet_text = []
        for bullet_num in bullets.bullet_number:
            bullet_text.append(text[candidate]["bullet " + str(bullet_num)])
    else:
        bullet_text = ["None"]
        
    return bullet_text


# make master data jsons for candidate, issue areas and tax policies filter lists
candidates["selected"] = True
candidates.to_json("candidates.json", orient = "records")

issue_areas["selected"] = True
issue_areas.to_json("issue_areas.json", orient = "records")

tax_types["selected"] = True
tax_types.to_json("tax_types.json", orient = "records")

# make json with candidate bullet points
bullets_mapped = text_to_cat.merge(issue_areas, 
                                   how="left", 
                                   left_on = "category_id", 
                                   right_on = "id"
                                   ).merge(tax_types,
                                   how="left",
                                   left_on = "category_id",
                                   right_on = "id")

bullets_mapped["category"] = np.where(bullets_mapped["type"] == "Issue area", bullets_mapped["name_x"], bullets_mapped["name_y"])
bullets_mapped.drop(["category_id", "id_x", "name_x", "id_y", "name_y"], 
                    axis = "columns", 
                    inplace = True)

data = []

for candidate in candidates["last_name"]:
    candidate_dict = {}
    
    candidate_dict["Name"] = candidate
    candidate_dict["Overview"] = ""
    candidate_dict["Issue areas"] = {}
    candidate_dict["Tax types"] = {}
    
    for issue in issue_areas["name"]:
        candidate_dict["Issue areas"][issue] = makeBulletText(candidate, "Issue area", issue)
    
    for tp in tax_types["name"]:
        candidate_dict["Tax types"][tp] = makeBulletText(candidate, "Tax type", tp)

    data.append(candidate_dict)
    
with open("data.json", "w") as outfile:
    json.dump(data, outfile)