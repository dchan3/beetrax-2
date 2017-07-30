import './blog_list.html';
import { Template } from 'meteor/templating';
import { Blogs } from '../../../api/blogs/blogs_collection.js';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/nicolaslopezj:roles';

Template.blogList.onCreated(function() {
  var self = this;
  Session.set("email", "");
  self.autorun(function() {
    if (Roles.userHasRole(Meteor.userId(), 'patient')) self.subscribe('blogsGraph');
    else {
      self.subscribe("users");
      if (Session.get("email")) self.subscribe('blogsByUser', Meteor.users.findOne({emails: [{address: Session.get("email"), verified: false}]})._id);
    }
  });
});

Template.blogList.helpers({
  isPatient: () => Roles.userHasRole(Meteor.userId(), 'patient'),
  blogs: () => Blogs.find({}, {sort: {createdAt: -1}, limit: 1}),
  loggedIn: () => Meteor.userId() !== null,
  frequencyBar: function() {
    return {
      chart: {
        type: 'line'
      },
      title: {
        text: "Feeling Over Time"
      },
      yAxis: {
        min: 0,
        max: 16,
        tickInterval: 4,
        title: {
          text: 'feeling'
        }
      },
      xAxis: {
        min: 0,
        title: {
          text: 'Time'
        }
      },
      series: [{
        name: "Feeling",
        data: Blogs.find({}, {limit: 5}).map(function(obj, i) {
          return [i, ['💩', '😭', '🌊', '😃', '🦄'].indexOf(obj.emoji) * 4];
        })
      }, {
        name: 'Honey Dosage',
        data: Blogs.find({}, {limit: 5}).map(function(obj, i) {
          return [i, obj.honeyAmount];
        })
      }]
    }
  }
});

Template.blogList.events({
  'keyup input[type="text"]': function() {
    Session.set("email", $("input[type='text']")[0].value);
  }
});
