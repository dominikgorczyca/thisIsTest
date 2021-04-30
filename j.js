const gameBoard = document.getElementById("game-board");
const root = document.documentElement.style;

let elements;
let characterNode;
let position = 658;


startLevel();

function startLevel() {
    makeLevel();
    characterMove(0);
}
function makeLevel() {
    for (let i = 0; i < 868; i++) {
        const element = document.createElement("DIV");
        element.className = "wall"
        element.style.backgroundPosition = `-240px 0`;

        let character = document.createElement("DIV");
        character.className = "yellow";
        element.append(character);

        gameBoard.append(element);
    }
    elements = Array.from(gameBoard.children);
    characterNode = elements[658].children[0];
}


function characterMove() {

    root.setProperty(`--yellow-sprite-y`, `-32px`);

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

    characterNode.style.transform = `translate${transitionMove["ArrowLeft"]}`;
}
function changePosition() {
    characterNode.classList.add(`yellow-animation-move`);
        
    setTimeout(() => {
        characterNode.classList.remove(`yellow-animation-move`, `yellow-visible`);
        characterNode.style.transform = "";
        position = position - 1;
        characterNode = elements[position].children[0];
        characterNode.classList.add(`yellow-visible`);
        characterMove()
    }, 200)
}
                       