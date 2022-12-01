const WIDTH = size;
const HEIGHT = size;
const MAPS = [PCBMap, worldMap]




let fps = 10;
let unit = 10;
let showPossibles = true;
let currentMap = 0;
let backIndex = [];
let board = [];

const animation = new Animation(fps);

function isExisteAndUnCollapsed(i, j) {
   return i >= 0 && i < unit && j >= 0 && j < unit && !board[i][j].collapsed;
}
function isExisteAndCollapsed(i, j) {
   return i >= 0 && i < unit && j >= 0 && j < unit && board[i][j].collapsed;
}

function prePosition() {
}

function neighberUpdate(i, j) {
   // top 
   if (isExisteAndCollapsed(i - 1, j)) {
      board[i][j].possibles = board[i][j].possibles.filter(img => img.edegs.top === board[i - 1][j].used.edegs.bottom);
   }
   // right   
   if (isExisteAndCollapsed(i, j + 1)) {
      board[i][j].possibles = board[i][j].possibles.filter(img => img.edegs.right === board[i][j + 1].used.edegs.left);
   }
   // bottom
   if (isExisteAndCollapsed(i + 1, j)) {
      board[i][j].possibles = board[i][j].possibles.filter(img => img.edegs.bottom === board[i + 1][j].used.edegs.top);
   }
   // left
   if (isExisteAndCollapsed(i, j - 1)) {
      board[i][j].possibles = board[i][j].possibles.filter(img => img.edegs.left === board[i][j - 1].used.edegs.right);
   }

   if (board[i][j].possibles.length === 0) {
      animation.stop();
      return false;
   }
   board[i][j].out = true;
   return true;
}


function collapseAndUpdate(i, j) {
   backIndex.push({i: i, j: j});
   board[i][j].collapse();

   // top neighber
   if (isExisteAndUnCollapsed(i - 1, j)) {
      if (!neighberUpdate(i - 1, j)) return;
   }
   // right neighber
   if (isExisteAndUnCollapsed(i, j + 1)) {
      if (!neighberUpdate(i, j + 1)) return;
   }
   // bottom neighber
   if (isExisteAndUnCollapsed(i + 1, j)) {
      if (!neighberUpdate(i + 1, j)) return;
   }
   // left neighber
   if (isExisteAndUnCollapsed(i, j - 1)) {
      if (!neighberUpdate(i, j - 1)) return;
   }
}

function init() {
   let w = WIDTH / unit;
   let h = HEIGHT / unit;

   for (let i = 0; i < unit; i++) {
      board[i] = [];
      for (let j = 0; j < unit; j++) {
         board[i][j] = new Piec(j * w, i * h, w, h, images, i, j);
      }
   }
   const i = random(0, board.length, true);
   const j = random(0, board[i].length, true);

   collapseAndUpdate(i, j);
}

createImages(MAPS[currentMap]);
init();

function drawAll() {
   clrScr();
   board.forEach(brd => {
      brd.forEach(b => {
         b.draw()
         if (showPossibles) {
            b.showPossibles();
         }
      });
   })
}
drawAll();

function reset() {
   board = [];
   init();
   drawAll();
}


function animate() {
   // find place and put the match piec 
   let cloneBoard = [];
   board.forEach(brd => {
      brd.forEach(b => { cloneBoard.push(b) });
   })
   cloneBoard = cloneBoard.filter(e => !e.collapsed).sort((a, b) => a.possibles.length - b.possibles.length);
   if (cloneBoard.length > 0) {
      collapseAndUpdate(cloneBoard[0].i, cloneBoard[0].j);
      // draw averything
      drawAll();
   }
}

animation.start(animate);





/* ----------- event listiner ----------- */
const mainDiv = $("main");
const menuButton = ID("menu-icon");
const selectBlock = ID("select-block");
const showPossiblesCheckbox = ID("show-possibles-checkbox");
const speedRange = ID("speed-range");
const sizeRange = ID("size-range");
const speedShow = ID("speed-show");
const sizeShow = ID("size-show");
const stopButton = ID("stop");
const startButton = ID("start");
const restartButton = ID("restart");


menuButton.addEventListener("click", e => {
   mainDiv.classList.toggle("active");
})

showPossiblesCheckbox.addEventListener("click", e => {
   showPossibles = e.target.checked;
   drawAll();
})

speedRange.addEventListener("input", e => {
   speedShow.innerText = fps = e.target.value / 2;
   animation.fps = fps;
})

sizeRange.addEventListener("input", e => {
   sizeShow.innerText = unit = e.target.value;
   reset();
})

stopButton.addEventListener("click", () => {
   animation.stop();
})

startButton.addEventListener("click", () => {
   animation.start(animate);
})

restartButton.addEventListener("click", () => {
   reset();
})

if (isMobile) {
   cssRoot.style.setProperty("--cursor", "auto");
}

selectBlock.addEventListener("change", () => {
   currentMap = selectBlock.selectedIndex;
   createImages(MAPS[currentMap]);
   reset();
})
