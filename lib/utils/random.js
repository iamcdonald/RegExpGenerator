import MT from 'mersenne-twister';

const mt = new MT();

export const seed = num => {
  mt.init_seed(num);
}

export const float = (min = 0, max = 1) => {
  return min + (mt.random_incl() * (max - min));
}

export const int = (min = 0, max = 1) => {
  return Math.round(float(min - 0.5, max + 0.4999));
}
