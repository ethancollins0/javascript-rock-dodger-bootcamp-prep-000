/**
 * Don't change these constants!
 */
const DODGER = document.getElementById('dodger')
const GAME = document.getElementById('game')
const GAME_HEIGHT = 400
const GAME_WIDTH = 400
const LEFT_ARROW = 37 // use e.which!
const RIGHT_ARROW = 39 // use e.which!
const ROCKS = []
const START = document.getElementById('start')

var gameInterval = null

/**
 * Be aware of what's above this line,
 * but all of your work should happen below.
 */

function checkCollision(rock) {
  const top = positionToInteger(rock.style.top)

  // rocks are 20px high
  // DODGER is 20px high
  // GAME_HEIGHT - 20 - 20 = 360px;
  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)

    //FIXME: The DODGER is 40 pixels wide -- how do we get the right edge?
    const dodgerRightEdge = (positionToInteger(DODGER.style.left) + 40);

    const rockLeftEdge = positionToInteger(rock.style.left)

    // FIXME: The rock is 20 pixel's wide -- how do we get the right edge?
    const rockRightEdge = (positionToInteger(rock.style.left) + 20);

    if ((rockLeftEdge < dodgerLeftEdge) && (rockRightEdge > dodgerLeftEdge)) {
      return true
    } else if ((rockLeftEdge >= dodgerLeftEdge) && (rockRightEdge <= dodgerRightEdge)) {
      return true
    } else if ((rockLeftEdge < dodgerRightEdge) && (rockRightEdge > dodgerRightEdge)) {
      return true
    } else {
      return false
    }
    }
  }

function createRock(x) {
  const rock = document.createElement('div')

  rock.className = 'rock'
  rock.style.left = `${x}px`

  // Hmmm, why would we have used `var` here?
  var top = 0

  rock.style.top = top

  GAME.appendChild(rock)
window.requestAnimationFrame(moveRock)
return rock
  /**
   * Now that we have a rock, we'll need to append
   * it to GAME and move it downwards.
   */
}

  /**
   * This function moves the rock. (2 pixels at a time
   * seems like a good pace.)
   */
  function moveRock() {
    var rock = document.getElementsByClassName('rock')
    for (i = 0; i < rock.length; i++) {
      if (checkCollision(rock[i]) === true) {
        endGame()
        return
      }
      if (positionToInteger(rock[i].style.top) > 400) {
        rock[i].remove()
      } else {
        rockTop = positionToInteger(rock[i].style.top)
        rock[i].style.top = `${rockTop + 74}px`
      }

    }

  ROCKS.push(rock)

  // Finally, return the rock element you've created
  return rock
}

/**
 * End the game by clearing `gameInterval`,
 * removing all ROCKS from the DOM,
 * and removing the `moveDodger` event listener.
 * Finally, alert "YOU LOSE!" to the player.
 */
function endGame() {
  clearInterval(gameInterval)
    var rockList = document.getElementsByClassName('rock')
    while (0 > rockList.length) {
      rockList[0].parentNode.removeChild(rockList[0])
    }

  window.removeEventListener('keydown', moveDodger)
  alert('YOU LOSE!')
}

function moveDodger(e) {
    if (e.which !== LEFT_ARROW && e.which !== RIGHT_ARROW) {
      return
    }

  if (e.which === LEFT_ARROW) {
    moveDodgerLeft()
  }

  if (e.which === RIGHT_ARROW) {
    moveDodgerRight()
  }

  if (e.which !== LEFT_ARROW || e.which !== RIGHT_ARROW) {
    e.stopPropagation()
    e.preventDefault()
  }
}

function moveDodgerLeft() {
  var leftNumbers = DODGER.style.left.replace('px', '')
  var left = parseInt(leftNumbers, 10)

  if (left > 0) {
    DODGER.style.left = `${left - 4}px`
  }
}

function moveDodgerRight() {
  var leftNumbers = DODGER.style.left.replace('px', '')
  var left = parseInt(leftNumbers, 10)

  if (left < 360) {
    DODGER.style.left = `${left + 4}px`
  }
}

/**
 * @param {string} p The position property
 * @returns {number} The position as an integer (without 'px')
 */
function positionToInteger(p) {
  return parseInt(p.split('px')[0]) || 0
}

function start() {
  window.addEventListener('keydown', moveDodger)

  START.style.display = 'none'

  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)))
  }, 1000)
}
