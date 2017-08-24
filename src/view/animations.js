import {config} from './config';

export const rotation = (r) => {
  if (r >= (2 * Math.PI)) {
    return 0;
  }
  return (r + Math.PI * config.rotation.speed);
};
