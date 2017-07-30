import './blog_new.html';
import { BlogsSchema } from '../../../api/blogs/blogs_schema.js';
import { Blogs } from '../../../api/blogs/blogs_collection.js';
import { Roles } from 'meteor/nicolaslopezj:roles';
import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';

Template.blogNew.helpers({
  isPatient: () => Roles.userHasRole(Meteor.userId(), 'patient'),
  schema: () => BlogsSchema,
  collection: () => Blogs,
  loggedIn: () => Meteor.userId() !== null
});
