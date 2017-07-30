import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/nicolaslopezj:roles';

Meteor.startup(function() {
  Accounts._options.forbidClientAccountCreation = false;

  Accounts.onCreateUser(function(options, user) {
    user.roles = Meteor.users.find().fetch().length === 0 ? ['admin', 'researcher'] : ['patient'];
    return user;
  });

  Accounts.validateNewUser((user) => true);
});
