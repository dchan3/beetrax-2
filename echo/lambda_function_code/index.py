"""
BeeTRx
"""

import requests

url = "https://6737f637.ngrok.io/aws-test"


def parse_response(intent_request, session):
    """
    Extracts relevant data from parsed response
    {userId, sessionId, timestamp, type, value}

    """
    result = {}
    result["userId"] = session["user"]["userId"]
    result["sessionId"] = session["sessionId"]
    result["timestamp"] = intent_request["timestamp"]
    slots = intent_request["intent"]["slots"]
    for key in slots:  # Expecting exactly one
        result["type"] = slots[key]["name"]
        result["value"] = slots[key]["value"]

    return result


def lambda_handler(event, context):
    """ Route the incoming request based on type (LaunchRequest, IntentRequest,
    etc.) The JSON body of the request is provided in the event parameter.
    """
    print("event.session.application.applicationId=" +
          event['session']['application']['applicationId'])

    """
    Uncomment this if statement and populate with your skill's application ID to
    prevent someone else from configuring a skill that sends requests to this
    function.
    """
    # if (event['session']['application']['applicationId'] !=
    #         "amzn1.echo-sdk-ams.app.[unique-value-here]"):
    #     raise ValueError("Invalid Application ID")

    if event['session']['new']:
        on_session_started({'requestId': event['request']['requestId']},
                           event['session'])

    if event['request']['type'] == "LaunchRequest":
        return on_launch(event['request'], event['session'])
    elif event['request']['type'] == "IntentRequest":
        return on_intent(event['request'], event['session'])
    elif event['request']['type'] == "SessionEndedRequest":
        return on_session_ended(event['request'], event['session'])


def on_session_started(session_started_request, session):
    """ Called when the session starts """

    print("on_session_started requestId=" + session_started_request['requestId']
          + ", sessionId=" + session['sessionId'])


def on_launch(launch_request, session):
    """ Called when the user launches the skill without specifying what they
    want
    """

    # Dispatch to your skill's launch
    return get_welcome_response()


def on_intent(intent_request, session):
    """ Called when the user specifies an intent for this skill """

    print("on_intent requestId=" + intent_request['requestId'] +
          ", sessionId=" + session['sessionId'])

    intent = intent_request['intent']
    intent_name = intent_request['intent']['name']
    data = parse_response(intent_request, session)
    # Dispatch to your skill's intent handlers
    if intent_name == "MedicineIntent":
        response = get_medicine_response(intent_request)
        requests.get(url, data=data)
        return response
    elif intent_name == "HoneyIntent":
        response = get_honey_response(intent_request)
        requests.get(url, data=data)
        return response
    elif intent_name == "FeelingIntent":
        response = get_feeling_response(intent_request)
        requests.get(url, data=data)
        return response
    elif intent_name == "AMAZON.HelpIntent":
        return get_help_response()
    elif intent_name == "AMAZON.CancelIntent" or intent_name == "AMAZON.StopIntent":
        return handle_session_end_request()
    else:
        raise ValueError("Invalid intent")


def on_session_ended(session_ended_request, session):
    """ Called when the user ends the session.

    Is not called when the skill returns should_end_session=true
    """
    print("on_session_ended requestId=" + session_ended_request['requestId'] +
          ", sessionId=" + session['sessionId'])
    # add cleanup logic here

# --------------- Functions that control the skill's behavior ------------------


def get_welcome_response():

    session_attributes = {}
    card_title = "Welcome"
    speech_output = "Welcome to Beetrax. We will want to know what you've been taking and how you are feeling."
    # If the user either does not reply to the welcome message or says something
    # that is not understood, they will be prompted again with the same text.
    reprompt_text = speech_output
    should_end_session = False
    return build_response(session_attributes, build_speechlet_response(
        card_title, speech_output, reprompt_text, should_end_session))


def get_help_response():
    session_attributes = {}
    card_title = "Help"
    speech_output = "Welcome to the help section for the beetrax Skill. A couple of examples of phrases that I can except are... I took alcohol... or... I took two ounces of honey"

    reprompt_text = speech_output
    should_end_session = False
    return build_response(session_attributes, build_speechlet_response(card_title, speech_output, reprompt_text, should_end_session))


def get_medicine_response(intent_request):
    session_attributes = {}
    card_title = "Medicine"
    speech_template = "I understand you took {}. How many ounces of honey did you take?"

    medicine = intent_request["intent"]["slots"]["medicine"]["value"]

    speech_output = speech_template.format(medicine)

    reprompt_text = speech_output
    should_end_session = False
    return build_response(session_attributes, build_speechlet_response(card_title, speech_output, reprompt_text, should_end_session))
# Maybe not "should_end_session"


def get_honey_response(intent_request):
    session_attributes = {}
    card_title = "Honey"
    speech_template = "I understand you took {} ounces of honey. How are you feeling?"
    ounces = intent_request["intent"]["slots"]["number"]["value"]
    speech_output = speech_template.format(ounces)
    reprompt_text = speech_output
    should_end_session = False
    return build_response(session_attributes, build_speechlet_response(card_title, speech_output, reprompt_text, should_end_session))


def get_feeling_response(intent_request):
    session_attributes = {}
    card_title = "Feelings"
    speech_template = "I understand you feel {}."
    feeling = intent_request["intent"]["slots"]["feeling"]["value"]
    speech_output = speech_template.format(feeling)
    reprompt_text = speech_output
    should_end_session = True
    return build_response(session_attributes, build_speechlet_response(card_title, speech_output, reprompt_text, should_end_session))


def handle_session_end_request():
    card_title = "Session Ended"
    speech_output = "Thank you for telling us about your experience."
    # Setting this to true ends the session and exits the skill.
    should_end_session = True
    return build_response({}, build_speechlet_response(
        card_title, speech_output, None, should_end_session))


# --------------- Helpers that build all of the responses ----------------------


def build_speechlet_response(title, output, reprompt_text, should_end_session):
    return {
        'outputSpeech': {
            'type': 'PlainText',
            'text': output
        },
        'card': {
            'type': 'Simple',
            'title': 'SessionSpeechlet - ' + title,
            'content': 'SessionSpeechlet - ' + output
        },
        'reprompt': {
            'outputSpeech': {
                'type': 'PlainText',
                'text': reprompt_text
            }
        },
        'shouldEndSession': should_end_session
    }


def build_response(session_attributes, speechlet_response):
    return {
        'version': '1.0',
        'sessionAttributes': session_attributes,
        'response': speechlet_response
    }
