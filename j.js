'use strict';
const game = document.getElementById("game");
const gameBoard = document.getElementById("game-board");
const start = document.getElementById("start");
const scoreElement = document.getElementById("score");
const lives = document.getElementById("lives");
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
const eatenSprite = {
    "ArrowRight": 25.6,
    "ArrowLeft": 28.8,
    "ArrowUp": 32,
    "ArrowDown": 35.2,
}
const characters = [{
    name: "yellow",
    direction: "ArrowLeft",
    directionNew: undefined,
    position: 658,
    nextPosition: undefined,
    mode: "normal",
    status: "normal",
    characterNode: undefined,
    animationLength: undefined,
    animationStart: undefined,
},
{
    name: "red",
    direction: "ArrowLeft",
    directionOld: undefined,
    directionList: ["ArrowUp", "ArrowUp", "ArrowUp"],
    progress: 0,
    position: 38,
    nextPosition: undefined,
    scatterTarget: 27,
    mode: "normal",
    status: "normal",
    characterNode: undefined,
    animationLength: undefined,
    animationStart: undefined,
},
{
    name: "pink",
    direction: "ArrowDown",
    directionOld: undefined,
    directionList: ["ArrowDown", "ArrowUp", "ArrowUp", "ArrowUp", "ArrowUp"],
    progress: 0,
    position: 406,
    nextPosition: undefined,
    scatterTarget: 0,
    mode: "normal",
    status: "normal",
    characterNode: undefined,
    animationLength: undefined,
    animationStart: undefined,
},
{
    name: "blue",
    direction: "ArrowUp",
    directionOld: undefined,
    directionList: ["ArrowUp", "ArrowDown", "ArrowDown", "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowUp", "ArrowRight", "ArrowRight", "ArrowUp", "ArrowUp", "ArrowUp"],
    progress: 0,
    position: 404,
    nextPosition: undefined,
    scatterTarget: 867,
    mode: "normal",
    status: "normal",
    characterNode: undefined,
    animationLength: undefined,
    animationStart: undefined,
},
{
    name: "orange",
    direction: "ArrowUp",
    directionOld: undefined,
    directionList: ["ArrowUp", "ArrowDown", "ArrowDown", "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowUp", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowLeft", "ArrowUp", "ArrowUp", "ArrowUp"],
    progress: 0,
    position: 408,
    nextPosition: undefined,
    scatterTarget: 840,
    mode: "normal",
    status: "normal",
    characterNode: undefined,
    animationLength: undefined,
    animationStart: undefined,
},
];
let elements;
let points = 0;
let collisionInterval;
let ghostMode;
let ghostModeInterval;
let changingBackInterval
let isFrightenedWhite = false;
let ghostsEaten = 0;
let newLevel = true;
let score = 0;
let livesLost = 0;
let gameStartLength = 4200;
let whichMunch = 1;

document.addEventListener("click", startGame); 

function startGame() {
    game.style.display = "block ";
    startLevel();
    document.removeEventListener("click", startGame)
}

function startLevel() {
    if (newLevel == true) {
        makeLevel();
    }
    setStartingProperties();
    setTimeout(() => {
        lives.children[livesLost].style.visibility = "hidden";
        livesLost++;
        characterMove(0);
        characterMove(1);

        collisionInterval = setInterval(checkCollisions, 10)
        ghostModeInterval = setTimeout(changeModes, 5000);
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
            if(gameArray[i] / 100 > 1) {
                let character = document.createElement("DIV");
                character.className = Math.floor(gameArray[i] / 100) == 1 ? "point" : "big-point";
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
    elements = Array.from(gameBoard.children).splice(1);
    transformStartingElements();
}
function setStartingProperties() {
    newLevel = undefined;
    window.removeEventListener("keydown", getDirection);

    clearTimeout(ghostModeInterval);
    game.style.visibility = "visible";
    start.style.display = "block";
    ghostMode = "scatter";
    ghostsEaten = 0;
    scoreElement.innerHTML = "Score " + score;

    for (let i = 0; i < 2; i++) {
        characters[i].progress = 0;
        characters[i].position = startingPositions[i];
        characters[i].direction = i < 2 ? "ArrowLeft" : characters[i].directionList[0];
        characters[i].characterNode = elements[characters[i].position].children[i];
        characters[i].characterNode.classList.add(`${characters[i].name}-visible`);
        characters[i].mode = "normal";
        characters[i].status = "normal";

        if (i == 0) {
            root.setProperty(`--${characters[i].name}-sprite-x`, "-6.4rem")
            root.setProperty(`--${characters[i].name}-sprite-y`, "0rem")
            characters[i].directionNew = undefined;
        } else {
            getSprite(i);
        }
    }

    setTimeout(() => {
        window.addEventListener("keydown", getDirection);
        start.style.display = "none";

        getSprite(0);
    }, gameStartLength)
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
function changeModes() {
    if (ghostMode === "scatter") {
        ghostMode = "chase";
        ghostModeInterval = setTimeout(changeModes, 25000);
    } else if (ghostMode === "chase") {
        ghostMode = "scatter";
        ghostModeInterval = setTimeout(changeModes, 5000);
    }
    changeGhostDirections();
}
function checkCollisions() {
    const yellowTransform = new WebKitCSSMatrix(getComputedStyle(characters[0].characterNode).transform);
    let yellowTranslateX = yellowTransform.e;
    let yellowTranslateY = yellowTransform.f;

    for (let i = 1; i < 2; i++) {
        
        if (characters[0].status == "freeze") {
            clearInterval(collisionInterval)
            return;
        }

        const distance = calculateDistance(characters[0].position, characters[i].position)

        const ghostTransform = new WebKitCSSMatrix(getComputedStyle(characters[i].characterNode).transform);
        let ghostTranslateX = ghostTransform.e;
        let ghostTranslateY = ghostTransform.f;

        let requirement;
        let yellowNewPosition;
        let ghostNewPosition;

        if(distance == 0) {
           requirement -30;
           yellowNewPosition = characters[0].position + positionChange[characters[0].direction] + oppositeDirection[positionChange[characters[i].direction]];
           ghostNewPosition = characters[i].position + positionChange[characters[i].direction] + oppositeDirection[positionChange[characters[0].direction]]; 
        }
        if (distance == 1) {
            requirement = 10;
            yellowNewPosition = characters[0].position + positionChange[characters[0].direction];
            ghostNewPosition = characters[i].position + positionChange[characters[i].direction];
        } else if (distance == 4) {
            requirement = 30;
            yellowNewPosition = characters[0].position + positionChange[characters[0].direction] * 2;
            ghostNewPosition = characters[i].position + positionChange[characters[i].direction] * 2;
        } else if (distance == 2) {
            requirement = 25;
            yellowNewPosition = characters[0].position + positionChange[characters[0].direction] + positionChange[oppositeDirection[characters[i].direction]];
            ghostNewPosition = characters[i].position + positionChange[characters[i].direction] + positionChange[oppositeDirection[characters[0].direction]];
        } else if (distance != 0) {
            continue;
        }
        if(window.innerWidth < 600 || window.innerHeight < 700) {
            requirement /= 2;
        }


        if (yellowNewPosition == characters[i].position) {
            yellowTranslateX = Math.abs(yellowTranslateX);
            yellowTranslateY = Math.abs(yellowTranslateY);
        } else {
            yellowTranslateX = -Math.abs(yellowTranslateX);
            yellowTranslateY = -Math.abs(yellowTranslateY);
        }
        if (ghostNewPosition == characters[0].position) {
            ghostTranslateY = Math.abs(ghostTranslateY);
            ghostTranslateX = Math.abs(ghostTranslateX);
        } else {
            ghostTranslateY = -Math.abs(ghostTranslateY);
            ghostTranslateX = -Math.abs(ghostTranslateX);
        } 

        const transformDistance = yellowTranslateY + ghostTranslateY + yellowTranslateX + ghostTranslateX;


        if (transformDistance > requirement) {
            if (characters[i].mode == "frightened") {
                gameFreeze(i);
            } else if (characters[i].mode == "normal") {
                gameOver();
            }
        }
    }
}
//i - character index
function characterMove(i) {
    if (characters[i].status == "freeze") return;

    characters[i].nextPosition = getNewPosition(i);

    if (elements[characters[i].nextPosition].classList.contains("wall")) {
        setTimeout(() => {
            characterMove(i);
        }, 50)
        return;
    }

    getAnimationLength(i);
    getSprite(i)
    getTransition(i);
    changePosition(i);
}
function getNewPosition(i) {
    if (i == 0) {
        getYellowDirection(i);

        // forcing going backwards after changing modes. Without it, turning back is ignored in some situations. 
    } else if (characters[i].direction != oppositeDirection[characters[i].directionOld]) {
        if (characters[i].mode == "frightened") {
            getRandomDirection(i);
        } else {
            getGhostDirection(i);
        }
    } else {
        characters[i].directionOld = characters[i].direction;
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
    let newDirection = characters[i].directionOld = characters[i].direction;
    let biggestDistance = 100000;
    let target;

    if (characters[i].mode == "eaten") {
        target = 322;
    } else if (ghostMode == "scatter") {
        target = characters[i].scatterTarget
    } else {
        target = getChaseTarget(i) 
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
function getRandomDirection(i) {
    let nextPosition = characters[i].position + positionChange[characters[i].direction];

    if ((characters[i].position == 392 && nextPosition == 391) ||
        (characters[i].position == 419 && nextPosition == 420)) {
        return;
    }

    let newDirection
    do {
        const random = ~~(Math.random() * 4);
        newDirection = Object.keys(positionChange)[random];

        nextPosition = characters[i].position + positionChange[newDirection];

    } while (elements[nextPosition].classList.contains("wall") ||
        oppositeDirection[newDirection] == characters[i].direction)

    characters[i].direction = newDirection;
}
function getChaseTarget(i) {
    switch (i) {
        case 1:
            if(characters[0].position == characters[i].position && !elements[characters[0].nextPosition].classList.contains("wall")) {
                return characters[0].position + positionChange[characters[0].direction];
            }
            return characters[0].position;
        case 2:
            return characters[0].position + positionChange[characters[0].direction] * 2;
        case 3:
            return getBlueTarget();
        case 4:
            const yellowOrangeDistance = calculateDistance(characters[0].position, characters[4].position);
            if (yellowOrangeDistance < 64) {
                return 840;
            } else {
                return characters[0].position;
            }
    }
}
function getBlueTarget() {
    const yellowPosition = characters[0].position + positionChange[characters[0].direction];
    const yellowRedDistanceX = yellowPosition % 28 - characters[1].position % 28;
    const yellowRedDistanceY = ~~(yellowPosition / 28) - ~~(characters[1].position / 28);

    let bluePositionX = yellowPosition % 28 + yellowRedDistanceX;

    if (bluePositionX < 0) {
        bluePositionX = 0;
    } else if (bluePositionX > 27) {
        bluePositionX = 27;
    }

    const bluePositionY = ~~(yellowPosition / 28) + yellowRedDistanceY;

    return bluePositionX + bluePositionY * 28;
}
function calculateDistance(target, newGhostPosition) {
    const distanceX = Math.floor(target / 28) - Math.floor(newGhostPosition / 28);
    const distanceY = target % 28 - newGhostPosition % 28;

    return distanceX ** 2 + distanceY ** 2;
}
function getAnimationLength(i) {
    let animationLength;
    if (i == 0) {
        animationLength = characters[i].mode == "hasEaten" ? 210 : 190;
    } else {
        const tunnel = [392, 393, 394, 395, 396, 419, 418, 417, 416, 415]

        if (characters[i].mode == "eaten") {
            if (characters[i].nextPosition === 322) {
                animationLength = characters[i].direction == "ArrowLeft" ? 25 : 75;
            } else {
                animationLength = 50;
            }
        } else if (tunnel.includes(characters[i].position) || tunnel.includes(characters[i].nextPosition)) {
            animationLength = 350;
            //if it started or it got revived
        } else if (characters[i].mode == "frightened") {
            animationLength = 300;
        } else if (
            characters[i].direction == characters[i].directionOld ||
            characters[i].direction == oppositeDirection[characters[i].directionOld]) {
            animationLength = 200;
        } else {
            animationLength = 220;
        }
    }

    if (characters[i].characterNode.style.transform == 'translateX(-1rem)') {
        animationLength /= 1.5;
    }

    root.setProperty(`--${characters[i].name}-animation-length`, animationLength + "ms");
    characters[i].animationLength = animationLength;
}
function getSprite(i) {
    let spriteX;
    let spriteY;
    if (i == 0) {
        spriteX = 3.2;
        spriteY = yellowSprite[characters[i].direction];
    } else {
        if (characters[i].mode == "normal") {
            spriteX = ghostSprite[characters[i].direction];
            spriteY = 9.6 + 3.2 * i;
        } else if (characters[i].mode == "frightened") {
            spriteX = isFrightenedWhite == true ? 32 : 25.6;
            spriteY = 12.8;
        } else {
            spriteX = eatenSprite[characters[i].direction];
            spriteY = 16;
        }
    }

    root.setProperty(`--${characters[i].name}-sprite-x`, `-${spriteX}rem`);
    root.setProperty(`--${characters[i].name}-sprite-y`, `-${spriteY}rem`);
}
function getTransition(i) {
    const isGoingToRespawn = characters[i].mode == "eaten" && characters[i].nextPosition == 322;
    const transitionMove = {
        "ArrowUp": "Y(-2rem)",
        "ArrowDown": "Y(2rem)",
        "ArrowRight": isGoingToRespawn ? "X(1rem)" : "X(2rem)",
        "ArrowLeft": isGoingToRespawn ? "X(-3rem)" : "X(-2rem)",
    }

    characters[i].characterNode.style.transform = `translate${transitionMove[characters[i].direction]}`;
}
async function changePosition(i) {
    await new Promise(resolve => {
        if (characters[i].mode != "eaten") {
            characters[i].characterNode.classList.add(`${characters[i].name}-animation-move`);
        }
        characters[i].animationStart = performance.now();
        setTimeout(() => {
            if (characters[i].status == "freeze") return;

            characters[i].characterNode.classList.remove(`${characters[i].name}-animation-move`, `${characters[i].name}-visible`);
            characters[i].characterNode.style.transform = "";
            characters[i].position = characters[i].nextPosition;
            characters[i].characterNode = elements[characters[i].position].children[i];
            characters[i].characterNode.classList.add(`${characters[i].name}-visible`);

            if (i == 0) {
                eatPoint(i);
            } else if (characters[i].mode == "eaten" && characters[i].position === 322) {
                ghostRetreat(i);
            }

            resolve("")
        }, characters[i].animationLength)

    })
    characterMove(i)
}
function eatPoint(i) {
    const point = elements[characters[i].position].children[2];

    if (point != undefined) {
        points++;
        characters[i].mode = "hasEaten";
        if (point.classList.contains("big-point")) {
            makeGhostsScared();
            score += 50;
        } else {
            score += 10;
        }

        scoreElement.innerHTML = "Score " + score;
        point.remove();

        if (points == 244) {
            gameWin();
            freezeCharacters();
        }
    } else {
        characters[i].mode = "normal";
    }
}
function changeGhostDirections() {
    for (let i = 1; i < 2; i++) {
        if (characters[i].mode == "normal" &&
            !characters[i].characterNode.className.includes("revive")) {
            characters[i].directionOld = characters[i].direction;
            characters[i].direction = oppositeDirection[characters[i].direction];
        }
    }
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
                                   