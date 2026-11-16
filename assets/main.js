'use strict';
document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
const menu = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() { navigation?.classList.remove('is-open'); menu?.setAttribute('aria-expanded','false'); }
menu?.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded', String(open)); navigation.classList.toggle('is-open',open); });
navigation?.querySelectorAll('a').forEach(link => link.addEventListener('click',closeMenu));
document.addEventListener('keydown', event => { if(event.key === 'Escape') closeMenu(); });
document.querySelectorAll('[data-language]').forEach(link => {
  if(location.pathname.endsWith('contact.html')) link.href += location.search;
  link.addEventListener('click', () => { try { localStorage.setItem('byrdina-language',link.dataset.language); } catch {} });
});
document.querySelectorAll('video').forEach(video => video.addEventListener('play', () => { document.querySelectorAll('video').forEach(other => { if(other !== video) other.pause(); }); }));
document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('[data-filter]').forEach(other => other.setAttribute('aria-pressed',String(other === button)));
  document.querySelectorAll('[data-category]').forEach(card => { card.hidden = button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter; if(card.hidden) card.querySelector('video')?.pause(); });
}));
const dialog = document.querySelector('#photo-dialog');
if(dialog) {
  const photo = dialog.querySelector('img');
  document.querySelectorAll('[data-photo]').forEach(button => button.addEventListener('click', () => {
    photo.src = button.dataset.photo; photo.alt = button.querySelector('img').alt;
    dialog.showModal(); document.body.classList.add('modal-open');
  }));
  dialog.querySelector('button').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if(event.target === dialog) dialog.close(); });
  dialog.addEventListener('close', () => document.body.classList.remove('modal-open'));
}
const packageLabel = document.querySelector('#package');
const chosen = new URLSearchParams(location.search).get('package');
if(packageLabel && ['Starter','Story','Brand'].includes(chosen)) packageLabel.textContent = packageLabel.dataset.label + ': ' + chosen;
