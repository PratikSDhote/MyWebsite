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

  // Load lyrics from files and handle tab switching
  const lyricsTabs = document.querySelectorAll('.lyrics-tab-btn');
  const lyricsTexts = document.querySelectorAll('.lyrics-text');
  
  const lyricFiles = {
    charitra: '../Lyrics/charitra.txt',
    backbone: '../Lyrics/backbone.txt',
    legacy: '../Lyrics/Legacy.txt'
  };

  // Fetch and display lyrics
  async function loadLyrics(song){
    const file = lyricFiles[song];
    if(!file) return;
    const textDiv = document.querySelector(`.lyrics-text[data-song="${song}"]`);
    if(!textDiv) return;
    
    if(textDiv.textContent.trim() === ''){
      try{
        const response = await fetch(file);
        if(response.ok){
          const text = await response.text();
          textDiv.textContent = text;
          textDiv.style.display = 'block';
        }else{
          textDiv.textContent = 'Lyrics not available.';
          textDiv.style.display = 'block';
        }
      }catch(e){
        console.error(`Error loading ${song} lyrics:`, e);
        textDiv.textContent = 'Error loading lyrics.';
        textDiv.style.display = 'block';
      }
    }else{
      textDiv.style.display = 'block';
    }
  }

  // Switch lyrics on tab click
  lyricsTabs.forEach(tab => {
    tab.addEventListener('click', ()=>{
      const song = tab.dataset.song;
      
      // Update tab states
      lyricsTabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      
      // Update visible lyrics
      lyricsTexts.forEach(t => t.style.display = 'none');
      document.querySelector(`.lyrics-text[data-song="${song}"]`).style.display = 'block';
      
      // Load lyrics for this song
      loadLyrics(song);
    });
  });

  // Load default (first tab) lyrics on page load
  loadLyrics('charitra');

  // Lyrics buttons from music section
  document.querySelectorAll('.lyrics-btn').forEach(btn => {
    btn.addEventListener('click', ()=>{
      const song = btn.dataset.song;
      // Find and click the corresponding tab
      document.querySelector(`.lyrics-tab-btn[data-song="${song}"]`)?.click();
      // Scroll to lyrics section
      document.getElementById('lyrics').scrollIntoView({behavior:'smooth'});
    });
  });

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

});
