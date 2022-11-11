//https://github.com/microsoft/TypeScript/issues/26223#issuecomment-674500430
type TupleOf<T, N extends number> = N extends N ? (number extends N ? T[] : _TupleOf<T, N, []>) : never;
type _TupleOf<T, N extends number, R extends unknown[]> = R["length"] extends N ? R : _TupleOf<T, N, [T, ...R]>;

type t_player = {
  flowers: number;
  pollen: number;
  nectar: number;
  honey: number;
  money: number;

  highestflowers: number;
  highestpollen: number;
  highestnectar: number;
  highesthoney: number;
  highestmoney: number;

  totalflowers: number;
  totalpollen: number;
  totalnectar: number;
  totalhoney: number;
  totalmoney: number;

  lastRJfromflowers: number;
  lastRJfrompollen: number;
  lastRJfromnectar: number;
  lastRJfromhoney: number;
  lastRJfrommoney: number;

  bees: number;
  freeBees: number;
  foragerBees: number;
  honeyBees: number;

  flowerFields: number;
  hives: number;

  totalSacrifices: number;
  pollenGodTributes: number;
  nectarGodTributes: number;
  honeyGodTributes: number;
  flowerGodTributes: number;
  capitalistGodTributes: number;
  autoAsignBeesTo: ("forager" | "honey")[];

  pge: boolean;
  nge: boolean;
  hge: boolean;
  fge: boolean;
  cge: boolean;

  sellingHoney: boolean;

  unlocks: {
    bees: boolean;
    foragerBees: boolean;
    hive: boolean;
    honeyBees: boolean;
    sacrificing: boolean;
    tributes: boolean;
    jelly: boolean;
    jelly2: boolean;
    c1: boolean;
    c2: boolean;
    c3: boolean;
    c4: boolean;
    challenges: boolean;
    c12: boolean;
    c23: boolean;
    c34: boolean;
    c45: boolean;
    c51: boolean;
  };
  lastUpdate: number;
  offlineTime: number;

  RJ: number;
  totalExchanges: number;
  highestRJ: number;
  totalRJ: number;
  RJbees: number;
  RJflowerFields: number;
  RJhives: number;
  RJTributes: number;

  unusedRJTributes: number;
  pollenGodRJTributes: number;
  nectarGodRJTributes: number;
  honeyGodRJTributes: number;
  flowerGodRJTributes: number;
  capitalistGodRJTributes: number;

  combinedGods: [t_gods, t_gods][];

  tab: t_tabs1;
  tab2: t_tabs2;
  tab3: t_tabs3;

  settings: {
    darkmode: boolean;
    bigButtons: boolean;
    displayEverything: boolean;
    iconMove: boolean;

    sacrificeConfirmation: boolean; // todo make it into confirmations object
    exchangeConfirmation: boolean;
    challengeConfirmation: boolean;

    toggleHoneyOfflineTime: boolean;
    toggleSacrificeOfflineTime: boolean;
    toggleRJOfflineTime: boolean;

    autosaves: boolean;
  };

  autobuy: {
    structures: {
      on: boolean; // autobuy if  on && xBuy
      flowerBuy: boolean; // autobuyer status on/off
      beeBuy: boolean; // autobuyer status on/off
      hiveBuy: boolean; // autobuyer status on/off

      flowerBuyPercent: number; // % of resource to use
      beeBuyPercent: number; // % of resource to use
      hiveBuyPercent: number; // % of resource to use

      flower: boolean; // bought
      bee: boolean; // bought
      hive: boolean; // bought
    };
  };

  challenge: string;
  challengeCompletions: {
    c1: number;
    c12: number;
    c2: number;
    c23: number;
    c3: number;
    c34: number;
    c4: number;
    c45: number;
    c5: number;
    c51: number;
  };
  RJTime: number;

  version: [number, number, number, number];
};

const newEmptyPlayer = (): t_player => {
  return {
    flowers: 250,
    pollen: 0,
    nectar: 0,
    honey: 1,
    money: 0,

    highestflowers: 0,
    highestpollen: 0,
    highestnectar: 0,
    highesthoney: 1,
    highestmoney: 0,

    totalflowers: 0,
    totalpollen: 0,
    totalnectar: 0,
    totalhoney: 0,
    totalmoney: 0,

    lastRJfromflowers: 0,
    lastRJfrompollen: 0,
    lastRJfromnectar: 0,
    lastRJfromhoney: 0,
    lastRJfrommoney: 0,

    bees: 0,
    freeBees: 0,
    foragerBees: 0,
    honeyBees: 0,

    flowerFields: 1,
    hives: 1,

    totalSacrifices: 0,
    pollenGodTributes: 0,
    nectarGodTributes: 0,
    honeyGodTributes: 0,
    flowerGodTributes: 0,
    capitalistGodTributes: 0,
    autoAsignBeesTo: [],

    pge: false,
    nge: false,
    hge: false,
    fge: false,
    cge: false,

    sellingHoney: false,
    // bees -> foragerBees -> honeyBees -> sacrificing -> tributes -> jelly -> jelly2 -> c1..c4 -> challenges -> c12..c51
    //              └> hive at 1 pollen         └> money
    // buy bee, get forager bee, get honey bee, unlock money from tributes, at least 50 of pollen etc and 1k flowers, at least one tribute
    unlocks: {
      bees: false,
      foragerBees: false,
      hive: false,
      honeyBees: false,
      sacrificing: false, // unlocked sacrificing
      tributes: false, // sacrificed
      jelly: false, // unlocked RJ
      jelly2: false, // had RJ
      c1: false, // combining gods
      c2: false,
      c3: false,
      c4: false,
      challenges: false, // challenges
      c12: false, // ch I + II
      c23: false, // etc
      c34: false,
      c45: false,
      c51: false,
    },
    lastUpdate: Date.now(),
    offlineTime: 1, // so generous

    totalExchanges: 0,
    RJ: 0,
    highestRJ: 0,
    totalRJ: 0,
    RJbees: 0,
    RJflowerFields: 0,
    RJhives: 0,
    RJTributes: 0,

    unusedRJTributes: 0,
    pollenGodRJTributes: 0,
    nectarGodRJTributes: 0,
    honeyGodRJTributes: 0,
    flowerGodRJTributes: 0,
    capitalistGodRJTributes: 0,

    combinedGods: [],

    tab: "main",
    tab2: "combine",
    tab3: "stats",

    settings: {
      darkmode: true,
      bigButtons: false,
      displayEverything: false,
      iconMove: false,

      sacrificeConfirmation: true,
      exchangeConfirmation: true,
      challengeConfirmation: true,

      toggleHoneyOfflineTime: false,
      toggleSacrificeOfflineTime: true,
      toggleRJOfflineTime: true,

      autosaves: true,
    },

    autobuy: {
      structures: {
        on: true,
        flowerBuy: true,
        beeBuy: true,
        hiveBuy: true,
        flowerBuyPercent: 100,
        beeBuyPercent: 100,
        hiveBuyPercent: 100,
        flower: false,
        bee: false,
        hive: false,
      },
    },

    challenge: "",
    challengeCompletions: {
      c1: 0,
      c2: 0,
      c3: 0,
      c4: 0,
      c5: 0,
      c12: 0,
      c23: 0,
      c34: 0,
      c45: 0,
      c51: 0,
    },
    RJTime: 0,

    version: [0, 2, 5, 3],
  };
};
let p: t_player;

// p.pollenGodTributes = 5;
// p.nectarGodTributes = 5;
// p.honeyGodTributes = 5;
// p.flowerGodTributes = 5;
// p.capitalistGodTributes = 5;
