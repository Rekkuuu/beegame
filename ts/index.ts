let tmp = {
  maxForagerBees: 0,
  maxHoneyBees: 0,
  totalTributes: 0,
  m0e: 1,
  m1e: 1,
  m2e: 1,
  m3e: 1,
  m4e: 1,
  m5e: 1,
  m6e: 1,
  m7e: 1,
  m8e: 1,
  m9e: 1,
  m10e: 1,
  flowerProd: 1,
  flowerConsumption: 1,
  pollenProd: 1,
  nectarProd: 1,
  nectarConsumption: 1,
  honeyProd: 1,
  flowerEff: 1,
  nectarEff: 1,
  moneyProd: 1,
  honeyConsumption: 1,
  displayeverything: false,

  gameSpeedFormTicks: 1,

  foragerBeeConsumption: 1 / 3,
  usedTime: 1,

  capitalistEff: 1,
  brts: 5,
  RJBonus: 1,
  totalRJBonus: 1,

  tmpunusedRJTributes: 0,
  tmpRJpollenGodTributes: 0,
  tmpRJnectarGodTributes: 0,
  tmpRJhoneyGodTributes: 0,
  tmpRJflowerGodTributes: 0,
  tmpRJcapitalistGodTributes: 0,
};

type t_gods = "flower" | "pollen" | "nectar" | "honey" | "money";

const format = (x: number, p = 0): string => {
  // @ts-ignore
  if (typeof x != "number" || x == null || x == undefined) return;
  if (x < -1000) {
    let power = Math.floor(Math.log10(Math.abs(x)));
    console.log(power);

    return (x / 10 ** power / 1.0001).toFixed(2) + "e" + power;
  }
  if (x < -100) return x.toFixed(Math.max(0, 1 + p));
  if (x < -10) return x.toFixed(Math.max(0, 2 + p));
  if (x < -1) return x.toFixed(Math.max(0, 3 + p));
  if (x == 0) return "0";
  if (x < 1) return x.toFixed(Math.max(0, 3 + p));
  if (x < 10) return x.toFixed(Math.max(0, 2 + p));
  if (x < 100) return x.toFixed(Math.max(0, 1 + p));
  if (x < 1000) return x.toFixed(Math.max(0, 0 + p));
  let power = Math.floor(Math.log10(x));
  return (x / 10 ** power / 1.0001).toFixed(2) + "e" + power;
};

const ft2 = (x: number) => Math.floor(x * 100) / 100;

const c = 10 ** (1 / 12);

const getBeePrice = () => {
  let a = c ** p.bees;
  let price = 1 * a;
  if (tmp.totalTributes >= tributeMilestones[1]) price /= tmp.m1e;
  return price;
};
const getBeePriceMult = () => {
  let a = 1;
  if (tmp.totalTributes >= tributeMilestones[1]) a /= tmp.m1e;
  return a;
};

const getHivePrice = () => {
  let a = c ** p.hives;
  let price = 2 * a;
  price /= tmp.capitalistEff;
  return price;
};
const getHivePriceMult = () => {
  let a = 2;
  a /= tmp.capitalistEff;
  return a;
};

const getFlowerFieldPrice = () => {
  let a = c ** (p.flowerFields - 1);
  let price = 5 * a;
  price /= tmp.capitalistEff;
  return price;
};
const getFlowerFieldPriceMult = () => {
  let a = 5;
  a /= tmp.capitalistEff;
  return a;
};

const getMaxForagerBees = () => {
  let space = (3 + p.hives) / 5;
  space += Math.floor((4 + p.bees + (tmp.totalTributes / 5) * tmp.m5e) / 5);
  space += (p.pollenGodTributes + p.pollenGodRJTributes) * tmp.m5e;
  space *= tmp.capitalistEff;
  if (p.cge) {
    return space;
  } else return Math.floor(space);
};

const getMaxHoneyBees = () => {
  let space = (3 + p.hives) / 5;
  space += Math.floor((4 + p.bees + (tmp.totalTributes / 5) * tmp.m5e) / 5);
  space += (p.nectarGodTributes + p.nectarGodRJTributes) * tmp.m5e;
  space *= tmp.capitalistEff;
  if (p.cge) {
    return space;
  } else return Math.floor(space);
};

const getFlowerProduction = (flowerFields = p.flowerFields + (p.flowerGodTributes + p.flowerGodRJTributes) * tmp.m5e) => {
  let prod = flowerFields;
  prod *= 1.01 ** Math.max(0, p.flowerFields - 1 + (p.flowerGodTributes + p.flowerGodRJTributes) * tmp.m5e);
  prod *= 1.03 ** ((p.flowerGodTributes + p.flowerGodRJTributes) * tmp.m5e);
  prod *= tmp.m0e;
  prod *= tmp.gameSpeedFormTicks;
  prod *= tmp.RJBonus;
  prod *= tmp.totalRJBonus;
  return prod;
};

const getPollenProduction = (foragerBees = p.foragerBees) => {
  let prod = (foragerBees * 3) / 40;
  prod *= 1.01 ** Math.max(0, p.flowerFields + (p.flowerGodTributes + p.flowerGodRJTributes) * tmp.m5e - 1);
  prod *= 1.03 ** ((p.pollenGodTributes + p.pollenGodRJTributes) * tmp.m5e);
  if (p.pge) prod *= 2;
  prod *= tmp.m8e;
  prod *= tmp.gameSpeedFormTicks;
  prod *= tmp.RJBonus;
  prod *= tmp.totalRJBonus;
  return prod;
};

const getNectarProduction = (foragerBees = p.foragerBees) => {
  let prod = foragerBees / 8;
  prod *= 1.01 ** Math.max(0, p.bees - 1 + tmp.totalTributes / 5);
  prod *= 1.03 ** ((p.nectarGodTributes + p.nectarGodRJTributes) * tmp.m5e);
  prod *= tmp.m6e;
  prod *= tmp.m8e;
  prod *= tmp.gameSpeedFormTicks;
  prod *= tmp.RJBonus;
  prod *= tmp.totalRJBonus;
  return prod;
};

const getHoneyProduction = (honeyBees = p.honeyBees) => {
  let prod = honeyBees / 30;
  prod *= 1.01 ** Math.max(0, p.hives);
  prod *= 1.03 ** ((p.honeyGodTributes + p.honeyGodRJTributes) * tmp.m5e);
  prod *= tmp.m4e;
  prod *= p.nge ? 2 : 1;
  prod *= tmp.m8e;
  prod *= tmp.gameSpeedFormTicks;
  prod *= tmp.RJBonus;
  prod *= tmp.totalRJBonus;
  return prod;
};

const getHoneyToSell = (honeyToSell = p.honey * 0.01) => {
  if (p.honey < 1 / (getHoneyWorth() * 10)) return 0;
  return honeyToSell;
};
const getHoneyWorth = () => {
  let worth = tmp.m7e;
  worth *= tmp.RJBonus;
  worth *= tmp.totalRJBonus;
  return worth;
};

const b = 10 ** (1 / 5);
const b1 = 50 / b;
const b2 = 500 / b;

const getSmallGodTribute = (smallResource: number, itsTributes: number) => {
  let base = smallResource;
  if (tmp.totalTributes >= 6) base *= 1.02 ** ((tmp.totalTributes * tmp.m5e) / 3);
  return Math.floor(Math.log(Math.max(1, base / b1)) / Math.log(b)) - itsTributes;
};
const getSmallGodTribute2 = (smallResource: number, itsTributes: number) => {
  let base = smallResource;
  if (tmp.totalTributes >= 6) base *= 1.02 ** ((tmp.totalTributes * tmp.m5e) / 3);
  return Math.floor(Math.log(Math.max(1, base / b2)) / Math.log(b)) - itsTributes;
};

