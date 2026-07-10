(function () {
  'use strict';
  var CHECK = '<path d="M5 13l4 4L19 7"/>';

  function feedback(el) {
    var ico = el.querySelector('.cico');
    var oldIco = ico ? ico.innerHTML : null;
    if (ico) ico.innerHTML = CHECK;
    var label = el.querySelector('small, .chint');
    var oldText = label ? label.textContent : null;
    if (label) label.textContent = '已复制 ✓';
    el.classList.add('copied');
    setTimeout(function () {
      if (ico && oldIco !== null) ico.innerHTML = oldIco;
      if (label && oldText !== null) label.textContent = oldText;
      el.classList.remove('copied');
    }, 1400);
  }

  function copyText(txt, el) {
    function fallback() {
      var t = document.createElement('textarea');
      t.value = txt;
      t.style.position = 'fixed';
      t.style.opacity = '0';
      document.body.appendChild(t);
      t.select();
      try { document.execCommand('copy'); feedback(el); } catch (e) {}
      document.body.removeChild(t);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(txt).then(function () { feedback(el); }, fallback);
    } else {
      fallback();
    }
  }

  function trigger(e) {
    var el = e.target.closest ? e.target.closest('[data-copy]') : null;
    if (!el) return;
    if (e.target.closest('a')) return;
    e.preventDefault();
    copyText(el.getAttribute('data-copy'), el);
  }

  document.addEventListener('click', trigger);
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    var el = e.target.closest ? e.target.closest('[data-copy]') : null;
    if (!el) return;
    e.preventDefault();
    copyText(el.getAttribute('data-copy'), el);
  });
})();
