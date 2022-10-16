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
};

type t_gods = "flower" | "pollen" | "nectar" | "honey" | "money";

const format = (x: number, p = 0): string => {
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
  let price = Math.ceil(2 * a) - 1;
  if (tmp.totalTributes >= tributeMilestones[1]) price /= 1.02 ** ((tmp.totalTributes * tmp.m5e) / 2);
  return ft2(price);
};
const getHivePrice = () => {
  let a = c ** (p.hives - 1);
  let price = Math.floor(2 * a);
  price /= 1.03 ** (p.capitalistGodTributes * tmp.m5e);
  return ft2(price);
};
const getFlowerFieldPrice = () => {
  let a = c ** (p.flowerFields - 1);
  let price = Math.floor(5 * a);
  price /= 1.03 ** (p.capitalistGodTributes * tmp.m5e);
  return ft2(price);
};

const getMaxForagerBees = () => {
  let space = (3 + p.hives) / 5;
  space += Math.floor((4 + p.bees + (tmp.totalTributes / 5) * tmp.m5e) / 5);
  space += p.pollenGodTributes * tmp.m5e;
  space *= 1.03 ** (p.capitalistGodTributes * tmp.m5e);
  if (p.capitalistGodTributes > 0) {
    return space;
  } else return Math.floor(space);
};

const getMaxHoneyBees = () => {
  let space = (3 + p.hives) / 5;
  space += Math.floor((4 + p.bees + (tmp.totalTributes / 5) * tmp.m5e) / 5);
  space += p.nectarGodTributes * tmp.m5e;
  space *= 1.03 ** (p.capitalistGodTributes * tmp.m5e);
  if (p.capitalistGodTributes > 0) {
    return space;
  } else return Math.floor(space);
};

const getFlowerProduction = (flowerFields = p.flowerFields + p.flowerGodTributes * tmp.m5e) => {
  let prod = flowerFields;
  prod *= 1.01 ** Math.max(0, p.flowerFields - 1 + p.flowerGodTributes * tmp.m5e);
  prod *= 1.03 ** (p.flowerGodTributes * tmp.m5e);
  prod *= tmp.m0e;
  prod *= tmp.gameSpeedFormTicks;
  return prod;
};

const getPollenProduction = (foragerBees = p.foragerBees) => {
  let prod = (foragerBees * 3) / 40;
  prod *= 1.01 ** Math.max(0, p.flowerFields + 2 * p.flowerGodTributes * tmp.m5e - 1);
  prod *= 1.03 ** (p.pollenGodTributes * tmp.m5e);
  if (p.pge) prod *= 2;
  prod *= tmp.m8e;
  prod *= tmp.gameSpeedFormTicks;
  return prod;
};

const getNectarProduction = (foragerBees = p.foragerBees) => {
  let prod = foragerBees / 8;
  prod *= 1.01 ** Math.max(0, p.bees - 1 + tmp.totalTributes / 5);
  prod *= 1.03 ** (p.nectarGodTributes * tmp.m5e);
  prod *= tmp.m6e;
  prod *= tmp.m8e;
  prod *= tmp.gameSpeedFormTicks;
  return prod;
};

const getHoneyProduction = (honeyBees = p.honeyBees) => {
  let prod = honeyBees / 30;
  prod *= 1.01 ** Math.max(0, p.hives);
  prod *= 1.03 ** (p.honeyGodTributes * tmp.m5e);
  prod *= tmp.m4e;
  prod *= p.nge ? 2 : 1;
  prod *= tmp.m8e;
  prod *= tmp.gameSpeedFormTicks;
  return prod;
};

const getHoneyToSell = (honeyToSell = p.honey * 0.01) => {
  if (p.honey < 1 / (getHoneyWorth() * 10)) return 0;
  return honeyToSell;
};
const getHoneyWorth = () => tmp.m7e;

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
  return p.pollenGodTributes + p.nectarGodTributes + p.honeyGodTributes + p.flowerGodTributes + p.capitalistGodTributes;
};
const totalBees = () => {
  return p.freeBees + p.foragerBees + p.honeyBees;
};
const floor = (x: number) => Math.floor(x);

