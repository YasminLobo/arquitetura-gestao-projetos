// script.js — Bilingual (PT-BR / EN-US), Theme Switcher, Team Manager & Interactive Controls

(function () {
  const STORAGE_LANG_KEY = 'ead_arch_lang';
  const STORAGE_THEME_KEY = 'ead_arch_theme';
  const STORAGE_TEAM_KEY = 'ead_arch_team_v1';

  const defaultTeam = [
    {
      name: 'Yasmin Lobo',
      rolePt: 'Arquitetura de Software & Gestão de Projetos',
      roleEn: 'Software Architecture & Project Management',
      github: 'https://github.com/YasminSLobo',
      pages: 'https://yasminslobo.github.io/arquitetura-gestao-projetos/'
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

  function getTheme() {
    return localStorage.getItem(STORAGE_THEME_KEY) || 'dark';
  }

  function setTheme(theme) {
    localStorage.setItem(STORAGE_THEME_KEY, theme);
    document.documentElement.setAttribute('data-theme', theme);
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
      themeBtn.textContent = theme === 'dark' ? '☀️' : '🌙';
      themeBtn.title = theme === 'dark' ? 'Modo Claro / Light Mode' : 'Modo Escuro / Dark Mode';
    }
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
            ? `<button onclick="window.removeTeamMember(${idx})" style="margin-left:auto;background:transparent;border:none;color:var(--text-muted);cursor:pointer;font-size:0.8rem;" title="Remover">✕</button>`
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
              <span style="color:var(--border-color)">|</span>
              <a href="${member.github}" target="_blank" rel="noopener">GitHub Profile ↗</a>
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
        rolePt: 'Integrante da Equipe — Gestão de Projetos',
        roleEn: 'Team Member — Project Management',
        github: `https://github.com/${username}`,
        pages: `https://${username.toLowerCase()}.github.io/arquitetura-gestao-projetos/`
      });
      saveTeam(team);
      nameInput.value = '';
      userInput.value = '';
    });
  }

  function setupCopyLinkedIn() {
    const copyBtn = document.getElementById('copy-linkedin-btn');
    const textEl = document.getElementById('linkedin-post-content');
    if (!copyBtn || !textEl) return;

    copyBtn.addEventListener('click', () => {
      const lang = getLang();
      navigator.clipboard.writeText(textEl.innerText.trim()).then(() => {
        const original = copyBtn.innerHTML;
        copyBtn.innerHTML = lang === 'pt' ? 'Copiado para a área de transferência!' : 'Copied to clipboard!';
        setTimeout(() => {
          copyBtn.innerHTML = original;
        }, 2200);
      });
    });
  }

  function setupSimulator() {
    const slider = document.getElementById('complexity-slider');
    const output = document.getElementById('simulator-verdict');
    if (!slider || !output) return;

    function updateSim() {
      const val = parseInt(slider.value, 10);
      const lang = getLang();
      if (val < 40) {
        output.innerHTML =
          lang === 'pt'
            ? '<strong>Baixa Complexidade Inicial:</strong> O modelo <em>Monolith First</em> entrega até <strong>3x mais rápido</strong> com menor custo operacional. Microsserviços aqui gerariam sobrecarga desnecessária (Microservice Premium).'
            : '<strong>Low Initial Complexity:</strong> The <em>Monolith First</em> approach delivers up to <strong>3x faster</strong> with lower operational cost. Microservices here would cause unnecessary overhead (Microservice Premium).';
      } else if (val < 75) {
        output.innerHTML =
          lang === 'pt'
            ? '<strong>Média Complexidade (Fronteiras se consolidando):</strong> Momento ideal para modularizar o monólito em camadas claras (<em>Presentation-Domain-Data</em>) e preparar a extração gradual das partes mais críticas.'
            : '<strong>Medium Complexity (Boundaries stabilizing):</strong> Ideal stage to modularize the monolith with clear layers (<em>Presentation-Domain-Data</em>) and prepare gradual extraction of critical modules.';
      } else {
        output.innerHTML =
          lang === 'pt'
            ? '<strong>Alta Escala e Múltiplas Equipes:</strong> Aqui o <em>Microservice Premium</em> se paga: decompor em serviços e <em>Micro Frontends</em> por capacidade de negócio evita bloqueios entre dezenas de desenvolvedores.'
            : '<strong>High Scale & Multiple Teams:</strong> Here the <em>Microservice Premium</em> pays off: decomposing into services and <em>Micro Frontends</em> by business capability prevents bottlenecks across large teams.';
      }
    }

    slider.addEventListener('input', updateSim);
    document.querySelectorAll('.lang-btn').forEach((b) => b.addEventListener('click', () => setTimeout(updateSim, 20)));
    updateSim();
  }

  document.addEventListener('DOMContentLoaded', () => {
    // Theme init
    setTheme(getTheme());
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        setTheme(getTheme() === 'dark' ? 'light' : 'dark');
      });
    }

    // Language init
    document.querySelectorAll('.lang-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        setLang(btn.getAttribute('data-lang'));
      });
    });
    setLang(getLang());

    setupTeamForm();
    setupCopyLinkedIn();
    setupSimulator();
  });
})();
