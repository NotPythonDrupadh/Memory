const emojis = ['🍕','🍔','🍟','🌮','🍣','🍩','🍪','🍎'];
let cards = [];
let flipped = [];
let lock = false;

function startGame() {
  const board = document.getElementById("game-board");
  board.innerHTML = "";
  cards = shuffle([...emojis, ...emojis]);
  flipped = [];
  lock = false;

  for (let i = 0; i < cards.length; i++) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.value = cards[i];
    card.dataset.index = i;
    card.innerText = "";
    card.addEventListener("click", flipCard);
    board.appendChild(card);
  }
}

function flipCard(e) {
  const card = e.target;
  if (lock || card.classList.contains("flipped")) return;

  card.classList.add("flipped");
  card.innerText = card.dataset.value;
  flipped.push(card);

  if (flipped.length === 2) {
    lock = true;
    setTimeout(checkMatch, 800);
  }
}

function checkMatch() {
  const [card1, card2] = flipped;

  if (card1.dataset.value !== card2.dataset.value) {
    card1.classList.remove("flipped");
    card2.classList.remove("flipped");
    card1.innerText = "";
    card2.innerText = "";
  }

  flipped = [];
  lock = false;

  const allFlipped = [...document.querySelectorAll(".card")].every(card =>
    card.classList.contains("flipped")
  );
  if (allFlipped) {
    setTimeout(() => alert("🎉 YOU WIN!"), 500);
  }
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

startGame();
