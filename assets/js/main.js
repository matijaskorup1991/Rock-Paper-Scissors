'use strict';

//HELPER FN:

let $ = (el) => document.querySelector(el);
let $$ = (el) => Array.from(document.querySelectorAll(el));
let $on = (el, ev, fn) =>
  Array.isArray(el)
    ? el.forEach((o) => $on(o, ev, fn))
    : el.addEventListener(ev, fn);

let rounds = 5,
  roundsCounter = 0,
  userScore = 0,
  compScore = 0,
  inputName = 'User';

//SET HOW MANY ROUNDS:

(function setNumRounds() {
  $on($$('input[type="radio"]'), 'click', (el) => {
    rounds = el.target.value * 1;
  });
})();

//SET COMP INDEX:

function compIndex() {
  let { floor, random } = Math;
  let cases = ['hand', 'felsen', 'schere'];
  return cases[floor(random() * 3)];
}

//FIND WINNER:

function countPlay(el) {
  if (roundsCounter < rounds) {
    calcWiner(el.target.className, compIndex(), el);
    roundsCounter++;
  }
  if (roundsCounter === rounds) {
    setTimeout(() => {
      $('.lets-play').innerHTML =
        userScore > compScore
          ? `${inputName.toUpperCase()} wins!`
          : userScore < compScore
          ? 'COMP wins!'
          : 'DRAW!';
    }, 1500);
  }
}

function calcWiner(userInput, computerInput, el) {
  let inp = userInput + computerInput;

  let userWinComb = ['handfelsen', 'felsenschere', 'scherehand'];
  let compWinComb = ['handschere', 'felsenhand', 'scherefelsen'];

  if (userWinComb.some((el) => el == inp)) {
    return userRoundMessage(userInput, computerInput, el);
  } else if (compWinComb.some((el) => el == inp)) {
    return compRoundMessage(userInput, computerInput, el);
  } else {
    drawRoundMessage(userInput, computerInput, el);
  }
}

//WINNER HTML MESSAGE:

function userRoundMessage(user, comp, el) {
  let { style } = el.target;
  let letsPlay = $('.lets-play');
  letsPlay.innerHTML = `${user.toUpperCase()} (${inputName}) beats ${comp.toUpperCase()} (comp) ${inputName} Wins!`;
  userScore++;
  $('.user-score').innerHTML = userScore;
  style.border = '2px solid green';
}

function compRoundMessage(user, comp, el) {
  let { style } = el.target;
  let letsPlay = $('.lets-play');
  letsPlay.innerHTML = `${comp.toUpperCase()} (comp) beats ${user.toUpperCase()} (${inputName}) Comp Wins!`;
  compScore++;
  $('.comp-score').innerHTML = compScore;
  style.border = '2px solid red';
}

function drawRoundMessage(user, comp, el) {
  let letsPlay = $('.lets-play');
  let { style } = el.target;
  letsPlay.innerHTML = `${inputName}: ${user}, Comp:${comp} Draw!`;
  style.border = '2px solid grey';
}

//SHOW-HIDE NUM OF ROUNDS:

function setRounds() {
  $('.form').style.display = 'none';
  $('.show-rounds').style.display = 'block';
  $('.all-rounds').innerHTML = rounds;
  $('.count-rounds').innerHTML = roundsCounter;
}

//RESTART:

function restart() {
  userScore = 0;
  compScore = 0;
  roundsCounter = 0;
  rounds = 5;
  inputName = 'User';
  $('.start-round').checked = true;
  $('.user-score').innerHTML = 0;
  $('.comp-score').innerHTML = 0;
  $('.user').innerHTML = inputName;
  $('.input-name').value = '';
  $('.form').style.display = 'block';
  $('.show-rounds').style.display = 'none';
  $('.lets-play').innerHTML = "Let's Play";
}

$on($('.restart'), 'click', restart);

//EVENTLISTENER (START GAME):

$on($$('img'), 'mousedown', (el) => {
  countPlay(el);
  setRounds();
});

$on($$('img'), 'mouseup', (el) => {
  setTimeout(() => {
    el.target.style.border = '2px solid white';
  }, 300);
});

//BONUS:
$on($('.input-name'), 'keyup', (e) => {
  $('.user').innerHTML = e.target.value;
  inputName = e.target.value;
});
