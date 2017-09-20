import {Bodies, Composites, Common, Engine, World} from 'matter-js';
import * as R from 'ramda';

import * as animations from '../animations';

const applyAnimationToAtom = R.evolve({
  rotation: animations.rotation
});
const applyAnimations = R.map(applyAnimationToAtom);

export default class MoleculeEngine {
  constructor() {
    this.atoms = [];
    this.engine = Engine.create();
    this.world = this.engine.world;
  }

  setAtoms(atoms) {
    // call when model changes
    if (atoms) {
      this.atoms = atoms;
    }
    this.updateAtoms();
  }

  updateAtoms() {
    Engine.clear(this.engine);
    // add bodies
    //
    // let stack = Composites.stack(20, 20, 20, 5, 0, 0, function (x, y) {
    //   return Bodies.circle(x, y, Common.random(10, 20), {friction: 0.00001, restitution: 0.5, density: 0.001});
    // });

    let stack = this.atoms.map((atom) => {
      return Bodies.circle(x, y, radius, [options]);
      return Body.create().circle(atom.x, atom.y, Common.random(10, 20), {friction: 0.00001, restitution: 0.5, density: 0.001});
    });

    World.add(this.world, stack);
  }

  tick() {
    //world.step( time );
    //do animation and return atoms
    Engine.update(this.engine);
    console.log(this.world);
    return applyAnimations(this.atoms);
  }
}