const getNextsmallGodTribute = (currentTributes: number, tributesToGet: number) => {
  let tributes = currentTributes + Math.max(0, tributesToGet) + 1;
  let base = b1;
  if (tmp.totalTributes >= 6) base /= 1.02 ** ((tmp.totalTributes * tmp.m5e) / 3);
  return b ** tributes * base;
};
const getNextsmallGodTribute2 = (currentTributes: number, tributesToGet: number) => {
  let tributes = currentTributes + Math.max(0, tributesToGet) + 1;
  let base = b2;
  if (tmp.totalTributes >= 6) base /= 1.02 ** ((tmp.totalTributes * tmp.m5e) / 3);
  return b ** tributes * base;
};

const totalTributes = () => {
  return (
    p.pollenGodTributes +
    p.pollenGodRJTributes +
    p.nectarGodTributes +
    p.nectarGodRJTributes +
    p.honeyGodTributes +
    p.honeyGodRJTributes +
    p.flowerGodTributes +
    p.flowerGodRJTributes +
    p.capitalistGodTributes +
    p.capitalistGodRJTributes
  );
};
const totalBees = () => {
  return p.freeBees + p.foragerBees + p.honeyBees;
};
const floor = (x: number) => Math.floor(x);

// const requiredBeesToSacrifice = (tributes = tmp.totalTributes) => (5 + tributes) / tmp.m2e;
const p1 = (s: number, n: number) => (n % s) * floor(1 + n / s);
const p2 = (s: number, n: number) => (s * (floor(n / s) * (floor(n / s) + 1))) / 2;
const stepwise1 = (s: number, n: number) => p1(s, n) + p2(s, n);
const requiredBeesToSacrifice = (tributes = tmp.totalTributes) => {
  if (p.harderTributes) return (5 + stepwise1(10, tributes)) / tmp.m2e;
  else return 5 + tributes / tmp.m2e;
};
// its better i think (not like ur not gonna have bees)

const getPSWithS = (what: string, x: number) => {
  if (x > 1) return `${format(x)} ${what}s per second`;
  else if (x == 1) return `${format(x)} ${what} per second`;
  else return `1 ${what} per ${format(1 / x)} seconds`;
};

const getPS = (what: string, x: number) => {
  if (x >= 1) return `${format(x)} ${what} per 1 second`;
  else return `1 ${what} per ${format(1 / x)} seconds`;
};

let tributeMilestones: TupleOf<number, 14> = [2, 5, 10, 15, 20, 30, 45, 60, 75, 100, 110, 130, 160, 200];
let tributeMilestonesShow: TupleOf<number, 14> = [1, 2, 5, 10, 15, 20, 30, 40, 50, 100, 110, 130, 160, 200];
let tributeMilestonesHide: TupleOf<number, 14> = [0, 1, 2, 5, 10, 15, 20, 25, 30, 75, 100, 100, 160, 180];
let tributeMilestondeDesc: TupleOf<string, 14> = [
  "1.02x flower production for every 2 free bee and for every 2 tributes",
  "bee price divided by 1.02x for every 2 tributes",
  "sacrifice requirement divided by 1.02 for every 2 tributes",
  "1 bee for every 5 tributes",
  "1.02x honey production per tribute",
  "1.02x tribute efficiency for every 10 tributes",
  "1.02x nectar production for every 2 tributes",
  "1.02x honey price multiplier per 3 tributes",
  "1.02x time speed multiplier per 5 tributes",
  "unlocks royal jelly",
  "combine a pair of gods",
  "combine another pair of gods",
  "turn one god into a higher god",
  "challenges",
];

const ft = (x: number) => {
  let rx = x;
  let t = "";
  if (x > 86400) {
    let d = Math.floor(x / 86400) % 365;
    x -= d * 86400;
    t += ` ${d}d`;
  }
  if (x > 3600) {
    let h = Math.floor(x / 3600) % 24;
    x -= h * 3600;
    t += ` ${h}h`;
  }
  if (x > 60) {
    let m = Math.floor(x / 60) % 60;
    x -= m * 60;
    t += ` ${m}m`;
  }
  if (x > 1 && rx < 86400) {
    let s = Math.floor(x) % 60;
    t += ` ${s}s`;
  }
  return t;
};

let gameSpeed = 1;
const getForagerBeeConsumption = () => (11.85185185185185 * getNectarProduction(1) * getPollenProduction(1)) ** 0.5;

