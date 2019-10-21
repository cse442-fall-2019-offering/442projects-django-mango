"""
Before pushing, run 'python manage.py test'
"""

from django.urls import reverse

from rest_framework import status
from rest_framework.test import APITestCase

from Account.tests import AccountTests
from .models import Group, Language

from .sort import sort_group

class GroupTests(APITestCase):
    def create_group(self):

        number_of_groups = Group.objects.count()
        url = reverse("group")
        data = {
            "name": "mango",
            "languages": ["Python", "Java", "Go"],
            "description": "<p>Mango group</p>",
        }
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Group.objects.count(), number_of_groups + 1)
        identity = response.data.get("identity")
        group = Group.objects.get(identity=identity)
        self.assertEqual(group.name, "mango")
        lang1 = Language.objects.get(name="Python")
        lang2 = Language.objects.get(name="Java")
        lang3 = Language.objects.get(name="Go")
        lang4 = Language.objects.get(name="C++")
        languages = group.languages.all()
        self.assertTrue(lang1 in languages)
        self.assertTrue(lang2 in languages)
        self.assertTrue(lang3 in languages)
        self.assertFalse(lang4 in languages)

        return identity

    def update_group(self, group_pk):

        url = reverse("group/<group_pk>", kwargs={"group_pk": group_pk})
        data = {"name": "django", "languages": ["Python", "Java"]}
        response = self.client.put(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        group = Group.objects.get(identity=group_pk)
        self.assertEqual(group.name, "django")
        lang1 = Language.objects.get(name="Python")
        lang2 = Language.objects.get(name="Java")
        lang3 = Language.objects.get(name="Go")
        languages = group.languages.all()
        self.assertTrue(lang1 in languages)
        self.assertTrue(lang2 in languages)
        self.assertFalse(lang3 in languages)

    def leave_group(self, group_pk):

        url = reverse("leave_group/<group_pk>", kwargs={"group_pk": group_pk})
        response = self.client.get(url, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        try:
            Group.objects.get(identity=group_pk)
            self.assertTrue(False)
        except:
            pass
    
    def sort_groups(self):
        groups_sample = [['i1','djangomango',['Python','Java'],['user1','user2']],
          ['i2','foreach',['Go', 'C++', 'Visual Basic'],['user3', 'user4', 'user5', 'user6', 'user7']],
          ['i3','javagroup',['PHP','Java','C'],['user8','user9','user10', 'user11']],
          ['i4', 'ccc',['SQL','Java','Groovy','Python'],['user12']]]
        user_lang_sample1 = ['Java', 'C'] # i3
        user_lang_sample2 = ['Python', 'SQL'] # i4
        user_lang_sample3 = ['Java', 'SQL', 'Go', 'Swift'] # i4
        user_lang_sample4 = ['Python', 'Java'] #i1
        group1 = sort_group(groups_sample, user_lang_sample1)
        group2 = sort_group(groups_sample, user_lang_sample2)
        group3 = sort_group(groups_sample, user_lang_sample3)
        group4 = sort_group(groups_sample, user_lang_sample4)
        self.assertEqual(group1[3], groups_sample[1])
        self.assertEqual(group2[3], groups_sample[1])
        self.assertEqual(group3[3], groups_sample[1])
        self.assertEqual(group4[3], groups_sample[1])
        
        self.assertEqual(group1[0], groups_sample[2])
        self.assertEqual(group2[0], groups_sample[3])
        self.assertEqual(group3[0], groups_sample[3])
        self.assertEqual(group4[0], groups_sample[0])

    def testGroup(self):
        AccountTests.login(self)
        group_pk = self.create_group()
        self.update_group(group_pk)
        self.leave_group(group_pk)
        self.sort_groups()
