(function () {
  const STORAGE_LANG_KEY = 'ead_arch_lang';
  const STORAGE_TEAM_KEY = 'ead_arch_team_v1';

  const defaultTeam = [
    {
      name: 'Yasmin Lobo',
      rolePt: 'Gestão de Projetos & Arquitetura de Software',
      roleEn: 'Project Management & Software Architecture',
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

  function getTeam() {
    try {
      const saved = localStorage.getItem(STORAGE_TEAM_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error(e);
    }
    return defaultTeam;
  }

  function saveTeam(team) {
    localStorage.setItem(STORAGE_TEAM_KEY, JSON.stringify(team));
    renderTeam();
  }

  function getInitials(name) {
    return name
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0].toUpperCase())
      .join('');
  }

  function renderTeam() {
    const container = document.getElementById('team-container');
    if (!container) return;
    const lang = getLang();
    const team = getTeam();

    container.innerHTML = team
      .map((member, idx) => {
        const role = lang === 'pt' ? member.rolePt : member.roleEn;
        const removeBtn =
          idx > 0
            ? `<button onclick="window.removeTeamMember(${idx})" style="margin-left:auto;background:transparent;border:none;color:var(--text-muted);cursor:pointer;font-size:0.78rem;" title="Remover">✕</button>`
            : '';
        return `
        <div class="member-card">
          <div class="avatar">${getInitials(member.name)}</div>
          <div class="member-info" style="flex:1">
            <div style="display:flex;align-items:center;gap:0.5rem;">
              <h4>${member.name}</h4>
              ${removeBtn}
            </div>
            <p>${role}</p>
            <div class="member-links">
              <a href="${member.pages}" target="_blank" rel="noopener">GitHub Pages ↗</a>
              <span style="color:var(--border)">•</span>
              <a href="${member.github}" target="_blank" rel="noopener">GitHub ↗</a>
            </div>
          </div>
        </div>
      `;
      })
      .join('');
  }

  window.removeTeamMember = function (idx) {
    const team = getTeam();
    team.splice(idx, 1);
    saveTeam(team);
  };

  function setupTeamForm() {
    const form = document.getElementById('add-member-form');
    if (!form) return;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('member-name');
      const userInput = document.getElementById('member-github-user');
      const name = nameInput.value.trim();
      const username = userInput.value.trim().replace(/^@/, '');
      if (!name || !username) return;

      const team = getTeam();
      team.push({
        name,
        rolePt: 'Integrante da Equipe',
        roleEn: 'Team Member',
        github: `https://github.com/${username}`,
        pages: `https://${username.toLowerCase()}.github.io/arquitetura-gestao-projetos/`
      });
      saveTeam(team);
      nameInput.value = '';
      userInput.value = '';
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.lang-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        setLang(btn.getAttribute('data-lang'));
      });
    });
    setLang(getLang());
    setupTeamForm();
  });
})();
