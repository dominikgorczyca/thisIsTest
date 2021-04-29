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
            for (let j = 0; j < 1; j++) {
                let character = document.createElement("DIV");
                character.className = characters[j].name;
                element.append(character);
            }
        } else {
            element.className = "wall"
            element.style.backgroundPosition = `-${gameArray[i] * 20}px 0`;
        }

        gameBoard.append(element);
    }
    elements = Array.from(gameBoard.children);
}
function setStartingProperties() {
    characters[0].characterNode = elements[characters[0].position].children[0];
    characters[0].characterNode.classList.add(`yellow-visible`);
    root.setProperty(`--yellow-sprite-y`, "0px")
}

function characterMove(i) {
    characters[i].nextPosition = getNewPosition(i);

    if (elements[characters[i].nextPosition].classList.contains("wall")) {
        setTimeout(() => {
            characterMove(i);
        }, 50)
        return;
    }

    root.setProperty(`--yellow-sprite-y`, `-${yellowSprite[characters[i].direction]}px`);

    getTransition(i);
    changePosition(i);
}
function getNewPosition(i) {
    if (characters[i].directionNew != undefined) {
        const newPosition = characters[i].position + positionChange[characters[i].directionNew];

        if (!elements[newPosition].classList.contains("wall")) {
            characters[i].direction = characters[i].directionNew;
            characters[i].directionNew = undefined;
        }
    }

    return characters[i].position + positionChange[characters[i].direction];
}

function getTransition(i) {
    const transitionMove = {
        "ArrowUp": "Y(-20px)",
        "ArrowDown": "Y(20px)",
        "ArrowRight": "X(20px)",
        "ArrowLeft": "X(-20px)",
    }

    characters[i].characterNode.style.transform = `translate${transitionMove[characters[i].direction]}`;
}
async function changePosition(i) {
    await new Promise(resolve => {
        characters[i].characterNode.classList.add(`yellow-animation-move`);
        
        setTimeout(() => {
            characters[i].characterNode.classList.remove(`yellow-animation-move`, `yellow-visible`);
            characters[i].characterNode.style.transform = "";
            characters[i].position = characters[i].nextPosition;
            characters[i].characterNode = elements[characters[i].position].children[i];
            characters[i].characterNode.classList.add(`yellow-visible`);

            resolve("")
        }, 200)

    })
    characterMove(i)
}
                       