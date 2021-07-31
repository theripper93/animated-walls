Wall.prototype.animate = function animate(options) {
  if (!this.isAnimating) new WallAnimationSequence(this, options);
  this.isAnimating = true;
};

Wall.prototype.play = function play() {
  const flags = this.data.flags["animated-walls"];
  const anchors = {
    center: this.center,
    bottom: p1.y > p2.y ? p1 : p2,
    top: p1.y > p2.y ? p2 : p1,
    left: p1.x > p2.x ? p2 : p1,
    right: p1.x > p2.x ? p1 : p2,
  };
  const animType = flags.animType;
  const anchor = anchors[flags.anchor];
  const distance = flags.distance;
  const duration = flags.duration;
  const rotation = (flags.rotation * Math.PI) / 180;
  const p1 = { x: this.data.c[0], y: this.data.c[1] };
  const p2 = { x: this.data.c[2], y: this.data.c[3] };

  let animation = new WallAnimation(this, duration, {
    type: animType,
    direction: rotation,
    rotation: rotation,
    distance: distance,
    anchor: anchor,
  });

  if (!this.isAnimating) new WallAnimationSequence(this, {sequence: [animation]});
  this.isAnimating = true;
};
