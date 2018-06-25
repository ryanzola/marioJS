import Entity, { Trait } from './entity';
import Velocity from './traits/velocity'
import Jump from './traits/jump';
import { loadMarioSprite } from './sprites';

export const createMario = () => {
  return loadMarioSprite().then(sprite => {
    const mario = new Entity();

    mario.addTrait(new Velocity());
    mario.addTrait(new Jump());

    mario.draw = function drawMario(context) {
      sprite.draw('idle', context, this.pos.x, this.pos.y);
    };

    return mario;
  });
};
