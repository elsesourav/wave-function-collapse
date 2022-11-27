class ImagePiec {
   constructor(imagePattern) {
      this.pattern = [];
      this.pattern[0] = imagePattern;
      this.edges = [];

      /* set top right bottom left edegs */
      this.edges[0] = [];
      // top
      this.edges[0][0] = this.pattern[0][0];

      // right
      this.edges[0][1] = [];
      for (let i = 0; i < this.pattern[0].length; i++) {
         this.edges[0][1][i] = this.pattern[0][i][this.pattern[0][i].length - 1]

      }
      // bottom
      this.edges[0][2] = this.pattern[0][this.pattern[0].length - 1];

      // left
      this.edges[0][3] = [];
      for (let i = 0; i < this.pattern[0].length; i++)
         this.edges[0][3][i] = this.pattern[0][i][0];


      for (let i = 1; i < 4; i++) {
         // edegs
         this.edges[i] = [];

         this.edges[i][0] = this.edges[i - 1][3].slice();
         this.edges[i][1] = this.edges[i - 1][0].slice();
         this.edges[i][2] = this.edges[i - 1][1].slice();
         this.edges[i][3] = this.edges[i - 1][2].slice();

         // pattens
         this.pattern[i] = rotate2dArray(this.pattern[i - 1]);
      }
   }
}