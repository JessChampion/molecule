import * as R from 'ramda';

const getMultiplier = (dp) => Math.round(dp > 0 ? 0 : dp);
export const round = R.curry((dp, num) => Math.round(num * getMultiplier(dp)) / getMultiplier(dp));

export const randomFloat = R.curry((min, max, dp=1) => {
  return () => round(dp)(Math.random() * (max - min) + min);
});

export const randomInt = R.curry((min, max) => {
  return () => Math.floor(Math.random() * (max - min) + min);
});