const updateResources = (diff: number) => {
  // i pray to god that these are at least a little off and not compleately broken

  tmp.maxForagerBees = getMaxForagerBees();
  tmp.maxHoneyBees = getMaxHoneyBees();

  tmp.flowerProd = getFlowerProduction();
  tmp.foragerBeeConsumption = getForagerBeeConsumption();
  tmp.flowerConsumption = p.foragerBees * tmp.foragerBeeConsumption;

  tmp.pollenProd = getPollenProduction();

  tmp.nectarProd = getNectarProduction();
  tmp.nectarConsumption = getHoneyProduction() / (p.nge ? 2 : 1);

  tmp.honeyProd = getHoneyProduction();

  tmp.flowerEff = 0;
  if (p.flowers + tmp.flowerProd != 0 && tmp.flowerConsumption != 0)
    tmp.flowerEff = Math.min(1, (p.flowers + tmp.flowerProd) / tmp.flowerConsumption);

  tmp.flowerProd = tmp.flowerProd - tmp.flowerConsumption * tmp.flowerEff;
  tmp.pollenProd *= tmp.flowerEff;
  tmp.nectarProd *= tmp.flowerEff;

  tmp.nectarEff = 0;
  if (p.nectar + tmp.nectarProd != 0 && tmp.nectarConsumption != 0)
    tmp.nectarEff = Math.min(1, (p.nectar + tmp.nectarProd) / tmp.nectarConsumption);
  tmp.honeyProd *= tmp.nectarEff;

  p.flowers += tmp.flowerProd * diff;
  p.pollen += tmp.pollenProd * diff;
  p.nectar += tmp.nectarProd * diff;
  p.nectar -= tmp.nectarConsumption * tmp.nectarEff * diff;
  p.honey += tmp.honeyProd * tmp.nectarEff * diff;

  tmp.moneyProd = getHoneyToSell() * getHoneyWorth();
  tmp.honeyConsumption = getHoneyToSell();

  if (p.sellingHoney) tmp.honeyProd -= tmp.honeyConsumption;

  if (p.flowers < 0.001) {
    p.flowers = 0;
  }
  if (p.nectar < 0.001) {
    p.nectar = 0;
  }

  if (p.sellingHoney && p.bees) {
    p.honey -= tmp.honeyConsumption * diff;
    p.money += Math.min(p.honey * getHoneyWorth(), tmp.moneyProd * diff);
  }

  // highest for sacrifice
  p.highestflowers = Math.max(p.flowers, p.highestflowers ?? 0);
  p.highestpollen = Math.max(p.pollen, p.highestpollen ?? 0);
  p.highestnectar = Math.max(p.nectar, p.highestnectar ?? 0);
  p.highesthoney = Math.max(p.honey, p.highesthoney ?? 0);
  p.highestmoney = Math.max(p.money, p.highestmoney ?? 0);

  // total for royal jelly
  p.totalflowers = (p.totalflowers ?? 0) + tmp.flowerProd * diff;
  p.totalpollen = (p.totalpollen ?? 0) + tmp.pollenProd * diff;
  p.totalnectar = (p.totalnectar ?? 0) + tmp.nectarProd * diff;
  p.totalhoney = (p.totalhoney ?? 0) + tmp.honeyProd * diff;
  p.totalmoney = (p.totalmoney ?? 0) + tmp.moneyProd * diff;
};
const updateOfflineTicks = (diff: number) => {
  if (diff > 5) {
    p.offlineTime += diff - 5;
    diff = 5;
  }

  if (p.offlineTime > 2) {
    d.ticksLeft.innerHTML = `offline time: ${ft(p.offlineTime)}`;
    d.offlineTicks.style.display = "";
  } else {
    d.offlineTicks.style.display = "none";
  }

  if (p.offlineTime > 1) {
    let ticksLeft = Math.max(0, Math.min(tmp.usedTime, p.offlineTime));
    p.offlineTime -= Math.max(0, ticksLeft - 1) * diff;
    tmp.gameSpeedFormTicks = Math.max(1, ticksLeft);
  } else {
    tmp.gameSpeedFormTicks = 1;
  }
  return diff;
};
const updateTmp = () => {
  tmp.usedTime = 1;
  if (d.offlineTicksSpeed2.checked) tmp.usedTime *= 2;
  if (d.offlineTicksSpeed5.checked) tmp.usedTime *= 5;
  if (d.offlineTicksSpeed10.checked) tmp.usedTime *= 10;
  if (!d.offlineTicksSpeed2.checked && !d.offlineTicksSpeed5.checked && !d.offlineTicksSpeed10.checked) tmp.usedTime = 1;
  tmp.usedTime = Math.max(0, Math.min(p.offlineTime, tmp.usedTime));
  if (tmp.usedTime < 1) tmp.usedTime = 0; // ouch
  if (p.offlineTime < 1) p.offlineTime = 0; // ouch

  if (tmp.totalTributes < tributeMilestones[0]) tmp.m0e = 1; // flowers mult
  else tmp.m0e = 1.02 ** (p.freeBees / 2 + (tmp.totalTributes / 2) * tmp.m5e);

  if (tmp.totalTributes < tributeMilestones[1]) tmp.m1e = 1; // bees price
  else tmp.m1e = 1.02 ** ((tmp.totalTributes / 2) * tmp.m5e);

  if (tmp.totalTributes < tributeMilestones[2]) tmp.m2e = 1; // tribute div
  else tmp.m2e = 1.02 ** ((tmp.totalTributes / 2) * tmp.m5e);

  if (tmp.totalTributes < tributeMilestones[3]) tmp.m3e = 0; // +bees
  else tmp.m3e = (tmp.totalTributes / 5) * tmp.m5e;

  if (tmp.totalTributes < tributeMilestones[4]) tmp.m4e = 1; // honey prod
  else tmp.m4e = 1.02 ** (tmp.totalTributes * tmp.m5e);

  if (tmp.totalTributes < tributeMilestones[5]) tmp.m5e = 1; // tribute eff
  else tmp.m5e = Math.min(9, 1.02 ** ((tmp.totalTributes / 10) * tmp.m5e)); // todo surely nothing can go wrong - now its capped just to make sure

  if (tmp.totalTributes < tributeMilestones[6]) tmp.m6e = 1; // nectar prod
  else tmp.m6e = 1.02 ** ((tmp.totalTributes / 2) * tmp.m5e);

  if (tmp.totalTributes < tributeMilestones[7]) tmp.m7e = 1; // honey price
  else tmp.m7e = 1.02 ** ((tmp.totalTributes / 3) * tmp.m5e);

  if (tmp.totalTributes < tributeMilestones[8]) tmp.m8e = 1; // time speed
  else tmp.m8e = 1.02 ** ((tmp.totalTributes / 5) * tmp.m5e);

  tmp.capitalistEff = 1.03 ** ((p.capitalistGodTributes + p.capitalistGodRJTributes) * tmp.m5e);
};

const updateDisplay = () => {
  if (d.toggleDarkmode.checked) {
    d.body.classList.add("dark-mode");
    p.darkmode = true;
  } else {
    d.body.classList.remove("dark-mode");
    p.darkmode = false;
  }
  if (d.toggleBigButtons.checked) {
    d.body.classList.add("big-buttons");
    p.bigButtons = true;
  } else {
    d.body.classList.remove("big-buttons");
    p.bigButtons = false;
  }
  if (d.disaplyeverything.checked) p.displayEverything = true;
  else p.displayEverything = false;
  if (d.exchangeConfirmation.checked) p.exchangeConfirmation = true;
  else p.exchangeConfirmation = false;

  if (d.toggleHarderTributes.checked) {
    d.beeReqString.innerHTML = `<b>+1 bee per tribute <span style="text-decoration:underline">per 10 tributes</span></b>`;
    p.harderTributes = true;
  } else {
    d.beeReqString.innerHTML = "+1 bee per tribute";
    p.harderTributes = false;
  }

  if (p.bees > 0) p.unlocks.bees = true;
  if (p.pollen >= 1) p.unlocks.hive = true;
  if (p.foragerBees > 0) p.unlocks.foragerBees = true;
  if (p.honeyBees > 0) p.unlocks.honeyBees = true;
  if (
    totalBees() >= requiredBeesToSacrifice() - 3 &&
    (p.highestpollen >= 35 || p.highestnectar >= 35 || p.highesthoney >= 35 || p.highestflowers >= 700 || p.highestmoney >= 35)
  )
    p.unlocks.sacrificing = true;
  if (tmp.totalTributes > 0) {
    p.unlocks.tributes = true;
  }
  if (p.money < getFlowerFieldPrice()) {
    d.quickBuyFlowerField.disabled = true;
    d.buyFlowerField.disabled = true;
  } else {
    d.quickBuyFlowerField.disabled = false;
    d.buyFlowerField.disabled = false;
  }
  if (p.honey < getBeePrice()) {
    d.quickBuyBee.disabled = true;
    d.buyBee.disabled = true;
  } else {
    d.quickBuyBee.disabled = false;
    d.buyBee.disabled = false;
  }
  if (p.pollen < getHivePrice()) {
    d.quickBuyHive.disabled = true;
    d.buyHive.disabled = true;
  } else {
    d.quickBuyHive.disabled = false;
    d.buyHive.disabled = false;
  }

  if (p.displayEverything || p.unlocks.bees) {
    d.foragerbeeswrapper.style.display = "";
    d.quickbuyhivewrapper.style.display = "";
    d.beesEffect.style.display = "";
    d.fifthbeestatwrapper.style.display = "";
  } else {
    d.foragerbeeswrapper.style.display = "none";
    d.quickbuyhivewrapper.style.display = "none";
    d.beesEffect.style.display = "none";
    d.fifthbeestatwrapper.style.display = "none";
  }
  if ((!p.displayEverything && !p.unlocks.foragerBees) || (p.unlocks.bees && !p.unlocks.foragerBees)) {
    d.foragerbeestext.innerHTML = "└";
  } else {
    d.foragerbeestext.innerHTML = "├";
  }
  if (p.displayEverything || p.unlocks.hive) {
    d.hivewrapper.style.display = "";
    d.beehivestatwrapper.style.display = "";
  } else {
    d.hivewrapper.style.display = "none";
    d.beehivestatwrapper.style.display = "none";
  }

  if (p.displayEverything || p.unlocks.foragerBees) {
    d.pollenwrapper.style.visibility = "visible";
    d.nectarwrapper.style.visibility = "visible";
    d.honeybeeswrapper.style.display = "";
    d.foragerstatwrapper.style.display = "";
  } else {
    d.pollenwrapper.style.visibility = "hidden";
    d.nectarwrapper.style.visibility = "hidden";
    d.honeybeeswrapper.style.display = "none";
    d.foragerstatwrapper.style.display = "none";
  }

  if (p.displayEverything || p.unlocks.honeyBees) {
    d.honeywrapper.style.visibility = "visible";
    d.honeybeestatwrapper.style.display = "";
  } else {
    d.honeybeestatwrapper.style.display = "none";
    d.honeywrapper.style.visibility = "hidden";
  }

  if (tmp.totalTributes == 0) d.recomendedFlowers.style.display = "";
  else d.recomendedFlowers.style.display = "none";

  if (p.displayEverything || p.fge) {
    d.moneywrapper.style.visibility = "visible";
    d.flowerfieldwrapper.style.display = "";
    d.quickBuyFlowerField.style.display = "";
    d.honeystatwrapper.style.display = "";
  } else {
    d.moneywrapper.style.visibility = "hidden";
    d.flowerfieldwrapper.style.display = "none";
    d.quickBuyFlowerField.style.display = "none";
    d.honeystatwrapper.style.display = "none";
  }
  if (p.displayEverything || p.unlocks.sacrificing) {
    d.sacrificeWrapper.style.display = "";
  } else {
    d.sacrificeWrapper.style.display = "none";
  }
  if (p.pge || p.highestpollen >= 35) d.pollengodwrapper.style.display = "";
  else d.pollengodwrapper.style.display = "none";
  if (p.nge || p.highestnectar >= 35) d.nectargodwrapper.style.display = "";
  else d.nectargodwrapper.style.display = "none";
  if (p.hge || p.highesthoney >= 35) d.honeygodwrapper.style.display = "";
  else d.honeygodwrapper.style.display = "none";
  if (p.fge || p.highestflowers >= 400) d.flowergodwrapper.style.display = "";
  else d.flowergodwrapper.style.display = "none";
  if (p.cge || p.highestmoney >= 35) d.capitalistgodwrapper.style.display = "";
  else d.capitalistgodwrapper.style.display = "none";

  if (p.displayEverything || p.unlocks.tributes) {
    d.tributeswrapper.style.display = "";
    d.pernamentTributeEffects.style.display = "";
  } else {
    d.tributeswrapper.style.display = "none";
    d.pernamentTributeEffects.style.display = "none";
  }

  if (!p.foragerBees) d.set0ForagerBees.disabled = true;
  else d.set0ForagerBees.disabled = false;
  if (p.foragerBees == tmp.maxForagerBees || (p.honeyBees == 0 && p.freeBees == 0)) d.maxForagerBees.disabled = true;
  else d.maxForagerBees.disabled = false;
  if (p.foragerBees == tmp.maxForagerBees || (p.honeyBees < 1 && p.freeBees < 1) || p.foragerBees + 1 > tmp.maxForagerBees)
    d.plusForagerBees.disabled = true;
  else d.plusForagerBees.disabled = false;
  if (p.foragerBees == 0 || p.foragerBees - 1 < 0) d.minusForagerBees.disabled = true;
  else d.minusForagerBees.disabled = false;

  if (!p.honeyBees) d.set0HoneyBees.disabled = true;
  else d.set0HoneyBees.disabled = false;
  if (p.honeyBees == tmp.maxHoneyBees || (p.foragerBees == 0 && p.freeBees == 0)) d.maxHoneyBees.disabled = true;
  else d.maxHoneyBees.disabled = false;
  if (p.honeyBees == tmp.maxHoneyBees || (p.foragerBees < 1 && p.freeBees < 1) || p.honeyBees + 1 > tmp.maxHoneyBees)
    d.plusHoneyBees.disabled = true;
  else d.plusHoneyBees.disabled = false;
  if (p.honeyBees == 0 || p.honeyBees - 1 < 0) d.minusHoneyBees.disabled = true;
  else d.minusHoneyBees.disabled = false;
};

