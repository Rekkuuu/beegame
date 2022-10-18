const save = () => {
  localStorage.setItem("beegame", JSON.stringify(p));
  console.log("saved");
};
const load = () => {
  p = localStorage["beegame"] == undefined ? newEmptyPlayer() : JSON.parse(localStorage["beegame"]);

  p = fix(p);

  console.log("save loaded");
};
const toggleAutosave = () => {
  p.autosaves = !p.autosaves;
  d.autosaves.checked = !!p.autosaves;
  if (p.autosaves) {
    saveLoop = setInterval(save, 10000);
  } else {
    clearInterval(saveLoop);
  }
  console.log(`autosave ${p.autosaves ? "on" : "off"}`);
};

let fix = (save: t_player) => {
  if (save["darkmode"] == undefined) save["darkmode"] = true;
  if (save["bigButtons"] == undefined) save["bigButtons"] = false;

  if (save["displayEverything"] == undefined) save["displayEverything"] = false;
  if (save["harderTributes"] == undefined) save["harderTributes"] = false;
  if (save["exchangeConfirmation"] == undefined) save["exchangeConfirmation"] = true;

  if (save["RJ"] == undefined) save["RJ"] = 0;
  if (save["highestRJ"] == undefined) save["highestRJ"] = 0;
  if (save["totalRJ"] == undefined) save["totalRJ"] = 0;
  if (save["RJbees"] == undefined) save["RJbees"] = 0;
  if (save["RJflowerFields"] == undefined) save["RJflowerFields"] = 0;
  if (save["RJhives"] == undefined) save["RJhives"] = 0;
  if (save["RJTributes"] == undefined) save["RJTributes"] = 0;

  if (save["unusedRJTributes"] == undefined) save["unusedRJTributes"] = 0;
  if (save["pollenGodRJTributes"] == undefined) save["pollenGodRJTributes"] = 0;
  if (save["nectarGodRJTributes"] == undefined) save["nectarGodRJTributes"] = 0;
  if (save["honeyGodRJTributes"] == undefined) save["honeyGodRJTributes"] = 0;
  if (save["flowerGodRJTributes"] == undefined) save["flowerGodRJTributes"] = 0;
  if (save["capitalistGodRJTributes"] == undefined) save["capitalistGodRJTributes"] = 0;

  if (save["unlocks"] && save["unlocks"]["jelly"] == undefined) save["unlocks"]["jelly"] = false;
  if (save["unlocks"] && save["unlocks"]["jelly2"] == undefined) save["unlocks"]["jelly2"] = false;

  if (save["tab"] == undefined) save["tab"] = "main";
  return save;
};
