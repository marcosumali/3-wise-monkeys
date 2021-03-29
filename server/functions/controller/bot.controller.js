const {WebhookClient, Card, Suggestion } = require('dialogflow-fulfillment');
const {HtmlResponse} = require('actions-on-google');
const fetch = require('node-fetch');

const {
  taleOf3WiseMonkeys,
  students,
  disabilities,
  QUIZ,
  END,
} = require('../constant/story');


const dialogflowWebhook = (req, res, next) => {
  const agent = new WebhookClient({request: req, response: res});
  
  // Get actions on google library conv instance
  const agentConversation = (agent) => agent.conv();

  // Defining conversation
  const conv = agentConversation(agent)

  // To check whether actions has interactive canvas capabilities
  const hasInteractiveCanvas = (conv) =>  conv.surface.capabilities.has('actions.capability.INTERACTIVE_CANVAS');

  // To divide conversation between dialogflow bot and google assistant
  const divideTasks = (agent, botMessages, assistantMessages) => {
    // Google assistant conversation
    if (conv) {
      const hasIC = hasInteractiveCanvas(conv)
      if (hasIC) assistantMessages.map(message => conv.ask(message));
      if (!hasIC) conv.ask(`I'm sorry but your devices doesn't have interactive canvas capability.`);
      return agent.add(conv)
    }
    // Bot conversation
    if (!conv) return botMessages.map(message => agent.add(message));
  }

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

  function googleAssistantHandler(agent) {
    const botTasks = ['hello from my store. 123', 'test not 123'];
    const assistantTasks = ['hai, how are you? 123', 'I am good. 123', new HtmlResponse({url: 'https://3-wise-monkeys.vercel.app/'})];
      divideTasks(agent, botTasks, assistantTasks);
  }

  const defaultWelcome = (agent) => {
    const botMessages = [
      `Greetings, young traveler! Welcome to our Ryokan. My name is Benkei and I'll be your host for your stay. Please stay as long you pay hehe 😉 💴 💴`,
      `You can ask me anything including the secret of this Ryokan.`,
    ];
    const assistantMessages = [
      `Greetings, young traveler! Welcome to our Ryokan. My name is Benkei and I'll be your host for your stay. Please stay as long you pay hehehe.`,
      `You can ask me anything including the secret of this Ryokan.`,
    ];
    divideTasks(agent, botMessages, assistantMessages);
  }

  const tellSecret = () => {
    const botMessages = [
      `HAHAHA I'm just kidding because we don't have any secrets, young traveler.`,
      `But, I can tell you about a famous tale around here if you like hear them over a cup of warm tea 🍵`,
    ];
    const assistantMessages = [
      `HAHAHA I'm just kidding because we don't have any secrets, young traveler.`,
      `But, I can tell you about a famous tale around here if you like hear them over a cup of warm tea.`,
    ];
    divideTasks(agent, botMessages, assistantMessages);
  }

  const tellTheTale = (agent) => {
    const multiMessages = taleOf3WiseMonkeys.concat([new Suggestion(`No`), new Suggestion(`Yes`)]);
    divideTasks(agent, multiMessages, multiMessages);
  }
  
  const goToShrine = (agent) => {
    const botMessages = [
      `[You've arrived at Tosho-gu Shrine and noticed the Three Wise Monkeys carving inside the shrine.]`,
      `[Would you like to pray to help the Three Wise Monkeys?]`,
    ];
    const assistantMessages = [
      `You've arrived at Tosho-gu Shrine and noticed the Three Wise Monkeys carving inside the shrine.`,
      `Would you like to pray to help the Three Wise Monkeys?`,
    ];
    const suggestions = [new Suggestion(`No`), new Suggestion(`Yes`)]
    divideTasks(agent, botMessages.concat(suggestions), assistantMessages.concat(suggestions));
  }
  
  const finishedPraying = (agent) => {
    const botMessages = [
      `[When you've finished your pray, you noticed there's three monkey sitting in front of you.]`,
      `[You notice the first one close his eyes, the second one close his ear and the third one close his mouth.]`,
      `[With doubt, you hear the first monkey say, "Would you mind share your wisdom to answer three of our questions?".]`,
    ];
    const assistantMessages = [
      `When you've finished your pray, you noticed there's three monkey sitting in front of you.`,
      `You notice the first one close his eyes, the second one close his ear and the third one close his mouth.`,
      `With doubt, you hear the first monkey say, "Would you mind share your wisdom to answer three of our questions?".`,
    ];
    const suggestions = [new Suggestion(`No`), new Suggestion(`Yes`)]
    divideTasks(agent, botMessages.concat(suggestions), assistantMessages.concat(suggestions));
  }
  
  const goHelp = (agent) => {
    const botMessages = [
      `["Thank you.", said the first monkey.]`,
      `[POOF !]`,
    ];
    const assistantMessages = [
      `"Thank you.", said the first monkey.`,
      `POOF !`,
      new HtmlResponse({url: 'https://3-wise-monkeys-canvas.vercel.app'}),
    ];
    divideTasks(agent, botMessages, assistantMessages);
  }

  // After this section, conversation only happens with google assistant  
  const sendQuest = async (agent, index) => {
    let greetings = `I'm ${students[index]} and I ${disabilities[index]} no evil. Please help me with the question.`;
    console.log('quest:', index, greetings)
    const hasIC = hasInteractiveCanvas(conv)
    conv.ask(greetings);
    if (hasIC) {
      const quizURL = `https://opentdb.com/api.php?amount=1&category=27&difficulty=easy&type=boolean`;
      const res = await fetch(quizURL).then(res => res.json())
      const quiz = res.results[0]
      console.log('quiz:', JSON.stringify(quiz))
      conv.ask(new HtmlResponse({data: {stages: QUIZ, index, quiz}}))
    }
    agent.add(conv);
  }

  const firstQuest = (agent) => sendQuest(agent, 0);

  const secondQuest = (agent) => sendQuest(agent, 1);
  
  const thirdQuest = (agent) => sendQuest(agent, 2);

  const finishQuest = (agent) => {
    const hasIC = hasInteractiveCanvas(conv)
    conv.ask('Thank you for helping us.')
    if (hasIC) {
      conv.ask(new HtmlResponse({data: {stages: END}}))
    }
    agent.add(conv);
  }

  let intentMap = new Map();
  intentMap.set('Default Welcome Intent', defaultWelcome);
  intentMap.set('S1-1 Tell a secret', tellSecret);
  intentMap.set('S1-2 Tell the tale', tellTheTale);
  intentMap.set('S1-3A Ask To Go - Yes', goToShrine);
  intentMap.set('S1-4A Ask To Pray - Yes', finishedPraying);
  intentMap.set('S1-5A Ask To Help - Yes', goHelp);
  intentMap.set('S1-6 First Quest', firstQuest);
  intentMap.set('S1-7 Second Quest', secondQuest);
  intentMap.set('S1-8 Third Quest', thirdQuest);
  intentMap.set('S1-9 Finish Quest', finishQuest);
  intentMap.set('test1', yourFunctionHandler);
  intentMap.set('test2', googleAssistantHandler);
  agent.handleRequest(intentMap);
}


module.exports = {
  dialogflowWebhook,
}

