let loop: number;
let saveLoop: number;
let lgmax = "20 (lower god cap)";
let lgmaxnumber = 20;

const init = () => {
  loop = setInterval(GameLoop, 30);
  load();

  if (p.darkmode) d.toggleDarkmode.checked = true;
  if (p.bigButtons) d.toggleBigButtons.checked = true;

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

  d.autosaves.checked = !!p.autosaves;

  // d.honeyCheckBox.checked = !!p.sellingHoney;
  p.sellingHoney = false; // todo: make it a setting later

  saveLoop = setInterval(save, 10000);
};

init();
