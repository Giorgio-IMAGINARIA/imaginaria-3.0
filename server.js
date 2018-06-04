var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/imaginaria-3');
var mongooseDB = mongoose.connection;
mongooseDB.on('error', console.error.bind(console, 'connection error:'));
mongooseDB.once('open', function () {
    var projectSchema = mongoose.Schema({
        urlbackground: String,
        href: String,
        description: String,
        title: String
    });
    var ProjectModel = mongoose.model('project', projectSchema);
    var workSchema = mongoose.Schema({
        role: String,
        comPro: String,
        href: String,
        initialTime: String,
        finalTime: String,
        city: String,
        country: String,
        description: String
    });
    var WorkModel = mongoose.model('work', workSchema);
    // console.log("we are connected!");
});

var express = require('express');
var path = require('path');
var compression = require('compression');
var email = require('emailjs/email');
var bodyParser = require('body-parser');
var worksCollectionName = 'works';
var projectsCollectionName = 'projects';

var PORT = process.env.PORT || 3001;

var app = express();
app.use(compression());
//Serve static content for the app from the "dist" directory in the application directory.
app.use(express.static(__dirname + '/dist'));
// Mount the middleware at "/public" to serve static content only when their request path is prefixed with "/public".
app.use("/public", express.static(__dirname + '/public'));

app.use(bodyParser.json());

app.post('/sendmail', function (req, res) {
    var server = email.server.connect({
        user: "An email of your choice",
        password: "A password",
        host: "The host",
        ssl: true
    });
    // send the message and get a callback with an error or details of the message that was sent
    var textToSend = 'Name: ' + req.body.name + '; email: ' + req.body.email + ' mobile: ' + req.body.phone + ' message: ' + req.body.message;
    server.send({
        text: textToSend,
        from: "An email of your choice",
        to: 'An email to send to',
        subject: "Some text"
    }, function (err, message) {
        if (err)
            console.log(err);
        else
            res.json({ success: true, msg: 'sent' });
    });
});

app.get('/db/projects', function (req, res) {
    Promise.resolve(res)
        .then((res) => {
            return new Promise((resolve, reject) => {
                // console.log('test projects');
                mongooseDB.db.listCollections({ name: projectsCollectionName })
                    .next(
                    function (err, collInfo) {
                        if (err) {
                            reject("there was an error in the DB: " + err);
                        } else {
                            if (collInfo) {
                                // console.log('the collection exists');
                                resolve(res);
                            } else {
                                mongooseDB.db.createCollection("projects");
                                reject("no collections");
                            }
                        }
                    }
                    )
            });
        })
        .catch((reason) => {
            console.log('CATCH LISTCOLLECTIONS ERROR:', reason);
        })
        .then((res) => {
            return new Promise((resolve, reject) => {
                // console.log('second step');
                var currentCollection = mongooseDB.db.collection(projectsCollectionName);
                currentCollection.find({}, function (err, cursor) {
                    cursor.toArray(function (err, items) {
                        if (err) {
                            reject('there was an error in the DB: ' + err);
                        } else {
                            // console.log('success: ', items);
                            var projectsDBObject = { projectsDBArray: items };
                            // console.log('here are the projects');
                            res.json(projectsDBObject);
                        }
                    });
                });
            });
        })
        .catch((reason) => {
            console.log('CATCH FIND ERROR:', reason);
        });
});

app.get('/db/works', function (req, res) {
    Promise.resolve(res)
        .then((res) => {
            return new Promise((resolve, reject) => {
                mongooseDB.db.listCollections({ name: worksCollectionName })
                    .next(
                    function (err, collInfo) {
                        if (err) {
                            reject("there was an error in the DB: " + err);
                        } else {
                            if (collInfo) {
                                // console.log('the collection exists');
                                resolve(res);
                            } else {
                                mongooseDB.db.createCollection("works");
                                reject("no collections");
                            }
                        }
                    }
                    )
            });
        })
        .catch((reason) => {
            console.log('CATCH LISTCOLLECTIONS ERROR:', reason);
        })
        .then((res) => {
            return new Promise((resolve, reject) => {
                var currentCollection = mongooseDB.db.collection(worksCollectionName);
                currentCollection.find({}, function (err, cursor) {
                    cursor.toArray(function (err, items) {
                        if (err) {
                            reject('there was an error in the DB: ' + err);
                        } else {
                            // console.log('success: ', items);
                            var worksDBObject = { worksDBArray: items };
                            // console.log('here are the works');
                            res.json(worksDBObject);
                        }
                    });
                });
            });
        })
        .catch((reason) => {
            console.log('CATCH FIND ERROR:', reason);
        });
});

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist', 'index.html'));
})

app.listen(PORT, function () {
    console.log('The server is running @ PORT:' + PORT);
})