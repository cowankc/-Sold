'use strict';

var swiperContainer = document.querySelector('.swiper');
var allCards = document.querySelectorAll('.swiper--card');
var nope = document.getElementById('nope');
var love = document.getElementById('love');

function initCards(card, index) {
  var newCards = document.querySelectorAll('.swiper--card:not(.removed)');

  newCards.forEach(function (card, index) {
    card.style.zIndex = allCards.length - index;
    card.style.transform = 'scale(' + (20 - index) / 20 + ') translateY(-' + 30 * index + 'px)';
    card.style.opacity = (10 - index) / 10;
  })
  swiperContainer.classList.add('loaded');
  
}

if(swiperContainer == null){

}else{
  initCards();
}

allCards.forEach(function (el) {
  var hammertime = new Hammer(el);

  hammertime.on('pan', function (event) {
    el.classList.add('moving');
  });

  hammertime.on('pan', function (event) {
    if (event.deltaX === 0) return;
    if (event.center.x === 0 && event.center.y === 0) return;

    swiperContainer.classList.toggle('swiper_love', event.deltaX > 0);
    swiperContainer.classList.toggle('swiper_nope', event.deltaX < 0);

    var xMulti = event.deltaX * 0.03;
    var yMulti = event.deltaY / 80;
    var rotate = xMulti * yMulti;

    event.target.style.transform = 'translate(' + event.deltaX + 'px, ' + event.deltaY + 'px) rotate(' + rotate + 'deg)';
  });

  hammertime.on('panend', function (event) {
    el.classList.remove('moving');
    swiperContainer.classList.remove('swiper_love');
    swiperContainer.classList.remove('swiper_nope');

    var moveOutWidth = document.body.clientWidth;
    var keep = Math.abs(event.deltaX) < 80 || Math.abs(event.velocityX) < 0.5;

    event.target.classList.toggle('removed', !keep);

    if (keep) {
      event.target.style.transform = '';
    } else {
    
    //detect swipe left or right
      if(event.additionalEvent === 'panleft'){
        let item = event.srcEvent.srcElement.dataset.item;
       swipeleft(item)
      }else if(event.additionalEvent === 'panright'){
        let item = event.srcEvent.srcElement.dataset.item;
       swiperight(item)
      }

      var endX = Math.max(Math.abs(event.velocityX) * moveOutWidth, moveOutWidth);
      var toX = event.deltaX > 0 ? endX : -endX;
      var endY = Math.abs(event.velocityY) * moveOutWidth;
      var toY = event.deltaY > 0 ? endY : -endY;
      var xMulti = event.deltaX * 0.03;
      var yMulti = event.deltaY / 80;
      var rotate = xMulti * yMulti;

      event.target.style.transform = 'translate(' + toX + 'px, ' + (toY + event.deltaY) + 'px) rotate(' + rotate + 'deg)';
      initCards();

    }
  });
});

function createButtonListener(love) {
  return function (event) {
    var cards = document.querySelectorAll('.swiper--card:not(.removed)');
    var moveOutWidth = document.body.clientWidth * 1.5;

    if (!cards.length) return false;

    var card = cards[0];

    card.classList.add('removed');
    if (love) {
      card.style.transform = 'translate(' + moveOutWidth + 'px, -100px) rotate(-30deg)';
      
      swiperight();

    } else {
      card.style.transform = 'translate(-' + moveOutWidth + 'px, -100px) rotate(30deg)';
      swipeleft();
    }

    initCards();
    event.preventDefault();
  };
}

var nopeListener = createButtonListener(false);
var loveListener = createButtonListener(true);



if(swiperContainer == null){
  
}else{
  nope.addEventListener('click', nopeListener);
  love.addEventListener('click', loveListener);
}

let swipedItems = [];

if(localStorage.getItem('swipedItems') === undefined || localStorage.getItem('swipedItems') === null){

}else{
swipedItems = JSON.parse(localStorage.getItem('swipedItems'));
}
console.log(swipedItems);


function swipeleft(item){
//swipe left
}

function swiperight(item){
    if(item === null || item === undefined){
      //if null don't push
    }else{
      swipedItems.push(item);
      localStorage.setItem('swipedItems', JSON.stringify(swipedItems))
      console.log(swipedItems);
    }
}


//Load Cart Stuff
if($('#items_table').val() === undefined){
  //cart not here so do nothing
}else{
 //remove duplicates before appending to cart
 swipedItems = [...new Set(swipedItems)]
  for(let item of swipedItems){
    appendCartItems(item)
  }
}


function appendCartItems(id){
    $.ajax({
        url: "/api/meal/" + id,
        type: "GET",
        success: function (response) {
         let {mealName, photo, price } =   response.data;

         $('#items_table').append(`<tr>
         <td><img src="${photo}" width="100"></td>
         <td>${mealName}</td>
         <td>$${price}</td>
       </tr>`)

        }
      });
}