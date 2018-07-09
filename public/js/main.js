import Camera from './Camera.js';
import Timer from './Timer.js';
import { loadLevel } from './loaders/level.js';
import { loadEntities } from './entities.js';
import { setupKeyboard } from './input.js';


const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

Promise.all([
  loadEntities(),
  loadLevel('1-1')
])
.then(([ entity, level ]) => {
  const camera = new Camera();
  window.camera = camera;

  const mario = entity.mario();
  mario.pos.set(64, 180);

  const goomba = entity.goomba();
  goomba.pos.set(220, 100);

  const koopa = entity.koopa();
  koopa.pos.set(260, 100);

  level.entities.add(mario);
  level.entities.add(goomba);
  level.entities.add(koopa);

  const input = setupKeyboard(mario);
  input.listenTo(window);

  const timer = new Timer();
  timer.update = function update(deltaTime) {
    level.update(deltaTime);

    if(mario.pos.x > 100) {
      camera.pos.x = mario.pos.x - 100;
    }

    level.comp.draw(context, camera);
  };

  timer.start();
});
