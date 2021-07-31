Hooks.once('init', async function() {

});

Hooks.once('ready', async function() {

});


function wallAnimTest(wall){
    let moveAnim = new WallAnimation(wall, 3000,{type: 'move', direction: Math.PI/2, distance: 1000})
    wall.animate({sequence: [moveAnim]})
}