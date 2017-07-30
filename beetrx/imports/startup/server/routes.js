import { Picker } from 'meteor/meteorhacks:picker';
import { check } from 'meteor/check';
import bodyParser from 'body-parser';
import { Blogs } from '../../api/blogs/blogs_collection.js';

Picker.middleware(bodyParser.json());
Picker.middleware(bodyParser.urlencoded({extended: false}));

Picker.route('/aws-test', function (params, req, res, next) {
  check(params.query, Object);
  console.log(req.body.type, req.body.value);
  if (Blogs.findOne({sessionId: req.body.sessionId}) === undefined) {
    Blogs.insert({sessionId: req.body.sessionId, createdAt: req.body.timestamp});
  }
  var id = Blogs.findOne({sessionId: req.body.sessionId})._id;
  if (req.body.type === 'medicine') Blogs.update(id, {$set: {medication: req.body.value}});
  if (req.body.type === 'number') Blogs.update(id, {$set: {honeyAmount: req.body.value}});
  if (req.body.type === 'feeling') {
    var feel = ['shitty', 'sad', 'fine', 'happy', 'magical'], emo = ['💩', '😭', '🌊', '😃', '🦄'];
    Blogs.update(id, {$set: {emoji: emo[feel.indexOf(req.body.value)]}});
  };
  res.end();
});
