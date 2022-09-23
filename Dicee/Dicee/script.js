// Rolling Dice Function

function rollDice(dice) {
  let number_dice = Math.trunc(Math.random() * 6) + 1;
  let diceSelector = document.querySelectorAll("img")[dice - 1];

  if (number_dice === 1) {
    diceSelector.setAttribute("src", "images/dice1.png");
  } else if (number_dice === 2) {
    diceSelector.setAttribute("src", "images/dice2.png");
  } else if (number_dice === 3) {
    diceSelector.setAttribute("src", "images/dice3.png");
  } else if (number_dice === 4) {
    diceSelector.setAttribute("src", "images/dice4.png");
  } else if (number_dice === 5) {
    diceSelector.setAttribute("src", "images/dice5.png");
  }

  return number_dice;
}

// Calling Both dices(1 and 2)

const player1 = rollDice(1);
const player2 = rollDice(2);

// Declaring Winner

const headline = document.querySelector("h1");

if (player1 > player2) {
  headline.textContent = "Player 1 wins !!!";
} else if (player1 < player2) {
  headline.textContent = "Player 2 wins !!!";
} else {
  headline.textContent = "Draw";
}
