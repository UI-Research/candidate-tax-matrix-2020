#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Mon Oct 14 13:56:21 2019

@author: afeng
"""
import numpy as np
import pandas as pd
import json

candidates = pd.read_csv("candidates.csv")
issue_areas = pd.read_csv("issue_areas.csv")
tax_policies = pd.read_csv("tax_policies.csv")

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
    
bullets_mapped = text_to_cat.merge(issue_areas, 
                                   how="left", 
                                   left_on = "category_id", 
                                   right_on = "id"
                                   ).merge(tax_policies,
                                   how="left",
                                   left_on = "category_id",
                                   right_on = "id")

bullets_mapped["category"] = np.where(bullets_mapped["type"] == "Issue area", bullets_mapped["name_x"], bullets_mapped["name_y"])
bullets_mapped.drop(["category_id", "id_x", "name_x", "id_y", "name_y"], 
                    axis = "columns", 
                    inplace = True)

# build final json
data = []

for candidate in candidates["last_name"]:
    candidate_dict = {}
    
    candidate_dict["Name"] = candidate
    candidate_dict["Overview"] = ""
    candidate_dict["Issue areas"] = {}
    candidate_dict["Tax policies"] = {}
    
    for issue in issue_areas["name"]:
        candidate_dict["Issue areas"][issue] = makeBulletText(candidate, "Issue area", issue)
    
    for tp in tax_policies["name"]:
        candidate_dict["Tax policies"][tp] = makeBulletText(candidate, "Tax policy", tp)

    data.append(candidate_dict)
    
with open("data.json", "w") as outfile:
    json.dump(data, outfile)