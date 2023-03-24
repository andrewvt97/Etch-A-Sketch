
const container = document.querySelector(".grid-container");
let gridNumber = 16;
const gridButton = document.querySelector(".grid-button");
const gridSpace = 200;

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
            div.addEventListener("mouseover", (e) => {
                e.target.style.backgroundColor = "black";
            });
            row.appendChild(div);
        }
        container.appendChild(row);
    }
}


gridButton.addEventListener("click", (e) => {
    // for (let i = 0; i < gridNumber; i++) {
    //     container.removeChild(container.lastChild);
    // }
    gridNumber = prompt("How many squares per side?");
    const count = container.childElementCount;
    for (let i = 0; i < count; i++) { // this does not work because container.childElementCount is going down when you remove children
        container.removeChild(container.lastChild);
    }
    generateGrid(gridNumber);
});

