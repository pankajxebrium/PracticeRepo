# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from django.http import HttpResponse
from powerball.models import DrawResult
import random, json


def draw_powerball():
    drum1 = list(range(1, 50))
    drum2 = list(range(1, 27))
    white_balls = []

    for _ in range(5):
        choice = random.SystemRandom().choice(drum1)
        drum1.pop(drum1.index(choice))
        white_balls.append(choice)
    white_balls = sorted(white_balls)
    return white_balls + [random.SystemRandom().choice(drum2)]


def index(request):
    context_data = dict()
    latest_result = DrawResult.objects.last()
    context_data['last_result'] = []
    if latest_result:
        context_data['last_result'] = json.loads(latest_result.result)
    return render(request, 'base.html', context_data)


def power_play(request):
    if request.method == "POST":
        context_data = dict()
        white_ball_1 = request.POST.get('white_ball_1')
        white_ball_2 = request.POST.get('white_ball_2')
        white_ball_3 = request.POST.get('white_ball_3')
        white_ball_4 = request.POST.get('white_ball_4')
        white_ball_5 = request.POST.get('white_ball_5')
        red_ball = request.POST.get('red_ball')
        context_data['player_numbers'] = []
        if white_ball_1 and white_ball_2 and white_ball_3 and white_ball_4 and white_ball_5 and red_ball:
            context_data['player_numbers'].append(int(white_ball_1))
            context_data['player_numbers'].append(int(white_ball_2))
            context_data['player_numbers'].append(int(white_ball_3))
            context_data['player_numbers'].append(int(white_ball_4))
            context_data['player_numbers'].append(int(white_ball_5))
            context_data['player_numbers'].append(int(red_ball))
            context_data['result_numbers'] = draw_powerball()

            result_count = 0
            for res_num in context_data['result_numbers'][:5]:
                if int(white_ball_1) == res_num:
                    result_count += 1
                if int(white_ball_2) == res_num:
                    result_count += 1
                if int(white_ball_3) == res_num:
                    result_count += 1
                if int(white_ball_4) == res_num:
                    result_count += 1
                if int(white_ball_5) == res_num:
                    result_count += 1

            result_text = ""
            if result_count > 0:
                result_text = str(result_count) + " Correct White Ball"
            else:
                result_text = "No White Balls"

            if int(red_ball) == context_data['result_numbers'][5]:
                if result_count == 0:
                    result_text += ", Just the Powerball"
                else:
                    result_text += " and the Powerball"
            else:
                if result_count == 0:
                    result_text = "Sorry you lost Please try again..."
                else:
                    result_text += ", but no Powerball"

            context_data['result_text'] = result_text

        return render(request, 'result_model_popup.html', context_data)
    return HttpResponse('')
