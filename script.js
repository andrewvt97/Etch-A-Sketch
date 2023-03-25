// removeEventListener problem was that I set currentTool as a string, giving only function name not entire function

// variables
const container = document.querySelector(".grid-container");
let slider = document.querySelector(".slider");
let gridNumber = slider.value;
const gridSpace = 200; // amount of space for the grid

// buttons
const clearButton = document.querySelector(".clear-button");
const rainbowButton = document.querySelector(".rainbow-button");
const grayScaleButton = document.querySelector(".grayscale-button");
const eraseButton = document.querySelector(".erase-button");
const gridColorButton = document.querySelector(".grid-color-button")
const changeColorButton = document.querySelector(".color-button");

// color pickers
let gridColorPicker = document.querySelector('#grid-color-picker');
let colorPicker = document.querySelector('#color-picker');

// current drawing tool
let currentTool = changeToBlack;
// pixel size description
let pixelSizeDescription = document.querySelector(".pixel-size");


generateGrid(gridNumber, currentTool);

// function to generate the grid
function generateGrid(gridNumber, func = "default") {
    for (let i = 0; i < gridNumber; i++) {
        const row = document.createElement("div");
        row.classList.add("row");
        for (let j = 0; j < gridNumber; j++) {
            const div = document.createElement("div");
            div.setAttribute("style", `background-color: ${gridColorPicker.value}; padding: ${gridSpace/gridNumber}px`);
            div.setAttribute("rgbNumber", "255");
            
            pickColor(div, func);  // chooses correct drawing tool when creating the grid 
            row.appendChild(div); // adds div to the row
        }
        container.appendChild(row); // adds row to the container
    }
}


// takes input fro the slider
slider.oninput = function() {
    gridNumber = this.value; // arrow functions do not have this pointer so anonymous function was needed
    pixelSizeDescription.textContent = `${gridNumber} x ${gridNumber}`; // changes pixel size description
    removeGrid();
    generateGrid(gridNumber, currentTool);
  }

// function to clear the grid
clearButton.addEventListener("click", (e) => {
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

// generates random color or rainbow effect
function generateRandomColor(e){
    const randomColor = Math.floor(Math.random()*16777215).toString(16);
    e.target.style.backgroundColor = `#${randomColor}`;
}

// function to generate grayscale
function generateGrayScale(e){    
    rgbNumber = e.target.getAttribute("rgbNumber");
    e.target.style.backgroundColor = `rgb(${rgbNumber}, ${rgbNumber}, ${rgbNumber})`;
    rgbNumber -= 0.1 * 255;
    e.target.setAttribute("rgbNumber", rgbNumber);
}

// erase function
function erase(e){ 
    e.target.style.backgroundColor = gridColorPicker.value;
}

// function to change the color of the grid
function generateGridColor(e){
    for (row of container.children)
        for (div of row.children)
            div.style.backgroundColor = gridColorPicker.value;
}

// function to change the color of the drawing tool
 function changeColor(e){
    e.target.style.backgroundColor = colorPicker.value;  
 }

 // default drawing tool
 function changeToBlack(e){
    e.target.style.backgroundColor = "black";
}


// button listens for the 4 drawing tool buttons
rainbowButton.addEventListener("click", () => {
    traverseGrid(generateRandomColor);
});

grayScaleButton.addEventListener("click", () => {
    traverseGrid(generateGrayScale);
});


eraseButton.addEventListener("click", () => {
    traverseGrid(erase);
});

changeColorButton.addEventListener("click", () => {
    traverseGrid(changeColor);
});

// function to change the color of the grid
gridColorButton.addEventListener("click", generateGridColor);

// traverse the grid and add relevant event listeners to every div
function traverseGrid(func) {
    for (row of container.children){
        for (div of row.children){
            div.removeEventListener("mouseover", currentTool);
            div.addEventListener("mouseover", func);
        }
    }
    currentTool = func;
}

function pickColor(div, func){
    // switch function for picking correct drawing tools if the user changed grid size or reset the grid
    switch (func) {
        case generateRandomColor: // adds event listener for every div in the grid
            div.addEventListener("mouseover", generateRandomColor);
            break;
        case generateGrayScale:
            div.addEventListener("mouseover", generateGrayScale);
            break;
        case erase:
            div.addEventListener("mouseover", erase);
            break;
        case changeColor:
            div.addEventListener("mouseover", changeColor);
            break;
        default:
            div.addEventListener("mouseover", changeToBlack);
    }
}


