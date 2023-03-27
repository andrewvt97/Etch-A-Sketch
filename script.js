// removeEventListener problem was that I set currentTool as a string, giving only function name not entire function

// variables
const container = document.querySelector(".grid-container");
let slider = document.querySelector(".slider");
let gridNumber = slider.value;
const gridSpace = 200; // amount of space for the grid
const horizontalSpace = 300; // horizontal length of grid;


// buttons
const clearButton = document.querySelector(".clear-button");
const rainbowButton = document.querySelector(".rainbow-button");
const grayScaleButton = document.querySelector(".grayscale-button");
const eraseButton = document.querySelector(".erase-button");
const gridColorButton = document.querySelector(".grid-color-button")
const changeColorButton = document.querySelector(".color-button");

let currentButton = changeColorButton;

// color pickers
let gridColorPicker = document.querySelector('#grid-color-picker');
let colorPicker = document.querySelector('#color-picker');

// current drawing tool
let currentTool = changeColor; // default drawing tool
// pixel size description
let pixelSizeDescription = document.querySelector(".pixel-size");
let mouseHold = false; // mouse held variable


generateGrid(gridNumber, currentTool);

// function to generate the grid
function generateGrid(gridNumber, func = "default") {
    for (let i = 0; i < gridNumber; i++) {
        const row = document.createElement("div");
        row.classList.add("row");
        for (let j = 0; j < gridNumber; j++) {
            const div = document.createElement("div");
            div.setAttribute("style", `background-color: ${gridColorPicker.value}; padding: ${gridSpace/gridNumber}px ${horizontalSpace/gridNumber}px`);
            div.setAttribute("rgbNumber", "255");
            
            pickColor(div, func);  // chooses correct drawing tool when creating the grid 
            row.appendChild(div); // adds div to the row
        }
        container.appendChild(row); // adds row to the container
    }

    currentButton.classList.add("active");
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
    if (e.type === "mouseover" && !mouseHold) return;
    const randomColor = Math.floor(Math.random()*16777215).toString(16);
    e.target.style.backgroundColor = `#${randomColor}`;
}

// function to generate grayscale
function generateGrayScale(e){    
    if (e.type === "mouseover" && !mouseHold) return;
    rgbNumber = e.target.getAttribute("rgbNumber");
    e.target.style.backgroundColor = `rgb(${rgbNumber}, ${rgbNumber}, ${rgbNumber})`;
    rgbNumber -= 0.1 * 255;
    e.target.setAttribute("rgbNumber", rgbNumber);
}

// erase function
function erase(e){ 
    if (e.type === "mouseover" && !mouseHold) return;
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
    if (e.type === "mouseover" && !mouseHold) return;
    console.log(true);
    e.target.style.backgroundColor = colorPicker.value;  
 }

//  // default drawing tool
//  function changeToDefault(e){
//     if (e.type === "mouseover" && !mouseHold) return;
//     e.target.style.backgroundColor = "black";
// }


// button listens for the 4 drawing tool buttons
rainbowButton.addEventListener("click", () => {
    console.log("rainbow");
    currentButton = rainbowButton;
    traverseGrid(generateRandomColor);
});

grayScaleButton.addEventListener("click", () => {
    currentButton = grayScaleButton;
    traverseGrid(generateGrayScale);
});


eraseButton.addEventListener("click", () => {
    currentButton = eraseButton;
    traverseGrid(erase);
});

changeColorButton.addEventListener("click", () => {
    currentButton = changeColorButton;
    traverseGrid(changeColor);
});

// function to change the color of the grid
// gridColorButton.addEventListener("click", generateGridColor);
gridColorPicker.addEventListener("change", generateGridColor);

// traverse the grid and add relevant event listeners to every div
function traverseGrid(func) {
    console.log(true);
    for (row of container.children){
        for (div of row.children){
            div.removeEventListener("mouseover", currentTool);
            div.removeEventListener("click", currentTool);
            div.addEventListener("mouseover", func);
            div.addEventListener("click", func);
        }
    }
    currentTool = func;
    activeButton();

   
}

function activeButton(){
    const button = document.querySelector(".active");
    button.classList.remove("active");
    currentButton.classList.add("active");
}

document.body.addEventListener("mouseup", () => {
    mouseHold = false;
});
document.body.addEventListener("mousedown", () => {
    mouseHold = true;
});

function pickColor(div, func){  
    div.addEventListener("mouseover", func);
    div.addEventListener("click", func);
}

// consider for the future only allowing change color buttons when button is clicked and not on change

