'use strict';

const player0El = document.querySelector(`.player--0`);
const player1El = document.querySelector(`.player--1`);
const dice = document.querySelector(`.dice`);
const btnNew = document.querySelector(`.btn--new`);
const btnRoll = document.querySelector(`.btn--roll`);
const btnHold = document.querySelector(`.btn--hold`);
const current0El = document.querySelector(`#current--0`);
const current1El = document.querySelector(`#current--1`);

//Two different ways of selecting from Id:
const score0 = document.querySelector(`#score--0`);
const score1 = document.getElementById(`score--1`);
const name = document.querySelector(`.name`);

const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

const switchPlayer = function () {
  currentScore = 0;
  document.querySelector(`#current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle(`player--active`);
  player1El.classList.toggle(`player--active`);
};

// Starting conditions
score0.textContent = 0;
score1.textContent = 0;
dice.classList.add('hidden');

// Rolling dice functionality
btnRoll.addEventListener(`click`, function () {
  if (playing) {
    // .1 Generating a random number
    let diceGen = Math.trunc(Math.random() * 6 + 1);
    if (activePlayer === 1) {
      diceGen = Math.trunc(Math.random() * 5 + 2);
    }
    // Unless it's a 1, update score and show correct dice img
    dice.classList.remove(`hidden`);
    dice.src = `dice-${diceGen}.png`;
    // .2 Sum score + generated number
    
    // .3 If hitting a 1, reset score and move on to next player
    if (diceGen !== 1) {
      // Add dice to current score
      currentScore += diceGen;
      // Variable of who gets their score updated
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;

      //Predefined how is getting their score updated (player1)
      //current0El.textContent = currentScore; //Change later
    } else switchPlayer();
    // Switch to next player
  }
});
/*
btnHold.addEventListener(`click`, function () {
  document.querySelector(`#score--${activePlayer}`).textContent = scores[
    `${activePlayer}`
  ] += currentScore;

  currentScore = 0;
  document.querySelector(`#current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle(`player--active`);
  player1El.classList.toggle(`player--active`);
  if (score[activePlayer] > 100) {
    document.querySelector(
      `#current--${activePlayer}`
    ).textContent = `You won the game`;
  }
});
*/
btnHold.addEventListener(`click`, function () {
  if (playing) {
    scores[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      dice.classList.add('hidden');
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove(`player--active`);
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add(`player--winner`);
    } else switchPlayer();
  }
});

btnNew.addEventListener(`click`, function () {
  //reset all scores, current and imagery
  // let player 1 beging rolling
  currentScore = 0;
  activePlayer = 0;
  // Remove dice and update scores to 0
  dice.classList.add('hidden');
  score0.textContent = currentScore;
  score1.textContent = currentScore;
  current0El.textContent = currentScore;
  current1El.textContent = currentScore;
  // remove "winner" background, and reset player 1 for beginning
  player0El.classList.add(`player--active`);
  player1El.classList.remove(`player--active`);
  player0El.classList.remove(`player--winner`);
  player1El.classList.remove(`player--winner`);
  // Remove values in Scores and reinput 1
  scores.pop();
  scores.pop();
  scores.push(0);
  scores.push(0);
  // Let playing commens
  playing = true;
});

/*
// Above as a function ;
const init = function () {
  const scores = [0, 0];
  let currentScore = 0;
  let activePlayer = 0;
  let playing = true;
  // Remove dice and update scores to 0
  dice.classList.add('hidden');
  score0.textContent = currentScore;
  score1.textContent = currentScore;
  current0El.textContent = currentScore;
  current1El.textContent = currentScore;
  // remove "winner" background, and reset player 1 for beginning
  document.querySelector(`.player--0`).classList.add(`player--active`);
  document.querySelector(`.player--1`).classList.remove(`player--active`);
  document.querySelector(`.player--0`).classList.remove(`player--winner`);
  document.querySelector(`.player--1`).classList.remove(`player--winner`);
  // Remove values in Scores and reinput 1
  scores.pop();
  scores.pop();
  scores.push(0);
  scores.push(0);
  // Let playing commens
  playing = true;
};
*/
