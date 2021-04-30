const gameBoard = document.getElementById("game-board");
const root = document.documentElement.style;

let elements;
let characterNode;
let position = 658;

makeLevel();

function makeLevel() {
    for (let i = 0; i < 868; i++) {
        const element = document.createElement("DIV");
        element.className = "wall"
        element.style.backgroundPosition = `-120px`;

        let character = document.createElement("DIV");
        character.className = "yellow";
        element.append(character);

        gameBoard.append(element);
    }
    elements = Array.from(gameBoard.children);
    characterNode = elements[658].children[0];
    characterMove();
}


function characterMove() {
    getTransition();
    changePosition();
}

function getTransition() {
    characterNode.style.transform = `translateX(-20px)`;
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
                       