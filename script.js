
const container = document.querySelector(".grid-container");
let gridNumber = 16;
const gridButton = document.querySelector(".grid-button");
const clearButton = document.querySelector(".clear-button");
const rainbowButton = document.querySelector(".rainbow-button");
const grayScaleButton = document.querySelector(".grayscale-button");
const eraseButton = document.querySelector(".erase-button");
const gridColorButton = document.querySelector(".grid-color-button")
let colorPicker = document.querySelector('#color-picker');
const changeColorButton = document.querySelector(".color-button");
let currentTool = "default";

const gridSpace = 200;
let backgroundColor = "white";
// let rgbNumber = 255;
let randomColor;


 


generateGrid(gridNumber, currentTool, backgroundColor);
function generateGrid(gridNumber, func = "default") {
    for (let i = 0; i < gridNumber; i++) {
        const row = document.createElement("div");
        row.classList.add("row");
        for (let j = 0; j < gridNumber; j++) {
            const div = document.createElement("div");
            // div.setAttribute("style", `background-color: green; padding: ${gridSpace/gridNumber} px;`)
            div.style.padding = `${gridSpace/gridNumber}px`;
            div.style.backgroundColor = backgroundColor;
            div.setAttribute("rgbNumber", "255");
            // randomColor.addEventListener("click", generateRandomColor);
            

            pickColor(div, func);
          
            row.appendChild(div);
        }
        container.appendChild(row);
    }
}


gridButton.addEventListener("click", (e) => {
    do{
        gridNumber = prompt("what number grid would you like? Enter a number between 1 and 64");
    }
    while (gridNumber < 1 || gridNumber > 64);
   
    removeGrid();
    generateGrid(gridNumber, currentTool);
});

// function to clear the grid
clearButton.addEventListener("click", (e) => {
    // const grid = document.querySelectorAll(".grid");
    // grid.forEach((element) => {
    //     element.style.backgroundColor = backgroundColor;
    //     element.style.rgbNumber = "255";
    // });
    removeGrid();
    generateGrid(gridNumber, currentTool);
});

// function to remove all grid elements

function removeGrid() { 
    const count = container.childElementCount;
    for (let i = 0; i < count; i++) { // container.childElementCount is going down when you remove children so variable was needed
        container.removeChild(container.lastChild);
    }
}

function generateRandomColor(e){
    randomColor = Math.floor(Math.random()*16777215).toString(16);
    e.target.style.backgroundColor = `#${randomColor}`;
}

// rainbowButton.addEventListener("click", generateRandomColor);
// grayScaleButton.addEventListener("click", generateGrayScale);
function generateGrayScale(e){
    rgbNumber = e.target.getAttribute("rgbNumber");
    e.target.style.backgroundColor = `rgb(${rgbNumber}, ${rgbNumber}, ${rgbNumber})`;
    rgbNumber -= 0.1 * 255;
    e.target.setAttribute("rgbNumber", rgbNumber);
}

function erase(e){
    e.target.style.backgroundColor = backgroundColor;
}

function generateGridColor(e){
    backgroundColor = colorPicker.value;
    for (row of container.children)
        for (div of row.children)
            div.style.backgroundColor = backgroundColor;
}


function pickColor(div, func){

    rainbowButton.addEventListener("click", (e) => {
        div.addEventListener("mouseover", generateRandomColor);
        currentTool = "generateRandomColor";
    });

    grayScaleButton.addEventListener("click", (e) => {
        div.addEventListener("mouseover", generateGrayScale);
        currentTool = "generateGrayScale";
    });

    eraseButton.addEventListener("click", (e) => {
        div.addEventListener("mouseover", erase);
        currentTool = "erase";
    });

    gridColorButton.addEventListener("click", generateGridColor);
    // grayScaleButton.addEventListener("click", generateGrayScale);


    switch (func) {
        case "generateRandomColor":
            div.addEventListener("mouseover", generateRandomColor);
            break;
        case "generateGrayScale":
            div.addEventListener("mouseover", generateGrayScale);
            break;
        case "erase":
            div.addEventListener("mouseover", erase);
            break;
        case "generateGridColor":
            div.addEventListener("mouseover", generateGridColor);
        default:
            div.addEventListener("mouseover", (e) => {
                e.target.style.backgroundColor = "black";
            });

    }
}
