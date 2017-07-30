import { Roles } from 'meteor/nicolaslopezj:roles';

const Researcher = new Roles.Role('researcher');
Researcher.allow('collections.blogs.update', true);
Researcher.allow('collections.users.index', true);

const Patient = new Roles.Role('patient');
Patient.allow('collections.blogs.insert', true);
