from django.db import models
from django.urls import reverse
from Account.models import User


# Create your models here.
class Language(models.Model):

    name = models.CharField(max_length=50, primary_key=True)

    search_popularity = models.DecimalField(max_digits=10, decimal_places=5)

    class Meta:
        ordering = ("name",)

    def __str__(self):
        return "{}".format(self.name)


class Group(models.Model):

    #  STATUS = (
    #    ('available', "Everyone's Welcomed"),
    #    ('full', "Full"),
    #    ('password', 'Password_Required'),)

    group_name = models.CharField(max_length=250)
    identity = models.CharField(max_length=10, primary_key=True)
    languages = models.ManyToManyField(Language)
    members = models.ManyToManyField(User)
    description = models.TextField()
    #  status = models.CharField(
    #    max_length=250,
    #    choices = STATUS,
    #    default='available')

    class Meta:
        ordering = ("group_name",)

    def __str__(self):
        return "{}".format(self.group_name)

    def get_absolute_url(self):
        return reverse("main_page:group_detail", args=[self.slug])


# class User(models.Model):
#  DATE = (
#    ('m','Monday'),
#    ('t','Tuesday'),
#    ('w','Wednesday'),
#    ('th','Thursday'),
#    ('f','Friday'),)
#  TIME = (
#    ('00:00:00', '00 AM'),
#    ('01:00:00', '01 AM'),
#    ('02:00:00', '02 AM'),
#    ('03:00:00', '03 AM'),
#    ('04:00:00', '04 AM'),
#    ('05:00:00', '05 AM'),
#    ('06:00:00', '06 AM'),
#    ('07:00:00', '07 AM'),
#    ('08:00:00', '08 AM'),
#    ('09:00:00', '09 AM'),
#    ('10:00:00', '10 AM'),
#    ('11:00:00', '11 AM'),
#    ('12:00:00', '12 PM'),
#    ('13:00:00', '01 PM'),
#    ('14:00:00', '02 PM'),
#    ('15:00:00', '03 PM'),
#    ('16:00:00', '04 PM'),
#    ('17:00:00', '05 PM'),
#    ('18:00:00', '06 PM'),
#    ('19:00:00', '07 PM'),
#    ('20:00:00', '08 PM'),
#    ('21:00:00', '09 PM'),
#    ('22:00:00', '10 PM'),
#    ('23:00:00', '11 PM'),)
#  name = models.CharField(
#    max_length=250,
#    db_index=True,
#    unique=True)
#  slug = models.SlugField(
#    max_length=250,
#    db_index=True,
#    unique=True)
#  email = models.EmailField(
#    max_length=250,
#    unique=True)
#  group = models.ForeignKey(
#    Group,
#    blank=True,
#    null=True,
#    default="",
#    on_delete=models.CASCADE)
#  language = models.ManyToManyField(Language)
#  introduction = models.TextField()
#  recitation_date = models.CharField(
#    max_length = 10,
#    choices = DATE,
#    default = "")
#  recitation_time = models.CharField(
#    max_length=250,
#    choices=TIME,
#    default="")
#
#  class Meta:
#    ordering = ('email',)
#
#  def __str__(self):
#    return "{} - {}".format(self.name, self.email)
#
#  def get_absolute_url(self):
#    return reverse(
#      'main_page:user_detail',
#      args=[self.slug])
#
