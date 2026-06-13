const TOTAL = 9;
let current = 0;

function goTo(idx) {
  if (idx < 0 || idx >= TOTAL || idx === current) return;
  const slides = document.querySelectorAll('.slide');
  const links  = document.querySelectorAll('.nav-link');
  slides[current].classList.remove('active');
  slides[current].classList.add('exit-left');
  setTimeout(() => slides[current].classList.remove('exit-left'), 400);
  current = idx;
  slides[current].classList.add('active');
  links.forEach(l => l.classList.toggle('active', +l.dataset.idx === current));
  document.getElementById('counter').textContent = (current+1) + ' / ' + TOTAL;
  document.getElementById('progress-fill').style.width = ((current+1)/TOTAL*100) + '%';
  document.getElementById('btn-prev').disabled = current === 0;
  document.getElementById('btn-next').disabled = current === TOTAL-1;
  if (window.innerWidth <= 700) closeSidebar();
}

// Fallback if a remote image fails to load
function imgErr(img, idx) {
  img.style.display = 'none';
  const ph = document.getElementById('ph-' + idx);
  if (ph) ph.style.display = 'flex';
}


document.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight' || e.key === 'ArrowDown') goTo(current+1);
  if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')   goTo(current-1);
});

// Swipe
let tx = 0, ty = 0;
document.addEventListener('touchstart', e => { tx = e.touches[0].clientX; ty = e.touches[0].clientY; }, {passive:true});
document.addEventListener('touchend', e => {
  const dx = tx - e.changedTouches[0].clientX;
  const dy = ty - e.changedTouches[0].clientY;
  if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40)
    dx > 0 ? goTo(current+1) : goTo(current-1);
}, {passive:true});

// Burger
const burger  = document.getElementById('burger');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
burger.addEventListener('click', () => {
  const open = sidebar.classList.toggle('open');
  burger.classList.toggle('open', open);
  overlay.classList.toggle('open', open);
});
function closeSidebar() {
  sidebar.classList.remove('open');
  burger.classList.remove('open');
  overlay.classList.remove('open');
}

// Language
function setLang(l) {
  document.documentElement.lang = l;
  document.querySelectorAll('[data-'+l+']').forEach(el => {
    el.innerHTML = el.getAttribute('data-'+l);
  });
  document.getElementById('btn-es').classList.toggle('active', l==='es');
  document.getElementById('btn-en').classList.toggle('active', l==='en');
}