Hooks.once('init', async function() {

});

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