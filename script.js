// removeEventListener problem was that I set currentTool as a string, giving only function name
const container = document.querySelector(".grid-container");
let gridNumber = 16;
const gridButton = document.querySelector(".grid-button");
const clearButton = document.querySelector(".clear-button");
const rainbowButton = document.querySelector(".rainbow-button");
const grayScaleButton = document.querySelector(".grayscale-button");
const eraseButton = document.querySelector(".erase-button");
const gridColorButton = document.querySelector(".grid-color-button")
let gridColorPicker = document.querySelector('#grid-color-picker');
let colorPicker = document.querySelector('#color-picker');
const changeColorButton = document.querySelector(".color-button");
let currentTool = changeToBlack;
let previousTool;

const gridSpace = 200;
let backgroundColor = "white";
// let rgbNumber = 255;
let randomColor;


 


generateGrid(gridNumber, currentTool);
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

function generateRandomColor(e){
    randomColor = Math.floor(Math.random()*16777215).toString(16);
    e.target.style.backgroundColor = `#${randomColor}`;
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
    backgroundColor = gridColorPicker.value;
    for (row of container.children)
        for (div of row.children)
            div.style.backgroundColor = backgroundColor;
}

 function changeColor(e){
    e.target.style.backgroundColor = colorPicker.value;  
 }

 function changeToBlack(e){
    e.target.style.backgroundColor = "black";
}


rainbowButton.addEventListener("click", () => {
    for (row of container.children)
        for (div of row.children){
            div.removeEventListener("mouseover", currentTool);
            div.addEventListener("mouseover", generateRandomColor);
        }
    currentTool = generateRandomColor;
});

grayScaleButton.addEventListener("click", () => {
    for (row of container.children){
        for (div of row.children){
            div.removeEventListener("mouseover", currentTool);
            div.addEventListener("mouseover", generateGrayScale);
        }
    }
    currentTool = generateGrayScale;
});


eraseButton.addEventListener("click", () => {
    for (row of container.children){
        for (div of row.children){
            div.removeEventListener("mouseover", currentTool);
            div.addEventListener("mouseover", erase);
        }
    }
    currentTool = erase;
});

changeColorButton.addEventListener("click", () => {
    for (row of container.children){
        for (div of row.children){
            div.removeEventListener("mouseover", currentTool);
            div.addEventListener("mouseover", changeColor);
        }
    }
    currentTool = changeColor;
});

gridColorButton.addEventListener("click", generateGridColor);



function pickColor(div, func){

   
    console.log(func);
    switch (func) {
        case generateRandomColor:
            console.log(true);
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


