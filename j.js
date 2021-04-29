'use strict';
const game = document.getElementById("game");
const gameBoard = document.getElementById("game-board");
const root = document.documentElement.style;

//What change is made to current position after going in some direction
const startingPositions = [658, 322, 406, 404, 408];
const positionChange = {
    "ArrowRight": 1,
    "ArrowLeft": -1,
    "ArrowUp": -28,
    "ArrowDown": 28,
}

const oppositeDirection = {
    "ArrowUp": "ArrowDown",
    "ArrowDown": "ArrowUp",
    "ArrowRight": "ArrowLeft",
    "ArrowLeft": "ArrowRight",
}
const yellowSprite = {
    "ArrowRight": 0,
    "ArrowLeft": 3.2,
    "ArrowUp": 6.4,
    "ArrowDown": 9.6,
}
const ghostSprite = {
    "ArrowRight": 0,
    "ArrowLeft": 6.4,
    "ArrowUp": 12.8,
    "ArrowDown": 19.2,
}
const characters = [{
    name: "yellow",
    direction: "ArrowLeft",
    directionNew: undefined,
    position: 658,
    nextPosition: undefined,
    mode: "normal",
    characterNode: undefined,
    animationStart: undefined,
},
{
    name: "red",
    direction: "ArrowLeft",
    position: 322,
    nextPosition: undefined,
    scatterTarget: 27,
    mode: "normal",
    characterNode: undefined,
    animationStart: undefined,
},
];
let elements;
let points = 0;
let collisionInterval;
let ghostMode;
let ghostModeInterval;
let changingBackInterval
let gameStartLength = 4200;
let whichMunch = 1;

document.addEventListener("click", startGame); 

function startGame() {
    game.style.display = "block ";
    startLevel();
    document.removeEventListener("click", startGame)
}