// const requiredBeesToSacrifice = (tributes = tmp.totalTributes) => (5 + tributes) / tmp.m2e;
const p1 = (s: number, n: number) => (n % s) * floor(1 + n / s);
const p2 = (s: number, n: number) => (s * (floor(n / s) * (floor(n / s) + 1))) / 2;
const stepwise1 = (s: number, n: number) => p1(s, n) + p2(s, n);
const requiredBeesToSacrifice = (tributes = tmp.totalTributes) => (5 + stepwise1(10, tributes)) / tmp.m2e;
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
  "1.02x nectar prod for every tribute",
  "1.02x honey price multiplier per 3 tributes",
  "1.02x time speed multiplier per 5 tributes",
  "unlocks royal jelly",
  "combine a pair of gods  (all of these will be added in future updates)",
  "combine another pair of gods",
  "turn one god into a higher god",
  "challenges",
];

const ft = (x: number) => {
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
  if (x > 1) {
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
    p.honey -= tmp.moneyProd * diff;
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

  if (p.offlineTime > 0) {
    let ticksLeft = Math.max(0, Math.min(tmp.usedTime, p.offlineTime));
    p.offlineTime -= ticksLeft * diff;
    tmp.gameSpeedFormTicks = 1 + ticksLeft;
  } else {
    tmp.gameSpeedFormTicks = 1;
  }
  return diff;
};
const updateTmp = () => {
  tmp.usedTime = 1;
  if (d.offlineTicksSpeed5.checked) tmp.usedTime *= 5;
  if (d.offlineTicksSpeed10.checked) tmp.usedTime *= 10;
  if (!d.offlineTicksSpeed5.checked && !d.offlineTicksSpeed10.checked) tmp.usedTime = 0;

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
};

const updateDisplay = () => {
  if (p.bees > 0) p.unlocks.bees = true;
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

  tmp.displayeverything = false;
  if (d.disaplyeverything.checked) tmp.displayeverything = true;

  if (tmp.displayeverything || p.unlocks.bees) {
    d.honeywrapper.style.visibility = "visible";
    d.foragerbeeswrapper.style.display = "";
    d.quickbuyhivewrapper.style.display = "";
    d.beesEffect.style.display = "";
    d.fifthbeestatwrapper.style.display = "";
  } else {
    d.honeywrapper.style.visibility = "hidden";
    d.foragerbeeswrapper.style.display = "none";
    d.quickbuyhivewrapper.style.display = "none";
    d.beesEffect.style.display = "none";
    d.fifthbeestatwrapper.style.display = "none";
  }
  if ((!tmp.displayeverything && !p.unlocks.foragerBees) || (p.unlocks.bees && !p.unlocks.foragerBees)) {
    d.foragerbeestext.innerHTML = "└";
  } else {
    d.foragerbeestext.innerHTML = "├";
  }

  d.beehivestatwrapper;
  if (tmp.displayeverything || p.unlocks.foragerBees) {
    d.pollenwrapper.style.visibility = "visible";
    d.nectarwrapper.style.visibility = "visible";
    d.hivewrapper.style.display = "";
    d.honeybeeswrapper.style.display = "";
    d.foragerstatwrapper.style.display = "";
  } else {
    d.pollenwrapper.style.visibility = "hidden";
    d.nectarwrapper.style.visibility = "hidden";
    d.hivewrapper.style.display = "none";
    d.honeybeeswrapper.style.display = "none";
    d.foragerstatwrapper.style.display = "none";
  }

  if (tmp.displayeverything || p.unlocks.honeyBees) {
    d.honeybeestatwrapper.style.display = "";
  } else {
    d.honeybeestatwrapper.style.display = "none";
  }

  if (tmp.totalTributes == 0) d.recomended.style.display = "";
  else d.recomended.style.display = "none";

  if (tmp.displayeverything || p.fge) {
    d.moneywrapper.style.visibility = "show";
    d.flowerfieldwrapper.style.display = "";
    d.quickBuyFlowerField.style.display = "";
  } else {
    d.moneywrapper.style.visibility = "hidden";
    d.flowerfieldwrapper.style.display = "none";
    d.quickBuyFlowerField.style.display = "none";
  }
  if (tmp.displayeverything || p.unlocks.sacrificing) {
    d.sacrificeWrapper.style.display = "";
  } else {
    d.sacrificeWrapper.style.display = "none";
  }
  if (p.pollenGodTributes > 0 || p.highestpollen >= 35) d.pollengodwrapper.style.display = "";
  else d.pollengodwrapper.style.display = "none";
  if (p.nectarGodTributes > 0 || p.highestnectar >= 35) d.nectargodwrapper.style.display = "";
  else d.nectargodwrapper.style.display = "none";
  if (p.honeyGodTributes > 0 || p.highesthoney >= 35) d.honeygodwrapper.style.display = "";
  else d.honeygodwrapper.style.display = "none";
  if (p.flowerGodTributes > 0 || p.highestflowers >= 400) d.flowergodwrapper.style.display = "";
  else d.flowergodwrapper.style.display = "none";
  if (p.capitalistGodTributes > 0 || p.highestmoney >= 35) d.capitalistgodwrapper.style.display = "";
  else d.capitalistgodwrapper.style.display = "none";

  if (tmp.displayeverything || p.unlocks.tributes) {
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
    /*prettier-ignore*/ d.pollenGodTributesToGet.innerHTML = `${Math.max(0, pollenGodTributesToGet)} tribute${Math.max(0, pollenGodTributesToGet)==1?'':"s"}`
  }
  if (nectarGodTributesToGet < 1 || hasBees || p.nectarGodTributes == lgmaxnumber) {
    d.donateToNectarGod.disabled = true;
    d.nectarGodTributesToGet.innerHTML = `0 tributes`;
  } else {
    d.donateToNectarGod.disabled = false;
    /*prettier-ignore*/ d.nectarGodTributesToGet.innerHTML = `${Math.max(0, nectarGodTributesToGet)} tribute${Math.max(0, nectarGodTributesToGet)==1?'':"s"}`
  }
  if (honeyGodTributesToGet < 1 || hasBees || p.honeyGodTributes == lgmaxnumber) {
    d.donateToHoneyGod.disabled = true;
    d.honeyGodTributesToGet.innerHTML = `0 tributes`;
  } else {
    d.donateToHoneyGod.disabled = false;
    /*prettier-ignore*/ d.honeyGodTributesToGet.innerHTML = `${Math.max(0, honeyGodTributesToGet)} tribute${Math.max(0, honeyGodTributesToGet)==1?'':"s"}`
  }
  if (flowerGodTributesToGet < 1 || hasBees || p.flowerGodTributes == lgmaxnumber) {
    d.donateToFlowerGod.disabled = true;
    d.flowerGodTributesToGet.innerHTML = `0 tributes`;
  } else {
    d.donateToFlowerGod.disabled = false;
    /*prettier-ignore*/ d.flowerGodTributesToGet.innerHTML = `${Math.max(0, flowerGodTributesToGet)} tribute${Math.max(0, flowerGodTributesToGet)==1?'':"s"}`
  }
  if (capitalistGodTributesToGet < 1 || hasBees || p.capitalistGodTributes == lgmaxnumber) {
    d.donateToCapitalistGod.disabled = true;
    d.capitalistGodTributesToGet.innerHTML = `0 tributes`;
  } else {
    d.donateToCapitalistGod.disabled = false;
    /*prettier-ignore*/ d.capitalistGodTributesToGet.innerHTML = `${Math.max(0, capitalistGodTributesToGet)} tribute${Math.max(0, capitalistGodTributesToGet)==1?'':"s"}`
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
  if (tmp.m5e == 1) d.flowerFields.innerHTML = "" + `${p.flowerFields.toFixed(0)} + ${p.flowerGodTributes.toFixed(0)}`;
  else d.flowerFields.innerHTML = "" + `${p.flowerFields.toFixed(0)} + ${format(p.flowerGodTributes * tmp.m5e)}`;
  d.beePrice.innerHTML = format(getBeePrice());
  if (tmp.totalTributes >= 10) {
    if (tmp.totalTributes >= 20) d.bees.innerHTML = `${p.bees} + ${format(tmp.totalTributes / 5)}`;
    else d.bees.innerHTML = `${p.bees} + ${format(tmp.totalTributes / 5, -1)}`;
  } else d.bees.innerHTML = "" + p.bees;

  d.hivePrice.innerHTML = format(getHivePrice());
  d.hives.innerHTML = "" + p.hives.toFixed(0);

  if (p.honeyGodTributes == 0) {
    d.freeBees.innerHTML = "" + p.freeBees + "/" + p.bees;
    d.foragerBees.innerHTML = "" + p.foragerBees + "/" + tmp.maxForagerBees;
    d.honeyBees.innerHTML = "" + p.honeyBees + "/" + tmp.maxHoneyBees;
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

  let totalbees = p.bees;
  if (tmp.totalTributes >= 10) totalbees += tmp.totalTributes / 5;

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

  d.donateToPollenGod.title = `1.03 ^ ${format(p.pollenGodTributes * tmp.m5e, 1)} = ${format(1.03 ** p.pollenGodTributes)}`;
  d.donateToNectarGod.title = `1.03 ^ ${format(p.nectarGodTributes * tmp.m5e, 1)} = ${format(1.03 ** p.nectarGodTributes)}`;
  d.donateToHoneyGod.title = `1.03 ^ ${format(p.honeyGodTributes * tmp.m5e, 1)} = ${format(1.03 ** p.honeyGodTributes)}`;
  d.donateToFlowerGod.title = `1.03 ^ ${format(p.flowerGodTributes * tmp.m5e, 1)} = ${format(1.03 ** p.flowerGodTributes)}`;
  d.donateToCapitalistGod.title = `1.03 ^ ${format(p.capitalistGodTributes * tmp.m5e, 1)} = ${format(1.03 ** p.capitalistGodTributes)}`;

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

  if (tmp.totalTributes < tributeMilestones[9]) d.m9e.innerHTML = "";
  else d.m9e.innerHTML = `current end of content`;

  let brts = requiredBeesToSacrifice();
  d.totalTributes.innerHTML = `${tmp.totalTributes.toFixed(0)} + ${format(tmp.totalTributes * tmp.m5e - tmp.totalTributes)}`;
  d.totalBeesToSacrificeFromTributes.innerHTML = `req ${format(brts)}  bees`;
  d.reqBeesToSacTitle.title = `requires ${format(5 / tmp.m2e)} + ${format(brts - requiredBeesToSacrifice(0))} bees to sacrifice`;

  for (let i = 0; i < tributeMilestones.length; i++) {
    if (tributeMilestones[i]! < tmp.totalTributes && i != tributeMilestones.length) {
      d.m[i].innerHTML = "├";
    } else {
      d.m[i].innerHTML = " ";
    }
    if (i != 0 && tributeMilestones[i]! > tmp.totalTributes && tributeMilestones[i - 1]! <= tmp.totalTributes) d.m[i - 1].innerHTML = "└";
  }

  for (let i = 0; i < tributeMilestonesShow.length; i++) {
    if (
      !tmp.displayeverything &&
      tributeMilestonesShow[i]! > tmp.totalTributes &&
      d[`m${i}d`] != null &&
      d[`m${i}d`].textContent[0] != "?"
    ) {
      d[`m${i}d`].textContent = d[`m${i}d`].textContent
        .replace(/[(0-9)(a-z)(A-Z)(.)]+/g, "?")
        .replaceAll("?", "?".repeat(Math.floor(Math.random() * 3 + 2 + Math.sqrt(i)))); // send help
    } else if (tmp.displayeverything || (d[`m${i}d`].textContent[0] == "?" && tributeMilestonesShow[i]! <= tmp.totalTributes)) {
      d[`m${i}d`].textContent = tributeMilestondeDesc[i];
    }
  }

  for (let i = 0; i < tributeMilestonesHide.length; i++) {
    if (!tmp.displayeverything && tributeMilestonesHide[i]! > tmp.totalTributes) (d[`m${i}t`] as HTMLElement).style.display = "none";
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
  if (p.honeyGodTributes > 0) {
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

  d.pernamentTributeEffects.title = `${p.pollenGodTributes > 0 ? "✓" : "✗"} pollen: 2x pollen production
${p.nectarGodTributes > 0 ? "✓" : "✗"} nectar: 2x honey production
${p.honeyGodTributes > 0 ? "✓" : "✗"} honey: bees amount isn't rounded down & you can choose
  bee type to auto assing bought bees to (try clicking a bee type)
${p.flowerGodTributes > 0 ? "✓" : "✗"} flowers: lets you sell honey (requires at least 0.1 honey)
${p.capitalistGodTributes > 0 ? "✓" : "✗"} capitalist: worker spaces aren't rounded down`;

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

  updateTmp();
  diff = updateOfflineTicks(diff);
  updateResources(diff);

  updateDisplay();
  updateText();

  p.lastUpdate = now;
};
