(() => {
  const data=window.HOMEPAGE;
  let language='en';
  try { if(localStorage.getItem('zd-language')==='zh') language='zh'; } catch {}
  const toggle=document.getElementById('language');
  function setLanguage(next){
    language=next;
    document.documentElement.lang=next==='zh'?'zh-CN':'en';
    document.querySelectorAll('[data-t]').forEach(element=>{
      const value=data.translations[next][element.dataset.t];
      if(value!==undefined) element.innerHTML=value;
    });
    toggle.textContent=next==='zh'?'English':'中文';
    toggle.setAttribute('aria-label',next==='zh'?'Switch to English':'切换为中文');
    document.querySelector('nav').setAttribute('aria-label',next==='zh'?'主导航':'Main navigation');
    document.querySelector('meta[name="description"]').content=next==='zh'?'董镇滔，北京交通大学博士研究生，现由 CSC 支持在英国伯明翰大学开展一年期联合培养。研究方向包括脑机接口、人车交互与智能交通。':'Zhentao Dong, Ph.D. student at Beijing Jiaotong University and CSC-supported visiting Ph.D. student at the University of Birmingham.';
    try { localStorage.setItem('zd-language',next); } catch {}
  }
  toggle.addEventListener('click',()=>setLanguage(language==='en'?'zh':'en'));
  document.getElementById('year').textContent=String(new Date().getFullYear());
  setLanguage(language);
})();
