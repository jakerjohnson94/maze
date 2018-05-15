const map = [
  "WWWWWWWWWWWWWWWWWWWWW",
  "W   W     W     W W W",
  "W W W WWW WWWWW W W W",
  "W W W   W     W W   W",
  "W WWWWWWW W WWW W W W",
  "W         W     W W W",
  "W WWW WWWWW WWWWW W W",
  "W W   W   W W     W W",
  "W WWWWW W W W WWW W F",
  "S     W W W W W W WWW",
  "WWWWW W W W W W W W W",
  "W     W W W   W W W W",
  "W WWWWWWW WWW W W W W",
  "W       W       W   W",
  "WWWWWWWWWWWWWWWWWWWWW"
];

let playerTop;
let playerLeft;
const columnCount = map[0].length;
const cellWidth = `calc(100vw / ${columnCount}) `;
const cellHeight = `calc(100vh / ${map.length}) `;
const player = document.getElementById("player");

player.style.height = cellHeight;

playerMovementWithArrows();
createMap();

function createMap() {
  let i = 0;
  for (let row of map) {
    const rowDiv = document.createElement("div");
     rowDiv.classList.add("row");
    // rowDiv.dataset.row = i;

    document.body.appendChild(rowDiv);
    for (let cell of row.split("")) {
      const cellDiv = document.createElement("div");
      cell !== " "
        ? cellDiv.classList.add(cell)
        : cellDiv.classList.add("free-space");
      cell === "S"
        ? (cellDiv.id = "s")
        : cell === "F"
          ? (cellDiv.id = "f")
          : null;
      cellDiv.dataset.column = rowDiv.childElementCount;
      // cellDiv.dataset.row = i;
      cellDiv.style.width = cellWidth;
      cellDiv.style.height = cellHeight;
      rowDiv.appendChild(cellDiv);
    }
    i++;
  }

  const start = document.getElementById("s");
  start.appendChild(player);

}

function checkWinner() {
  if (player.parentElement.id === "f") {
    let time = setTimeout(()=>alert("You Win!"), 500)
    ;
  }
}

function playerMovementWithArrows() {
  window.addEventListener("keydown", event => {
    switch (event.key) {

      case "ArrowDown":
      removeAnimationClasses();
        if (player.parentElement.parentElement.nextElementSibling) {
          let children = [
            ...player.parentElement.parentElement.nextElementSibling.childNodes
          ];
          for (let c of children) {
            let currentColumn = player.parentElement.dataset.column;
            if (
              c.dataset.column === currentColumn &&
              !c.classList.contains("W")
            ) {
              c.appendChild(player);
              player.classList.add('slideDown')
            }
          }
        }
        checkWinner();
        break;

      case "ArrowUp":
      removeAnimationClasses();
        if (player.parentElement.parentElement.previousElementSibling) {
          let children = [
            ...player.parentElement.parentElement.previousElementSibling
              .childNodes
          ];
          for (let c of children) {
            let currentColumn = player.parentElement.dataset.column;
            if (
              c.dataset.column === currentColumn &&
              !c.classList.contains("W")
            ) {
              c.appendChild(player);
              player.classList.add('slideUp')
            }
          }
        }
        checkWinner();
        break;
      case "ArrowLeft":
      removeAnimationClasses();
        if (
          player.parentElement.previousElementSibling &&
          !player.parentElement.previousElementSibling.classList.contains("W")
        ) {
          player.parentElement.previousElementSibling.appendChild(player);
          player.classList.add('slideLeft')
        }
        checkWinner();
        break;

      case "ArrowRight":
      removeAnimationClasses();
        if (
          player.parentElement.nextElementSibling &&
          !player.parentElement.nextElementSibling.classList.contains("W")
        ) {
         
         player.parentElement.nextElementSibling.appendChild(player);
         player.classList.add('slideRight')
        }
        checkWinner();
        break;
    }
  });
}

function removeAnimationClasses(){
  player.classList.remove('slideUp');
  player.classList.remove('slideDown');
  player.classList.remove('slideRight');
  player.classList.remove('slideLeft');
}