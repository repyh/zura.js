# zura.js
Javascript game engine with physics included

## THE ENGINE IS NOT DONE YET, MUCH FEATURES WILL BE ADDED IN THE FEATURE
### Bugs:
- Y Velocity remain the same when falling after positive force is added.

## Example
```js
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

// Create a new game Rectangle game object with physics property
const square = new Rectangle(ctx, canvas.width/2, canvas.height/2, 30, 30, true, {
  gravity: 3,
  drag: 0,
  velocityX: 0,
  velocityY: 0
});

function Update() {
  if(window.isKeyDown('d')) {
    square.rigidBody.addForce(3, 0); // Add positive force in the X Axis
  }
  if(window.isKeyDown('a')) {
    square.rigidBody.addForce(-3, 0); // Add negative force in the X Axis
  }
}

const Engine = new Zura(ctx, 600, 400, Update);
```
