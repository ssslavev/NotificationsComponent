let socket = io.connect('https://notifications-component.herokuapp.com/');

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

                            $(this).hide(2500, function () { $(this).remove() })
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

                    $('#expires').val('');
                    $('#requirement').val('');
                    $('#title').val('');
                    $('#image').val('');
                    $('#link').val('');
                    $('#title').val('');
                    $('#text').val('');
                    $('#btn-submit').attr('disabled', true);
                })
            })
    });





} else {
    console.log('Problem with socket connection!....');
}

