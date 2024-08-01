// إضافة حدث الضغط على كلمة "بدء"
document.getElementById('start-button').addEventListener('click', function() {
  // استخدم History API لتنفيذ التوجيه إلى الصفحة التالية
  window.history.pushState({}, 'صفحة جديدة', '/new-page');
  
  // تحميل محتوى الصفحة التالية
  fetch('/new-page-content')
    .then(response => response.text())
    .then(content => {
      document.getElementById('content-container').innerHTML = content;
    });
});