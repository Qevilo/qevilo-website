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
  document.querySelectorAll('.slot[data-en-slot]').forEach(function(el){
    var full = el.getAttribute('data-' + lang + '-slot');
    if(full){
      var parts = full.split(' · ');
      var day = parts[0].split(' ')[0];
      var time = parts[1];
      el.textContent = day + ' ' + time;
    }
  });
  document.querySelectorAll('.lang-btn').forEach(function(b){
    b.classList.toggle('active', b.dataset.lang === lang);
  });
}

document.addEventListener('DOMContentLoaded', function(){
  document.querySelectorAll('.lang-btn').forEach(function(b){
    b.addEventListener('click', function(){ applyLang(b.dataset.lang); });
  });

  document.querySelectorAll('.slot').forEach(function(s){
    s.addEventListener('click', function(){
      document.querySelectorAll('.slot').forEach(function(x){x.classList.remove('active');});
      s.classList.add('active');
    });
  });

  var auditForm = document.getElementById('auditForm');
  if(auditForm){
    auditForm.addEventListener('submit', function(e){
      e.preventDefault();
      var active = document.querySelector('.slot.active');
      var nameField = document.getElementById('fname');
      var name = (nameField && nameField.value) || (currentLang === 'de' ? 'dort' : 'there');
      var firstName = name.split(' ')[0];
      var confirmText = document.getElementById('confirmText');
      var slotLabel = active ? active.getAttribute('data-' + currentLang + '-slot') : null;
      if(currentLang === 'de'){
        confirmText.textContent = slotLabel
          ? 'Wir bestätigen Ihr Audit am ' + slotLabel + ' per E-Mail innerhalb von 24 Stunden, ' + firstName + '.'
          : 'Wir melden uns innerhalb von 24 Stunden, um einen passenden Termin zu finden, ' + firstName + '.';
      } else {
        confirmText.textContent = slotLabel
          ? 'We\'ll confirm your audit for ' + slotLabel + ' by email within 24 hours, ' + firstName + '.'
          : 'We\'ll reach out within 24 hours to find a time that works, ' + firstName + '.';
      }
      this.style.display = 'none';
      document.getElementById('confirmBox').classList.add('show');
    });
  }

  var notifyForm = document.getElementById('notifyForm');
  if(notifyForm){
    notifyForm.addEventListener('submit', function(e){
      e.preventDefault();
      var btn = this.querySelector('button');
      btn.textContent = currentLang === 'de' ? 'Angemeldet ✓' : 'Subscribed ✓';
    });
  }
});
