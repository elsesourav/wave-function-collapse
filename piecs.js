// make a new image using array
class Piec {
   constructor(x, y, width, height, images, i, j) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.possibles = images;
      this.used = []
      this.collapsed = false;
      this.i = i;
      this.j = j;
      this.out = false;
   }

   draw() {
      if (this.collapsed) {
         drawImage(this.used.img, this.x, this.y, this.width, this.height);
      } else {
         lineWidth(1);
         strokeStyle(255, 255, 255);
         strokeRect(this.x, this.y, this.width, this.height);
      }
   }

   showPossibles() {
      if (!this.collapsed) {
         clearRect(this.x, this.y, this.width, this.height)
         let textSize = this.width * this.height / 100;
         textSize = textSize > 50 ? 50 : textSize;
         fillStyle("#ffffff");

         if (this.out) {
            for(let i = 0; i < this.possibles.length; i++) {
               save();
               globalAlpha(0.3); 
               drawImage(this.possibles[i].img, this.x, this.y, this.width, this.height);
               restore();
            }
         }
         if (textSize > 1) {
            fillStyle("#ffffff");
            font(`bold ${textSize}px sans-serif`)
            text(this.possibles.length, this.x + this.width / 2, this.y + this.height / 1.5, this.width, this.height)
         }
      }
   }


   collapse(index = undefined) {
      let rnd = index !== undefined ? index : random(0, this.possibles.length, true);
      this.used = [this.possibles[rnd]][0];
      this.collapsed = true;
   }

   reset(images) {
      this.images = images;
      this.collapsed = false;
      this.out = false;
      this.used = [];
   }
}







