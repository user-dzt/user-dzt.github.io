(() => {
  const data=window.HOMEPAGE;
  let language='en';
  try { if(localStorage.getItem('zd-language')==='zh') language='zh'; } catch {}
  const toggle=document.getElementById('language');
  async function prepareAvatarDisplay(){
    const avatar=document.querySelector('.author-avatar');
    if(!avatar)return;
    try{
      if(avatar.decode)await avatar.decode();
      else if(!avatar.complete)await new Promise((resolve,reject)=>{
        avatar.addEventListener('load',resolve,{once:true});
        avatar.addEventListener('error',reject,{once:true});
      });
      if(!avatar.naturalWidth||avatar.naturalWidth<=512)return;
      // Avoid one large minification step from the full-resolution portrait.
      // Keep the original photograph; only prepare its browser display surface.
      let source=avatar,width=avatar.naturalWidth,height=avatar.naturalHeight;
      while(width>512){
        const nextWidth=Math.max(512,Math.floor(width/2));
        const nextHeight=Math.max(1,Math.round(height*nextWidth/width));
        const surface=document.createElement('canvas');
        surface.width=nextWidth;surface.height=nextHeight;
        const context=surface.getContext('2d');
        if(!context)return;
        context.imageSmoothingEnabled=true;
        context.imageSmoothingQuality='high';
        context.drawImage(source,0,0,nextWidth,nextHeight);
        source=surface;width=nextWidth;height=nextHeight;
      }
      const blob=await new Promise(resolve=>source.toBlob(resolve,'image/png'));
      if(!blob)return;
      avatar.src=URL.createObjectURL(blob);
      avatar.dataset.displayPrepared='true';
    }catch{
      // Local-file/canvas restrictions must not hide the original avatar.
    }
  }
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
  void prepareAvatarDisplay();
})();
