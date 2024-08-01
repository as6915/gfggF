// github-api.js
// كود JavaScript الخاص بالتفاعل مع منصة GitHub

// استيراد المكتبات المطلوبة
const axios = require('axios');

// تعريف المتغيرات
const githubApiUrl = 'https://api.github.com';

// تعريف الوظائف
async function getRepo(repoUrl) {
  try {
    const response = await axios.get(`${githubApiUrl}/repos/${repoUrl}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function getContents(repoUrl, filePath) {
  try {
    const response = await axios.get(`${githubApiUrl}/repos/${repoUrl}/contents/${filePath}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// تصدير الوظائف
module.exports = {
  getRepo,
  getContents
};