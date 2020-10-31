window.addEventListener('DOMContentLoaded', function() {
  'use strict';

  // ======================
  //MENU BUTTON
  // ======================
  let menuBtn = document.querySelector('#menuToggle'),
    menuList = document.querySelector('.menu__list');

  menuBtn.addEventListener('click', function() {
    if (menuList.style.display == 'block'){
      menuList.style.display = 'none';
    } else {
      menuList.style.display = 'block';
    }
  });

  // ======================
  //SLIDER BLOCK
  // ======================

  let slideIndex = 1,   /* current slider*/
    slides = document.querySelectorAll('.slider__item'),
    prev = document.querySelector('.slider__prev'),
    next = document.querySelector('.slider__next'),
    dotsWrap = document.querySelector('.slider__dots'),
    dots = document.querySelectorAll('.slider__dot');

  showSlides(slideIndex);

  function showSlides(n) {
    
    if (n > slides.length) {
      slideIndex = 1;
    }

    if (n < 1) {
      slideIndex = slides.length;
    }

    slides.forEach((item) => item.style.display = 'none');
    dots.forEach((item) => item.classList.remove('slider__dot-active'));
    slides[slideIndex - 1].style.display = 'block';
    dots[slideIndex - 1].classList.add('slider__dot-active');
  }

  function plusSlides(n) {
    showSlides(slideIndex += n);
  }

  function currentSlide(n) {
    showSlides(slideIndex = n);
  }

  prev.addEventListener('click', function() {
    plusSlides(-1);
  });

  next.addEventListener('click', function() {
    plusSlides(1);
  });

  dotsWrap.addEventListener('click', function(event) {
    for (let i = 0; i < dots.length + 1; i++) {
      if (event.target.classList.contains('slider__dot') && event.target == dots[i-1]) {
        currentSlide(i);
      }
    }
  });

  setInterval(function(){
    showSlides(plusSlides(1));
  }, 3000);

  // ======================
  //MODAL GALLERY BLOCK
  // ======================
  let modalIndex = 1, 
    position = 0,
    img = document.querySelector('.gall-modal__main-img1'),
    prevM = document.querySelector('.gall-modal__main-prev'),
    nextM = document.querySelector('.gall-modal__main-next'),
    viewportWrap = document.querySelector('.gall-modal__viewport-wr'),
    viewports = document.querySelectorAll('.gall-modal__viewport-img');
  
    let allphotoBtn = document.querySelector('.gall-modal-btn-all'),
    modal = document.querySelector('.gall-modal'),
    gallery = document.querySelector('.gallery'),
    modalMain = document.querySelector('.gall-modal__main'),
    viewport = document.querySelector('.gall-modal__viewport'),
    allphoto = document.querySelector('.gall-modal__all-ph-wr'),
    close = document.querySelector('.gall-modal-btn-back');

  let countryList = ['mald', 'nepal', 'tibet', 'butan', 'sri', 'india'],
    country = countryList[0];
  
    
  // MODALL OPEN BLOCK
  gallery.addEventListener('click', function(event) {
    let target =event.target;

    for (let i = 0; i < countryList.length; i++){
      if (target && event.currentTarget.classList.contains(`js${countryList[i]}`)) {
        country = countryList[i];
        break;
      }
    }

    if (target && target.classList.contains('gallery__img-big')) {
      modalIndex = 1;
      position = 0;
      showImg(1);
    }

    if (target && target.classList.contains('gallery__img-mdl-1')) {
      modalIndex = 2;
      position = -160;
      showImg(2);
    }

    if (target && target.classList.contains('gallery__img-mdl-2')) {
      modalIndex = 3;
      position = -320;
      showImg(3);
    }

    for (let i= 1; i <= 5; i++) {
      if (target && target.classList.contains(`gallery__img-sm-${i}`)) {
        modalIndex = i + 3;
        position = (i + 2) * -160;
        showImg(i + 3);
        break;
      }
    }

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
  })

  close.addEventListener('click', function() {
    modal.style.display = 'none';
    modalMain.style.display = 'flex';
    viewport.style.display = 'flex';
    allphoto.style.display = 'none';
    allphotoBtn.style.display = 'flex';
    document.body.style.overflow = '';
  });
  
    // MODALL SHOW PHOTO BLOCK
  function showImg(n) {

    if (n < 1 || n >= 20) {
      position = -3200;
    } 

    if (n < 1) {
      modalIndex = viewports.length;
      position = -3200;
    }

    if (n > viewports.length) {
      modalIndex = 1;
      position = 160;
    }

    img.src=`img/${country}/${modalIndex}.jpg`;

    viewports.forEach((item) => item.classList.remove('gall-modal__viewport-img-active'));

    viewports[modalIndex - 1].classList.add('gall-modal__viewport-img-active');
    viewportWrap.style.left = position + 'px';
  }

  function plusView(n){
    showImg(modalIndex  += n);
  }

  function currentView(n) {
    showImg(modalIndex  = n);
  }

  prevM.addEventListener('click', function() {
    plusView(-1);
    position += 160;
    viewportWrap.style.left = position + 'px';
  });

  nextM.addEventListener('click', function(){
    plusView(1);
    if (position > -3200) {
      position -= 160;
    } 

    viewportWrap.style.left = position + 'px';

  });

  viewportWrap.addEventListener('click', function(event){

    for (let i = 0; i < viewports.length + 1; i++) {
      if (event.target.classList.contains('gall-modal__viewport-img') && event.target == viewports[i-1]) {
        currentView(i);
      }
    }
  });

  // ======================
  // MODALL ALL PHOTO BLOCK
  // ======================
  allphotoBtn.addEventListener('click', function() {
    modalMain.style.display = 'none';
    viewport.style.display = 'none';
    allphoto.style.display = 'flex';
    allphotoBtn.style.display = 'none';
  });

  allphoto.addEventListener('click', function(event){
    let target = event.target;

    for (let i = 1; i <= 25; i++){
      if (target && target.classList.contains(`all-ph-img-${i}`)) {
        modalIndex = i;
        position = (i - 1) * -160;
        showImg(i);
      }
    }

    allphotoBtn.style.display = 'block';
    allphoto.style.display = 'none';
    modalMain.style.display = 'flex';
    viewport.style.display = 'flex';

  });


  showImg(modalIndex);

});