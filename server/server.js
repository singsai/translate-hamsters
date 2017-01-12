const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const db = require('./db/dbconfig');

const router = require('./router');
const handler = require('./request-handler');
const session = require('express-session');
const s3Handler = require('./s3handler');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({secret: 'heroic translating hamsters', resave: false, saveUninitialized: true}));

app.use(express.static(path.join(__dirname, '../client')));

app.post('/api/signup', handler.createUser);
app.post('/api/login', handler.verifyUser);
app.post('/api/sentences', handler.createSentence);
app.get('/api/sentences/:word', handler.listSentences);
app.post('/api/words', handler.addWord);
app.get('/api/words/:username', handler.getWords);

app.post('/api/upload', s3Handler.uploadAudio);

app.get('*', function (req, res) {
  res.sendFile(path.resolve(__dirname, '../client', 'index.html'));
});

app.listen(3000, function() {
  console.log('App is now listening on port 3000');
});

module.exports = app;
