const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gravity = 0.5;
const keys = {};

const player = {
  x: 50,
  y: 0,
  width: 30,
  height: 30,
  color: "lime",
  dx: 0,
  dy: 0,
  jumpPower: -10,
  grounded: false,
};

const platforms = [
  { x: 0, y: 370, width: 800, height: 30 },
  { x: 200, y: 300, width: 100, height: 10 },
  { x: 350, y: 250, width: 100, height: 10 },
  { x: 500, y: 200, width: 100, height: 10 },
  { x: 700, y: 150, width: 50, height: 10 },
];

const goal = {
  x: 710,
  y: 110,
  width: 30,
  height: 30,
  color: "gold"
};

document.addEventListener("keydown", e => keys[e.key] = true);
document.addEventListener("keyup", e => keys[e.key] = false);

function updatePlayer() {
  player.dx = 0;
  if (keys["ArrowLeft"]) player.dx = -3;
  if (keys["ArrowRight"]) player.dx = 3;

  if (keys[" "] && player.grounded) {
    player.dy = player.jumpPower;
    player.grounded = false;
  }

  // Apply gravity
  player.dy += gravity;

  // Predict next position
  let nextX = player.x + player.dx;
  let nextY = player.y + player.dy;

  player.grounded = false;

  for (let p of platforms) {
    // Check horizontal collision
    if (
      nextX < p.x + p.width &&
      nextX + player.width > p.x &&
      player.y < p.y + p.height &&
      player.y + player.height > p.y
    ) {
      if (player.dx > 0) {
        nextX = p.x - player.width;
      } else if (player.dx < 0) {
        nextX = p.x + p.width;
      }
      player.dx = 0;
    }

    // Check vertical collision
    if (
      player.x < p.x + p.width &&
      player.x + player.width > p.x &&
      nextY < p.y + p.height &&
      nextY + player.height > p.y
    ) {
      if (player.dy > 0) {
        nextY = p.y - player.height;
        player.grounded = true;
      } else if (player.dy < 0) {
        nextY = p.y + p.height;
      }
      player.dy = 0;
    }
  }

  player.x = nextX;
  player.y = nextY;

  // Win condition
  if (
    player.x < goal.x + goal.width &&
    player.x + player.width > goal.x &&
    player.y < goal.y + goal.height &&
    player.y + player.height > goal.y
  ) {
    alert("🎉 You win!");
    window.location.reload();
  }
}

gameLoop();
