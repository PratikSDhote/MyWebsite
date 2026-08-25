document.addEventListener('DOMContentLoaded',function(){
  // Mobile menu (accessible toggle)
  const menuBtn = document.querySelector('.menu-btn');
  const nav = document.querySelector('.nav');
  if(menuBtn){
    menuBtn.addEventListener('click',()=>{
      const isOpen = nav.style.display === 'flex';
      nav.style.display = isOpen ? 'none' : 'flex';
      menuBtn.setAttribute('aria-expanded', String(!isOpen));
    });
  }

  // Video modal
  const modal = document.getElementById('video-modal');
  const modalMedia = document.getElementById('modal-media');
  const closeBtn = document.querySelector('.modal-close');

  let previousFocus = null;
  function openModal(content){
    previousFocus = document.activeElement;
    modalMedia.innerHTML = content;
    modal.setAttribute('aria-hidden','false');
    // focus the close button for keyboard users
    const c = document.querySelector('.modal-close');
    c && c.focus();
  }
  function closeModal(){
    modalMedia.innerHTML = '';
    modal.setAttribute('aria-hidden','true');
    if(previousFocus) previousFocus.focus();
  }
  closeBtn && closeBtn.addEventListener('click',closeModal);
  modal.addEventListener('click',e=>{if(e.target===modal) closeModal()});
  // close on Escape
  document.addEventListener('keydown', (e)=>{ if(e.key==='Escape') closeModal(); });

  // Disable hero autoplay on small or touch devices for performance
  try{
    const heroVideo = document.querySelector('.hero-video');
    const isTouch = window.matchMedia('(pointer:coarse)').matches || ('ontouchstart' in window);
    if(heroVideo && isTouch){
      heroVideo.pause();
      // fallback: show poster as background on hero
      const hero = document.querySelector('.hero');
      if(hero){
        const poster = heroVideo.getAttribute('poster') || '';
        heroVideo.style.display = 'none';
        hero.style.backgroundImage = `url(${poster})`;
        hero.style.backgroundSize = 'cover';
        hero.style.backgroundPosition = 'center';
      }
    }
  }catch(e){console.warn(e)}

  document.querySelectorAll('.video-card').forEach(card=>{
    const handler = ()=>{
      const id = card.dataset.youtubeId;
      if(!id) return;
      const iframe = `<iframe width="100%" height="540" src="https://www.youtube.com/embed/${id}?rel=0&autoplay=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen title="video"></iframe>`;
      openModal(iframe);
    };
    card.addEventListener('click',handler);
    card.addEventListener('keydown',(e)=>{ if(e.key==='Enter' || e.key===' ') { e.preventDefault(); handler(); } });
  });

  // Gallery click -> modal image
  document.querySelectorAll('.masonry img').forEach(img=>{
    img.addEventListener('click',()=>{
      const src = img.src;
      openModal(`<img src="${src}" alt="" style="width:100%;height:auto;border-radius:6px;">`);
    });
    img.addEventListener('keydown',(e)=>{ if(e.key==='Enter') img.click(); });
  });

  // Header is now text-based logo; no image fallback handling required.

});
