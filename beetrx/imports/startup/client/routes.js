import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

import '../../ui/components/application/layout.js';
import '../../ui/components/includes/header.js';
import '../../ui/components/home/home.js';
import '../../ui/components/blogs/blog_new.js';
import '../../ui/components/blogs/blog_list.js';
import '../../ui/components/blogs/blog_edit.js';
import '../../ui/components/blogs/blog_view.js';

FlowRouter.route('/', {
  name: 'home',
  action: function() {
    this.render('layout', 'home');
  }
});

FlowRouter.route('/new', {
  name: 'new',
  action: function() {
    this.render('layout', 'blogNew');
  }
});

FlowRouter.route('/list', {
  name: 'list',
  action: function() {
    this.render('layout', 'blogList');
  }
});

FlowRouter.route('/edit/:id', {
  name: 'edit',
  action: function() {
    this.render('layout', 'blogEdit');
  }
});

FlowRouter.route('/view/:id', {
  name: 'edit',
  action: function() {
    this.render('layout', 'blogView');
  }
});
