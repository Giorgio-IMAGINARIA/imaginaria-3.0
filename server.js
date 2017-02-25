// mongodb
// var MongoClient = require('mongodb').MongoClient;
// var dbhost = 'mongodb://localhost:27017/test';
// MongoClient.connect(dbhost, function (err, db) {
//     if (err) {
//         throw err
//     } else {
// console.log('connected to mongodb');
// db.createCollection("log");
// console.log(db.collection("log"));
// db.collection("log").insert({ 'bookTitle': 'Snowcrash' });
// var currentCollection = db.collection("log");
// currentCollection.insert({ 'title': 'A new book4' }, function (err, docs) {
//     if (err) {
//         console.log('error received');
//     } else {
//         console.log(docs.ops[0].title);
//     }
//     db.close();
// });
// currentCollection.findOne({ 'title': 'A new book' }, function (err, doc) {
//     if (err) {
//         console.log('error received');
//     } else {
//         console.log(doc);
//     }
// });
// console.log(db.collection("log").find({ 'bookTitle': 'Snowcrash' }));

//         var collection = db.testing;
//         collection.find();
// collection.insert({ 'title': 'Snowcrash' }, function (err, docs) {
//     console.log(docs.length + ' record inserted.');
//     console.log(docs[0].title + ' – ' + docs[0]._id);
// db.close();
// });
// collection.find({});
// };
// });





// mongoose

// var mongoose = require('mongoose');
// var Schema = mongoose.Schema;
// mongoose.connect('mongodb://localhost:27017/test');
// mongoose.connection.on('open', function () {
//     console.log('Mongoose connected.');
// });

// var Account = new Schema({
//     username: { type: String},
//     date_created: { type: Date, default: Date.now },
//     visits: { type: Number, default: 0 },
//     active: { type: Boolean, default: false },
//     age: { type: Number, required: true, min: 13, max: 120 }
// });
// Account.statics.findByAgeRange = function(min, max, callback){
// this.find({age:{$gt:min, $lte:max}},callback);
// };



// var AccountModel = mongoose.model('Account', Account);

// AccountModel.findByAgeRange(18, 30, function(err, accounts){
//     console.log(accounts.length);
// });

// var newUser = new AccountModel({ username: 'randomUser3', age:11 });
// newUser.validate(function(err){
//     console.log(err);
// });
// newUser.save();
// console.log(newUser.username);
// console.log(newUser.date_created);
// console.log(newUser.visits);
// console.log(newUser.active);



























// server.js
var express = require('express');
var path = require('path');
var compression = require('compression');
var email = require('emailjs/email');
var bodyParser = require('body-parser');
var worksCollectionName = 'works';
var imaginariaDB = null;
var mongodb = require('mongodb');
var dbhost = 'mongodb://localhost:27017/imaginaria-3';

var MongoClient = mongodb.MongoClient;
MongoClient.connect(dbhost, function (err, db) {
    if (err) {
        throw err
    } else {
        imaginariaDB = db;
        console.log('connected to mongodb');



        // db.listCollections({ name: worksCollectionName })
        //     .next(function (err, collinfo) {
        //         if (collinfo) {
        //             console.log('the collection exists');
        //         } else {
        //             console.log('no collections');
        //         }
        //     });
    }
});
// var mongoose = require('mongoose');
// var Schema = mongoose.Schema;

// mongoose.connect(dbhost);
// mongoose.connection.on('open', function () {
//     console.log('Mongoose connected.');
// });


var PORT = process.env.PORT || 3001;

var app = express()
app.use(compression())
//Serve static content for the app from the "dist" directory in the application directory.
app.use(express.static(__dirname + '/dist'));
// Mount the middleware at "/public" to serve static content only when their request path is prefixed with "/public".
app.use("/public", express.static(__dirname + '/public'));
app.use(bodyParser.json());




