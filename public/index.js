let socket = io.connect('https://notifications-component.herokuapp.com/');

if (socket) {

    console.log('Connected to socket');

    socket.on('notifications', (data) => {

        let notifications = data.filter((notification) => notification.type != "bonus");
        let notifCount = notifications.length;

        let html = document.getElementById('notif-template').innerHTML;
        let template = Handlebars.compile(html);
        let result = template({ data: data });
        document.getElementById('wrapper').innerHTML = result;
        $('#notif-badge').html(notifCount);


        $('#collapseExample div').each(function (idx, item) {


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

} else {
    console.log('Problem with socket connection!....');
}

