'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

//functions to use
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};
const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

//open modal on click
btnsOpenModal.forEach(btnOpenModal => {
  btnOpenModal.addEventListener('click', openModal);
});
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//Add Cookie bar///////////////////////////////
const header = document.querySelector('.header');

const message = document.createElement('div');
message.innerHTML =
  'We use cookies to improve user experience <button class="btn btn--close-cookie">Got it!<button/>';
message.classList.add('cookie-message');
header.prepend(message);

//remove cookie Bar
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove();
  });

//scrolling effect on button click///////////////
/////////////////////////////////////////////////
const btnScroll = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
btnScroll.addEventListener('click', function () {
  section1.scrollIntoView({ behavior: 'smooth' });

  //anther old method to do this
  // const s1cords = section1.getBoundingClientRect();
  // window.scrollTo({
  //   top: s1cords.top + window.pageYOffset,
  //   left: s1cords.left + window.pageXOffset,
  //   behavior: 'smooth',
  // });
});

//navscroll effect///////////////////////////////
/////////////////////////////////////////////////
//use event delegation
document.querySelector('.nav__links').addEventListener('click', function (e) {
  if (e.target.classList.contains('nav__link')) {
    e.preventDefault();
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

//Tab component//////////////////////////////////
/////////////////////////////////////////////////

//selecting elements
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

//lisening to tab button
tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  if (!clicked) return;

  //hide old content and show new content
  tabs.forEach(t => {
    t.classList.remove('operations__tab--active');
  });
  clicked.classList.add('operations__tab--active');

  tabsContent.forEach(tc => {
    tc.classList.remove('operations__content--active');
  });
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

//navlink fade on hover effect///////////////////////////
/////////////////////////////////////////////////

//declare usebles
const nav = document.querySelector('.nav');

const hoverEffect = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(sib => {
      if (sib !== link) {
        sib.style.opacity = this;
      }
    });
    logo.style.opacity = this;
  }
};

nav.addEventListener('mouseover', hoverEffect.bind(0.5));
nav.addEventListener('mouseout', hoverEffect.bind(1));

//STICKY NAVIGATION//////////////////////////////
/////////////////////////////////////////////////
// const header = document.querySelector('.header');
const navheight = nav.getBoundingClientRect().height;

const stickyNav = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
};
const options = {
  root: null,
  threshold: 0,
  rootMargin: `-${navheight}px`,
};
const observer = new IntersectionObserver(stickyNav, options);
observer.observe(header);

//Sections animation/////////////////////////////
/////////////////////////////////////////////////
const allSections = document.querySelectorAll('.section');
const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  threshold: 0.15,
});
allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

//Lazy Image Loading/////////////////////////////
/////////////////////////////////////////////////
const imgTargets = document.querySelectorAll('img[data-src]');
const loadImg = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  //replace src
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  threshold: 0,
  rootMargin: '-200px',
});
imgTargets.forEach(img => {
  imgObserver.observe(img);
});

///Crousal Area//////////////////////////////////
/////////////////////////////////////////////////

//selecting elements
const btnRight = document.querySelector('.slider__btn--right');
const btnLeft = document.querySelector('.slider__btn--left');
const slides = document.querySelectorAll('.slide');
//dots
const dotContainer = document.querySelector('.dots');

//variables used -----
let curSlide = 0;
const maxSlide = slides.length;

//functions -----
const gotoSlide = function (slide) {
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${100 * (i - slide)}%)`;
  });
};
const nextSlide = function () {
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  gotoSlide(curSlide);
  activateDots(curSlide);
};
const prevSlide = function () {
  if (curSlide === 0) {
    curSlide = maxSlide - 1;
  } else {
    curSlide--;
  }
  gotoSlide(curSlide);
  activateDots(curSlide);
};
const createDots = function () {
  slides.forEach(function (_, i) {
    dotContainer.insertAdjacentHTML(
      'beforeend',
      `<button class='dots__dot' data-slide="${i}"></button>`
    );
  });
};
const activateDots = function (slide) {
  console.log(slide);
  document.querySelectorAll('.dots__dot').forEach(function (dot) {
    dot.classList.remove('dots__dot--active');
  });
  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add('dots__dot--active');
};
const init = function () {
  gotoSlide(curSlide);
  createDots();
  activateDots(0);
};

//reseting the slider
init();

//listen to clicks
btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);

//listen to keypress
document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowLeft') prevSlide();
});
document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowRight') nextSlide();
});

//creating DOTS of crousal/slider
dotContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    const { slide } = e.target.dataset;
    gotoSlide(slide);
    activateDots(slide);
  }
});

//ask message before closing tab
//this dont work on IE
window.addEventListener('beforeunload', function (e) {
  e.preventDefault();
  e.returnValue = '';
});
//  OR //
// window.onbeforeunload = confirmExit;

// function confirmExit() {
//   return 'You have attempted to leave this page. Are you sure?';
// }
