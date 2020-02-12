var express = require('express')
var hbs = require('express-handlebars');
var config = require('./config')
var cookieParser = require('cookie-parser');
var helmet = require('helmet')
var app = express()

app.engine('handlebars', hbs({
    defaultLayout: 'default',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials'
}));
app.set('view engine', 'handlebars');
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
app.use(express.static('static'))
app.use(function (req, res, next) {
    headers = req.rawHeaders
    headers
    next()
})

app.all('/', function (req, res) {
    navbar = {
        "index": true,
        "team": false,
        "events": false,
        "join": false,
        "contact": false
    }
    data = {
        title: 'CJSIA',
        navbar: navbar,
        css: "/css/combined.css",
        live: true,
    }
    return res.render('index', data)
});

app.all('/team', function (req, res) {
    return res.redirect('/')
    navbar = {
        "index": false,
        "team": true,
        "events": false,
        "join": false,
        "contact": false
    }
    data = {
        title: 'CJSIA | Team',
        navbar: navbar,
        css: "/css/team.css",
        live: true,
    }
    return res.render('team', data)
});

app.all('/join', function (req, res) {
    navbar = {
        "index": false,
        "team": false,
        "events": false,
        "join": true,
        "contact": false
    }
    data = {
        title: 'CJSIA | Join',
        navbar: navbar,
        css: "/css/join.css",
        live: true,
    }
    return res.render('join', data)
});

app.all('/contact', function (req, res) {
    navbar = {
        "index": false,
        "team": false,
        "events": false,
        "join": false,
        "contact": true
    }
    data = {
        title: 'CJSIA | Contact',
        navbar: navbar,
        css: "/css/contact.css",
        live: true,
    }
    return res.render('contact', data)
});

app.all('/events', function (req, res) {
    navbar = {
        "index": false,
        "team": false,
        "events": true,
        "join": false,
        "contact": false
    }
    data = {
        title: 'CJSIA | Events',
        navbar: req.nav,
        css: "/css/events.css",
        live: true,
    }
    return res.render('events', data)
});

/*
404 Error
*/
app.use(function (req, res) {
    res.status(404)
    res.redirect('/')
    // res.send('Um, was something supposed to be here? ¯\\_(ツ)_/¯' + JSON.stringify(req.headers))
});

/*
500 Error
*/
app.use(function (error, req, res, next) {
    res.status(500);
    console.log(error)
    res.redirect('/')
    // res.send('Internal server error ' + JSON.stringify(error.stack));
});

/*
Start DB and Server
- start up this saucy boi
*/
app.listen(5000, function () {
    console.log('Started')
})