(function () {
  const STORAGE_LANG_KEY = 'ead_arch_lang';

  const teamMembers = [
    {
      name: 'Luis Otávio de Deus dos Santos',
      rolePt: 'Integrante da Equipe • Gestão de Projetos',
      roleEn: 'Team Member • Project Management',
      pages: 'https://yasminlobo.github.io/arquitetura-gestao-projetos/'
    },
    {
      name: 'Vyttor Gabriel Ramos Camillo',
      rolePt: 'Integrante da Equipe • Gestão de Projetos',
      roleEn: 'Team Member • Project Management',
      pages: 'https://yasminlobo.github.io/arquitetura-gestao-projetos/'
    },
    {
      name: 'Yasmin Siqueira Lobo',
      rolePt: 'Integrante da Equipe • Gestão de Projetos',
      roleEn: 'Team Member • Project Management',
      github: 'https://github.com/YasminLobo',
      pages: 'https://yasminlobo.github.io/arquitetura-gestao-projetos/'
    }
  ];

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

    renderTeam();
  }

  function getInitials(name) {
    const parts = name.split(' ').filter((p) => p.length > 2);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  }

  function renderTeam() {
    const container = document.getElementById('team-container');
    if (!container) return;
    const lang = getLang();

    container.innerHTML = teamMembers
      .map((member) => {
        const role = lang === 'pt' ? member.rolePt : member.roleEn;
        const ghLink = member.github
          ? `<span style="color:var(--border)">•</span><a href="${member.github}" target="_blank" rel="noopener">GitHub ↗</a>`
          : '';
        return `
        <div class="member-card">
          <div class="avatar">${getInitials(member.name)}</div>
          <div class="member-info" style="flex:1">
            <h4>${member.name}</h4>
            <p>${role}</p>
            <div class="member-links">
              <a href="${member.pages}" target="_blank" rel="noopener">GitHub Pages ↗</a>
              ${ghLink}
            </div>
          </div>
        </div>
      `;
      })
      .join('');
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
