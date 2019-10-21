#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Sat Oct 19 15:18:54 2019

@author: csy
"""

'''
Separates the available groups to join and full groups
Full groups are moved to the back
'''
def avai_group(groups):
  avai_g = []
  full_g = []
  avai_g_count = 0

  for g in groups:
    if len(g[3]) < 5:
      avai_g.append(g)
      avai_g_count += 1
    else:
      full_g.append(g)
  avai_g += full_g
  return avai_g,avai_g_count #

'''
From the available groups,
sort with the number of languages the user has common with
'''
def lang_pref(avai_g,avai_count,user_langs):
  g_l = []
  for i in range(avai_count):
    lang_score = 0
    for l in user_langs:
      if l in avai_g[i][2]:
        lang_score += 1
    g_l.append([avai_g[i],lang_score])

  sorted_group = avai_g
  for i in range(avai_count):
    for j in range(i+1, avai_count):
      if g_l[i][-1] < g_l[j][-1]:
        temp = sorted_group[i]
        sorted_group[i] = sorted_group[j]
        sorted_group[j] = temp
  return sorted_group

'''
Sort the group
input: the groups to sort, the language preference of the user
output: sorted group
'''
def sort_group(groups, user_lang):
  avai, avai_count = avai_group(groups)
  language_pref = lang_pref(avai, avai_count, user_lang)
  return language_pref
