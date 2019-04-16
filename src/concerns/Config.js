export const BLOCKS = {
  player: 1,
  red: 2,
  blue: 3,
  yellow: 4,
  green: 5,
  purple: 6,
  orange: 7,
  brown: 8,
  wall: 10,
  floor: 9,
  flash: 11,
  combineGreen: 12,
  combinePurple: 13,
  combineOrange: 14,
  bomb: 15,
  explode: 16
}

export const BLOCKCLASSES = {
  [`${BLOCKS.player}`]: "player",
  [`${BLOCKS.red}`]: "red",
  [`${BLOCKS.blue}`]: "blue",
  [`${BLOCKS.yellow}`]: "yellow",
  [`${BLOCKS.green}`]: "green",
  [`${BLOCKS.purple}`]: "purple",
  [`${BLOCKS.orange}`]: "orange",
  [`${BLOCKS.brown}`]: "brown",
  [`${BLOCKS.wall}`]: "wall",
  [`${BLOCKS.floor}`]: "floor",
  [`${BLOCKS.flash}`]: "flash",
  [`${BLOCKS.combineGreen}`]: "combineGreen",
  [`${BLOCKS.combinePurple}`]: "combinePurple",
  [`${BLOCKS.combineOrange}`]: "combineOrange",
  [`${BLOCKS.bomb}`]: "bomb",
  [`${BLOCKS.explode}`]: "explode"
}

export const BLOCKCOLORS = {
  [`${BLOCKS.player}`]: "rgb(250, 242, 242)",
  [`${BLOCKS.red}`]: "rgb(223, 85, 85)",
  [`${BLOCKS.blue}`]: "rgb(81, 81, 243)",
  [`${BLOCKS.yellow}`]: "rgb(236, 236, 53)",
  [`${BLOCKS.green}`]: "rgb(100, 192, 100)",
  [`${BLOCKS.purple}`]: "rgb(170, 101, 170)",
  [`${BLOCKS.orange}`]: "rgb(243, 173, 42)",
  [`${BLOCKS.brown}`]: "rgb(165, 129, 62)",
  [`${BLOCKS.wall}`]: "rgb(180, 175, 175)",
  [`${BLOCKS.floor}`]: "rgb(206, 206, 206)",
  [`${BLOCKS.flash}`]: "rgb(206, 206, 206)",
  [`${BLOCKS.combineGreen}`]: "rgb(206, 206, 206)",
  [`${BLOCKS.combinePurple}`]: "rgb(206, 206, 206)",
  [`${BLOCKS.combineOrange}`]: "rgb(206, 206, 206)",
  [`${BLOCKS.bomb}`]: "rgb(109, 109, 122)",
  [`${BLOCKS.explode}`]: "rgb(206, 206, 206)"
}

export const paletteColors = [
  [
    BLOCKS.red,
    BLOCKS.blue,
    BLOCKS.yellow,
    BLOCKS.green,
    BLOCKS.purple,
    BLOCKS.orange,
    BLOCKS.brown,
    BLOCKS.bomb,
    BLOCKS.wall,
    BLOCKS.floor,
    BLOCKS.player
  ]
]

export const blankBoards = {
  medium: [
    [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
    [10, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 10],
    [10, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 10],
    [10, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 10],
    [10, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 10],
    [10, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 10],
    [10, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 10],
    [10, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 10],
    [10, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 10],
    [10, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 10],
    [10, 9, 9, 9, 9, 9, 9, 9, 9, 9, 1, 10],
    [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10]
  ],
  small: [
    [10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
    [10, 9, 9, 9, 9, 9, 9, 9, 9, 10],
    [10, 9, 9, 9, 9, 9, 9, 9, 9, 10],
    [10, 9, 9, 9, 9, 9, 9, 9, 9, 10],
    [10, 9, 9, 9, 9, 9, 9, 9, 9, 10],
    [10, 9, 9, 9, 9, 9, 9, 9, 9, 10],
    [10, 9, 9, 9, 9, 9, 9, 9, 9, 10],
    [10, 9, 9, 9, 9, 9, 9, 9, 9, 10],
    [10, 9, 9, 9, 9, 9, 9, 9, 1, 10],
    [10, 10, 10, 10, 10, 10, 10, 10, 10, 10]
  ],
  large: [
    [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
    [10, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 10],
    [10, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 10],
    [10, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 10],
    [10, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 10],
    [10, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 10],
    [10, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 10],
    [10, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 10],
    [10, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 10],
    [10, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 10],
    [10, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 10],
    [10, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 10],
    [10, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 1, 10],
    [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10]
  ]
}