const updateText = () => {
  // sacrifice
  // d.requiredBeesToSacrifice.innerHTML = `${requiredBeesToSacrifice()} bee${requiredBeesToSacrifice() == 1 ? "" : "s"}`;

  let pollenGodTributesToGet = getSmallGodTribute(p.highestpollen, p.pollenGodTributes);
  let nectarGodTributesToGet = getSmallGodTribute(p.highestnectar, p.nectarGodTributes);
  let honeyGodTributesToGet = getSmallGodTribute(p.highesthoney, p.honeyGodTributes);
  let flowerGodTributesToGet = getSmallGodTribute2(p.highestflowers, p.flowerGodTributes);
  let capitalistGodTributesToGet = getSmallGodTribute(p.highestmoney, p.capitalistGodTributes);

  let beesReqToSacrifice = requiredBeesToSacrifice() - totalBees();

  if (beesReqToSacrifice > 0) d.neededBeesToSacrifice.innerHTML = `you need ${format(beesReqToSacrifice)} more bees to sacrifice`;
  else d.neededBeesToSacrifice.innerHTML = `you can sacrifice`;

  let hasBees = beesReqToSacrifice > 0;

  // disable/enable sacrifice buttons + tributes for sacrifice text
  if (pollenGodTributesToGet < 1 || hasBees || p.pollenGodTributes == lgmaxnumber) {
    d.donateToPollenGod.disabled = true;
    d.pollenGodTributesToGet.innerHTML = `0 tributes`;
  } else {
    d.donateToPollenGod.disabled = false;
    let actualpollenGodTributesToGet = Math.max(0, Math.min(lgmaxnumber - p.pollenGodTributes, Math.max(0, pollenGodTributesToGet)));
    /*prettier-ignore*/ d.pollenGodTributesToGet.innerHTML = `${actualpollenGodTributesToGet} tribute${Math.max(0, actualpollenGodTributesToGet)==1?'':"s"}`
  }
  if (nectarGodTributesToGet < 1 || hasBees || p.nectarGodTributes >= lgmaxnumber) {
    d.donateToNectarGod.disabled = true;
    d.nectarGodTributesToGet.innerHTML = `0 tributes`;
  } else {
    d.donateToNectarGod.disabled = false;
    let actualnectarGodTributesToGet = Math.max(0, Math.min(lgmaxnumber - p.nectarGodTributes, Math.max(0, nectarGodTributesToGet)));
    /*prettier-ignore*/ d.nectarGodTributesToGet.innerHTML = `${actualnectarGodTributesToGet} tribute${Math.max(0, actualnectarGodTributesToGet)==1?'':"s"}`
  }
  if (honeyGodTributesToGet < 1 || hasBees || p.honeyGodTributes == lgmaxnumber) {
    d.donateToHoneyGod.disabled = true;
    d.honeyGodTributesToGet.innerHTML = `0 tributes`;
  } else {
    d.donateToHoneyGod.disabled = false;
    let actualhoneyGodTributesToGet = Math.max(0, Math.min(lgmaxnumber - p.honeyGodTributes, Math.max(0, honeyGodTributesToGet)));
    /*prettier-ignore*/ d.honeyGodTributesToGet.innerHTML = `${actualhoneyGodTributesToGet} tribute${Math.max(0, actualhoneyGodTributesToGet)==1?'':"s"}`
  }
  if (flowerGodTributesToGet < 1 || hasBees || p.flowerGodTributes == lgmaxnumber) {
    d.donateToFlowerGod.disabled = true;
    d.flowerGodTributesToGet.innerHTML = `0 tributes`;
  } else {
    d.donateToFlowerGod.disabled = false;
    let actualflowerGodTributesToGet = Math.max(0, Math.min(lgmaxnumber - p.flowerGodTributes, Math.max(0, flowerGodTributesToGet)));
    /*prettier-ignore*/ d.flowerGodTributesToGet.innerHTML = `${actualflowerGodTributesToGet} tribute${Math.max(0, actualflowerGodTributesToGet)==1?'':"s"}`
  }
  if (capitalistGodTributesToGet < 1 || hasBees || p.capitalistGodTributes == lgmaxnumber) {
    d.donateToCapitalistGod.disabled = true;
    d.capitalistGodTributesToGet.innerHTML = `0 tributes`;
  } else {
    d.donateToCapitalistGod.disabled = false;
    let actualcapitalistGodTributesToGet = Math.max(
      0,
      Math.min(lgmaxnumber - p.capitalistGodTributes, Math.max(0, capitalistGodTributesToGet))
    );
    /*prettier-ignore*/ d.capitalistGodTributesToGet.innerHTML = `${actualcapitalistGodTributesToGet} tribute${Math.max(0, actualcapitalistGodTributesToGet)==1?'':"s"}`
  }

  // d.pollenGodTributes.innerHTML = "" + p.pollenGodTributes;
  // d.nectarGodTributes.innerHTML = "" + p.nectarGodTributes;
  // d.honeyGodTributes.innerHTML = "" + p.honeyGodTributes;
  // d.flowerGodTributes.innerHTML = "" + p.flowerGodTributes;
  // d.capitalistGodTributes.innerHTML = "" + p.capitalistGodTributes;

  let pol = p.pollenGodTributes + Math.max(0, pollenGodTributesToGet);
  let nec = p.nectarGodTributes + Math.max(0, nectarGodTributesToGet);
  let hon = p.honeyGodTributes + Math.max(0, honeyGodTributesToGet);
  let flo = p.flowerGodTributes + Math.max(0, flowerGodTributesToGet);
  let cap = p.capitalistGodTributes + Math.max(0, capitalistGodTributesToGet);

  // todo: make it cap to 20 30 or 40 depending of god type
  if (pol >= lgmaxnumber) {
    d.pollenGodTributesAfterSacrifice.innerHTML = lgmax;
    d.nextPollenGodTribute.innerHTML = "???";
  } else {
    d.nextPollenGodTribute.innerHTML =
      "" + format(getNextsmallGodTribute(p.pollenGodTributes, Math.min(lgmaxnumber - p.pollenGodTributes, pollenGodTributesToGet)));
    d.pollenGodTributesAfterSacrifice.innerHTML = `${p.pollenGodTributes} ->${pol}`;
  }
  if (nec >= lgmaxnumber) {
    d.nectarGodTributesAfterSacrifice.innerHTML = lgmax;
    d.nextNectarGodTribute.innerHTML = "???";
  } else {
    d.nextNectarGodTribute.innerHTML =
      "" + format(getNextsmallGodTribute(p.nectarGodTributes, Math.min(lgmaxnumber - p.nectarGodTributes, nectarGodTributesToGet)));
    d.nectarGodTributesAfterSacrifice.innerHTML = `${p.nectarGodTributes} ->${nec}`;
  }
  if (hon >= lgmaxnumber) {
    d.honeyGodTributesAfterSacrifice.innerHTML = lgmax;
    d.nextHoneyGodTribute.innerHTML = "???";
  } else {
    d.nextHoneyGodTribute.innerHTML =
      "" + format(getNextsmallGodTribute(p.honeyGodTributes, Math.min(lgmaxnumber - p.honeyGodTributes, honeyGodTributesToGet)));
    d.honeyGodTributesAfterSacrifice.innerHTML = `${p.honeyGodTributes} ->${hon}`;
  }
  if (flo >= lgmaxnumber) {
    d.flowerGodTributesAfterSacrifice.innerHTML = lgmax;
    d.nextFlowerGodTribute.innerHTML = "???";
  } else {
    d.nextFlowerGodTribute.innerHTML =
      "" + format(getNextsmallGodTribute2(p.flowerGodTributes, Math.min(lgmaxnumber - p.flowerGodTributes, flowerGodTributesToGet)));
    d.flowerGodTributesAfterSacrifice.innerHTML = `${p.flowerGodTributes} ->${flo}`;
  }
  if (cap >= lgmaxnumber) {
    d.capitalistGodTributesAfterSacrifice.innerHTML = lgmax;
    d.nextCapitalistGodTribute.innerHTML = "???";
  } else {
    d.nextCapitalistGodTribute.innerHTML =
      "" +
      format(getNextsmallGodTribute(p.capitalistGodTributes, Math.min(lgmaxnumber - p.capitalistGodTributes, capitalistGodTributesToGet)));
    d.capitalistGodTributesAfterSacrifice.innerHTML = `${p.capitalistGodTributes} ->${cap}`;
  }

  d.flowers.innerHTML = ` ${format(p.flowers)}`;
  d.pollen.innerHTML = ` ${format(p.pollen)}`;
  d.nectar.innerHTML = ` ${format(p.nectar)}`;
  d.honey.innerHTML = ` ${format(Math.round(p.honey * 1e5) / 1e5)}`; //todo remove?
  d.money.innerHTML = ` ${format(p.money)}`;

  d.flowersPS.innerHTML = `(${format(tmp.flowerProd)}/s)`;
  d.pollenPS.innerHTML = `(${format(tmp.pollenProd)}/s)`;
  d.nectarPS.innerHTML = `(${format(tmp.nectarProd - tmp.nectarConsumption * tmp.nectarEff)}/s)`;
  d.honeyPS.innerHTML = `(${format(tmp.honeyProd)}/s)`;

  d.moneyPS.innerHTML = `(${format(tmp.moneyProd)}/s)`;

  d.flowerFieldPrice.innerHTML = format(getFlowerFieldPrice());

  d.flowerFields.innerHTML = p.flowerFields.toFixed(0);
  if (p.flowerGodTributes > 0)
    if (tmp.m5e == 1) d.flowerFields.innerHTML += " + " + p.flowerGodTributes.toFixed(0);
    else d.flowerFields.innerHTML += " + " + format(p.flowerGodTributes);
  if (p.RJflowerFields > 0) d.flowerFields.innerHTML += " + " + p.RJflowerFields.toFixed();

  d.beePrice.innerHTML = format(getBeePrice());

  d.bees.innerHTML = p.bees.toFixed(0);
  if (tmp.totalTributes >= tributeMilestones[3]) d.bees.innerHTML += " + " + format(tmp.m3e);
  if (p.RJbees > 0) d.bees.innerHTML += " + " + p.RJbees.toFixed(0);

  d.hives.innerHTML = p.hives.toFixed(0);
  if (p.RJhives > 0) d.hives.innerHTML += " + " + p.RJhives.toFixed(0);

  d.hivePrice.innerHTML = format(getHivePrice());

  if (p.honeyGodTributes == 0 && p.capitalistGodTributes == 0) {
    d.freeBees.innerHTML = "" + p.freeBees.toFixed(0) + "/" + (p.bees + p.RJbees).toFixed(0);
    d.foragerBees.innerHTML = "" + p.foragerBees.toFixed(0) + "/" + tmp.maxForagerBees.toFixed(0);
    d.honeyBees.innerHTML = "" + p.honeyBees.toFixed(0) + "/" + tmp.maxHoneyBees.toFixed(0);
  } else {
    d.freeBees.innerHTML = "" + format(p.freeBees) + "/" + format(totalBees());
    d.foragerBees.innerHTML = "" + format(p.foragerBees) + "/" + format(tmp.maxForagerBees);
    d.honeyBees.innerHTML = "" + format(p.honeyBees) + "/" + format(tmp.maxHoneyBees);
  }

  d.flowerConsumptionStat.innerHTML = getPSWithS("flower", getForagerBeeConsumption());
  d.nectarConsumptionStat.innerHTML = getPS("nectar", getHoneyProduction(1) / (p.nge ? 2 : 1));
  d.honeyWorthStat.innerHTML = format(getHoneyWorth());
  d.flowerPSStat.innerHTML = getPSWithS("flower", getFlowerProduction(1));
  d.pollenPSStat.innerHTML = getPS("pollen", getPollenProduction(1));
  d.nectarPSStat.innerHTML = getPS("nectar", getNectarProduction(1));
  d.honeyPSStat.innerHTML = getPS("honey", getHoneyProduction(1));
  d.beehiveSpaceEffectStat.innerHTML = `${format(0.2 * 1.03 ** (p.capitalistGodTributes * tmp.m5e))}`;
  d.beeSpaceEffectStat.innerHTML = `${format(1 * 1.03 ** (p.capitalistGodTributes * tmp.m5e))}`;

  d.beehiveSpaceEffectStatS.innerHTML = `${format(0.2 * 1.03 ** (p.capitalistGodTributes * tmp.m5e)) == "1.00" ? "" : "s"}`;
  d.beeSpaceEffectStatS.innerHTML = `${format(1 * 1.03 ** (p.capitalistGodTributes * tmp.m5e)) == "1.00" ? "" : "s"}`;

  let totalbees = p.bees + tmp.m3e + p.RJbees;

  // if(tributeEfficiency) //todo: later make it so its flooered without eff 2nd number
  let a = p.flowerFields - 1 + p.flowerGodTributes;
  if (tmp.m5e == 1) {
    d.buyHive.title = `1.01 ^ ${p.hives.toFixed(0)} = ${format(1.01 ** p.hives)}`;
    d.buyFlowerField.title = `1.01 ^ ${a.toFixed(0)} = ${format(1.01 ** a)}`;
  } else {
    d.buyHive.title = `1.01 ^ ${format(p.hives)} = ${format(1.01 ** p.hives)}`;
    d.buyFlowerField.title = `1.01 ^ ${format(a)} = ${format(1.01 ** a)}`;
  }
  if (tmp.m5e == 1 && tmp.totalTributes < 10) d.buyBee.title = `1.01 ^ ${(totalbees - 1).toFixed(0)} = ${format(1.01 ** (totalbees - 1))}`;
  else d.buyBee.title = `1.01 ^ ${format(totalbees - 1)} = ${format(1.01 ** (totalbees - 1))}`;

  let pp = (p.pollenGodTributes + p.pollenGodRJTributes) * tmp.m5e;
  d.donateToPollenGod.title = `1.03 ^ ${format(pp, 1)} = ${format(1.03 ** pp)}`;
  let np = (p.nectarGodTributes + p.nectarGodRJTributes) * tmp.m5e;
  d.donateToNectarGod.title = `1.03 ^ ${format(np, 1)} = ${format(1.03 ** np)}`;
  let hp = (p.honeyGodTributes + p.honeyGodRJTributes) * tmp.m5e;
  d.donateToHoneyGod.title = `1.03 ^ ${format(hp, 1)} = ${format(1.03 ** hp)}`;
  let fp = (p.flowerGodTributes + p.flowerGodRJTributes) * tmp.m5e;
  d.donateToFlowerGod.title = `1.03 ^ ${format(fp, 1)} = ${format(1.03 ** fp)}`;
  let cp = (p.capitalistGodTributes + p.capitalistGodRJTributes) * tmp.m5e;
  d.donateToCapitalistGod.title = `1.03 ^ ${format(cp, 1)} = ${format(1.03 ** cp)}`;

  //

  if (tmp.totalTributes < tributeMilestones[0]) d.m0e.innerHTML = "";
  else d.m0e.innerHTML = `${format(tmp.m0e)}x`;

  if (tmp.totalTributes < tributeMilestones[1]) d.m1e.innerHTML = "";
  else d.m1e.innerHTML = `${format(tmp.m1e)}x`;

  if (tmp.totalTributes < tributeMilestones[2]) d.m2e.innerHTML = "";
  else d.m2e.innerHTML = `${format(tmp.m2e)}x`;

  if (tmp.totalTributes < tributeMilestones[3]) d.m3e.innerHTML = "";
  else d.m3e.innerHTML = `+ ${format(tmp.m3e)}`;

  if (tmp.totalTributes < tributeMilestones[4]) d.m4e.innerHTML = "";
  else d.m4e.innerHTML = `${format(tmp.m4e)}x`;

  if (tmp.totalTributes < tributeMilestones[5]) d.m5e.innerHTML = "";
  else d.m5e.innerHTML = `${format(tmp.m5e)}x`;

  if (tmp.totalTributes < tributeMilestones[6]) d.m6e.innerHTML = "";
  else d.m6e.innerHTML = `${format(tmp.m6e)}x`;

  if (tmp.totalTributes < tributeMilestones[7]) d.m7e.innerHTML = "";
  else d.m7e.innerHTML = `${format(tmp.m7e)}x`;

  if (tmp.totalTributes < tributeMilestones[8]) d.m8e.innerHTML = "";
  else d.m8e.innerHTML = `${format(tmp.m8e)}x`;

  // if (tmp.totalTributes < tributeMilestones[9]) d.m9e.innerHTML = "";
  // else d.m9e.innerHTML = ``;

  if (tmp.totalTributes < tributeMilestones[10]) d.m9e.innerHTML = "";
  else d.m10e.innerHTML = `end of content`;
  if (tmp.totalTributes < tributeMilestones[11]) d.m9e.innerHTML = "";
  else d.m11e.innerHTML = `end of content`;

  tmp.brts = requiredBeesToSacrifice();
  d.totalBeesToSacrificeFromTributes.innerHTML = `req ${format(tmp.brts)}  bees`;
  d.totalTributes.innerHTML = `${tmp.totalTributes.toFixed(0)} + ${format(tmp.totalTributes * tmp.m5e - tmp.totalTributes)}`;
  d.reqBeesToSacTitle.title = `requires ${format(5 / tmp.m2e)} + ${format(tmp.brts - requiredBeesToSacrifice(0))} bees to sacrifice`;

  for (let i = 0; i < tributeMilestones.length; i++) {
    if (tributeMilestones[i]! < tmp.totalTributes && i != tributeMilestones.length) {
      d.m[i].innerHTML = "├";
    } else {
      d.m[i].innerHTML = " ";
    }
    if (i != 0 && tributeMilestones[i]! > tmp.totalTributes && tributeMilestones[i - 1]! <= tmp.totalTributes) d.m[i - 1].innerHTML = "└";
  }

  for (let i = 0; i < tributeMilestonesShow.length; i++) {
    if (!p.displayEverything && tributeMilestonesShow[i]! > tmp.totalTributes && d[`m${i}d`] != null && d[`m${i}d`].textContent[0] != "?") {
      d[`m${i}d`].textContent = d[`m${i}d`].textContent
        .replace(/[(0-9)(a-z)(A-Z)(.)]+/g, "?")
        .replaceAll("?", "?".repeat(Math.floor(Math.random() * 3 + 2 + Math.sqrt(i)))); // send help
    } else if (p.displayEverything || (d[`m${i}d`].textContent[0] == "?" && tributeMilestonesShow[i]! <= tmp.totalTributes)) {
      d[`m${i}d`].textContent = tributeMilestondeDesc[i];
    }
  }

  for (let i = 0; i < tributeMilestonesHide.length; i++) {
    if (!p.displayEverything && tributeMilestonesHide[i]! > tmp.totalTributes) (d[`m${i}t`] as HTMLElement).style.display = "none";
    else (d[`m${i}t`] as HTMLElement).style.display = "";
  }

  if (tributeMilestones[tributeMilestones.length - 1]! <= tmp.totalTributes) d.m[tributeMilestones.length - 1].innerHTML = "└";

  if (p.fge) {
    d.honeyCheckBox.disabled = false;
  } else {
    d.honeyCheckBox.disabled = true;
    d.honeyCheckBox.checked = false;
    p.sellingHoney = false;
  }

  if (d.honeyCheckBox.checked) {
    p.sellingHoney = true;
    d.moneyPS.classList.remove("lighttext");
  } else {
    p.sellingHoney = false;
    d.moneyPS.classList.add("lighttext");
  }

  d.foragerbeestextunderline.style.textDecorationLine = "none";
  d.honeybeestextunderline.style.textDecorationLine = "none";
  if (p.hge) {
    if (p.autoAsignBeesTo[0] == "forager") d.foragerbeestextunderline.style.textDecorationLine = "underline";
    if (p.autoAsignBeesTo[0] == "honey") d.honeybeestextunderline.style.textDecorationLine = "underline";
    if (p.autoAsignBeesTo[1] == "forager") d.foragerbeestextunderline.style.textDecorationLine = "underline";
    if (p.autoAsignBeesTo[1] == "honey") d.honeybeestextunderline.style.textDecorationLine = "underline";
    if (p.autoAsignBeesTo[0] == "forager") d.foragerbeestextunderline.style.textDecorationStyle = "solid";
    if (p.autoAsignBeesTo[0] == "honey") d.honeybeestextunderline.style.textDecorationStyle = "solid";
    if (p.autoAsignBeesTo[1] == "forager") d.foragerbeestextunderline.style.textDecorationStyle = "dashed";
    if (p.autoAsignBeesTo[1] == "honey") d.honeybeestextunderline.style.textDecorationStyle = "dashed";
  } else {
    p.autoAsignBeesTo = [];
  }

  d.pernamentTributeEffects.innerHTML = `${p.pge ? "✓" : "✗"} pollen: 2x pollen production<br>
${p.nge ? "✓" : "✗"} nectar: 2x honey production<br>
${p.hge ? "✓" : "✗"} honey: bees amount isn't rounded down & you can choose<br>
 bee type to auto assing bought bees to (try clicking a bee type)<br>
${p.fge ? "✓" : "✗"} flowers: lets you sell honey (requires at least 0.1 honey)<br>
${p.cge ? "✓" : "✗"} capitalist: worker spaces aren't rounded down`;

  // let t = tributeMilestones.filter((a) => a > tmp.totalTributes).length;

  //   /* prettier-ignore */ d.gameCompletion.title = `if you really feel like it
  // ${Math.min(7, p.pollenGodTributes) / 7 == 1 ? "✓" : "✗"} PG tribues: ${p.pollenGodTributes} / 7
  // ${Math.min(7, p.nectarGodTributes) / 7 == 1 ? "✓" : "✗"} NG tribues: ${p.nectarGodTributes} / 7
  // ${Math.min(7, p.honeyGodTributes) / 1 == 1 ? "✓" : "✗"} HG tribues: ${p.honeyGodTributes} / 7
  // ${Math.min(10, p.flowerGodTributes) / 7 == 1 ? "✓" : "✗"} FG tribues: ${p.flowerGodTributes} / 10
  // ${Math.min(7, p.capitalistGodTributes) / 7 == 1 ? "✓" : "✗"} CG tribues: ${p.capitalistGodTributes} / 7
  // ${tributeMilestones.length-t==tributeMilestones.length?"✓" : "✗"} Tribute milestones: ${tributeMilestones.length-t} / ${tributeMilestones.length}`;
};

