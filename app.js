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

    let db = client.db('notifications');

    console.log('MongoDb is connected!');
    //Conect to Socket.io
    io.on('connection', (socket) => {


        sendStatus = (s) => {
            socket.emit(s);
        }

        let stream = db.collection('notifications').watch();

        stream.on('change', (change) => {
            console.log(change);
        })

        db.collection('notifications').find({}).toArray((err, result) => {

            if (err) {
                throw err;
            }

            socket.emit('notifications', result);

        });




        //db.collection('notifications').findOne({}, { sort: { $natural: -1 } }).then(res => {
        //    console.log(res);
        // });

    })

});


