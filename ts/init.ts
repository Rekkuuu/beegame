let loop: number;
let saveLoop: number;
let iconMoveLoop: number;
let leftIcon: boolean = true;
let flowerFieldCost: Linear.Cost;
let beeCost: Linear.Cost;
let hiveCost: Linear.Cost;
let RJTributeCost: Linear.Cost;

const init = () => {
  load();
  setupTributes();
  setupChallenges();
  setupClickEvents();
  loop = setInterval(GameLoop, 30);
  afterLoad();
};

const afterLoad = () => {
  d.version.innerHTML = p.version.join(".");

  // costs todo move all this to n_structures?
  let base = 10 ** (1 / 12 + p.challengeCompletions.c5);
  flowerFieldCost = new Linear.Cost(base, p.flowerFields, getFlowerFieldPriceMult(), -1);
  beeCost = new Linear.Cost(base, p.bees, getBeePriceMult(), 0);
  hiveCost = new Linear.Cost(base, p.hives, getHivePriceMult(), -1);
  RJTributeCost = new Linear.Cost(base, p.RJTributes);

  // settings
  d.toggleDarkmode.checked = p.settings.darkmode;
  d.toggleBigButtons.checked = p.settings.bigButtons;
  d.disaplyeverything.checked = p.settings.displayEverything;
  d.autosaves.checked = p.settings.autosaves;
  d.exchangeConfirmation.checked = p.settings.exchangeConfirmation;

  // offline time
  d.offlineTicksSpeed2.checked = false;
  d.offlineTicksSpeed5.checked = false;
  d.offlineTicksSpeed10.checked = false;

  // autobuy percent
  d.autoflowerBuyPercent.value = "" + p.autobuy.structures.flowerBuyPercent;
  d.autobeeBuyPercent.value = "" + p.autobuy.structures.beeBuyPercent;
  d.autohiveBuyPercent.value = "" + p.autobuy.structures.hiveBuyPercent;
  setInputWidth(d.autoflowerBuyPercent);
  setInputWidth(d.autobeeBuyPercent);
  setInputWidth(d.autohiveBuyPercent);

  // autobuy
  d.autoStructures.checked = p.autobuy.structures.on;
  d.autoflowerBuy.checked = p.autobuy.structures.flowerBuy;
  d.autobeeBuy.checked = p.autobuy.structures.beeBuy;
  d.autohiveBuy.checked = p.autobuy.structures.hiveBuy;
  d.quickautoflowerBuy.checked = p.autobuy.structures.flowerBuy;
  d.quickautobeeBuy.checked = p.autobuy.structures.beeBuy;
  d.quickautohiveBuy.checked = p.autobuy.structures.hiveBuy;

  // tabs
  e_switchTab1(p.tab);
  e_switchTab2(p.tab2);
  e_switchTab3(p.tab3);

  // tribute milestones todo idk if needed here

  // autosaves / icon loop
  if (p.settings.autosaves) saveLoop = setInterval(save, 10000);
  d.autosaves.checked = p.settings.autosaves;
  if (p.settings.iconMove) iconMoveLoop = setInterval(moveIcon, 1000);
  d.iconMove.checked = p.settings.iconMove;

  // tributes efficiency
  if (n_tributes.tmp.totalTributes >= n_tributes.tributes[5].unlockAt) {
    n_tributes.tmp.me[5] = n_tributes.tributes[5].formula()!;
    n_tributes.tmp.me[5] = n_tributes.tributes[5].formula()!;
    n_tributes.tmp.me[5] = n_tributes.tributes[5].formula()!;
    n_tributes.tmp.me[5] = n_tributes.tributes[5].formula()!;
    n_tributes.tmp.me[5] = n_tributes.tributes[5].formula()!;
  }

  // gods
  afterCombineGods();

  TMP.totalBees = getTotalBees();

  e_onresize();
  e_onscroll();
};

const moveIcon = () => {
  leftIcon = !leftIcon;
  d["favicon"].setAttribute("href", leftIcon ? "faviconleft.ico" : "faviconright.ico");
};

init();

const toggleIconMove = () => {
  p.settings.iconMove = !p.settings.iconMove;
  d.iconMove.checked = !!p.settings.iconMove;
  if (p.settings.iconMove) {
    clearInterval(iconMoveLoop);
    iconMoveLoop = setInterval(moveIcon, 1000);
  } else {
    clearInterval(iconMoveLoop);
  }
  console.log(`move icon ${p.settings.autosaves ? "on" : "off"}`);
};
d.iconMove.addEventListener("click", toggleIconMove);
