window.addEventListener('DOMContentLoaded', function() {
  'use strict';

  // ======================
  //MAPS BUTTON
  // ======================
  let mapAddBtn = document.querySelectorAll('.card-block__info-map'),
      mapHotel = document.querySelectorAll('.map-hotel__container');
      
  for (let i = 0; i < mapAddBtn.length; i++ ) {
    mapAddBtn[i].addEventListener('click', function() {
      
      if (mapHotel[i].style.display == 'block'){
        mapHotel[i].style.display = 'none';
        mapAddBtn[i].innerHTML = 'Смотреть на карте';
      
      } else {
        mapHotel[i].style.display = 'block';
        mapAddBtn[i].style.height = '54px';
        mapAddBtn[i].innerHTML = 'Скрыть карту';
      }
    });
  };

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
    // TIMER
  // ======================

    let deadline = '2021-03-21';

    function getTimeRemaining(endtime) {
      let t = Date.parse(endtime) - Date.parse(new Date()),
      seconds = Math.floor((t/1000) % 60),
      minutes = Math.floor((t/1000/60) % 60),
      hours = Math.floor((t/(1000*60*60)) % 24),
      days = Math.floor((t/(1000*60*60*24)));
  
      return {
        'total' : t,
        'days' : days,
        'hours' : hours,
        'minutes' : minutes,
        'seconds' : seconds
      };
    }
  
    function setClock(id, endtime) {
      let timer = document.getElementById(id),
        days = timer.querySelector('.days'),
        hours = timer.querySelector('.hours'),
        minutes = timer.querySelector('.minutes'),
        seconds = timer.querySelector('.seconds'),
        timerText = timer.querySelector('.timer-text'),
        timeInterval = setInterval(updateClock, 1000);
        
      function updateClock() {
        let t = getTimeRemaining(endtime);
  
        function addZero(num){
          if(num <= 9) {
            return '0' + num;
          } else {
            return num;
          }
        };
  
        function addTimerText(num) {
          switch(num){
            case 1:
            case 21:
            case 31: 
            return '&nbsp;день&nbsp;';
  
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
            case 10:
            case 11:
            case 12:
            case 13:
            case 14:
            case 15:
            case 16:
            case 17:
            case 18:
            case 19:
            case 20:
            case 26:
            case 27:
            case 28:
            case 29:
            case 30:
            return '&nbsp;дней&nbsp;';
  
            default:
            return '&nbsp;дня&nbsp;';
          }
        }
  
        days.textContent = t.days;
        hours.textContent = addZero(t.hours);
        minutes.textContent = addZero(t.minutes);
        seconds.textContent = addZero(t.seconds);
        timerText.innerHTML = addTimerText(t.days);
  
        if (t.total <= 0) {
          clearInterval(timeInterval);
          days.textContent = '00';
          hours.textContent = '00';
          minutes.textContent = '00';
          seconds.textContent = '00';
        }
      }
    }
  
    setClock('timer', deadline);

});
