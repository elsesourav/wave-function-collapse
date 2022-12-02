const WIDTH = size;
const HEIGHT = size;
const MAPS = [PCBMap, worldMap]




let fps = 10;
let unit = 10;
let showPossibles = true;
let currentMap = 0;
let board = [];

const animation = new Animation(fps);

function isExisteAndUnCollapsed(i, j) {
   return i >= 0 && i < unit && j >= 0 && j < unit && !board[i][j].collapsed;
}
function isExisteAndCollapsed(i, j) {
   return i >= 0 && i < unit && j >= 0 && j < unit && board[i][j].collapsed;
}
function isExiste(i, j) {
   return i >= 0 && i < unit && j >= 0 && j < unit;
}

function resetPiec(i, j) {
   if (isExiste(i, j)) board[i][j].reset(images);
   if (isExiste(i + 1, j)) board[i + 1][j].reset(images);
   if (isExiste(i - 1, j)) board[i - 1][j].reset(images);
   if (isExiste(i, j + 1)) board[i][j + 1].reset(images);
   if (isExiste(i, j - 1)) board[i][j - 1].reset(images);
   neighberUpdate(i, j);
   neighberUpdate(i - 1, j);
   neighberUpdate(i + 1, j);
   neighberUpdate(i, j - 1);
   neighberUpdate(i, j + 1);
}


function neighberUpdate(i, j) {
   if (!isExisteAndUnCollapsed(i, j)) return true;
   let array = board[i][j].possibles;
   // top 
   if (isExisteAndCollapsed(i - 1, j)) {
      array = array.filter(img => img.edegs.top === board[i - 1][j].used.edegs.bottom);
   }
   // right   
   if (isExisteAndCollapsed(i, j + 1)) {
      array = array.filter(img => img.edegs.right === board[i][j + 1].used.edegs.left);
   }
   // bottom
   if (isExisteAndCollapsed(i + 1, j)) {
      array = array.filter(img => img.edegs.bottom === board[i + 1][j].used.edegs.top);
   }
   // left
   if (isExisteAndCollapsed(i, j - 1)) {
      array = array.filter(img => img.edegs.left === board[i][j - 1].used.edegs.right);
   }

   if (array.length === 0) {
      resetPiec(i, j);
      resetPiec(i - 1, j);
      resetPiec(i + 1, j);
      resetPiec(i, j - 1);
      resetPiec(i, j + 1);
      return false;
   }

   board[i][j].out = true;
   board[i][j].possibles = array;
   return true;
}

function _update_(i, j) {
   if (
      !neighberUpdate(i - 1, j) || // top neighber
      !neighberUpdate(i, j + 1) || // right neighber
      !neighberUpdate(i + 1, j) || // bottom neighber
      !neighberUpdate(i, j - 1)    // left neighber
   )  return;
}


function collapseAndUpdate(i, j) {
   board[i][j].collapse();
   _update_(i, j);
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
   mainDiv.classList.toggle("active");
})

restartButton.addEventListener("click", () => {
   reset();
   mainDiv.classList.toggle("active");
})

if (isMobile) {
   cssRoot.style.setProperty("--cursor", "auto");
}

selectBlock.addEventListener("change", () => {
   currentMap = selectBlock.selectedIndex;
   createImages(MAPS[currentMap]);
   reset();
   mainDiv.classList.toggle("active");
})
