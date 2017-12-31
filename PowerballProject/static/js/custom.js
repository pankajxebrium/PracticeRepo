'use strict';

// Get csrf cookie to call api views
// It avoids 403 ( csrf not matching issue )
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function checkUserPermission(func, args){
    if (typeof args === 'undefined'){
        args = []
    }
    var url = "/terragraph/link/is_authenticated/";
    $.getJSON(url, function(result){
        /**
         * @param result          result object.
         * @param result.authenticated   is authenticated.
         */
        if(result.authenticated == true){
            return func.apply(this, args)
        }else{
            window.location = '/terragraph/login/?next='+ window.location.href
        }
    });
}

function get_last_result(){

}

$('#form-player-input').submit(function () {
    var formData = new FormData($(this)[0]);
    $.ajax({
        type: "POST",
        headers: {},
        url: '/power-ball/power-play/',
        crossDomain: true,
        dataType: "html",
        xhrFields: {
            withCredentials: true
        },
        data: formData,
        success: function (result) {
            var tmp_data = $('#id_temp_data');
            $(tmp_data).html(result);
            $(tmp_data).find('#id_result_model_popup').modal('show')
        },
        error: function (xhr, errmsg, err) {
            console.log('error::' + err);
        },
        beforeSend: function (xhr) {
            xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
        },
        contentType: false,
        processData: false
    });
    return false;
});

function maxLengthCheck(object)
{
    if (object.value.length > object.maxLength)
      object.value = object.value.slice(0, object.maxLength)
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

$('#id_generate_random_numbers').on('click', function(){
    var temp_arr = [];
    while(temp_arr.length < 5){
        var randomnumber = getRandomIntInclusive(1, 49);
        if(temp_arr.indexOf(randomnumber) > -1) continue;
        temp_arr[temp_arr.length] = randomnumber;
    }
    $('#id_white_ball_1').val(temp_arr[0]);
    $('#id_white_ball_2').val(temp_arr[1]);
    $('#id_white_ball_3').val(temp_arr[2]);
    $('#id_white_ball_4').val(temp_arr[3]);
    $('#id_white_ball_5').val(temp_arr[4]);
    $('#id_red_ball').val(getRandomIntInclusive(1, 26));
});

