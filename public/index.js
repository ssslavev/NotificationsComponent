let socket = io.connect('http://localhost:4001');

if (socket) {

    console.log('Connected to socket');

    socket.on('notifications', (data) => {

        tmplRequester.get('main')
            .then((tmpl) => {

                $('#collapseExample').append(tmpl({ data: data }));
                let notifCount = $('#collapseExample div:not([data-type=bonus])').length - 1
                $('#notif-badge').html(notifCount);

                $('#collapseExample div').each(function () {

                    if ($(this).data('info')) {

                        setTimeout(() => {

                            $(this).remove();
                            if ($(this).data('type') != 'bonus') {
                                notifCount--;
                            }
                            $('#notif-badge').html(notifCount);
                        }, $(this).data('info'));
                    }

                });

                $('#link').hide();
                $('#image').hide();
                $('#requirement').hide();
                $('#title').hide();
                $('#text').hide();
                $('#expires').hide();
                $('#btn-submit').hide();
                $('#btn-clear').hide();

                $('#inputState').on('change', function () {

                    if ($('#inputState').val() == 'text') {
                        $('#link').hide();
                        $('#image').hide();
                        $('#requirement').hide();
                        $('#title').show();
                        $('#text').show();
                        $('#expires').show();
                        $('#btn-submit').show();
                        $('#btn-clear').show();

                    } else if ($('#inputState').val() == 'bonus') {
                        $('#text').hide();
                        $('#image').hide();
                        $('#link').hide();
                        $('#title').show();
                        $('#requirement').show();
                        $('#expires').show();
                        $('#btn-submit').show();
                        $('#btn-clear').show();

                    } else if ($('#inputState').val() == 'Promotion') {
                        $('#text').hide();
                        $('#requirement').hide();
                        $('#expires').hide();
                        $('#title').show();
                        $('#image').show();
                        $('#link').show();
                        $('#btn-submit').show();
                        $('#btn-clear').show();
                    }


                })
            })
    });

    /* $(document).ready(function () {
        $('form input').keyup(function () {

            var empty = false;
            $('form input').each(function () {
                console.log($(this));
                if ($(this).val().length == 0) {
                    empty = true;
                }
            });
            console.log(empty);

            if (empty) {
                $('#btn-submit').attr('disabled', true);
            } else {
                $('#btn-submit').attr('disabled', false);
            }
        });
    }); */

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
        $('#title').val('')
        $('#image').val('')
        $('#link').val('')
        $('#expires').val('')
        $('#requirement').val('')
        event.preventDefault();
    });


} else {
    console.log('Problem with socket connection!....');
}

