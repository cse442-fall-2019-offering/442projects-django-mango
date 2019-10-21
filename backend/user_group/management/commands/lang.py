#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Sat Oct 19 10:06:52 2019

@author: csy
"""


from django.core.management.base import BaseCommand
from user_group.models import Language
import os


class Command(BaseCommand):
    help = "initialize the programming language database"

    def handle(self, *args, **options):

        module_dir = os.path.dirname(__file__)
        file_path = os.path.join(module_dir, "language")
        file = open(file_path)

        for line in file.readlines():
            languages = line.strip().split(",")
            try:
                Language.objects.get(name=languages[0])
            except:
                language = Language(
                    name=languages[0], search_popularity=float(languages[1])
                )

                language.save()

        self.stdout.write(
            self.style.SUCCESS(
                "Successfully initialized the programming language database"
            )
        )
