const gameBoard = document.getElementById("game-board");
const root = document.documentElement.style;

let elements;
let characterNode;
let position = 658;

makeLevel();

function makeLevel() {
    for (let i = 0; i < 868; i++) {
        const element = document.createElement("DIV");
        element.style.backgroundPosition = `0 0`;

        let character = document.createElement("DIV");
        character.className = "yellow";
        element.append(character);
        gameBoard.append(element);
    }
    elements = Array.from(gameBoard.children);
    characterNode = elements[658].children[0];
    changePosition();
}
function changePosition() {
    root.setProperty(`--yellow-sprite-y`, `-32px`);
    characterNode.style.transform = `translateX(-20px)`;

    setTimeout(() => {
        characterNode.classList.remove(`yellow-visible`);
        characterNode.style.transform = "";
        position = position - 1;
        characterNode = elements[position].children[0];
        characterNode.classList.add(`yellow-visible`);
        changePosition()
    }, 200)
}
                       