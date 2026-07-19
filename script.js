var currentLang = 'en';

function applyLang(lang){
  currentLang = lang;
  var root = document.getElementById('htmlRoot');
  if(root) root.lang = lang;

  document.querySelectorAll('[data-en]:not([data-en-html]):not([data-en-ph]):not([data-en-slot])').forEach(function(el){
    var val = el.getAttribute('data-' + lang);
    if(val !== null) el.textContent = val;
  });

  document.querySelectorAll('[data-en-html]').forEach(function(el){
    var val = el.getAttribute('data-' + lang + '-html');
    if(val !== null) el.innerHTML = val;
  });

  document.querySelectorAll('[data-en-ph]').forEach(function(el){
    var val = el.getAttribute('data-' + lang + '-ph');
    if(val !== null) el.placeholder = val;
  });

  document.querySelectorAll('.lang-btn').forEach(function(b){
    b.classList.toggle('active', b.dataset.lang === lang);
  });
}

document.addEventListener('DOMContentLoaded', function(){

  document.querySelectorAll('.lang-btn').forEach(function(b){
    b.addEventListener('click', function(){
      applyLang(b.dataset.lang);
    });
  });

  var notifyForm = document.getElementById('notifyForm');
  if(notifyForm){
    notifyForm.addEventListener('submit', function(e){
      e.preventDefault();
      var btn = this.querySelector('button');
      btn.textContent = currentLang === 'de'
        ? 'Angemeldet ✓'
        : 'Subscribed ✓';
    });
  }

});