function startLevel() {
    makeLevel();
    setStartingProperties();
    setTimeout(() => {
        characterMove(0);
        characterMove(1);

    }, 100)
}
function makeLevel() {
    const gameArray = [0, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 18, 19, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 1,
        9, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 11, 13, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 9,
        9, 126, 4, 10, 10, 5, 126, 4, 10, 10, 10, 5, 126, 11, 13, 126, 4, 10, 10, 10, 5, 126, 4, 10, 10, 5, 126, 9,
        9, 262, 11, 25, 25, 13, 126, 11, 25, 25, 25, 13, 126, 11, 13, 126, 11, 25, 25, 25, 13, 126, 11, 25, 25, 13, 262, 9,
        9, 126, 6, 12, 12, 7, 126, 6, 12, 12, 12, 7, 126, 6, 7, 126, 6, 12, 12, 12, 7, 126, 6, 12, 12, 7, 126, 9,
        9, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 9,
        9, 126, 4, 10, 10, 5, 126, 4, 5, 126, 4, 10, 10, 10, 10, 10, 10, 5, 126, 4, 5, 126, 4, 10, 10, 5, 126, 9,
        9, 126, 6, 12, 12, 7, 126, 11, 13, 126, 6, 12, 12, 15, 14, 12, 12, 7, 126, 11, 13, 126, 6, 12, 12, 7, 126, 9,
        9, 126, 126, 126, 126, 126, 126, 11, 13, 126, 126, 126, 126, 11, 13, 126, 126, 126, 126, 11, 13, 126, 126, 126, 126, 126, 126, 9,
        2, 8, 8, 8, 8, 1, 126, 11, 16, 10, 10, 5, 26, 11, 13, 26, 4, 10, 10, 17, 13, 126, 0, 8, 8, 8, 8, 3,
        25, 25, 25, 25, 25, 9, 126, 11, 14, 12, 12, 7, 26, 6, 7, 26, 6, 12, 12, 15, 13, 126, 9, 25, 25, 25, 25, 25,
        25, 25, 25, 25, 25, 9, 126, 11, 13, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 11, 13, 126, 9, 25, 25, 25, 25, 25,
        25, 25, 25, 25, 25, 9, 126, 11, 13, 26, 0, 8, 8, 24, 24, 8, 8, 1, 26, 11, 13, 126, 9, 25, 25, 25, 25, 25,
        8, 8, 8, 8, 8, 3, 126, 6, 7, 26, 9, 26, 25, 25, 25, 25, 25, 9, 26, 6, 7, 126, 2, 8, 8, 8, 8, 8,
        26, 26, 26, 26, 26, 26, 126, 26, 26, 26, 9, 26, 26, 26, 26, 26, 26, 9, 26, 26, 26, 126, 26, 26, 26, 26, 26, 26,
        8, 8, 8, 8, 8, 1, 126, 4, 5, 26, 9, 25, 25, 25, 25, 25, 25, 9, 26, 4, 5, 126, 0, 8, 8, 8, 8, 8,
        25, 25, 25, 25, 25, 9, 126, 11, 13, 26, 2, 8, 8, 8, 8, 8, 8, 3, 26, 11, 13, 126, 9, 25, 25, 25, 25, 25,
        25, 25, 25, 25, 25, 9, 126, 11, 13, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 11, 13, 126, 9, 25, 25, 25, 25, 25,
        25, 25, 25, 25, 25, 9, 126, 11, 13, 26, 4, 10, 10, 10, 10, 10, 10, 5, 26, 11, 13, 126, 9, 25, 25, 25, 25, 25,
        0, 8, 8, 8, 8, 3, 126, 6, 7, 26, 6, 12, 12, 15, 14, 12, 12, 7, 26, 6, 7, 126, 2, 8, 8, 8, 8, 1,
        9, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 11, 13, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 9,
        9, 126, 4, 10, 10, 5, 126, 4, 10, 10, 10, 5, 126, 11, 13, 126, 4, 10, 10, 10, 5, 126, 4, 10, 10, 5, 126, 9,
        9, 126, 6, 12, 15, 13, 126, 6,  12,  12,  12, 7, 126, 6, 7, 126, 6,  12,  12,  12, 7, 126, 11, 14,  12, 7, 126, 9,
        9, 262, 126, 126, 11, 13, 126, 126, 126, 126, 126, 126, 126, 26, 26, 126, 126, 126, 126, 126, 126, 126, 11, 13, 126, 126, 262, 9,
        20, 10, 5, 126, 11, 13, 126, 4, 5, 126, 4, 10, 10, 10, 10, 10, 10, 5, 126, 4, 5, 126, 11, 13, 126, 4, 10, 22,
        21, 12, 7, 126, 6, 7, 126, 11, 13, 126, 6, 12, 12, 15, 14, 12, 12, 7, 126, 11, 13, 126, 6, 7, 126, 6, 12, 23,
        9, 126, 126, 126, 126, 126, 126, 11, 13, 126, 126, 126, 126, 11, 13, 126, 126, 126, 126, 11, 13, 126, 126, 126, 126, 126, 126, 9,
        9, 126, 4, 10, 10, 10, 10, 17, 16, 10, 10, 5, 126, 11, 13, 126, 4, 10, 10, 17, 16, 10, 10, 10, 10, 5, 126, 9,
        9, 126, 6, 12, 12, 12, 12, 12, 12, 12, 12, 7, 126, 6, 7, 126, 6, 12, 12, 12, 12, 12, 12, 12, 12, 7, 126, 9,
        9, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 9,
        2, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 3
    ]

    for (let i = 0; i < gameArray.length; i++) {
        const element = document.createElement("DIV");

        if (gameArray[i] > 25) {
            element.className = "blank"
            for (let j = 0; j < 2; j++) {
                let character = document.createElement("DIV");
                character.className = characters[j].name;
                element.append(character);
            }
        } else {
            element.className = "wall"
            element.style.backgroundPosition = `-${gameArray[i] * 2}rem 0`;
        }

        gameBoard.append(element);
    }

    points = 0;
    //first element is absolute text so we exclude it
    elements = Array.from(gameBoard.children);
    transformStartingElements();
}
function setStartingProperties() {
    window.addEventListener("keydown", getDirection);

    clearTimeout(ghostModeInterval);
    game.style.visibility = "visible";
    ghostMode = "scatter";

    for (let i = 0; i < 2; i++) {
        characters[i].progress = 0;
        characters[i].position = startingPositions[i];
        characters[i].direction = i < 2 ? "ArrowLeft" : characters[i].directionList[0];
        characters[i].characterNode = elements[characters[i].position].children[i];
        characters[i].characterNode.classList.add(`${characters[i].name}-visible`);
        characters[i].mode = "normal";

        if (i == 0) {
            root.setProperty(`--${characters[i].name}-sprite-x`, "-6.4rem")
            root.setProperty(`--${characters[i].name}-sprite-y`, "0rem")
            characters[i].directionNew = undefined;
        } else {
            root.setProperty(`--${characters[i].name}-sprite-x`, "-6.4rem")
            root.setProperty(`--${characters[i].name}-sprite-y`, "-12.8rem")
        }
    }
}
//Transform has to be set before class visible is added in setStartingProperties cause transform will transition instead of changing instantly
function transformStartingElements() {
    for (let i = 0; i < 2; i++) {
        if (i == 1) {
            for (let j = 1; j < 2; j++) {
                elements[startingPositions[i]].children[j].style.transform = "translateX(-1rem)";
            }
        } else {
            elements[startingPositions[i]].children[i].style.transform = "translateX(-1rem)";
        }
    }
}
//i - character index
function characterMove(i) {

    characters[i].nextPosition = getNewPosition(i);

    if (elements[characters[i].nextPosition].classList.contains("wall")) {
        setTimeout(() => {
            characterMove(i);
        }, 50)
        return;
    }
    getTransition(i);
    changePosition(i);
}
function getNewPosition(i) {
    if (i == 0) {
        getYellowDirection(i);

        // forcing going backwards after changing modes. Without it, turning back is ignored in some situations. 
    } else {
        getGhostDirection(i);
    } 
    let nextPosition = characters[i].position + positionChange[characters[i].direction];

    //for going through a tunnel
    if (characters[i].position == 392 && nextPosition == 391) {
        nextPosition = 419;
    } else if (characters[i].position == 419 && nextPosition == 420) {
        nextPosition = 392;
    }

    return nextPosition;
}
function getYellowDirection(i) {
    if (characters[i].directionNew != undefined) {
        const newPosition = characters[i].position + positionChange[characters[i].directionNew];

        if (!elements[newPosition].classList.contains("wall")) {
            characters[i].direction = characters[i].directionNew;
            characters[i].directionNew = undefined;
        }
    }
}
function getGhostDirection(i) {
    // so direction won't become undefined if newDirection has no move (like crossing tunnel)
    let newDirection = characters[i].direction;
    let biggestDistance = 100000;
    let target;
    
    if (ghostMode == "scatter") {
        target = characters[i].scatterTarget
    }

    for (let [direction, value] of Object.entries(positionChange)) {
        const newPosition = characters[i].position + value;
        const newDistance = calculateDistance(target, newPosition)

        if (newDistance < biggestDistance) {
            if (!elements[newPosition].classList.contains("wall") &&
                oppositeDirection[direction] != characters[i].direction) {
                biggestDistance = newDistance;
                newDirection = direction;
            }
        }
    }
    characters[i].direction = newDirection;
}
function calculateDistance(target, newGhostPosition) {
    const distanceX = Math.floor(target / 28) - Math.floor(newGhostPosition / 28);
    const distanceY = target % 28 - newGhostPosition % 28;

    return distanceX ** 2 + distanceY ** 2;
}

function getTransition(i) {
    const transitionMove = {
        "ArrowUp": "Y(-2rem)",
        "ArrowDown": "Y(2rem)",
        "ArrowRight": "X(2rem)",
        "ArrowLeft": "X(-2rem)",
    }

    characters[i].characterNode.style.transform = `translate${transitionMove[characters[i].direction]}`;
}
async function changePosition(i) {
    await new Promise(resolve => {
        characters[i].characterNode.classList.add(`${characters[i].name}-animation-move`);
        
        characters[i].animationStart = performance.now();
        setTimeout(() => {
            characters[i].characterNode.classList.remove(`${characters[i].name}-animation-move`, `${characters[i].name}-visible`);
            characters[i].characterNode.style.transform = "";
            characters[i].position = characters[i].nextPosition;
            characters[i].characterNode = elements[characters[i].position].children[i];
            characters[i].characterNode.classList.add(`${characters[i].name}-visible`);

            resolve("")
        }, 200)

    })
    characterMove(i)
}
function getDirection(e) {
    switch (e.key) {
        case "ArrowUp":
        case "ArrowDown":
        case "ArrowRight":
        case "ArrowLeft":
            characters[0].directionNew = e.key;
    }
}
                                   