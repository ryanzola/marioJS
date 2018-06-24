'use strict';
import '../style/style.css';
import Compositor from './compositor';
import Timer from './timers';
import { createBackgroundLayer, createSpriteLayer } from './layers';
import { loadLevel } from './loaders';
import { loadBackgroundSprites } from './sprites';
import { createMario } from './entities';

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

// load everything in parallel
Promise.all([
  loadBackgroundSprites(),
  createMario(),
  loadLevel('1-1')
]).then(([
  backgroundSprites,
  mario,
  level
]) => {
  const comp = new Compositor()

  const backgroundLayer = createBackgroundLayer(level.backgrounds, backgroundSprites)
  comp.layers.push(backgroundLayer);

  const gravity = 30;
  mario.pos.set(64, 180);
  mario.vel.set(200, -600);

  const spriteLayer = createSpriteLayer(mario);
  comp.layers.push(spriteLayer);

  const timer = new Timer(1/60);


  timer.update = function update(deltaTime) {
      comp.draw(context);
      mario.update(deltaTime);
      mario.vel.y += gravity;
  }

  timer.start();
})
