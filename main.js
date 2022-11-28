const FPS = 5;
const WIDTH = size;
const HEIGHT = size;
const animation = new Animation(FPS);

let showPossibles = true;



const unit = 10;
let board = [];

function isExisteAndUnCollapsed(i, j) {
   return i >= 0 && i < unit && j >= 0 && j < unit && !board[i][j].collapsed;
}
function isExisteAndCollapsed(i, j) {
   return i >= 0 && i < unit && j >= 0 && j < unit && board[i][j].collapsed;
}

function neighberUpdate(i, j) {
   // top 
   if (isExisteAndCollapsed(i - 1, j)) {
      
      board[i][j].possibles = board[i][j].possibles.filter(img => img.edegs.top === board[i - 1][j].possibles[0].edegs.bottom);
      board[i][j].out = true;
   }
   // right   
   if (isExisteAndCollapsed(i, j + 1)) {
      board[i][j].possibles = board[i][j].possibles.filter(img => img.edegs.right === board[i][j + 1].possibles[0].edegs.left);
      board[i][j].out = true;
   }
   // bottom
   if (isExisteAndCollapsed(i + 1, j)) {
      board[i][j].possibles = board[i][j].possibles.filter(img => img.edegs.bottom === board[i + 1][j].possibles[0].edegs.top);
      board[i][j].out = true;
   }
   // left
   if (isExisteAndCollapsed(i, j - 1)) {
      board[i][j].possibles = board[i][j].possibles.filter(img => img.edegs.left === board[i][j - 1].possibles[0].edegs.right);
      board[i][j].out = true;
   }
}

function collapseAndUpdate(i, j) {
   board[i][j].collapse();

   // top neighber
   if (isExisteAndUnCollapsed(i - 1, j)) {
      neighberUpdate(i - 1, j);
   }
   // right neighber
   if (isExisteAndUnCollapsed(i, j + 1)) {
      neighberUpdate(i, j + 1);
   }
   // bottom neighber
   if (isExisteAndUnCollapsed(i + 1, j)) {
      neighberUpdate(i + 1, j);
   }
   // left neighber
   if (isExisteAndUnCollapsed(i, j - 1)) {
      neighberUpdate(i, j - 1);
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

init();

function drawAll() {
   clrScr();
   background(55);
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




