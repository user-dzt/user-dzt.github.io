(() => {
  const data = window.HOMEPAGE;
  let language = 'en';
  try { if (localStorage.getItem('zd-language') === 'zh') language = 'zh'; } catch {}
  let year = 'all';
  let expanded = false;
  const list = document.getElementById('paper-list');
  const showButton = document.getElementById('show-papers');
  const languageButton = document.getElementById('language');
  function renderPapers() {
    const t = data.translations[language];
    const filtered = data.publications.filter(p => year === 'all' || p.year === year);
    const visible = year === 'all' && !expanded ? filtered.slice(0, 3) : filtered;
    list.replaceChildren();
    visible.forEach(p => {
      const article = document.createElement('article'); article.className = 'publication';
      const venue = document.createElement('div'); venue.className = 'venue-mark'; venue.textContent = p.short;
      const date = document.createElement('span'); date.textContent = p.year; venue.append(date);
      const body = document.createElement('div');
      const heading = document.createElement('h3');
      const link = document.createElement('a'); link.href = 'https://doi.org/' + p.doi; link.target = '_blank'; link.rel = 'noopener noreferrer'; link.textContent = p.title; heading.append(link);
      const authors = document.createElement('p'); authors.className = 'authors';
      p.authors.forEach((author, index) => {
        if (index) authors.append(', ');
        const span = document.createElement(author === 'Dong, Z.' ? 'strong' : 'span'); span.textContent = author; authors.append(span);
      });
      const journal = document.createElement('p'); journal.className = 'journal'; journal.textContent = p.journal + ', ' + p.details + (p.chinese ? ' · ' + t.inChinese : '');
      const paperLink = document.createElement('a'); paperLink.href = link.href; paperLink.target = '_blank'; paperLink.rel = 'noopener noreferrer'; paperLink.className = 'paper-link'; paperLink.textContent = t.paperLink + ' ↗';
      paperLink.setAttribute('aria-label', t.paperLink + ': ' + p.title);
      body.append(heading, authors, journal, paperLink); article.append(venue, body); list.append(article);
    });
    showButton.hidden = year !== 'all' || filtered.length <= 3;
    showButton.setAttribute('aria-expanded', String(expanded));
    showButton.innerHTML = expanded ? t.showLess : t.showAll;
  }
  function setLanguage(next) {
    language = next;
    document.documentElement.lang = next === 'zh' ? 'zh-CN' : 'en';
    const t = data.translations[next];
    document.querySelectorAll('[data-t]').forEach(el => { if (t[el.dataset.t]) el.innerHTML = t[el.dataset.t]; });
    languageButton.innerHTML = next === 'zh' ? '<strong>中</strong> / EN' : '中 / <strong>EN</strong>';
    languageButton.setAttribute('aria-label', next === 'zh' ? 'Switch to English' : '切换为中文');
    document.querySelector('nav').setAttribute('aria-label', next === 'zh' ? '主导航' : 'Main navigation');
    document.querySelector('.filters').setAttribute('aria-label', next === 'zh' ? '按论文年份筛选' : 'Publication year');
    document.querySelector('meta[name="description"]').content = next === 'zh' ? '董镇滔，北京交通大学博士研究生。研究方向包括脑机接口、人车交互与智能交通。' : 'Zhentao Dong, Beijing Jiaotong University. Research in brain–computer interfaces, human–vehicle interaction, and intelligent transportation.';
    try { localStorage.setItem('zd-language', next); } catch {}
    renderPapers();
  }
  languageButton.addEventListener('click', () => setLanguage(language === 'en' ? 'zh' : 'en'));
  document.querySelectorAll('[data-year]').forEach(button => button.addEventListener('click', () => {
    year = button.dataset.year;
    document.querySelectorAll('[data-year]').forEach(el => { const active = el === button; el.classList.toggle('active', active); el.setAttribute('aria-pressed', String(active)); });
    renderPapers();
  }));
  showButton.addEventListener('click', () => { expanded = !expanded; renderPapers(); });
  document.getElementById('copyright-year').textContent = String(new Date().getFullYear());
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) {
        document.querySelectorAll('nav a').forEach(a => { const active = a.hash === '#' + entry.target.id; a.classList.toggle('active', active); if (active) a.setAttribute('aria-current', 'location'); else a.removeAttribute('aria-current'); });
      }
    }, {rootMargin:'-15% 0px -65% 0px', threshold:0});
    document.querySelectorAll('main section').forEach(section => observer.observe(section));
  }
  setLanguage(language);
})();
