
const container = document.querySelector(".grid-container");
const gridNumber = 16;

for (let i = 0; i < gridNumber; i++) {
    const row = document.createElement("div");
    row.classList.add("row");
    for (let j = 0; j < gridNumber; j++) {
        const div = document.createElement("div");
        div.setAttribute("style", "background-color: green; padding: 1%;")
        div.classList.add("grid");
        div.addEventListener("mouseover", (e) => {
            e.target.style.backgroundColor = "black";
        });
        row.appendChild(div);
    }
    container.appendChild(row);
}

// const p = document.createElement("p");
// p.backgroundColor = "green";
// p.textContent = "Hello World";
// container.appendChild(p);

// const div = document.createElement("div");

// container.appendChild(div);