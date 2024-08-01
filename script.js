
const express = require('express');
const axios = require('axios');
const GitHub = require('github-api');

// تعريف المتغيرات
const app = express();
const port = 3000;
const github = new GitHub({
  token: 'https://github.com/dashboard' // استبدل هذا بالتوكن الخاص بك على GitHub
});

// تعريف الوظائف
async function getBot(repoUrl) {
  try {
    const repo = await github.getRepo(repoUrl);
    const bot = await repo.getContents('bot.js');
    return bot.data.content;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function runBot(botCode) {
  try {
    const bot = new Function(botCode);
    bot();
  } catch (error) {
    console.error(error);
  }
}

// تعريف المسارات
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/bot', async (req, res) => {
  const repoUrl = req.body.repoUrl;
  const botCode = await getBot(repoUrl);
  if (botCode) {
    runBot(botCode);
    res.send('Bot started successfully!');
  } else {
    res.send('Error starting bot!');
  }
});

// تشغيل الخادم
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});