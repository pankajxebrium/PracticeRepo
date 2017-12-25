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

