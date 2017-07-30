import './blog_edit.html';
import { Blogs } from '../../../api/blogs/blogs_collection.js';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

Template.blogEdit.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe("blogById", FlowRouter.getParam("id"));
  });
});

Template.blogEdit.helpers({
  isPatient: () => Roles.userHasRole(Meteor.userId(), 'patient'),
  loggedIn: () => Meteor.userId() !== null,
  doc: () => Blogs.findOne({_id: FlowRouter.getParam("id")}),
  collection: () => Blogs
});
