import nowPlaying from "../repeatFunctions/nowplaying.js";

export default async ({ inter, queue }) => {
  const isButton = true;
  nowPlaying(inter, queue, isButton);
};
