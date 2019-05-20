$('form input#title,input#expires,input#requirement').keyup(function () {

    var empty = false;
    $('form input#title,input#requirement,input#expires').each(function () {

        if ($(this).val().length == 0) {
            empty = true;
        }
    });

    if (empty) {
        $('#btn-submit').attr('disabled', true);
    } else {
        $('#btn-submit').attr('disabled', false);
    }
});

$('form input#title,input#image,input#link').keyup(function () {

    var empty = false;
    $('form input#title,input#image,input#link').each(function () {

        if ($(this).val().length == 0) {
            empty = true;
        }
    });


    if (empty) {
        $('#btn-submit').attr('disabled', true);
    } else {
        $('#btn-submit').attr('disabled', false);
    }
});

$('form input#title,input#text,input#expires').keyup(function () {

    var empty = false;
    $('form input#title,input#text,input#expires').each(function () {

        if ($(this).val().length == 0) {
            empty = true;
        }
    });


    if (empty) {
        $('#btn-submit').attr('disabled', true);
    } else {
        $('#btn-submit').attr('disabled', false);
    }
});



$('#btn-submit').on('click', function () {

    if ($('#inputState').val() == 'text') {
        socket.emit('input', {
            type: $('#inputState').val(),
            title: $('#title').val(),
            text: $('#text').val(),
            expires: $('#expires').val()
        });
    } else if ($('#inputState').val() == 'bonus') {
        socket.emit('input', {
            type: $('#inputState').val(),
            title: $('#title').val(),
            requirement: $('#requirement').val(),
            expires: $('#expires').val()
        });
    } else if ($('#inputState').val() == 'Promotion') {
        socket.emit('input', {
            type: $('#inputState').val(),
            title: $('#title').val(),
            image: $('#image').val(),
            link: $('#link').val()
        });
    }


    $("form")[0].reset();
    event.preventDefault();
});

$('#btn-clear').on('click', function () {
    $('#text').val('');
    $('#title').val('')
    $('#image').val('')
    $('#link').val('')
    $('#expires').val('')
    $('#requirement').val('')
    $('#btn-submit').attr('disabled', true);
    event.preventDefault();
});