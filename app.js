let { connectionString, port } = require('./config/config');
const express = require('express');
const mongo = require('mongodb').MongoClient;
const socket = require('socket.io');

const app = express();

const server = app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})



app.use(express.static('public'));


const io = socket(server);

//Conect MDb
mongo.connect(connectionString, { useNewUrlParser: true }, (err, client) => {
    if (err) {
        throw err;
    }

    //console.log('MongoDb is connected!');
    //Conect to Socket.io
    io.on('connection', (socket) => {

        let db = client.db('notifications');

        db.collection('notifications').find({}).toArray((err, result) => {
            if (err) {
                throw err;
            }

            socket.emit('notifications', result);

        });

        socket.on('input', (data) => {
            if (data.type == 'text') {

                let { type, title, text, expires } = data;
                db.collection('notifications').insertOne({ type: type, title: title, text: text, expires: expires }, () => {
                    socket.emit('notifications', [data]);
                })
            } else if (data.type == 'bonus') {

                let { type, title, requirement, expires } = data;
                db.collection('notifications').insertOne({ type: type, title: title, requirement: requirement, expires: expires }, () => {
                    socket.emit('notifications', [data]);
                })
            } else if (data.type == 'Promotion') {

                let { type, title, image, link } = data;
                db.collection('notifications').insertOne({ type: type, title: title, image: image, link: link }, () => {
                    socket.emit('notifications', [data]);
                })
            }


        })

    })

});


