// Guesbay Legal Center - Client Logic
(function() {
  'use strict';

  // State
  let currentLang = 'pt';
  let currentTab = 'privacy'; // 'privacy' | 'terms'

  // DOM Elements
  const docTitle = document.getElementById('doc-title');
  const docSubtitle = document.getElementById('doc-subtitle');
  const leadBox = document.getElementById('lead-box');
  const sectionsStream = document.getElementById('sections-stream');
  const tocNav = document.getElementById('toc-nav');
  const tocHeadingLabel = document.getElementById('toc-heading-label');
  const tocCountBadge = document.getElementById('toc-count-badge');
  const clauseSearch = document.getElementById('clause-search');
  const clearSearchBtn = document.getElementById('clear-search-btn');
  const tabPrivacyBtn = document.getElementById('tab-privacy-btn');
  const tabTermsBtn = document.getElementById('tab-terms-btn');
  const tabPrivacyLabel = document.getElementById('tab-privacy-label');
  const tabTermsLabel = document.getElementById('tab-terms-label');
  const langBtns = document.querySelectorAll('.lang-btn');
  const printBtn = document.getElementById('print-btn');
  const backToTopBtn = document.getElementById('back-to-top-btn');
  const shareDocBtn = document.getElementById('share-doc-btn');
  const toast = document.getElementById('toast');
  const footerTabLinks = document.querySelectorAll('.footer-link-tab');

  // Multi-language UI String Dictionary
  const UI_STRINGS = {
    pt: {
      privacyTab: "Política de Privacidade",
      termsTab: "Termos de Uso",
      searchPlaceholder: "Filtrar cláusula ou palavra-chave...",
      tocTitle: "Índice de Cláusulas",
      sectionsCount: "seções",
      backToTop: "Voltar ao Topo",
      copyLink: "Copiar Link do Documento",
      linkCopied: "Link copiado para a área de transferência!",
      clausePrefix: "Cláusula",
      noResults: "Nenhuma cláusula encontrada para o termo pesquisado."
    },
    en: {
      privacyTab: "Privacy Policy",
      termsTab: "Terms of Use",
      searchPlaceholder: "Filter clause or keyword...",
      tocTitle: "Table of Contents",
      sectionsCount: "sections",
      backToTop: "Back to Top",
      copyLink: "Copy Document Link",
      linkCopied: "Link copied to clipboard!",
      clausePrefix: "Clause",
      noResults: "No clauses found matching your search."
    },
    es: {
      privacyTab: "Política de Privacidad",
      termsTab: "Términos de Uso",
      searchPlaceholder: "Filtrar cláusula o palabra clave...",
      tocTitle: "Índice de Cláusulas",
      sectionsCount: "secciones",
      backToTop: "Volver Arriba",
      copyLink: "Copiar Enlace del Documento",
      linkCopied: "¡Enlace copiado al portapapeles!",
      clausePrefix: "Cláusula",
      noResults: "No se encontraron cláusulas para el término buscado."
    },
    vi: {
      privacyTab: "Chính Sách Quyền Riêng Tư",
      termsTab: "Điều Khoản Sử Dụng",
      searchPlaceholder: "Lọc điều khoản hoặc từ khóa...",
      tocTitle: "Mục Lục Điều Khoản",
      sectionsCount: "điều khoản",
      backToTop: "Về Đầu Trang",
      copyLink: "Sao Chép Liên Kết Tài Liệu",
      linkCopied: "Đã sao chép liên kết vào bộ nhớ tạm!",
      clausePrefix: "Điều khoản",
      noResults: "Không tìm thấy điều khoản nào khớp với tìm kiếm."
    }
  };

  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }

  function getActiveDoc() {
    const langObj = window.LEGAL_DATA[currentLang] || window.LEGAL_DATA.pt;
    return langObj[currentTab] || langObj.privacy;
  }

  function renderDocument() {
    const doc = getActiveDoc();
    const ui = UI_STRINGS[currentLang] || UI_STRINGS.pt;

    // Update Header Tab Labels
    if (tabPrivacyLabel) tabPrivacyLabel.textContent = ui.privacyTab;
    if (tabTermsLabel) tabTermsLabel.textContent = ui.termsTab;
    if (clauseSearch) clauseSearch.placeholder = ui.searchPlaceholder;
    if (tocHeadingLabel) tocHeadingLabel.textContent = ui.tocTitle;
    if (tocCountBadge) tocCountBadge.textContent = doc.sections.length + ' ' + ui.sectionsCount;

    // Update Document Header
    if (docTitle) docTitle.textContent = doc.title;
    if (docSubtitle) docSubtitle.textContent = doc.subtitle;
    if (leadBox) leadBox.innerHTML = doc.leadHtml;

    // Render Sections
    if (sectionsStream) {
      sectionsStream.innerHTML = doc.sections.map(s => s.html).join('\n\n');
    }

    // Render TOC
    if (tocNav) {
      tocNav.innerHTML = doc.sections.map(s => {
        const cleanTitle = s.title.replace(/^\d+\.\s*/, '');
        return `
          <a href="#${s.id}" class="toc-link" data-target="${s.id}">
            <span class="toc-num">${s.number}</span>
            <span class="toc-text">${cleanTitle}</span>
          </a>
        `;
      }).join('\n');
    }

    // Update active tab buttons
    if (tabPrivacyBtn) tabPrivacyBtn.classList.toggle('active', currentTab === 'privacy');
    if (tabTermsBtn) tabTermsBtn.classList.toggle('active', currentTab === 'terms');

    // Update active lang buttons
    langBtns.forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === currentLang);
    });

    // Reset search
    if (clauseSearch) clauseSearch.value = '';
    if (clearSearchBtn) clearSearchBtn.style.display = 'none';

    setupScrollSpy();
  }

  // ScrollSpy for Active Section in TOC
  let scrollObserver = null;
  function setupScrollSpy() {
    if (scrollObserver) {
      scrollObserver.disconnect();
    }

    const sections = document.querySelectorAll('.legal-card');
    const links = document.querySelectorAll('.toc-link');

    if (!('IntersectionObserver' in window)) return;

    scrollObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          links.forEach(link => {
            const isMatch = link.getAttribute('data-target') === id;
            link.classList.toggle('active', isMatch);
            if (isMatch) {
              link.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
            }
          });
        }
      });
    }, {
      rootMargin: '-120px 0px -70% 0px',
      threshold: 0
    });

    sections.forEach(sec => scrollObserver.observe(sec));
  }

  // Live Search / Filter
  function handleSearch(term) {
    term = term.trim().toLowerCase();
    const doc = getActiveDoc();
    const ui = UI_STRINGS[currentLang] || UI_STRINGS.pt;

    if (!term) {
      renderDocument();
      return;
    }

    const matchingSections = doc.sections.filter(s => {
      const text = s.title.toLowerCase() + ' ' + s.html.replace(/<[^>]+>/g, ' ').toLowerCase();
      return text.includes(term);
    });

    if (matchingSections.length === 0) {
      sectionsStream.innerHTML = `<div class="lead-box" style="text-align:center;">${ui.noResults}</div>`;
      tocNav.innerHTML = '';
      if (tocCountBadge) tocCountBadge.textContent = '0 ' + ui.sectionsCount;
      return;
    }

    if (tocCountBadge) tocCountBadge.textContent = matchingSections.length + ' ' + ui.sectionsCount;

    // Highlight and render
    sectionsStream.innerHTML = matchingSections.map(s => {
      return s.html;
    }).join('\n\n');

    tocNav.innerHTML = matchingSections.map(s => {
      const cleanTitle = s.title.replace(/^\d+\.\s*/, '');
      return `
        <a href="#${s.id}" class="toc-link" data-target="${s.id}">
          <span class="toc-num">${s.number}</span>
          <span class="toc-text">${cleanTitle}</span>
        </a>
      `;
    }).join('\n');

    setupScrollSpy();
  }

  // Switch Language
  function setLanguage(lang) {
    if (!['pt', 'en', 'es', 'vi'].includes(lang)) return;
    currentLang = lang;
    localStorage.setItem('guesbay_legal_lang', lang);
    renderDocument();
  }

  // Switch Tab
  function setTab(tab, updateHash) {
    if (!['privacy', 'terms'].includes(tab)) return;
    currentTab = tab;
    renderDocument();
    if (updateHash) {
      window.location.hash = tab === 'privacy' ? 'privacidade' : 'termos';
    }
  }

  // URL Hash / Query Handler
  function handleUrlParams() {
    const hash = window.location.hash.toLowerCase().replace('#', '');
    const urlParams = new URLSearchParams(window.location.search);
    const paramLang = urlParams.get('lang');
    const paramTab = urlParams.get('tab');

    // Language priority: query param -> stored -> navigator -> default pt
    if (paramLang && ['pt', 'en', 'es', 'vi'].includes(paramLang)) {
      currentLang = paramLang;
    } else {
      const stored = localStorage.getItem('guesbay_legal_lang');
      if (stored && ['pt', 'en', 'es', 'vi'].includes(stored)) {
        currentLang = stored;
      }
    }

    // Tab priority: hash -> query -> default privacy
    if (hash === 'termos' || hash.startsWith('terms') || paramTab === 'terms') {
      currentTab = 'terms';
    } else {
      currentTab = 'privacy';
    }

    renderDocument();

    // If specific section in hash, scroll to it
    if (hash && (hash.startsWith('privacy-') || hash.startsWith('terms-'))) {
      setTimeout(() => {
        const target = document.getElementById(hash);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          target.classList.add('highlighted-section');
          setTimeout(() => target.classList.remove('highlighted-section'), 2500);
        }
      }, 300);
    }
  }

  // Event Listeners
  langBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      setLanguage(btn.getAttribute('data-lang'));
    });
  });

  if (tabPrivacyBtn) tabPrivacyBtn.addEventListener('click', () => setTab('privacy', true));
  if (tabTermsBtn) tabTermsBtn.addEventListener('click', () => setTab('terms', true));

  footerTabLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const tab = link.getAttribute('data-tab');
      setTab(tab, true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  if (clauseSearch) {
    clauseSearch.addEventListener('input', (e) => {
      const val = e.target.value;
      if (clearSearchBtn) clearSearchBtn.style.display = val ? 'block' : 'none';
      handleSearch(val);
    });
  }

  if (clearSearchBtn) {
    clearSearchBtn.addEventListener('click', () => {
      clauseSearch.value = '';
      clearSearchBtn.style.display = 'none';
      handleSearch('');
    });
  }

  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  if (shareDocBtn) {
    shareDocBtn.addEventListener('click', () => {
      const ui = UI_STRINGS[currentLang] || UI_STRINGS.pt;
      if (navigator.clipboard) {
        navigator.clipboard.writeText(window.location.href).then(() => {
          showToast(ui.linkCopied);
        });
      } else {
        showToast(ui.linkCopied);
      }
    });
  }

  window.addEventListener('hashchange', () => {
    handleUrlParams();
  });

  // Init
  handleUrlParams();
})();
