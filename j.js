const gameBoard = document.getElementById("game-board");
const root = document.documentElement.style;

let elements;
let characterNode;
let position = 658;

makeLevel();

function makeLevel() {
    for (let i = 0; i < 868; i++) {
        const element = document.createElement("DIV");
        element.className = "wall";
        
        let character = document.createElement("DIV");
        character.className = "yellow";
        element.append(character);

        let image = document.createElement("img");
        image.className = "image";
        element.append(image);

        gameBoard.append(element);
    }
    elements = Array.from(gameBoard.children);
    characterNode = elements[658].children[0];
    console.log(elements[658].children[0])
    changePosition();
}
function changePosition() {
    root.setProperty(`--yellow-sprite-y`, `-32px`);
    characterNode.style.transform = `translateX(-20px)`;

    setTimeout(() => {
        characterNode.style.transform = "";
        characterNode.classList.remove(`yellow-visible`);
        position = position - 1;
        characterNode = elements[position].children[0];
        characterNode.classList.add(`yellow-visible`);
        changePosition()
    }, 200)
}