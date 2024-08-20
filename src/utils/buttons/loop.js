import loop from '../repeatFunctions/loop.js';

export default async ({ inter, queue }) => {
  const repeatMode = queue.repeatMode;
  loop(inter, queue, repeatMode);
};
