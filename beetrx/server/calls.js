import { Meteor } from 'meteor/meteor';

Meteor.methods({
  invokeLambda: function(blogObj) {
    /*{"session": {
    "new": true,
    "sessionId": "amzn1.echo-api.session.[unique-value-here]",
    "attributes": {},
    "user": {
      "userId": "amzn1.ask.account.[unique-value-here]"
    },
    "application": {
      "applicationId": "amzn1.ask.skill.[unique-value-here]"
    }
  },
  "version": "1.0",
  "request": {
    "locale": "en-US",
    "timestamp": "2016-10-27T18:21:44Z",
    "type": "LaunchRequest",
    "requestId": "amzn1.echo-api.request.[unique-value-here]"
  },
  "context": {
    "AudioPlayer": {
      "playerActivity": "IDLE"
    },
    "System": {
      "device": {
        "supportedInterfaces": {
          "AudioPlayer": {}
        }
      },
      "application": {
        "applicationId": "amzn1.ask.skill.[unique-value-here]"
      },
      "user": {
        "userId": "amzn1.ask.account.[unique-value-here]"
      }
    }
  }
};*/
    const params = {
      FunctionName: "beetrx",
      InvocationType: 'RequestResponse',
      Payload: JSON.stringify(obj)
    };

     AWSLambda.invoke(params, function (err, data) {
      console.log(err, data);
    });
  }
});
