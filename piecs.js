// make a new image using array
class Piec {
   constructor(x, y, width, height, images, i, j) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.possibles = images;
      this.collapsed = false;
      this.i = i;
      this.j = j;
      this.out = false;
   }

   draw() {
      if (this.collapsed) {
         drawImage(this.possibles[0].img, this.x, this.y, this.width, this.height);
      }




      // if (this.collapsed) {
      //    // drawImage(this.possibles[0].img, this.x, this.y, this.width, this.height);
      // }
      // else {
      //    lineWidth(0.5);
      //    stroke("#00ffff"); 
      //    rect(this.x, this.y, this.width, this.height);
      // }
   }

   showPossibles() {
      if (this.out && !this.collapsed) {
         let textSize = this.width * this.height / 100;
         textSize = textSize > 50 ? 50 : textSize;
         if (textSize > 5) {
            fillStyle("#000000");
            font(`${textSize}px sans-serif`)
            text(this.possibles.length, this.x + this.width / 2, this.y + this.height / 2, this.width, this.height)
         }

         
      }
   }


   collapse() {
      let rnd = random(0, this.possibles.length, true);
      this.possibles = [this.possibles[rnd]];
      this.collapsed = true;
   }

   isSelected() {
      return this.collapsed;
   }
}







