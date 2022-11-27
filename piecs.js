


let patterns = [];




// create pattern opbjet
for (let i = 0; i < ptn.length; i++) {
   patterns.push(new ImagePiec(ptn[i]))
}


// make a new image using array
class Piec {
   constructor(x, y, width, height, index, rowIndex) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.ri = 0; // rotate index
      this.pattern = [];
      this.edges;
      this.index = index;
      this._use = false;
      this.rowIndex = rowIndex;
   }

   draw() {
      if (this._use) {
         let pxw = this.width / this.pattern[this.ri][0].length;
         let pxh = this.height / this.pattern[this.ri].length;

         for (let y = 0; y < this.pattern[this.ri].length; y++) {
            for (let x = 0; x < this.pattern[this.ri][y].length; x++) {
               if (this.pattern[this.ri][y][x]) fillStyle(this.pattern[this.ri][y][x]);
               else fillStyle("#000000");
               fillRect(this.x + x * pxw, this.y + y * pxh, pxw, pxh);
            }
         }
      } else {
         lineWidth(1);
         rect(this.x, this.y, this.width, this.height);
         stroke("#00ffff")
      }
   }

   use(pattern, rotateIndex) {
      this.ri = rotateIndex;
      this.edges = pattern.edges;
      this.pattern = pattern.pattern;
      this._use = true;
   }

   isUse() {
      return this._use;
   }

}









