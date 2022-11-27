const FPS = 10;
let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;
let size = windowWidth > windowHeight ? windowHeight : windowWidth;
console.log(size);
size = Math.floor(size / 100) * 100;
console.log(size);
const WIDTH = size;
const HEIGHT = size;

const A = new Animation(FPS);
canvasSize(WIDTH, HEIGHT);

const unit = 20;

let piecs = [];
let floor = [];



function init() {
   background(55);

   let w = WIDTH / unit;
   let h = HEIGHT / unit;

   for (let i = 0; i < unit; i++) {
      for (let j = 0; j < unit; j++) {
         let magicIndex = (j * unit) + i;
         floor[magicIndex] = new Piec(i * w, j * h, w, h, magicIndex, j);
      }
   }
   let rad = random(0, floor.length, true);
   let rp = random(0, patterns.length, true);
   let rri = random(0, 4, true);

   floor[rad].use(patterns[rp], rri);
}

init();



// check naber is exsist or not
function neighberExsist(index, checkUsed = false) {
   if (!checkUsed) { return index >= 0 && index < floor.length };
   return index >= 0 && index < floor.length && floor[index].isUse();
}

// match sides
function matchArray(array1, array2) {
   return array1.every((ary, i) => array2[i] === ary);
}




function piecPlace(piec) {
   const offset = [-unit, 1, unit, -1];

   let topIndex = piec.index + offset[0];
   let rightIndex = piec.index + offset[1];
   let bottomIndex = piec.index + offset[2];
   let leftIndex = piec.index + offset[3];


   let max = patterns.length;
   let ran = random(0, max, true);
   let len = 4;
   let rndPiec;

   for (let _i = ran, $ = 0; $ < max; _i = (_i + 1) % max, $++) {
      rndPiec = patterns[_i];


      for (let n = 0; n < len; n++) {
         let every = true;

         // (root) top - bottom  
         if (
            neighberExsist(topIndex, true) &&
            !matchArray(rndPiec.edges[n][0], floor[topIndex].edges[floor[topIndex].ri][2])
         ) every = false;

         // (root) right - left
         if (
            neighberExsist(rightIndex, true) &&
            !matchArray(rndPiec.edges[n][1], floor[rightIndex].edges[floor[rightIndex].ri][3])
         ) every = false;

         // (root) bottom - top
         if (
            neighberExsist(bottomIndex, true) &&
            !matchArray(rndPiec.edges[n][2], floor[bottomIndex].edges[floor[bottomIndex].ri][0])
         ) every = false;

         // (root) left - right
         if (
            neighberExsist(leftIndex, true) &&
            !matchArray(rndPiec.edges[n][3], floor[leftIndex].edges[floor[leftIndex].ri][1])
         ) every = false;

         if (every) {
            piec.use(rndPiec, n);
            return true;
         }
      }
   }

}





// find place and put the match piec 
function placePiec() {
   let useIndex = floor.slice().filter(e => (!e.isUse() &&
      (neighberExsist(e.index - 1, true) ||
         neighberExsist(e.index + 1, true) ||
         neighberExsist(e.index - unit, true) ||
         neighberExsist(e.index + unit, true)))).map(e => e.index);

   let rnd = random(0, useIndex.length, true);
   let max = useIndex.length;

   if (useIndex.length <= 0) return;
   for (let _i = rnd, $ = 0; $ < max; _i = (_i + 1) % max, $++) {
      if (piecPlace(floor[useIndex[_i]])) {
         break;
      }
   }

}



function animate() {
   clrScr();

   floor.forEach(flr => {
      flr.draw();
   })

   placePiec();
}

A.start(animate);

