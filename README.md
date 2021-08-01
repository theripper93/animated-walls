# Animated Walls
Animate your walls with rotation and movement animations.

![Latest Release Download Count](https://img.shields.io/github/downloads/theripper93/animated-walls/latest/module.zip?color=2b82fc&label=DOWNLOADS&style=for-the-badge) [![Forge Installs](https://img.shields.io/badge/dynamic/json?label=Forge%20Installs&query=package.installs&suffix=%25&url=https%3A%2F%2Fforge-vtt.com%2Fapi%2Fbazaar%2Fpackage%2Fanimated-walls&colorB=03ff1c&style=for-the-badge)](https://forge-vtt.com/bazaar#package=animated-walls) ![Foundry Core Compatible Version](https://img.shields.io/badge/dynamic/json.svg?url=https%3A%2F%2Fraw.githubusercontent.com%2Ftheripper93%2Fanimated-walls%2Fmain%2Fmodule.json&label=Foundry%20Version&query=$.compatibleCoreVersion&colorB=orange&style=for-the-badge) [![alt-text](https://img.shields.io/badge/-Patreon-%23ff424d?style=for-the-badge)](https://www.patreon.com/theripper93) [![alt-text](https://img.shields.io/badge/-Discord-%235662f6?style=for-the-badge)](https://discord.gg/F53gBjR97G)

## Forewarning

Animating walls is expensive in terms of performance, on large maps running an animation will cause stuttering, there is no real way around it. That said Animated Walls is not doing anything while walls are not animating so it will never passively impact performance

## How to use:

This configuration is added to the wall configuration(only the relevant fields will be displayed depending on the chosen animation:

![image](https://user-images.githubusercontent.com/1346839/127773170-6f6c18f2-f2a2-4be7-971a-55d97a84b8ed.png)

Animations are activated with the door button, so the wall needs to be a door (it can be secret)
You have 2 options for animation, move and rotate.

# MOVE:
You need the following fields for it to work:
**Distance:** How much the wall will move, this is in pixels, so if your grid size is 100, 100 will move it by 1 square
**Rotation\Direction:** This is the direction of the movement in degrees, 0 will move to the right, 90 to the bottom 180 to the left 270 to the top, and all the values in-between are supported as well
**Duration:** The time needed from start to finish of the animation

# ROTATE:
You need the following fields for it to work:
**Anchor:** The fixed point to use for the rotation, you can use left\right\top\bottom and the system will calculate the point of your wall which is the leftmost,rightmost etc... You can use center, or you can manually set a point (P1\P2) there is no way to visualize (currently) which point is which but you can test it out.
**Rotation\Direction:** This is how many degrees to rotate, use a negative value to reverse the direction of rotation
**Duration:** The time needed from start to finish of the animation

**Reverse animation on subsequent activations:** This checkbox will play the animation in reverse on subsequent activation (eg opening and closing a door)

**Execute macro:** The name of the macro to be executed when the door is clicked (this is indipendent of the animation and will work even if the animation is set to none). Note that `args[0]` is the `wall` that triggered the event

# Execute Animation:
When you have an animation setup, the door icon will show a play button (gm only) when clicking on the door icon the wall will animate instead of opening\closing the door

## FAQ

**How do i do a door that opens gradually?:** (aka a peaking door). Simply set the animation to rotate, input p1 or p2 in the anchor and set the rotation to something like 10 degrees. If you don't check the reverse animation every time you click on the door icon the door will open by 10 degrees, the only side effect is that you are gonna have to close the door manually since there is no reverse animation, you could automate this with a macro (if you really wanted)

## Macros and Scripts

You can chain together animation and call them via scripts, this works also well with sequencer, for example you could play a tile animation together with the wall animation

You can create a moving animation or rotating animation via the WallAnimation class. Eg:

Moving animation:

```js
const moveAnim = new WallAnimation(wall, timeInMs,{type: 'move', direction: inRadians, distance: inPixels})
```

Rotating animation

```js
const rotateAnim = new WallAnimation(wall, timeInMs,{type: 'rotate', rotation: inRadians, anchor: "p1"||"p2"||"c"})
```

Full example with 2 animations

```js
    const moveAnim = new WallAnimation(wall, 3000,{type: 'move', direction: Math.PI, distance: 1000})
    const rotateAnim = new WallAnimation(wall, 3000,{type: 'rotate', rotation: Math.PI, anchor: "p1"})
    await wall.animate({sequence: [moveAnim, rotateAnim]})
    //Do something after the animation is done
```
