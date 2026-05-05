export const codexPetAtlas = {
  columns: 8,
  rows: 9,
  cellWidth: 192,
  cellHeight: 208,
  animations: {
    idle: {
      row: 0,
      frames: 4,
      frameDurations: [520, 144, 184, 460],
    },
    'running-right': {
      row: 1,
      frames: 8,
      frameDurations: [240, 240, 240, 240, 240, 240, 240, 440],
    },
    'running-left': {
      row: 2,
      frames: 8,
      frameDurations: [240, 240, 240, 240, 240, 240, 240, 440],
    },
    waving: {
      row: 3,
      frames: 4,
      frameDurations: [280, 280, 280, 560],
    },
    jumping: {
      row: 4,
      frames: 5,
      frameDurations: [280, 280, 280, 280, 560],
    },
    failed: {
      row: 5,
      frames: 8,
      frameDurations: [280, 280, 280, 280, 280, 280, 280, 480],
    },
    waiting: {
      row: 6,
      frames: 6,
      frameDurations: [300, 300, 300, 300, 300, 520],
    },
    running: {
      row: 7,
      frames: 6,
      frameDurations: [240, 240, 240, 240, 240, 440],
    },
    review: {
      row: 8,
      frames: 6,
      frameDurations: [300, 300, 300, 300, 300, 560],
    },
  },
};
