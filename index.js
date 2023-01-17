let btns = document.getElementsByClassName('pad');
let turn = false;
let running = true;
let board = [null, null, null, null, null, null, null, null, null];
const score = {
  player1Score: 0,
  player2Score: 0,
  tieScore: 0,
};
/* FUNCTIONS */
function pressed(e) {
  if (running === false) return;
  let player = '';

  let pressed = document.getElementById(e.target.id);
  let player1 = document.getElementById('container-player1');
  let player2 = document.getElementById('container-player2');

  if (pressed.classList.contains('X') || pressed.classList.contains('O'))
    return;

  if (turn === false) {
    player = 'X';
    turn = true;
    player1.style = 'color: gold';
    player2.style = 'color: white';
  } else {
    player = 'O';
    turn = false;
    player2.style = 'color: gold';
    player1.style = 'color: white';
  }

  pressed.innerText = player;
  pressed.classList.add(player);

  let selected = parseInt(pressed.id.replace('b', '')) - 1;
  board[selected] = player;
  checkWin(board, player);
}

function winning(playerEntry) {
  running = false;
  setTimeout(() => {
    scoreEvent(playerEntry);
    reset();
    running = true;
  }, 2000);
}

function winAnimation(e1, e2, e3) {
  let player1 = document.getElementById('container-player1');
  let player2 = document.getElementById('container-player2');
  turn = false;
  player1.style = 'color: white';
  player2.style = 'color: white';
  if (e1 === null) {
    for (let btn of btns) {
      let button = document.getElementById(btn.id);

      button.style = 'color: grey';
      setTimeout(() => {
        button.style = 'color: white';
      }, 2000);
    }
    return;
  }

  let b1 = document.getElementById(`b${e1 + 1}`);
  let b2 = document.getElementById(`b${e2 + 1}`);
  let b3 = document.getElementById(`b${e3 + 1}`);

  const previus = [b1.innerText, b2.innerText, b3.innerText];

  let shine = false;
  const animation = setInterval(() => {
    if (shine === false) {
      b1.innerText = '';
      b2.innerText = '';
      b3.innerText = '';
      shine = true;
    } else {
      b1.innerText = previus[0];
      b2.innerText = previus[1];
      b3.innerText = previus[2];
      shine = false;
    }
  }, 200);

  setTimeout(() => {
    clearInterval(animation);
    b1.innerText = '';
    b2.innerText = '';
    b3.innerText = '';
    shine = false;
  }, 2000);
}

function checkWin(combination, player) {
  if (
    combination[0] === player &&
    combination[1] === player &&
    combination[2] === player
  ) {
    winning(player);
    winAnimation(0, 1, 2);
  } else if (
    combination[3] === player &&
    combination[4] === player &&
    combination[5] === player
  ) {
    winning(player);
    winAnimation(3, 4, 5);
  } else if (
    combination[6] === player &&
    combination[7] === player &&
    combination[8] === player
  ) {
    winning(player);
    winAnimation(6, 7, 8);
  } else if (
    combination[0] === player &&
    combination[3] === player &&
    combination[6] === player
  ) {
    winning(player);
    winAnimation(0, 3, 6);
  } else if (
    combination[1] === player &&
    combination[4] === player &&
    combination[7] === player
  ) {
    winning(player);
    winAnimation(1, 4, 7);
  } else if (
    combination[2] === player &&
    combination[5] === player &&
    combination[8] === player
  ) {
    winning(player);
    winAnimation(2, 5, 8);
  } else if (
    combination[0] === player &&
    combination[4] === player &&
    combination[8] === player
  ) {
    winning(player);
    winAnimation(0, 4, 8);
  } else if (
    combination[2] === player &&
    combination[4] === player &&
    combination[6] === player
  ) {
    winning(player);
    winAnimation(2, 4, 6);
  } else if (!combination.includes(null)) {
    winning(null);
    winAnimation(null, null, null);
  }
}

function scoreEvent(playerEntry) {
  if (playerEntry === 'X') {
    score.player1Score++;
    player1.innerText = `Score: ${score.player1Score}`;
  } else if (playerEntry === 'O') {
    score.player2Score++;
    player2.innerText = `Score: ${score.player2Score}`;
  } else {
    score.tieScore++;
    tie.innerText = `Score: ${score.tieScore}`;
  }
}

function reset() {
  document.getElementById('container-player1').style = 'color: gold';
  document.getElementById('container-player2').style = 'color: white';

  for (let btn of btns) {
    btn.innerText = '';
    btn.classList.remove('X');
    btn.classList.remove('O');
  }
  board = [null, null, null, null, null, null, null, null, null];
}

for (let btn of btns) {
  btn.addEventListener('click', pressed);
}
