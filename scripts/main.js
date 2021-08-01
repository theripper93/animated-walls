Hooks.once('init', async function() {
    libWrapper.register(
        "animated-walls",
        "DoorControl.prototype._onMouseDown",
        AnimatedWallsOverrides._onMouseDown,
        "OVERRIDE"
      );
      libWrapper.register(
        "animated-walls",
        "DoorControl.prototype._getTexture",
        AnimatedWallsOverrides._getTexture,
        "MIXED"
      );
});

CONFIG.controlIcons.doorPlay = "modules/animated-walls/icons/steel-door-play.webp"
CONFIG.controlIcons.doorSecretPlay = "modules/animated-walls/icons/steel-door-secret-play.webp" 
Hooks.once('ready', async function() {

});

let AnimatedWallsSocket

Hooks.once("socketlib.ready", () => {
	AnimatedWallsSocket = socketlib.registerModule("animated-walls");
	AnimatedWallsSocket.register("playAnimation", WallAnimationSequence.SocketPlayAnimation);
});

function wallAnimTest(wall){
    let moveAnim = new WallAnimation(wall, 3000,{type: 'move', direction: Math.PI, distance: 1000})
    let rotateAnim = new WallAnimation(wall, 3000,{type: 'rotate', rotation: Math.PI, anchor: "p1" , distance: 1000})
    wall.animate({sequence: [moveAnim, rotateAnim]})
}