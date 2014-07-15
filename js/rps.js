window.onload = function() {

  // Global Variables
  var playerHand, enemyHand;
  var playerBox = document.getElementById('player-box');
  var enemyBox = document.getElementById('enemy-box');

  var player = document.getElementById('player');
  var enemy = document.getElementById('enemy');
  var countdown = document.getElementById('countdown');

  var ex = [].slice.call(document.querySelectorAll('.lose'));
  var lose = player.querySelector('.lose');
  var win = enemy.querySelector('.lose');

  var gameActive = false;
  var battleActive = false;
  var countActive = false;


  // Game Init
  function gameInit() {
    while (countActive == false) {
      playerHand = undefined;
      enemyHand = undefined;
      player.removeAttribute('class');
      enemy.removeAttribute('class');
      playerBox.removeAttribute('class');
      enemyBox.removeAttribute('class');
      gameActive = true;
      battleActive = false;
      time = true;
      ex.forEach(function(el) {
        el.classList.remove('show', 'animated', 'bounceInDown');
      });
      count();
    }
  }


  // Function to Randomize Enemy Hand
  function enemyRand() {
    enemyHand = Math.floor(Math.random() * 3) + 1;
    enemyBox.classList.add('animated', 'rotateInDownRight');
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


  // Function for Battle Results
  function battleResults() {
    if (playerHand == 'rock') {
      if (enemyHand == 'rock') {
        countdown.innerText = 'TIE';
        tieBreaker();
        return 'tie'
      }
      else if (enemyHand == 'paper') {
        lose.classList.add('show', 'animated', 'bounceInDown');
        return 'lose'
      }
      else {
        win.classList.add('show', 'animated', 'bounceInDown');
        return 'win'
      } 
    }
    else if (playerHand == 'paper') {
      if (enemyHand == 'rock') {
        win.classList.add('show', 'animated', 'bounceInDown');
        return 'win'
      }
      else if (enemyHand == 'paper') {
        countdown.innerText = 'TIE';
        tieBreaker();
        return 'tie'
      }
      else {
        lose.classList.add('show', 'animated', 'bounceInDown');
        return 'lose'
      }
    }
    else if (playerHand == 'scissors') {
      if (enemyHand == 'rock') {
        lose.classList.add('show', 'animated', 'bounceInDown');
        return 'lose'
      }
      else if (enemyHand == 'paper') {
        win.classList.add('show', 'animated', 'bounceInDown');
        return 'win'
      }
      else {
        countdown.innerText = 'TIE';
        tieBreaker();
        return 'tie'
      }
    }
    else {
      lose.classList.add('show', 'animated', 'bounceInDown');
      countdown.innerText = 'TOO SLOW';
      return 'lose'
    }
  }


  // Function for Countdown
  function count() {
    countActive = true;
    time = 3 + 1;
    var counter = setInterval(function() {
      time--
      if (time >= 0) {
        if (battleActive == true) {
          clearInterval(counter);
          lose.classList.add('show', 'animated', 'bounceInDown');
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


  // Tie Breaker
  function tieBreaker() {
    var tieTime = 0;
    var tieCounter = setInterval(function() {
      tieTime++
      if (tieTime > 0) {
        clearInterval(tieCounter);
        tieTime = 0;
        gameInit();
      }
    }, 1000);
  }


  // Player Controllers
  var handBtn = [].slice.call(document.querySelectorAll('#rock, #paper, #scissors'));

  handBtn.forEach(function(btn) {
    btn.addEventListener('mousedown', function() {
      btn.classList.add('touch');
      while (gameActive == true && battleActive == false) {
        playerBox.classList.add('animated', 'rotateInDownLeft');
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
    btn.addEventListener('mouseup', function() {
      btn.classList.remove('touch');
    });
  });

  var rock = document.getElementById('rock');
  var paper = document.getElementById('paper');
  var scissors = document.getElementById('scissors');

  document.addEventListener('keydown', function(e) {  
    switch(e.keyCode) {
      case 49: // Rock [ 1 ]
        if (countActive == false) {
          gameInit();
        }
        else {
          rock.classList.add('touch');
          while (gameActive == true && battleActive == false) {
            playerBox.classList.add('animated', 'rotateInDownLeft');
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
        break;
      case 50: // Paper [ 2 ]
        if (countActive == false) {
          gameInit();
        }
        else {
          paper.classList.add('touch');
          while (gameActive == true && battleActive == false) {
            playerBox.classList.add('animated', 'rotateInDownLeft');
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
        break;
      case 51: // Scissors [ 3 ]
        if (countActive == false) {
          gameInit();
        }
        else {
          scissors.classList.add('touch');
          while (gameActive == true && battleActive == false) {
            playerBox.classList.add('animated', 'rotateInDownLeft');
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
        break;
      case 27: // Main Menu [ Esc ]
        // Go to Menu
        // Resume?
        // Exit?
        // Show modal window
        break;
      case 13: // Input Value [ Enter ]
        // Input value of name and attach to Player Name
        break;
      default: // New Game [ Any ]
        gameInit();
    }
  });
  document.addEventListener('keyup', function(e) {  
    switch (e.keyCode) {
      case 49: // Rock [ 1 ]
        rock.classList.remove('touch');
        break;
      case 50: // Paper [ 2 ]
        paper.classList.remove('touch');
        break;
      case 51: // Scissors [ 3 ]
        scissors.classList.remove('touch');
        break;
    }
  });

  // New Game
  var newGame = document.getElementById('new');

  newGame.addEventListener('click', function() {
    gameInit();
  });

};