class reticule extends obj {
  constructor(target) {
    var verts = [
      [-10, -10],
      [-10, 10],
      [10, 10],
      [10, -10],
      [-10, -10],
    ];
    super(verts, "green");
    this.position = [width / 2, height / 2];
    this.target = target;
  }

  update(deltaT) {
    super.draw();
    var q1 = tf([-10, -10], this.position);
    var q2 = tf([-10, 10], this.position);
    var q3 = tf([10, 10], this.position);
    var q4 = tf([10, -10], this.position);

    var m1 = midpoint([0, 0], q1);
    var m2 = midpoint([0, height], q2);
    var m3 = midpoint([width, height], q3);
    var m4 = midpoint([width, 0], q4);

    lineDefault(ctx, m1, m2, this.color);
    lineDefault(ctx, m2, m3, this.color);
    lineDefault(ctx, m3, m4, this.color);
    lineDefault(ctx, m4, m1, this.color);

    lineDefault(ctx, [0, 0], q1, this.color);
    lineDefault(ctx, [0, height], q2, this.color);
    lineDefault(ctx, [width, height], q3, this.color);
    lineDefault(ctx, [width, 0], q4, this.color);

    //console.log( normalizedVectorTo(this.position , this.target.position ) )
    this.addPosition(normalizedVectorTo(this.position, this.target.position));
  }
}

export { reticule };
