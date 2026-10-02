// Guesbay Legal Center - Client Logic
(function() {
  'use strict';

  // Prevent browser history/anchor restoring fight
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }

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
  const brandLogoLink = document.getElementById('brand-logo-link');

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
    sectionsStream.innerHTML = matchingSections.map(s => s.html).join('\n\n');

    tocNav.innerHTML = matchingSections.map(s => {
      const cleanTitle = s.title.replace(/^\d+\.\s*/, '');
      return `
        <a href="#${s.id}" class="toc-link" data-target="${s.id}">
          <span class="toc-num">${s.number}</span>
          <span class="toc-text">${cleanTitle}</span>
        </a>
      `;
    }).join('\n');
  }

  // Switch Language
  function setLanguage(lang) {
    if (!['pt', 'en', 'es', 'vi'].includes(lang)) return;
    if (currentLang === lang) return;
    currentLang = lang;
    try {
      localStorage.setItem('guesbay_legal_lang', lang);
    } catch (_) {}
    renderDocument();
  }

  // Switch Tab
  function setTab(tab) {
    if (!['privacy', 'terms'].includes(tab)) return;
    if (currentTab === tab) return;
    currentTab = tab;
    renderDocument();
    window.scrollTo(0, 0);
  }

  // Smooth scroll to an element safely without changing window.location.hash
  function scrollToElement(targetEl) {
    if (!targetEl) return;
    const headerEl = document.getElementById('top-header');
    const headerHeight = headerEl ? headerEl.offsetHeight : 100;
    const rect = targetEl.getBoundingClientRect();
    const targetY = rect.top + window.pageYOffset - headerHeight - 16;
    window.scrollTo({
      top: Math.max(0, targetY),
      behavior: 'smooth'
    });
    targetEl.classList.add('highlighted-section');
    setTimeout(() => targetEl.classList.remove('highlighted-section'), 2000);
  }

  // Event Listeners
  langBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      setLanguage(btn.getAttribute('data-lang'));
    });
  });

  if (tabPrivacyBtn) {
    tabPrivacyBtn.addEventListener('click', () => setTab('privacy'));
  }
  if (tabTermsBtn) {
    tabTermsBtn.addEventListener('click', () => setTab('terms'));
  }

  if (brandLogoLink) {
    brandLogoLink.addEventListener('click', (e) => {
      e.preventDefault();
      setTab('privacy');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  footerTabLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const tab = link.getAttribute('data-tab');
      setTab(tab);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  // TOC Click: Smoothly scroll to section without triggering hash jumps
  if (tocNav) {
    tocNav.addEventListener('click', (e) => {
      const link = e.target.closest('.toc-link');
      if (!link) return;
      e.preventDefault();
      const targetId = link.getAttribute('data-target');
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        document.querySelectorAll('.toc-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        scrollToElement(targetEl);
      }
    });
  }

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

  // Initial setup: check saved language without modifying scroll position
  try {
    const stored = localStorage.getItem('guesbay_legal_lang');
    if (stored && ['pt', 'en', 'es', 'vi'].includes(stored)) {
      currentLang = stored;
      if (currentLang !== 'pt') {
        renderDocument();
      }
    }
  } catch (_) {}
})();
