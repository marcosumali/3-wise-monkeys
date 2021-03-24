const express = require('express');

const {
  dialogflowWebhook,
} = require('../controller/bot.controller')

const bot = express.Router();

bot
  .post('/webhook', dialogflowWebhook)


module.exports = bot;