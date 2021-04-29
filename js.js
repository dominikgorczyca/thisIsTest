const characters = [{
    name: "yellow",
    characterNode: undefined,
}]

characters[0].characterNode = document.getElementsByClassName("yellow")[0];
document.documentElement.style.setProperty(`--${characters[0].name}-sprite-y`, "0px")
characters[0].characterNode.style.transform = `translateX(1rem)`;


changePosition(0);

async function changePosition(i) {
    await new Promise(resolve => {
        setTimeout(() => {
            characters[i].characterNode.classList.remove(`${characters[i].name}-animation-move`, `${characters[i].name}-visible`);

            resolve("")
        }, 1000)
    })

    //do other stuff
}