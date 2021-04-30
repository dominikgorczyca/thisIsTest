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

const yellowSprite = {
    "ArrowRight": 0,
    "ArrowLeft": 32,
    "ArrowUp": 64,
    "ArrowDown": 96,
}

      
startLevel();

function startLevel() {
    makeLevel();
    characterMove(0);
}
function makeLevel() {
    for (let i = 0; i < 868; i++) {
        const element = document.createElement("DIV");
        element.className = "wall"
        element.style.backgroundPosition = `-200px 0`;

        let character = document.createElement("DIV");
        character.className = "yellow";
        element.append(character);

        gameBoard.append(element);
    }
    elements = Array.from(gameBoard.children);
    characters[0].characterNode = elements[characters[0].position].children[0];
}
function characterMove() {
    characters[0].nextPosition = characters[0].position + positionChange[characters[0].direction];

    root.setProperty(`--yellow-sprite-y`, `-${yellowSprite[characters[0].direction]}px`);

    getTransition();
    changePosition();
}

function getTransition() {
    const transitionMove = {
        "ArrowUp": "Y(-20px)",
        "ArrowDown": "Y(20px)",
        "ArrowRight": "X(20px)",
        "ArrowLeft": "X(-20px)",
    }

    characters[0].characterNode.style.transform = `translate${transitionMove[characters[0].direction]}`;
}
function changePosition() {
    characters[0].characterNode.classList.add(`yellow-animation-move`);
        
    setTimeout(() => {
        characters[0].characterNode.classList.remove(`yellow-animation-move`, `yellow-visible`);
        characters[0].characterNode.style.transform = "";
        characters[0].position = characters[0].nextPosition;
        characters[0].characterNode = elements[characters[0].position].children[0];
        characters[0].characterNode.classList.add(`yellow-visible`);
        characterMove()
    }, 200)
    
}
                       