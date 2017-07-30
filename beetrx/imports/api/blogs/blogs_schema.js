import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const BlogsSchema = new SimpleSchema({
  userId: {
    type: String,
    autoform: {
      type: 'hidden',
      label: false
    },
    optional: true,
    autoValue: () => Meteor.users.findOne({})._id
  },
  createdAt: {
    type: Date,
    autoform: {
      type: 'hidden',
      label: false
    },
    autoValue: function() {
      if (this.isSet || this.isUpdate) return this.value;
      else return new Date();
    }
  },
  body: {
    type: String,
    label: "Text",
    optional: true,
    autoform: {
      afFieldInput: {
        type: 'summernote'
      }
    }
  },
  medication: {
    type: String,
    label: "Medication Name",
    optional: true
  },
  painLevel: {
    type: Number,
    label: "Pain Level",
    optional: true
  },
  honeyAmount: {
    type: Number,
    label: "Amount of Honey (oz)",
    optional: true
  },
  emoji: {
    type: String,
    label: "Emoji",
    allowedValues: ['💩', '😭', '🌊', '😃', '🦄'],
    autoform: {
      afQuickField: {
        noselect: true,
        options: "allowed"
      }
    },
    optional: true
  },
  sessionId: {
    type: String,
    optional: true
  }
});