const GameLoop = () => {
  let now = Date.now();
  let diff = ((now - p.lastUpdate) / 1000) * gameSpeed;

  if (tmp.totalTributes >= tributeMilestones[9]) p.unlocks.jelly = true;
  if (p.RJ > 0) p.unlocks.jelly2 = true;
  if (p.unlocks.jelly) {
    d.jellyTabButton.style.display = "";
    d.RJWrapper3.style.display = "";
  } else {
    d.jellyTabButton.style.display = "none";
    d.RJWrapper3.style.display = "none";
  }
  if (p.unlocks.jelly2) {
    d.RJWrapper.style.display = "";
    d.RJWrapper2.style.display = "";
    d.RJWrapper4.style.visibility = "visible";
  } else {
    d.RJWrapper.style.display = "none";
    d.RJWrapper2.style.display = "none";
    d.RJWrapper4.style.visibility = "hidden";
  }

  tmp.totalTributes = totalTributes();
  updateTmp();
  //prettier-ignore
  if (tmp.tmpunusedRJTributes ==tmp.tmpRJpollenGodTributes +tmp.tmpRJnectarGodTributes +tmp.tmpRJhoneyGodTributes +tmp.tmpRJflowerGodTributes +tmp.tmpRJcapitalistGodTributes
  ) {
    d.exchangeToApplyChanges.style.display = "none";
  } else {
    d.exchangeToApplyChanges.style.display = "";
  }
  d.totalRJTributes.innerHTML = "" + p.RJTributes;

  d.tmpunusedRJTributes.innerHTML = " -> " + tmp.tmpunusedRJTributes + "/30";
  if (tmp.tmpunusedRJTributes == 0) d.tmpunusedRJTributes.style.display = "none";
  else d.tmpunusedRJTributes.style.display = "";

  // if (tmp.totalTributes < tributeMilestones[9]) d.exchangeForRJ.disabled = true;
  // else d.exchangeForRJ.disabled = false;

  if (tmp.tmpRJpollenGodTributes == 0) d.tmpRJpollenGodTributes.innerHTML = "";
  else d.tmpRJpollenGodTributes.innerHTML = " -> " + (p.pollenGodRJTributes + tmp.tmpRJpollenGodTributes);
  if (tmp.tmpRJnectarGodTributes == 0) d.tmpRJnectarGodTributes.innerHTML = "";
  else d.tmpRJnectarGodTributes.innerHTML = " -> " + (p.nectarGodRJTributes + tmp.tmpRJnectarGodTributes);
  if (tmp.tmpRJhoneyGodTributes == 0) d.tmpRJhoneyGodTributes.innerHTML = "";
  else d.tmpRJhoneyGodTributes.innerHTML = " -> " + (p.honeyGodRJTributes + tmp.tmpRJhoneyGodTributes);
  if (tmp.tmpRJflowerGodTributes == 0) d.tmpRJflowerGodTributes.innerHTML = "";
  else d.tmpRJflowerGodTributes.innerHTML = " -> " + (p.flowerGodRJTributes + tmp.tmpRJflowerGodTributes);
  if (tmp.tmpRJcapitalistGodTributes == 0) d.tmpRJcapitalistGodTributes.innerHTML = "";
  else d.tmpRJcapitalistGodTributes.innerHTML = " -> " + (p.capitalistGodRJTributes + tmp.tmpRJcapitalistGodTributes);

  d.RJpollenGodTributes.innerHTML = "" + p.pollenGodRJTributes;
  d.RJnectarGodTributes.innerHTML = "" + p.nectarGodRJTributes;
  d.RJhoneyGodTributes.innerHTML = "" + p.honeyGodRJTributes;
  d.RJflowerGodTributes.innerHTML = "" + p.flowerGodRJTributes;
  d.RJcapitalistGodTributes.innerHTML = "" + p.capitalistGodRJTributes;

  if (p.unusedRJTributes > 0 || tmp.tmpunusedRJTributes > 0) d.addpollenGodTribute.disabled = false;
  else d.addpollenGodTribute.disabled = true;
  if (p.unusedRJTributes > 0 || tmp.tmpunusedRJTributes > 0) d.addnectarGodTribute.disabled = false;
  else d.addnectarGodTribute.disabled = true;
  if (p.unusedRJTributes > 0 || tmp.tmpunusedRJTributes > 0) d.addhoneyGodTribute.disabled = false;
  else d.addhoneyGodTribute.disabled = true;
  if (p.unusedRJTributes > 0 || tmp.tmpunusedRJTributes > 0) d.addflowerGodTribute.disabled = false;
  else d.addflowerGodTribute.disabled = true;
  if (p.unusedRJTributes > 0 || tmp.tmpunusedRJTributes > 0) d.addcapitalistGodTribute.disabled = false;
  else d.addcapitalistGodTribute.disabled = true;

  if (p.pollenGodRJTributes > 0 || tmp.tmpRJpollenGodTributes > 0) d.removepollenGodTribute.disabled = false;
  else d.removepollenGodTribute.disabled = true;
  if (p.nectarGodRJTributes > 0 || tmp.tmpRJnectarGodTributes > 0) d.removenectarGodTribute.disabled = false;
  else d.removenectarGodTribute.disabled = true;
  if (p.honeyGodRJTributes > 0 || tmp.tmpRJhoneyGodTributes > 0) d.removehoneyGodTribute.disabled = false;
  else d.removehoneyGodTribute.disabled = true;
  if (p.flowerGodRJTributes > 0 || tmp.tmpRJflowerGodTributes > 0) d.removeflowerGodTribute.disabled = false;
  else d.removeflowerGodTribute.disabled = true;
  if (p.capitalistGodRJTributes > 0 || tmp.tmpRJcapitalistGodTributes > 0) d.removecapitalistGodTribute.disabled = false;
  else d.removecapitalistGodTribute.disabled = true;

  RJTributeCost.level = p.RJTributes;

  let [tributesToBuy, tributesPrice] = RJTributeCost.maxFunction(p.RJ);

  if (p.RJTributes >= 30) {
    d.buyTribute.disabled = true;
    d.buyMaxTribute.disabled = true;
    d.buyMaxTributeAmount.innerHTML = "?";
    d.buyMaxTributeS.innerHTML = "s";
    d.buyMaxTributePrice.innerHTML = "?";
    d.tributePrice.innerHTML = "?";
  } else {
    d.buyTribute.disabled = false;
    d.buyMaxTribute.disabled = false;
    d.buyMaxTributeAmount.innerHTML = format(tributesToBuy, -3);
    d.buyMaxTributeS.innerHTML = tributesToBuy == 1 ? "" : "s";
    d.buyMaxTributePrice.innerHTML = format(tributesPrice);
    d.tributePrice.innerHTML = format(RJTributeCost.costFunction());
  }

  d.RJTributes.innerHTML = "" + p.unusedRJTributes;
  // RJtotalTributes;

  d.RJflowerFields.innerHTML = "" + format(p.RJflowerFields, -3);
  d.RJbees.innerHTML = "" + format(p.RJbees, -3);
  d.RJhives.innerHTML = "" + format(p.RJhives, -3);

  let RJflowerFieldsCost = structurePrice(p.RJflowerFields);
  let RJbeesCost = structurePrice(p.RJbees);
  let RJhivesCost = structurePrice(p.RJhives);

  d.RJfrombuyflowerFields.innerHTML = format(RJflowerFieldsCost);
  d.RJfrombuyhives.innerHTML = format(RJhivesCost);
  d.RJfrombuybees.innerHTML = format(RJbeesCost);
  if (p.RJ < RJflowerFieldsCost) d.RJbuyflowerFields.disabled = true;
  else d.RJbuyflowerFields.disabled = false;
  if (p.RJ < RJbeesCost) d.RJbuybees.disabled = true;
  else d.RJbuybees.disabled = false;
  if (p.RJ < RJhivesCost) d.RJbuyhives.disabled = true;
  else d.RJbuyhives.disabled = false;

  // if (p.RJflowerFields == 0) {
  //   d.RJsellflowerFields.disabled = true;
  //   d.RJfromsellflowerFields.innerHTML = "0.00";
  // } else {
  //   d.RJsellflowerFields.disabled = false;
  //   d.RJfromsellflowerFields.innerHTML = format(structurePrice(p.RJflowerFields - 1));
  // }
  // if (p.RJbees == 0) {
  //   d.RJsellbees.disabled = true;
  //   d.RJfromsellbees.innerHTML = "0.00";
  // } else {
  //   d.RJsellbees.disabled = false;
  //   d.RJfromsellbees.innerHTML = format(structurePrice(p.RJbees - 1));
  // }
  // if (p.RJhives == 0) {
  //   d.RJsellhives.disabled = true;
  //   d.RJfromsellhives.innerHTML = "0.00";
  // } else {
  //   d.RJsellhives.disabled = false;
  //   d.RJfromsellhives.innerHTML = format(structurePrice(p.RJhives - 1));
  // }

  p.highestRJ = Math.max(p.RJ, p.highestRJ);

  tmp.RJBonus = getRJBonus(p.RJ);
  tmp.totalRJBonus = getRJBonus(p.totalRJ);

  d.RJ.innerHTML = format(p.RJ);
  d.RJtotal.innerHTML = format(p.totalRJ);
  d.RJBoost.innerHTML = "x" + format(tmp.RJBonus);
  d.RJtotalBoost.innerHTML = "x" + format(tmp.totalRJBonus);

  beeCost.level = p.bees;
  beeCost.offset = getBeePriceMult();

  hiveCost.level = p.hives;
  hiveCost.offset = getHivePriceMult();

  flowerFieldCost.level = p.flowerFields;
  flowerFieldCost.offset = getFlowerFieldPriceMult();

  // TODO make tmp
  d.RJfromflowers.innerHTML = format(Math.log10(Math.max(1, p.totalflowers)), 1) + " RJ";
  d.RJfrompollen.innerHTML = format(Math.log10(Math.max(1, p.totalpollen)), 1) + " RJ";
  d.RJfromnectar.innerHTML = format(Math.log10(Math.max(1, p.totalnectar)), 1) + " RJ";
  d.RJfromhoney.innerHTML = format(Math.log10(Math.max(1, p.totalhoney)), 1) + " RJ";
  d.RJfrommoney.innerHTML = format(Math.log10(Math.max(1, p.totalmoney)), 1) + " RJ";

  d.totalpollen.innerHTML = format(p.totalpollen);
  d.totalnectar.innerHTML = format(p.totalnectar);
  d.totalhoney.innerHTML = format(p.totalhoney);
  d.totalflowers.innerHTML = format(p.totalflowers);
  d.totalmoney.innerHTML = format(p.totalmoney);

  let RJ = RJToGet();
  d.RJToGet.innerHTML = format(RJ, 1);

  if (p.totalRJ > 0) $("RJExchangeResets").classList.remove("lighttext");
  else $("RJExchangeResets").classList.add("lighttext");

  let [flowerFieldsToBuy, flowerFieldsPrice] = flowerFieldCost.maxFunction(p.money);
  let [beesToBuy, beesPrice] = beeCost.maxFunction(p.honey);
  let [hivesToBuy, hivesPrice] = hiveCost.maxFunction(p.pollen);

  if (flowerFieldsToBuy == 0) d.buyMaxFlowerField.disabled = true;
  else d.buyMaxFlowerField.disabled = false;
  if (beesToBuy == 0) d.buyMaxBee.disabled = true;
  else d.buyMaxBee.disabled = false;
  if (hivesToBuy == 0) d.buyMaxHive.disabled = true;
  else d.buyMaxHive.disabled = false;

  d.buyMaxFlowerFieldAmount.innerHTML = format(flowerFieldsToBuy, -3);
  d.buyMaxBeeAmount.innerHTML = format(beesToBuy, -3);
  d.buyMaxHiveAmount.innerHTML = format(hivesToBuy, -3);

  d.buyMaxFlowerFieldPrice.innerHTML = format(flowerFieldsPrice);
  d.buyMaxBeePrice.innerHTML = format(beesPrice);
  d.buyMaxHivePrice.innerHTML = format(hivesPrice);

  d.buyMaxFlowerFieldS.innerHTML = flowerFieldsToBuy == 1 ? "" : "s";
  d.buyMaxBeeS.innerHTML = beesToBuy == 1 ? "" : "s";
  d.buyMaxHiveS.innerHTML = hivesToBuy == 1 ? "" : "s";

  diff = updateOfflineTicks(diff);
  updateResources(diff);

  updateDisplay();
  updateText();

  p.lastUpdate = now;
};
