
const container = document.querySelector(".grid-container");
let gridNumber = 16;
const gridButton = document.querySelector(".grid-button");
const clearButton = document.querySelector(".clear-button");
const gridSpace = 200;
let backgroundColor = "green";

generateGrid(gridNumber);
function generateGrid(gridNumber) {
    for (let i = 0; i < gridNumber; i++) {
        const row = document.createElement("div");
        row.classList.add("row");
        for (let j = 0; j < gridNumber; j++) {
            const div = document.createElement("div");
            // div.setAttribute("style", `background-color: green; padding: ${gridSpace/gridNumber} px;`)
            div.style.padding = `${gridSpace/gridNumber}px`;
            div.classList.add("grid");
            // let randomColor = Math.floor(Math.random()*16777215).toString(16); // random color
            let rgbNumber = 255;
            div.addEventListener("mouseover", (e) => {
                // e.target.style.backgroundColor = `#${randomColor}`; // random color
                e.target.style.backgroundColor = `rgb(${rgbNumber}, ${rgbNumber}, ${rgbNumber})`;
                rgbNumber -= 0.1 * 255;
            });
            row.appendChild(div);
        }
        container.appendChild(row);
    }
}


gridButton.addEventListener("click", (e) => {
    do{
        gridNumber = prompt("what number grid would you like? Enter a number between 1 and 100");
    }
    while (gridNumber < 1 || gridNumber > 100);
   
    removeGrid();
    generateGrid(gridNumber);
});

clearButton.addEventListener("click", (e) => {
    const grid = document.querySelectorAll(".grid");
    grid.forEach((element) => {
        element.style.backgroundColor = backgroundColor;
    });
});

// function to remove all grid elements
function removeGrid() { 
    const count = container.childElementCount;
    for (let i = 0; i < count; i++) { // container.childElementCount is going down when you remove children so variable was needed
        container.removeChild(container.lastChild);
    }
}



