import './home.html';
import { Template } from 'meteor/templating';

Template.home.helpers({
  isPatient: () => Roles.userHasRole(Meteor.userId(), 'patient')
});
