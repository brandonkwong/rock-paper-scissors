window.onload = function() {

// CHANGE TO camelCase


// Global Variables
var playerHand, enemyHand;

var player = document.getElementById('player');
var enemy = document.getElementById('enemy');
var countdown = document.getElementById('countdown');

var ex = [].slice.call(document.querySelectorAll('.lose'));
var lose = player.querySelector('.lose');
var win = enemy.querySelector('.lose');

var gameActive = false;
var battleActive = false;


// Function to randomize enemy hand
function enemyRand() {
  enemyHand = Math.floor(Math.random() * 3) + 1;
  
  if (enemyHand == 1) {
    enemyHand = 'rock';
    enemy.classList.add('rock');
  }
  else if (enemyHand == 2) {
    enemyHand = 'paper';
    enemy.classList.add('paper');
  }
  else {
    enemyHand = 'scissors';
    enemy.classList.add('scissors');
  }

  battleResults();
}


// Function for battle results
function battleResults() {
  if (playerHand == 'rock') {
    if (enemyHand == 'rock') {
      countdown.innerText = 'TIE';
      tieBreaker();
      return 'tie'
    }
    else if (enemyHand == 'paper') {
      lose.classList.add('show');
      return 'lose'
    }
    else {
      win.classList.add('show');
      return 'win'
    } 
  }

  else if (playerHand == 'paper') {
    if (enemyHand == 'rock') {
      win.classList.add('show');
      return 'win'
    }
    else if (enemyHand == 'paper') {
      countdown.innerText = 'TIE';
      tieBreaker();
      return 'tie'
    }
    else {
      lose.classList.add('show');
      return 'lose'
    }
  }

  else if (playerHand == 'scissors') {
    if (enemyHand == 'rock') {
      lose.classList.add('show');
      return 'lose'
    }
    else if (enemyHand == 'paper') {
      win.classList.add('show');
      return 'win'
    }
    else {
      countdown.innerText = 'TIE';
      tieBreaker();
      return 'tie'
    }
  }

  else {
    lose.classList.add('show');
    countdown.innerText = 'TOO SLOW';
    return 'lose'
  }
}


// Function for countdown
var countActive = false;

function count() {
  countActive = true;

    time = 3 + 1;
    var counter = setInterval(function() {
      time--
      if (time >= 0) {
        if (battleActive == true) {
          clearInterval(counter);
          lose.classList.add('show');
          countdown.innerText = 'TOO FAST';
          countActive = false;
        }
        else {
          if (time == 0) {
            countdown.innerText = '';
          }
          else {
            countdown.innerText = time;
          }
        }
      }
      else {
        if (battleActive == true) {
          clearInterval(counter);
          countActive = false;
        }
        else {
          if (time == -1) {
            clearInterval(counter);
            countActive = false;
            enemyRand();
          }
        }
      }
    }, 1000);

}


// Player Controllers

var handBtn = [].slice.call( document.querySelectorAll('.hand') );

handBtn.forEach(function(btn) {
  btn.addEventListener('click', function() {
    while (gameActive == true && battleActive == false) {
      if (time == 0) {
        var hand = btn.getAttribute('hand');
        playerHand = hand;
        player.classList.add(hand);
        battleActive = true;
        enemyRand();
      }
      else {
        var hand = btn.getAttribute('hand');
        playerHand = hand;
        player.classList.add(hand);
        battleActive = true;
      }
    }
  });
});

// Rock [ 1 ]
document.addEventListener('keydown', function(e) {
  if (e.keyCode == 49) {
    while (gameActive == true && battleActive == false) {
      if (time == 0) {
        playerHand = 'rock';
        player.classList.add('rock');
        battleActive = true;
        enemyRand();
      }
      else {
        playerHand = 'rock';
        player.classList.add('rock');
        battleActive = true;
      }
    }
  }
});

// Paper [ 2 ]
document.addEventListener('keydown', function(e) {
  if (e.keyCode == 50) {
    while (gameActive == true && battleActive == false) {
      if (time == 0) {
        playerHand = 'paper';
        player.classList.add('paper');
        battleActive = true;
        enemyRand();
      }
      else {
        playerHand = 'paper';
        player.classList.add('paper');
        battleActive = true;
      }
    }
  }
});

// Scissors [ 3 ]
document.addEventListener('keydown', function(e) {
  if (e.keyCode == 51) {
    while (gameActive == true && battleActive == false) {
      if (time == 0) {
        playerHand = 'scissors';
        player.classList.add('scissors');
        battleActive = true;
        enemyRand();
      }
      else {
        playerHand = 'scissors';
        player.classList.add('scissors');
        battleActive = true;
      }
    }
  }
});



// New Game
var newGame = document.getElementById('new');
newGame.addEventListener('click', function() {
  gameReset();
});

document.addEventListener('keydown', function(e) {
  if (e.keyCode == 13) {
    gameReset();
  }
});





// Game Reset
function gameReset() {
  
  
  while (countActive == false) {
    ex.forEach(function(el) {
      el.classList.remove('show');
    });


    gameActive = true;
    playerHand = undefined;
    enemyHand = undefined;
    player.removeAttribute('class');
    enemy.removeAttribute('class');
    battleActive = false;
    time = true;
    count();
  }

}



// Tie Breaker
function tieBreaker() {
  var tieTime = 0;
  var tieCounter = setInterval(function() {
    tieTime++
    if (tieTime == 1) {
      clearInterval(tieCounter);
      tieTime = 0;
      gameReset();
    }
  }, 1000);
}



// touch for keydown


// timer no initiate after first


// ESC == 27 to get to menu area



}; // window end