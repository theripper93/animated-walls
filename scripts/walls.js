Wall.prototype.animate = async function animate(options) {
  if (!this.isAnimating) {
    this.isAnimating = true;
    await new WallAnimationSequence(this, options).play();
  }
};

Wall.prototype.play = async function play() {
  const flags = this.data.flags["animated-walls"];
  const p1 = { x: this.data.c[0], y: this.data.c[1] };
  const p2 = { x: this.data.c[2], y: this.data.c[3] };
  const anchors = {
    c: "c",
    bottom: p1.y > p2.y ? "p1" : "p2",
    top: p1.y > p2.y ? "p2" : "p1",
    left: p1.x > p2.x ? "p2" : "p1",
    right: p1.x > p2.x ? "p1" : "p2",
    p1: "p1",
    p2: "p2"
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

  this.reverseAnimation = async function reverse() {
    let reverseanimation = new WallAnimation(this, duration, {
      type: animType,
      direction: rotation-Math.PI,
      rotation: -rotation,
      distance: distance,
      anchor: anchor,
    });
    if (!this.isAnimating) {
      this.isAnimating = true
      await new WallAnimationSequence(this, {sequence: [reverseanimation]}).play();
      this.isAnimating = false
    }
    ;
  }

  if (!this.isAnimating) {
    this.isAnimating = true;
    await new WallAnimationSequence(this, {sequence: [animation]}).play();
    this.isAnimating = false;
  }
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
    AnimatedWallsSocket.executeAsGM("playAnimation", this.wall.id);
    return false
  }else{
  return this.wall.document.update({ds: state === states.CLOSED ? states.OPEN : states.CLOSED});
  }
}

DoorControl.prototype._getTexture

class AnimatedWallsOverrides{
  static _onMouseDown(event) {
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
      AnimatedWallsSocket.executeAsGM("playAnimation", this.wall.id);
      return false
    }else{
    return this.wall.document.update({ds: state === states.CLOSED ? states.OPEN : states.CLOSED});
    }
  }
  static _getTexture(wrapped,...args) {

    const ds = CONST.WALL_DOOR_STATES;
    let s = this.wall.data.ds;

    let flag = this.wall.document.getFlag("animated-walls","animType")
    if(game.user.isGM && flag && flag != "none" && s != ds.LOCKED){
      if ( (s === ds.CLOSED) && (this.wall.data.door === CONST.WALL_DOOR_TYPES.SECRET) ) return getTexture(CONFIG.controlIcons.doorSecretPlay)
      return getTexture(CONFIG.controlIcons.doorPlay)
    }else{
      return wrapped(...args)
    }
  }
}