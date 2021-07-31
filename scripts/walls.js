Wall.prototype.animate = function animate(options) {
  if (!this.isAnimating) new WallAnimationSequence(this, options);
  this.isAnimating = true;
};