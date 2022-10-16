const save = () => {
  localStorage.setItem("beegame", JSON.stringify(p));
  console.log("saved");
};
const load = () => {
  p = localStorage["beegame"] == undefined ? newEmptyPlayer() : JSON.parse(localStorage["beegame"]);
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
