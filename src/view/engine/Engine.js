import * as R from 'ramda';

import * as animations from '../animations';

const applyAnimationToAtom = R.evolve({
  rotation: animations.rotation
});
const applyAnimations = R.map(applyAnimationToAtom);

export default class Engine{
  constructor(){
    this.atoms = [];
  }

  setAtoms(atoms){
    // call when model changes
    if(atoms) {
      this.atoms = atoms;
    }
  }

  tick(){
    //do animation and return atoms
    return applyAnimations(this.atoms);
  }
}