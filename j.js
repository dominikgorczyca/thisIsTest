const gameBoard = document.getElementById("game-board");
const root = document.documentElement.style;

//What change is made to current position after going in some direction
const positionChange = {
    "ArrowRight": 1,
    "ArrowLeft": -1,
    "ArrowUp": -28,
    "ArrowDown": 28,
}

const characters = [{
    name: "yellow",
    direction: "ArrowLeft",
    directionNew: undefined,
    position: 658,
    nextPosition: undefined,
    characterNode: undefined,
}];

let elements;
window.addEventListener("keydown", getDirection);

const yellowSprite = {
    "ArrowRight": 0,
    "ArrowLeft": 32,
    "ArrowUp": 64,
    "ArrowDown": 96,
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
            
startLevel();

function startLevel() {
    makeLevel();
    setStartingProperties();
    characterMove(0);
}
function makeLevel() {
    const gameArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
        0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0,
        0, 262, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 262, 0,
        0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0,
        0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
        0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0,
        0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0,
        0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0,
        0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0,
        0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
        0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0,
        0, 1, 0, 0, 0, 0, 1, 0,  0,  0,  0, 0, 1, 0, 0, 1, 0,  0,  0,  0, 0, 1, 0, 0,  0, 0, 1, 0,
        0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0,
        0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0,
        0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0,
        0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0,
        0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0,
        0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0,
        0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3
    ]

    for (let i = 0; i < gameArray.length; i++) {
        const element = document.createElement("DIV");

        if (gameArray[i] == 1) {
            for (let j = 0; j < 1; j++) {
                let character = document.createElement("DIV");
                character.className = characters[j].name;
                element.append(character);
            }
        } else {
            element.className = "wall"
            element.style.backgroundPosition = `-180px 0`;
        }

        gameBoard.append(element);
    }
    elements = Array.from(gameBoard.children);
}
function setStartingProperties() {
    characters[0].characterNode = elements[characters[0].position].children[0];
    characters[0].characterNode.classList.add(`yellow-visible`);
}

function characterMove(i) {
    characters[0].nextPosition = getNewPosition(i);

    if (elements[characters[0].nextPosition].classList.contains("wall")) {
        setTimeout(() => {
            characterMove(i);
        }, 50)
        return;
    }

    root.setProperty(`--yellow-sprite-y`, `-${yellowSprite[characters[0].direction]}px`);

    getTransition(i);
    changePosition(i);
}
function getNewPosition(i) {
    if (characters[0].directionNew != undefined) {
        const newPosition = characters[0].position + positionChange[characters[0].directionNew];

        if (!elements[newPosition].classList.contains("wall")) {
            characters[0].direction = characters[0].directionNew;
            characters[0].directionNew = undefined;
        }
    }

    return characters[0].position + positionChange[characters[0].direction];
}

function getTransition(i) {
    const transitionMove = {
        "ArrowUp": "Y(-20px)",
        "ArrowDown": "Y(20px)",
        "ArrowRight": "X(20px)",
        "ArrowLeft": "X(-20px)",
    }

    characters[0].characterNode.style.transform = `translate${transitionMove[characters[0].direction]}`;
}
function changePosition(i) {
    characters[0].characterNode.classList.add(`yellow-animation-move`);
        
    setTimeout(() => {
        characters[0].characterNode.classList.remove(`yellow-animation-move`, `yellow-visible`);
        characters[0].characterNode.style.transform = "";
        characters[0].position = characters[0].nextPosition;
        characters[0].characterNode = elements[characters[0].position].children[0];
        characters[0].characterNode.classList.add(`yellow-visible`);
        characterMove(i)
    }, 200)
    
}
                       