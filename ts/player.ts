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
  autosaves: boolean;

  unlocks: {
    bees: boolean;
    foragerBees: boolean;
    hive: boolean;
    honeyBees: boolean;
    sacrificing: boolean;
    tributes: boolean;
    jelly: boolean;
    jelly2: boolean;
  };
  lastUpdate: number;
  offlineTime: number;

  RJ: number;
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

  tab: t_tabs1;

  darkmode: boolean;
  bigButtons: boolean;
  displayEverything: boolean;
  harderTributes: boolean;
  exchangeConfirmation: boolean;
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
    autosaves: true,
    // bees -> foragerBees -> honeyBees -> sacrificing -> tributes -> jelly -> jelly2
    //              └> hive at 1 pollen         └> money
    // buy bee, get forager bee, get honey bee, unlock money from tributes, at least 50 of pollen etc and 1k flowers, at least one tribute
    unlocks: {
      bees: false,
      foragerBees: false,
      hive: false,
      honeyBees: false,
      sacrificing: false,
      tributes: false,
      jelly: false,
      jelly2: false,
    },
    lastUpdate: Date.now(),
    offlineTime: 1, // so generous

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

    tab: "main",

    darkmode: true,
    bigButtons: false,
    displayEverything: false,
    harderTributes: false,
    exchangeConfirmation: true,
  };
};
let p: t_player;

// p.pollenGodTributes = 5;
// p.nectarGodTributes = 5;
// p.honeyGodTributes = 5;
// p.flowerGodTributes = 5;
// p.capitalistGodTributes = 5;
