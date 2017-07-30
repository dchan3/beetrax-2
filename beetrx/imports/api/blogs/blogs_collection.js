import { scorpius } from 'meteor/scorpiusjs:core';
import { BlogsSchema } from './blogs_schema.js';

export const Blogs = new scorpius.collection('blogs', {
  singularName: 'blog',
  pluralName: 'blogs',
  link: {
    title: 'Blogs'
  },
  tabular: {
    columns: [
      {
        data: 'userId',
        title: 'User ID'
      },
      {
        data: 'createdAt',
        title: 'Created At'
      }
    ]
  }
});

Blogs.attachSchema(BlogsSchema);
