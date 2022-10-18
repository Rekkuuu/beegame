let loop: number;
let saveLoop: number;
let lgmax = "20 (lower god cap)";
let lgmaxnumber = 20;
let flowerFieldCost: Linear.Cost;
let beeCost: Linear.Cost;
let hiveCost: Linear.Cost;
let RJTributeCost: Linear.Cost;

const init = () => {
  loop = setInterval(GameLoop, 30);
  load();

  flowerFieldCost = new Linear.Cost(c, p.flowerFields, getFlowerFieldPriceMult(), -1);
  beeCost = new Linear.Cost(c, p.bees, getBeePriceMult(), 0);
  hiveCost = new Linear.Cost(c, p.hives, getHivePriceMult(), 0);
  RJTributeCost = new Linear.Cost(c, p.RJTributes);

  d.toggleDarkmode.checked = p.darkmode;
  d.toggleBigButtons.checked = p.bigButtons;
  d.disaplyeverything.checked = p.displayEverything;
  d.toggleHarderTributes.checked = p.harderTributes;
  d.autosaves.checked = p.autosaves;
  d.exchangeConfirmation.checked = p.exchangeConfirmation;

  d.offlineTicksSpeed2.checked = false;
  d.offlineTicksSpeed5.checked = false;
  d.offlineTicksSpeed10.checked = false;

  e_switchTab1(p.tab);

  tmp.maxHoneyBees = getMaxForagerBees();
  tmp.maxForagerBees = getMaxHoneyBees();
  tmp.totalTributes = totalTributes();

  for (let i = 0; i < tributeMilestones.length; i++) {
    if (tributeMilestones[i]! < totalTributes()) {
      d.m[i].innerHTML = "├";
    } else {
      d.m[i].innerHTML = " ";
    }
    if (i) if (tributeMilestones[i]! > totalTributes() && tributeMilestones[i - 1]! < totalTributes()) d.m[i - 1].innerHTML = "└";
  }

  // d.honeyCheckBox.checked = !!p.sellingHoney;
  p.sellingHoney = false; // todo: make it a setting later

  saveLoop = setInterval(save, 10000);
};

init();
