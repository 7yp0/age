# AGE (Adventure Game Engine)

## Game Engine

This Engine is splitted in two modes:
The Editor (Development node env var) and the Game Mode (Production node env var)

The Engine is build upon the Flux architecture idea.

For the Game Mode you usally only need the following:

- handlers (called every frame)
- scripts (are triggered by clickables or triggerables occasionally)

From there on you dispatch actions (predefined or own) in order to change the game state.
Reducers need to react to the dispatched action and change the state accordingly.
After that handlers and scripts will receive the new state.

### GUI

For GUI the Engine uses the DOM of the Browser in addition to React as a UI Library.
This way you can use the power and easiness of web UI in your Game.

## Architecture

Loop:
clear canvas -> getState -> handlers -> renderers -> (in browser flush) -> REPEAT

Flux:
state -> handlers -> dispatch action -> middlewares -> reducers -> store -> REPEAT

Event Side Effects:
addEventLsiteners on start
trigger of event -> dispatch action -> middlewares -> reducers -> store -> GO TO FLUX
trigger of clickable | triggerable -> call script function -> dispatch action -> middlewares -> reducers -> store -> GO TO FLUX

### Allowed to access getState and dispatch

- Render Loop
- eventHandlers
- GUI Provider
- Sideeffects

## TODO

Scenes:

```typescript
interface State {
  scenes: {
    currentSceneId: Uid;
    scenes: {
      id: {
        id: Uid;
        polygons: Uid[];
        clickables: Uid[];
        playerSpawnPoints: Uid[]
      },
      ...
    }
  },
  playerSpawnPoints: {
    id: {
      id: Uid;
      position: Point;
    },
  }
}
```

- Move npc by target
  - add moveable entity by click
    - action
    - reducer
    - ui
- add collider areas (intersection with player)
  - for each corner of the rect: do line intersection (point, and infinite) with polygon
- add collission detection (boundaries)
- rasterize
- A\* pathfinding
- zoom in and out (by changing the resolution probably)
- make polygons moveable (dragable)
- add scenes (maybe let both reducers listen for the action. scenes save id only and polygon saves whole polygon)
  - only show polygons from the scene
  - scene change can be triggered by a script
  - scene needs > 1 spawn point, if player should move there
  - (sceneId: Uid, spawnPoint: Uid) => void
  - each enemy/prop gets a spawn point too (get's placed)
  - scenes always persist the position and attributes of their props
  - make props hideable in the scene (will be rendered only when it is set to visible)
- load a background https://www.html5rocks.com/en/tutorials/canvas/performance/
- load asset images
- Animations (render the animation onto a buffer canvas and then draw slcies of it to the rendering canvas)
- add 2d light (shaders in loop [runs over background texture + normal map + all other registered textures])
  - render everything we render to the render canvas to a normalmap canvas with the specific normal maps (if no normal map specified for an object, than use a the front color)
    https://29a.ch/2010/3/24/normal-mapping-with-javascript-and-canvas-tag
    https://hacks.mozilla.org/2011/12/faster-canvas-pixel-manipulation-with-typed-arrays/
- Particle Effects
- Level change
- Sound effects
- interactive Music system
