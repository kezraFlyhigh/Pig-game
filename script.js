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

let scores, currentScore, activePlayer, playing;

// Initial values
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  player0El.classList.add(`player--active`);
  player1El.classList.remove(`player--active`);
  player0El.classList.remove(`player--winner`);
  player1El.classList.remove(`player--winner`);
  dice.classList.add('hidden');
  score0.textContent = currentScore;
  score1.textContent = currentScore;
  current0El.textContent = currentScore;
  current1El.textContent = currentScore;
};
init();

const switchPlayer = function () {
  currentScore = 0;
  document.querySelector(`#current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle(`player--active`);
  player1El.classList.toggle(`player--active`);
};

// Rolling dice functionality
btnRoll.addEventListener(`click`, function () {
  if (playing) {
    // Input number from 1-6
    let diceGen = Math.trunc(Math.random() * 6 + 1);
    // Show dice img depending on result above
    dice.classList.remove(`hidden`);
    dice.src = `dice-${diceGen}.png`;
    // if not a 1, do this;
    if (diceGen !== 1) {
      // Add dice to current score
      currentScore += diceGen;
      // Variable of ${who} gets their score updated, and update it
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;

      // If a 1 gets rolled, do function which is writen further up
    } else switchPlayer();
    // Which switches to next player
  }
});

// Holding score function
btnHold.addEventListener(`click`, function () {
  // if playing makes is so you can only play if there hasn't been decleared a winner
  if (playing) {
    // Sums "the score" + currentscore
    scores[`${activePlayer}`] += currentScore;
    // Shows the new score
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[`${activePlayer}`];
    dice.classList.add('hidden');

    // if "the score" is above 100 do this;
    if (scores[`${activePlayer}`] > 100) {
      // Hide the dice IMG

      // Stop the game
      playing = false;
      // Remove "current player" highlight
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove(`player--active`);
      document
        // Add "winner" background
        .querySelector(`.player--${activePlayer}`)
        .classList.add(`player--winner`);

      // If "the score" hasn't reached 100, switch player through function further up
    } else switchPlayer();
  }
});

/*
// This is how the instructor wrote it;
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
*/

// If "new game" button is clicled
btnNew.addEventListener(`click`, function () {
  // Run initial funtion writen above
  init();
});
