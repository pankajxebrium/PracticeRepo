# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models


class DrawResult(models.Model):
    result = models.TextField()

    def __unicode__(self):
        return str(self.id)


class Player(models.Model):
    result = models.ForeignKey(DrawResult, on_delete=models.CASCADE)
    eth_address = models.TextField()
    email = models.TextField()
    eth_val = models.FloatField()
    power_ball_number = models.TextField()

    def __unicode__(self):
        return self.email