// console.log('hello!!!!!!');
// var arrayToGet = [
//     {
//         role: 'Front End JavaScript Web Developer',
//         comPro: 'Globility Limited',
//         href: 'http://www.globility.co.uk/',
//         initialTime: 'January 2016',
//         finalTime: 'Present',
//         amount: '22.5k£/year',
//         city: 'London',
//         country: 'UK',
//         description: 'I am developing different fully responsive web apps in React (JSX syntax) using Flux as architecture, Material-UI as front-end framework, Radium as CSS-to-JS styling library and React-Router + Express (login handled by sessions) as routing solution. The applications collect data from separate APIs using both the REST architecture (with JQuery-Ajax) and the WebSocket protocol (with Socket.io) by using asynchronous programming techniques (JavaScript Promises). I am also developing a web portal web in Angular2+TypeScript using "Observables" as a way to let Angular2 services push states to the other internal components. I am using the ElementRef and Renderer service to directly change the DOM. The UI is made of not orthogonal shapes and fully resizes according to the viewport by means of layered canvases controlled by Angular2 directives. The app sends emails after submitting a form through EmailJS and the native Http Angular service. The submit check is handled by the new Google NoCaptcha Recaptcha. The Apps are being developed in a Node + Webpack environment. I have been also developing the front end side of fully responsive web applications using AngularJS 1, JavaScript, JQuery, Bootstrap3, Highcharts, HTML5 and CSS3. The apps run within a Sails.js, Node.js and MongoDB stack. Particularly I have been using JavaScript (up to ES6) and JQuery to develop software logic, create and modify JSON objects as well as to handle Ajax techniques. I have used Robomongo too, through its command line, to create, delete and modify JSON documents stored in MongoDB databases. Part of the day by day activity requires also keeping contacts with different clients, drawing flowcharts related to the code structure and to the user story in Omnigraffle, preparing visual mockups in Photoshop and Illustrator, collaborating on the code with Git (in Bitbucket), organising the workflow with Jira, writing documentation with Confluence and mentoring junior developers.'
//     },
//     {
//         role: 'Front End JavaScript Web Developer',
//         comPro: 'Dauntless Agency',
//         href: 'http://wearedauntless.com/',
//         initialTime: 'August 2015',
//         finalTime: 'November 2015',
//         amount: '20k£/year',
//         city: 'London',
//         country: 'UK',
//         description: 'I developed fully responsive web pages using technologies such as HTML5, CSS3, Javascript, JQuery and Bootstrap. Part of the work activity comprised software testing and debugging with Chrome dev tools as well as the insertion and modification of content and source code of dynamic websites (Wordpress + PHP).'
//     },
//     {
//         role: 'Freelance Front End Web Developer',
//         comPro: 'Imaginaria.london',
//         href: 'http://www.imaginaria.london',
//         initialTime: 'June 2015',
//         finalTime: 'August 2015',
//         amount: '0£/Personal project',
//         city: 'London',
//         country: 'UK',
//         description: 'A complete overhauling of my website with a fully responsive one-page sliding-show design. I used HTML, CSS, JavaScript and JQuery and particularly the latter for the handling of animations related to the UI. I used GSAP JS by GreenSock too to have smoother animations and less verbose code. I used Velocity.js for the handling of SVG pictures (opacity transitions), TouchSwipe JS and MouseWheel JS for the controls. Regarding the graphic, I collaborated with a designer who provided the visuals and mock-ups that I turned into code. My efforts aimed to use only JavaScript technologies for my project. The website is currently hosted in Azure.'
//     },
//     {
//         role: 'Freelance Front End Web Developer',
//         comPro: 'Rui Yun Jiang - Designer',
//         href: '../RuiWebsite/index.html',
//         initialTime: 'January 2015',
//         finalTime: 'April 2015',
//         amount: '1000£',
//         city: 'London',
//         country: 'UK',
//         description: 'A web portfolio for a London based designer. The client provided mock-ups that I translated in code. Initially I used Bootstrap for the scaffolding and HTML and CSS for the structure and the style. Once I had a responsive static website I wrapped it in Wordpress making it dynamic using PHP and the standard CMS functions. I created PHP functions too for complex handling of text and for the contact handling via POST method. The result is a responsive tailored from the ground template which is fully integrated in Wordpress.'
//     },
//     {
//         role: 'Freelance Front End Web Developer',
//         comPro: 'Made by Italians',
//         href: '../MbI/index.html',
//         initialTime: 'September 2014',
//         finalTime: 'December 2014',
//         amount: '600£',
//         city: 'London',
//         country: 'UK',
//         description: 'A website for an Italian start-up in the field of business promotion. It’s the result of a collaboration with a designer who dealt with the artistic side of the project and provided me with mock-ups that I translated in web pages. My role involved the creation and design of the logo with Photoshop and Illustrator, the relationship management with the client and the operations needed for hosting (on One.com). The website is fully responsive and coded with HTML, CSS and Javascript. The use of Javascript involved the creation of functions handling the browser selection and an interactive slideshow.'
//     },
//     {
//         role: 'Freelance Front End Web Developer',
//         comPro: 'Imaginaria.london',
//         href: 'http://www.imaginaria.london',
//         initialTime: 'March 2014',
//         finalTime: 'August 2014',
//         amount: '0£/Personal project',
//         city: 'London',
//         country: 'UK',
//         description: 'My first personal website that I designed and coded from the ground. I made my logo with Illustrator and I shot a promotional video of myself that I edited in Premiere and included in the website. Imaginaria 1.0 was a static non responsive website coded in HTML5 and CSS3.'
//     }
// ];



app.post('/sendmail', function (req, res) {
    var server = email.server.connect({
        user: "",
        password: "",
        host: "",
        ssl: true
    });
    // send the message and get a callback with an error or details of the message that was sent
    var textToSend = 'Name: ' + req.body.name + '; email: ' + req.body.email + ' mobile: ' + req.body.phone + ' message: ' + req.body.message;
    server.send({
        text: textToSend,
        from: "",
        to: '',
        subject: "email subject"
    }, function (err, message) {
        if (err)
            console.log(err);
        else
            res.json({ success: true, msg: 'sent' });
    });
});

app.get('/db/works', function (req, res) {
    Promise.resolve(res)
        .then((res) => {
            return new Promise((resolve, reject) => {
                imaginariaDB.listCollections({ name: worksCollectionName })
                    .next(
                    function (err, collInfo) {
                        if (err) {
                            reject("there was an error in the DB: " + err);
                        } else {
                            if (collInfo) {
                                console.log('the collection exists');
                                resolve(res);
                            } else {
                                imaginariaDB.createCollection("works");
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
                var currentCollection = imaginariaDB.collection(worksCollectionName);
                currentCollection.find({}, function (err, cursor) {
                    cursor.toArray(function (err, items) {
                        if (err) {
                            reject('there was an error in the DB: ' + err);
                        } else {
                            console.log('success: ', items);
                            var worksDBObject = { worksDBArray: items };
                            console.log('here are the works');
                            res.json(worksDBObject);
                        }
                    });
                    // imaginariaDB.close();
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

// process.on('SIGINT', function() {
    // var listeners = process.listeners('SIGINT');
// imaginariaDB.close();
    // console.log('Nice SIGINT-handler');
//     for (var i = 0; i < listeners.length; i++) {
//         console.log(listeners[i].toString());
//     }
    // process.exit();
// });