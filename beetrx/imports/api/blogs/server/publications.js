import { Blogs } from '../blogs_collection.js';

Meteor.publish('blogsByUser', function(id) {
  check(id, String);
  return Blogs.find({userId: id});
});

Meteor.publish('blogById', function(id) {
  check(id, String);
  return Blogs.find({_id: id});
});

Meteor.publish('users', () => Meteor.users.find({}));

Meteor.publish('blogs', () => Blogs.find({emoji: {$regex: /[💩😭🌊😃🦄]/}}, {sort: {createdAt: -1}, limit: 1}));

Meteor.publish('blogsGraph', () => Blogs.find({emoji: {$regex: /[💩😭🌊😃🦄]/}}, {sort: {createdAt: -1}, limit: 5}));
