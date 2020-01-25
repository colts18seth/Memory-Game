const cards = document.querySelectorAll('.card');
let hasFlippedCard = false;
let locked = false;
let firstCard, secondCard;
let currentScore = 0;
let matches = 0;
let lowScore = localStorage.getItem("lowScore") || Infinity;

document.querySelector(".lowScore").innerText = lowScore;

function endGame(){
  if(currentScore < lowScore) {
    lowScore = currentScore;
    document.querySelector(".lowScore").innerText = currentScore;
    localStorage.setItem("lowScore", currentScore);
  }
}

function setScore(newScore) {
  currentScore = newScore;
  document.querySelector(".currentScore").innerText = currentScore;
}

function flipCard() {
  if (locked || this === firstCard){
    return
  } else {
    currentScore++;
    setScore(currentScore);
    this.classList.add('flip');
  }

  if(!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  } else {
    secondCard = this;
  } 
  checkForMatch();
}

function checkForMatch() {
  if (firstCard.dataset.framework === secondCard.dataset.framework) {
    matches++;
    if(matches === 6) {
      endGame();
    }
    disableCards();
    return;
  }
  unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  reset();
}

function unflipCards() {
  locked = true;
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    reset();
  }, 1000);
}

function reset() {
  hasFlippedCard = false;
  locked = false;
  firstCard = null;
  secondCard = null;
}

(function shuffle() {
  cards.forEach(card => {
    let randOrder = Math.floor(Math.random() * 12);
    card.style.order = randOrder;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));