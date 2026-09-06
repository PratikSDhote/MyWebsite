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

  // Lyrics Modal
  const lyricsModal = document.getElementById('lyrics-modal');
  const lyricsModalTitle = document.getElementById('lyrics-modal-title');
  const lyricsModalBody = document.getElementById('lyrics-modal-body');
  const lyricsModalClose = document.querySelector('.lyrics-modal-close');

  const lyricFiles = {
    charitra: 'Lyrics/charitra.txt',
    backbone: 'Lyrics/backbone.txt',
    legacy: 'Lyrics/Legacy.txt'
  };

  // Open lyrics modal
  async function openLyricsModal(song){
    const file = lyricFiles[song];
    if(!file) return;

    // Set title
    const titleText = song.charAt(0).toUpperCase() + song.slice(1);
    lyricsModalTitle.textContent = titleText;

    // Fetch and display lyrics
    try{
      const response = await fetch(file);
      console.log(`Fetching ${file}: status ${response.status}`);
      if(response.ok){
        const text = await response.text();
        lyricsModalBody.textContent = text;
      }else{
        console.error(`HTTP ${response.status} when fetching ${file}`);
        lyricsModalBody.textContent = `Lyrics not available (HTTP ${response.status}).`;
      }
    }catch(e){
      console.error(`Error loading ${song} lyrics from ${file}:`, e);
      lyricsModalBody.textContent = `Error loading lyrics: ${e.message}`;
    }

    // Show modal
    lyricsModal.setAttribute('aria-hidden', 'false');
  }

  // Close lyrics modal
  function closeLyricsModal(){
    lyricsModal.setAttribute('aria-hidden', 'true');
    lyricsModalBody.textContent = '';
  }

  // Close modal on close button click
  lyricsModalClose.addEventListener('click', closeLyricsModal);

  // Close modal on background click
  lyricsModal.addEventListener('click', (e)=>{
    if(e.target === lyricsModal) closeLyricsModal();
  });

  // Close modal on Escape key
  document.addEventListener('keydown', (e)=>{
    if(e.key === 'Escape' && lyricsModal.getAttribute('aria-hidden') === 'false'){
      closeLyricsModal();
    }
  });

  // Lyrics buttons
  document.querySelectorAll('.lyrics-btn-track:not(:disabled)').forEach(btn => {
    btn.addEventListener('click', ()=>{
      const song = btn.dataset.song;
      openLyricsModal(song);
    });
  });

  // Lyrics buttons from music section
  document.querySelectorAll('.lyrics-btn').forEach(btn => {
    btn.addEventListener('click', ()=>{
      const song = btn.dataset.song;
      openLyricsModal(song);
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

  // YouTube Video Player - Thumbnail-first, lazy-loaded approach
  const videoCards = document.querySelectorAll('.video-card:not(.video-card-upcoming)');
  let currentVideoId = null;
  let currentIframe = null;

  function createYouTubePlayer(videoId, videoTitle) {
    // Clean up previous player
    if (currentIframe) {
      currentIframe.remove();
      currentIframe = null;
    }
    currentVideoId = videoId;

    // Create container for responsive 16:9 aspect ratio
    const playerContainer = document.createElement('div');
    playerContainer.className = 'youtube-player-container';
    playerContainer.setAttribute('role', 'region');
    playerContainer.setAttribute('aria-label', `Playing ${videoTitle} video`);

    // Create iframe with error event handler
    const iframe = document.createElement('iframe');
    iframe.className = 'youtube-iframe';
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
    iframe.title = `YouTube video player - ${videoTitle}`;
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    iframe.allowFullscreen = true;
    iframe.frameBorder = '0';

    // Handle iframe load and error
    iframe.onload = () => {
      console.log(`YouTube player loaded for ${videoTitle}`);
    };

    iframe.onerror = () => {
      console.error(`YouTube player failed to load for ${videoTitle}`);
      showYouTubeError(videoTitle, videoId);
    };

    playerContainer.appendChild(iframe);
    currentIframe = playerContainer;
    return playerContainer;
  }

  function showYouTubeError(videoTitle, videoId) {
    // Find the corresponding thumbnail and show error state
    const card = document.querySelector(`[data-youtube-id="${videoId}"]`);
    if (!card) return;

    // Create error fallback content
    const errorContainer = document.createElement('div');
    errorContainer.className = 'youtube-player-error';
    errorContainer.innerHTML = `
      <div class="youtube-error-content">
        <p>Unable to load video player</p>
        <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank" rel="noopener" class="btn primary" style="margin-top:12px;">
          Watch on YouTube
        </a>
      </div>
    `;

    // Clear and show error
    const modalMedia = document.getElementById('modal-media');
    modalMedia.innerHTML = '';
    modalMedia.appendChild(errorContainer);
  }

  // Add click handlers to video cards
  videoCards.forEach(card => {
    const playBtn = card.querySelector('.play-btn');
    const videoId = card.dataset.youtubeId;
    const videoTitle = card.querySelector('h4')?.textContent || 'Video';

    const handler = (e) => {
      e.preventDefault();
      e.stopPropagation();

      // Only load YouTube if not already loading/playing that video
      if (currentVideoId !== videoId) {
        const playerElement = createYouTubePlayer(videoId, videoTitle);
        const modalMedia = document.getElementById('modal-media');
        modalMedia.innerHTML = '';
        modalMedia.appendChild(playerElement);
      }

      // Open modal
      modal.setAttribute('aria-hidden', 'false');
      const closeBtn = document.querySelector('.modal-close');
      closeBtn && closeBtn.focus();
    };

    // Click on card
    card.addEventListener('click', handler);

    // Click on play button
    if (playBtn) {
      playBtn.addEventListener('click', handler);
    }

    // Keyboard support
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handler(e);
      }
    });
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
