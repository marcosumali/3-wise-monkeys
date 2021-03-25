const {WebhookClient, Card, Suggestion} = require('dialogflow-fulfillment');

const {taleOf3WiseMonkeys} = require('../constant/story');

const dialogflowWebhook = (req, res, next) => {
  const agent = new WebhookClient({request: req, response: res});

  // Uncomment and edit to make your own intent handler
  // uncomment `intentMap.set('your intent name here', yourFunctionHandler);`
  // below to get this function to be run when a Dialogflow intent is matched
  function yourFunctionHandler(agent) {
    agent.add(`This message is from Dialogflow's Cloud Functions for Firebase editor!`);
    agent.add(new Card({
        title: `Title: this is a card title`,
        imageUrl: 'https://developers.google.com/actions/images/badges/XPM_BADGING_GoogleAssistant_VER.png',
        text: `This is the body text of a card.  You can even use line\n  breaks and emoji! 💁`,
        buttonText: 'This is a button',
        buttonUrl: 'https://assistant.google.com/'
      })
    );
    agent.add(new Suggestion(`Quick Reply`));
    agent.add(new Suggestion(`Suggestion`));
    agent.setContext({ name: 'weather', lifespan: 2, parameters: { city: 'Rome' }});
  }

  // Uncomment and edit to make your own Google Assistant intent handler
  // uncomment `intentMap.set('your intent name here', googleAssistantHandler);`
  // below to get this function to be run when a Dialogflow intent is matched
  function googleAssistantHandler(agent) {
    let conv = agent.conv(); // Get Actions on Google library conv instance
    conv.ask('Hello from the Actions on Google client library!') // Use Actions on Google library
    agent.add(conv); // Add Actions on Google library responses to your agent's response
  }
  // See https://github.com/dialogflow/fulfillment-actions-library-nodejs
  // for a complete Dialogflow fulfillment library Actions on Google client library v2 integration sample

  const tellTheTale = (agent) => {
    taleOf3WiseMonkeys.map(story => agent.add(story))
    agent.add(new Suggestion(`Yes`));
    agent.add(new Suggestion(`No`));
  }
  
  const goToShrine = (agent) => {
    agent.add(`[You've arrived at Tosho-gu Shrine and noticed the Three Wise Monkeys carving inside the shrine.]`);
    agent.add(`[Would you like to pray to help the Three Wise Monkeys?]`);
    agent.add(new Suggestion(`Yes`));
    agent.add(new Suggestion(`No`));
  }
  
  const finishedPraying = (agent) => {
    agent.add(`[When you've finished your pray, you noticed there's three monkey sitting in front of you.]`);
    agent.add(`[You notice the first one close his eyes, the second one close his ear and the third one close his mouth. ]`);
    agent.add(`[With doubt, you hear the first monkey say, "Would you mind share your wisdom to answer three of our questions?".]`);
    agent.add(new Suggestion(`Yes`));
    agent.add(new Suggestion(`No`));
  }
  
  const goHelp = (agent) => {
    agent.add(`["Thank you.", said the first monkey.]`);
    agent.add(`["POOF !]`);
    agent.add(`*** OPEN WEBSITE*`);
  }

  let intentMap = new Map();
  intentMap.set('S1-2 Tell the tale', tellTheTale);
  intentMap.set('S1-3A Ask To Go - Yes', goToShrine);
  intentMap.set('S1-4A Ask To Pray - Yes', finishedPraying);
  intentMap.set('S1-5A Ask To Help - Yes', goHelp);
  intentMap.set('test1', yourFunctionHandler);
  intentMap.set('test2', googleAssistantHandler);
  agent.handleRequest(intentMap);
}


module.exports = {
  dialogflowWebhook,
}

