class WallAnimationSequence {
  constructor(wall, options = { sequence: [], loop: false, onComplete: null }) {
    this.wall = wall;
    this.sequence = options.sequence;
    this.loop = options.loop;
    this.onComplete = options.onComplete;
  }
  async play() {
    for (let animation of this.sequence) {
      await animation.playAnimation();
    }
    this.wall.isAnimating = false;
  }

  static SocketPlayAnimation(wallId){
    let wall = canvas.walls.get(wallId);
    let macro = wall.document.getFlag("animated-walls","macro")  
    if(macro){
      game.macros.getName(macro)?.execute(wall)
    }
      if(wall.isAnimating) return false
      if(wall.playReverse && wall.document.getFlag("animated-walls","reverse")){
        wall.reverseAnimation();
        wall.playReverse = false;
      }else{
        wall.playReverse = true;
        wall.play();
      }
  }
}

class WallAnimation {
  constructor(
    wall,
    speed = 1000,
    options = {
      type: null,
      direction: null,
      distance: null,
      rotation: null,
      anchor: null,
      preload: false,
    },
    keyframes = null
  ) {
    this.wall = wall;
    this.loop = options.loop;
    this.speed = speed;
    this.type = options.type;
    this.direction = options.direction;
    this.distance = options.distance;
    this.rotation = options.rotation;
    this.keyframes = keyframes || this.speed/33;
    this.frameTime = this.speed / this.keyframes;
    this.anchor = options.anchor;
    this.preload = options.preload;
    this.animation = [];
    if (this.preload) {
      this.setPoints();
      this.generateFrames();
    }
  }

  setPoints(){
    this.wallPoints = {
      p1: {
        x: this.wall.data.c[0],
        y: this.wall.data.c[1],
      },
      p2: {
        x: this.wall.data.c[2],
        y: this.wall.data.c[3],
      },
      c: {
        x: this.wall.center.x,
        y: this.wall.center.y,
      },
    };
    if(this.anchor)this.anchor = this.wallPoints[this.anchor];
  }

  generateFrames() {

    switch (this.type) {
      case "move":
        this.moveAnimation();
        break;
      case "rotate":
        if (this.anchor.x == this.wall.center.x && this.anchor.y == this.wall.center.y) this.rotateCenterAnimation();
        else this.rotateOuterAnimation();
        break;
    }
  }

  moveAnimation() {
    // move p1 and p2 a distance in the direction of this.direction

    let p1 = this.wallPoints.p1;
    let p2 = this.wallPoints.p2;
    let direction = this.direction;
    let distance = this.distance;

    for (let i = 0; i < this.keyframes; i++) {
      const dist = (i / this.keyframes) * distance;
      const dx = dist * Math.cos(direction);
      const dy = dist * Math.sin(direction);
      const x1 = p1.x + dx;
      const y1 = p1.y + dy;
      const x2 = p2.x + dx;
      const y2 = p2.y + dy;
      this.animation.push([x1, y1, x2, y2]);
    }
  }

  rotateCenterAnimation() {
    //rotate p1 and p2 around the center of the wall
    let p1 = this.wallPoints.p1;
    let p2 = this.wallPoints.p2;
    let center = this.wallPoints.c;
    let rotation = this.rotation;
    for (let i = 0; i < this.keyframes; i++) {
      const angle = (i / this.keyframes) * rotation;
      const x1 =
        center.x +
        (p1.x - center.x) * Math.cos(angle) -
        (p1.y - center.y) * Math.sin(angle);
      const y1 =
        center.y +
        (p1.x - center.x) * Math.sin(angle) +
        (p1.y - center.y) * Math.cos(angle);
      const x2 =
        center.x +
        (p2.x - center.x) * Math.cos(angle) -
        (p2.y - center.y) * Math.sin(angle);
      const y2 =
        center.y +
        (p2.x - center.x) * Math.sin(angle) +
        (p2.y - center.y) * Math.cos(angle);
      this.animation.push([x1, y1, x2, y2]);
    }
  }

  rotateOuterAnimation() {
    //rotate p around anchor
    let anchor = this.anchor;
    let p =
      anchor == this.wallPoints.p1 ? this.wallPoints.p2 : this.wallPoints.p1;
    let rotation = this.rotation;
    for (let i = 0; i < this.keyframes; i++) {
      const angle = (i / this.keyframes) * rotation;
      const x =
        anchor.x +
        (p.x - anchor.x) * Math.cos(angle) -
        (p.y - anchor.y) * Math.sin(angle);
      const y =
        anchor.y +
        (p.x - anchor.x) * Math.sin(angle) +
        (p.y - anchor.y) * Math.cos(angle);
      if (this.anchor == this.wallPoints.p1) {
        this.animation.push([anchor.x, anchor.y, x, y]);
      } else {
        this.animation.push([x, y, anchor.x, anchor.y]);
      }
    }
  }

  async playAnimation() {
    if (!this.preload) {
      this.setPoints();
      this.generateFrames();
    }
    let _this = this;
    let tick = this.animation[0];
    let hookId = Hooks.on("sightRefresh", () => {
      _this.wall.data.c = tick;
    });
    for (let frame of this.animation) {
      tick = frame;
      canvas.scene.updateEmbeddedDocuments("Wall", [
        { _id: _this.wall.id, c: frame },
      ]);
      await this.wait(this.frameTime);
    }
    Hooks.off("sightRefresh", hookId);
  }

  wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
