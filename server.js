var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

var app = express();
var port = process.env.PORT || 8000;

var mongoDB = mongoose.connect('mongodb://localhost', {dbName: 'smoothieDb', useNewUrlParser: true });
var db = mongoose.connection;
mongoose.Promise = global.Promise;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var Emails = require('./models/emailModel');
mainRouter = require('./routes/mainRouter')(Emails);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('app'));

app.use('/api', mainRouter);

app.use('/scripts', express.static(`${__dirname}/node_modules/`));

app.use((req, res) => res.sendFile(`${__dirname}/app/index.html`));

app.listen(port, function(){
    console.log('port run' + port);
    console.log(mongoose.connection.readyState);
});