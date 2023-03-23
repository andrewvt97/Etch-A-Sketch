
const container = document.querySelector(".grid-container");

for (let i = 0; i < 16 * 16; i++) {
  const div = document.createElement("div");
  div.backgroundColor = "green";
  div.padding = "10px";
  div.addEventListener("mouseover", (e) => {
    e.target.style.backgroundColor = "black";
  });
  container.appendChild(div);
}