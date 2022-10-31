let loop: number;
let saveLoop: number;
let iconMoveLoop: number;
let leftIcon: boolean = true;
let flowerFieldCost: Linear.Cost;
let beeCost: Linear.Cost;
let hiveCost: Linear.Cost;
let RJTributeCost: Linear.Cost;

const init = () => {
  loop = setInterval(GameLoop, 30);
  load();

  flowerFieldCost = new Linear.Cost(c, p.flowerFields, getFlowerFieldPriceMult(), -1);
  beeCost = new Linear.Cost(c, p.bees, getBeePriceMult(), 0);
  hiveCost = new Linear.Cost(c, p.hives, getHivePriceMult(), -1);
  RJTributeCost = new Linear.Cost(c, p.RJTributes);

  d.toggleDarkmode.checked = p.settings.darkmode;
  d.toggleBigButtons.checked = p.settings.bigButtons;
  d.disaplyeverything.checked = p.settings.displayEverything;
  d.autosaves.checked = p.settings.autosaves;
  d.exchangeConfirmation.checked = p.settings.exchangeConfirmation;

  d.offlineTicksSpeed2.checked = false;
  d.offlineTicksSpeed5.checked = false;
  d.offlineTicksSpeed10.checked = false;

  d.autoflowerBuyPercent.value = "" + p.autobuy.structures.flowerBuyPercent;
  d.autobeeBuyPercent.value = "" + p.autobuy.structures.beeBuyPercent;
  d.autohiveBuyPercent.value = "" + p.autobuy.structures.hiveBuyPercent;

  d.autoStructures.checked = p.autobuy.structures.on;
  d.autoflowerBuy.checked = p.autobuy.structures.flowerBuy;
  d.autobeeBuy.checked = p.autobuy.structures.beeBuy;
  d.autohiveBuy.checked = p.autobuy.structures.hiveBuy;
  d.quickautoflowerBuy.checked = p.autobuy.structures.flowerBuy;
  d.quickautobeeBuy.checked = p.autobuy.structures.beeBuy;
  d.quickautohiveBuy.checked = p.autobuy.structures.hiveBuy;

  setInputWidth(d.autoflowerBuyPercent);
  setInputWidth(d.autobeeBuyPercent);
  setInputWidth(d.autohiveBuyPercent);

  e_switchTab1(p.tab);
  e_switchTab2(p.tab2);
  e_switchTab3(p.tab3);

  for (let i = 0; i < 10; i++) {
    if (tributes[i]!.unlockAt < getTotalSacrificeTributes()) {
      d.m[i].innerHTML = "├";
    } else {
      d.m[i].innerHTML = " ";
    }
    if (i)
      if (tributes[i]!.unlockAt > getTotalSacrificeTributes() && tributes[i - 1]!.unlockAt < getTotalSacrificeTributes())
        d.m[i - 1].innerHTML = "└";
  }

  // d.honeyCheckBox.checked = !!p.sellingHoney;
  p.sellingHoney = false; // todo: make it a setting later

  if (p.settings.autosaves) saveLoop = setInterval(save, 10000);
  d.autosaves.checked = p.settings.autosaves;
  if (p.settings.iconMove) iconMoveLoop = setInterval(moveIcon, 1000);
  d.iconMove.checked = p.settings.iconMove;

  if (n_tributes.tmp.totalTributes >= tributes[5].unlockAt) {
    n_tributes.tmp.me[5] = n_tributes.formula[5]!();
    n_tributes.tmp.me[5] = n_tributes.formula[5]!();
    n_tributes.tmp.me[5] = n_tributes.formula[5]!();
    n_tributes.tmp.me[5] = n_tributes.formula[5]!();
    n_tributes.tmp.me[5] = n_tributes.formula[5]!();
  }
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
