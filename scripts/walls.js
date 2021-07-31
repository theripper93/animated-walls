Wall.prototype.animate = function animate(options) {
  if (!this.isAnimating) new WallAnimationSequence(this, options);
  this.isAnimating = true;
};

Wall.prototype.play = function play() {
  const flags = this.data.flags["animated-walls"];
  const p1 = { x: this.data.c[0], y: this.data.c[1] };
  const p2 = { x: this.data.c[2], y: this.data.c[3] };
  const anchors = {
    center: "c",
    bottom: p1.y > p2.y ? "p1" : "p2",
    top: p1.y > p2.y ? "p2" : "p1",
    left: p1.x > p2.x ? "p2" : "p1",
    right: p1.x > p2.x ? "p1" : "p2",
  };
  const animType = flags.animType;
  const anchor = anchors[flags.anchor];
  const distance = flags.distance;
  const duration = flags.duration;
  const rotation = (flags.rotation * Math.PI) / 180;

  let animation = new WallAnimation(this, duration, {
    type: animType,
    direction: rotation,
    rotation: rotation,
    distance: distance,
    anchor: anchor,
  });

  this.reverseAnimation = function reverse() {
    let reverseanimation = new WallAnimation(this, duration, {
      type: animType,
      direction: rotation-Math.PI,
      rotation: -rotation,
      distance: distance,
      anchor: anchor,
    });
    if (!this.isAnimating) new WallAnimationSequence(this, {sequence: [reverseanimation]});
    this.isAnimating = true;
  }

  if (!this.isAnimating) new WallAnimationSequence(this, {sequence: [animation]});
  this.isAnimating = true;
};

DoorControl.prototype._onMouseDown = function _onMouseDown(event) {
  event.stopPropagation();
  const state = this.wall.data.ds;
  const states = CONST.WALL_DOOR_STATES;

  // Determine whether the player can control the door at this time
  if ( !game.user.can("WALL_DOORS") ) return false;
  if ( game.paused && !game.user.isGM ) {
    ui.notifications.warn("GAME.PausedWarning", {localize: true});
    return false;
  }

  // Play an audio cue for locked doors
  if ( state === states.LOCKED ) {
    AudioHelper.play({src: CONFIG.sounds.lock});
    return false;
  }

  // Toggle between OPEN and CLOSED states
  let flag = this.wall.document.getFlag("animated-walls","animType")
  if(flag && flag != "none"){
    if(this.wall.isAnimating) return false
    if(this.wall.playReverse){
      this.wall.reverseAnimation();
      this.wall.playReverse = false;
    }else{
      this.wall.playReverse = true;
      this.wall.play();
    }
    return false
  }else{
  return this.wall.document.update({ds: state === states.CLOSED ? states.OPEN : states.CLOSED});
  }
}
