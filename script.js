(function () {
  const STORAGE_LANG_KEY = 'ead_arch_lang';

  // Clear any old cached single-member list
  try {
    localStorage.removeItem('ead_arch_team_v1');
  } catch (e) {}

  function getLang() {
    return localStorage.getItem(STORAGE_LANG_KEY) || 'pt';
  }

  function setLang(lang) {
    localStorage.setItem(STORAGE_LANG_KEY, lang);
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';

    document.querySelectorAll('[data-pt][data-en]').forEach((el) => {
      const text = lang === 'pt' ? el.getAttribute('data-pt') : el.getAttribute('data-en');
      if (text !== null) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.placeholder = text;
        } else {
          el.innerHTML = text;
        }
      }
    });

    document.querySelectorAll('.lang-btn').forEach((btn) => {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.lang-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        setLang(btn.getAttribute('data-lang'));
      });
    });
    setLang(getLang());
  });
})();
