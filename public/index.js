let socket = io.connect('https://notifications-component.herokuapp.com/');

if (socket) {

    console.log('Connected to socket');

    socket.on('notifications', (data) => {

        tmplRequester.get('main')
            .then((tmpl) => {
                $('#wrapper').html(tmpl({ data: data }));

                let notifications = data.filter((notification) => notification.type != "bonus");
                let notifCount = notifications.length;
                $('#notif-badge').html(notifCount);

                $('#collapseExample div').each(function () {

                    if ($(this).data('info')) {

                        setTimeout(() => {

                            $(this).fadeOut('slow');
                            if ($(this).data('type') != 'bonus') {
                                notifCount--;
                            }
                            $('#notif-badge').html(notifCount);
                        }, $(this).data('info'));
                    }

                });
            })
    });

} else {
    console.log('Problem with socket connection!....');
}

