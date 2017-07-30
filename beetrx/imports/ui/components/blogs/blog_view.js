import './blog_view.html';
import { Blogs } from '../../../api/blogs/blogs_collection.js';
import { Roles } from 'meteor/nicolaslopezj:roles';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { Meteor } from 'meteor/meteor';

Template.blogView.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe("users");
    self.subscribe("blogById", FlowRouter.getParam("id"));
  });
});

Template.blogView.helpers({
  isPatientsOwn: () => Blogs.findOne({_id: FlowRouter.getParam("id")}).userId === Meteor.userId(),
  isPatient: () => Roles.userHasRole(Meteor.userId(), 'patient'),
  loggedIn: () => Meteor.userId() !== null,
  doc: () => Blogs.findOne({_id: FlowRouter.getParam("id")}),
  email: (id) => Meteor.users.findOne({_id: id}).emails[0].address
});
