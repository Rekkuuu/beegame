"use strict";
const e_maxForagerBees = () => {
    if (p.freeBees != 0) {
        let availableBees = Math.min(n_structures.tmp.maxForagerBees - p.foragerBees, p.freeBees);
        p.foragerBees += availableBees;
        p.freeBees -= availableBees;
    }
    else if (p.foragerBees != n_structures.tmp.maxForagerBees) {
        let availableBees = Math.min(n_structures.tmp.maxForagerBees - p.foragerBees, p.honeyBees);
        p.foragerBees += availableBees;
        p.honeyBees -= availableBees;
    }
};
const e_maxHoneyBees = () => {
    if (p.freeBees != 0) {
        let availableBees = Math.min(n_structures.tmp.maxHoneyBees - p.honeyBees, p.freeBees);
        p.honeyBees += availableBees;
        p.freeBees -= availableBees;
    }
    else if (p.honeyBees != n_structures.tmp.maxHoneyBees) {
        let availableBees = Math.min(n_structures.tmp.maxHoneyBees - p.honeyBees, p.foragerBees);
        p.honeyBees += availableBees;
        p.foragerBees -= availableBees;
    }
};
d.set0ForagerBees.addEventListener("click", () => {
    p.freeBees += p.foragerBees;
    p.foragerBees = 0;
});
d.minusForagerBees.addEventListener("click", () => {
    if (p.foragerBees >= 1) {
        p.foragerBees -= 1;
        p.freeBees += 1;
    }
});
d.plusForagerBees.addEventListener("click", () => {
    if (p.freeBees >= 1 && p.foragerBees != n_structures.tmp.maxForagerBees) {
        p.freeBees -= 1;
        p.foragerBees += 1;
    }
    else if (p.foragerBees != n_structures.tmp.maxForagerBees && p.honeyBees >= 1) {
        p.honeyBees -= 1;
        p.foragerBees += 1;
    }
});
d.maxForagerBees.addEventListener("click", e_maxForagerBees);
d.set0HoneyBees.addEventListener("click", () => {
    p.freeBees += p.honeyBees;
    p.honeyBees = 0;
});
d.minusHoneyBees.addEventListener("click", () => {
    if (p.honeyBees >= 1) {
        p.honeyBees -= 1;
        p.freeBees += 1;
    }
});
d.plusHoneyBees.addEventListener("click", () => {
    if (p.freeBees >= 1 && p.honeyBees != n_structures.tmp.maxHoneyBees) {
        p.freeBees -= 1;
        p.honeyBees += 1;
    }
    else if (p.honeyBees != n_structures.tmp.maxForagerBees && p.foragerBees >= 1) {
        p.foragerBees -= 1;
        p.honeyBees += 1;
    }
});
d.maxHoneyBees.addEventListener("click", e_maxHoneyBees);
const assignBeesTo = (assignTo, assignableBees) => {
    if (assignTo == "forager" || assignTo == "honey") {
        let currentBees = assignTo == "forager" ? p.foragerBees : p.honeyBees;
        let spaceLeft = assignTo == "forager" ? getMaxForagerBees() : getMaxHoneyBees();
        let beesToAssign = Math.min(spaceLeft - currentBees, assignableBees);
        p[`${assignTo}Bees`] += beesToAssign;
        return assignableBees - beesToAssign;
    }
    else {
        p.freeBees += assignableBees;
        return 0;
    }
};
const autoAssign = () => {
    let assignableBees = Math.pow(1.03, p.honeyGodTributes);
    let beesLeft = assignableBees;
    if (p.autoAsignBeesTo[0] != undefined)
        beesLeft = assignBeesTo(p.autoAsignBeesTo[0], beesLeft);
    if (p.autoAsignBeesTo[1] != undefined)
        beesLeft = assignBeesTo(p.autoAsignBeesTo[1], beesLeft);
    assignBeesTo("free", beesLeft);
};
const buyBee = () => {
    if (p.honey < getBeePrice())
        return;
    p.honey -= getBeePrice();
    p.bees++;
    let beesLeft = Math.pow(1.03, (p.honeyGodTributes + p.RJbees));
    autoAssignBees(beesLeft);
};
const buyHive = () => {
    if (p.pollen < getHivePrice())
        return;
    p.pollen -= getHivePrice();
    p.hives++;
};
const buyFlowerField = () => {
    if (p.money < getFlowerFieldPrice())
        return;
    p.money -= getFlowerFieldPrice();
    p.flowerFields++;
};
d.buyBee.addEventListener("click", () => {
    buyBee();
});
d.quickBuyBee.addEventListener("click", () => {
    buyBee();
});
d.buyHive.addEventListener("click", () => {
    buyHive();
});
d.quickBuyHive.addEventListener("click", () => {
    buyHive();
});
d.buyFlowerField.addEventListener("click", () => {
    buyFlowerField();
});
d.quickBuyFlowerField.addEventListener("click", () => {
    buyFlowerField();
});
const sacrificeToGod = () => {
    if (p.settings.toggleSacrificeOfflineTime) {
        d.offlineTicksSpeed2.checked = false;
        d.offlineTicksSpeed5.checked = false;
        d.offlineTicksSpeed10.checked = false;
    }
    p.flowers = 250;
    p.pollen = 0;
    p.nectar = 0;
    p.honey = 1;
    p.money = 0;
    p.highestflowers = 0;
    p.highestpollen = 0;
    p.highestnectar = 0;
    p.highesthoney = 1;
    p.highestmoney = 0;
    let pfreeBees = p.freeBees;
    let pforagerBees = p.foragerBees;
    let phoneyBees = p.honeyBees;
    let freeBees = 0;
    freeBees += p.RJbees * n_sacrifices.tmp.honeyGodEffect;
    n_tributes.tmp.sacrificeTributes = getTotalSacrificeTributes();
    n_tributes.tmp.totalTributes = getTotalTributes();
    if (n_tributes.tmp.totalTributes >= tributes[3].unlockAt)
        freeBees += n_tributes.formula[3]();
    if (n_tributes.tmp.totalTributes >= tributes[5].unlockAt) {
        n_tributes.tmp.me[5] = n_tributes.formula[5]();
        n_tributes.tmp.me[5] = n_tributes.formula[5]();
        n_tributes.tmp.me[5] = n_tributes.formula[5]();
    }
    if (p.honeyGodTributes + p.honeyGodRJTributes > 0)
        freeBees *= Math.pow(1.03, ((p.honeyGodTributes + p.honeyGodRJTributes) * n_tributes.tmp.me[5]));
    let a = pfreeBees + pforagerBees + phoneyBees;
    let maxForagerBees = getMaxForagerBees();
    let maxHoneyBees = getMaxHoneyBees();
    // reassign bees if had any
    if (a > 1) {
        let freeBeesToGet = freeBees * (pfreeBees / a);
        let foragerBeesToGet = freeBees * (pforagerBees / a);
        let honeyBeesToGet = freeBees * (phoneyBees / a);
        p.foragerBees = Math.min(maxForagerBees, foragerBeesToGet);
        p.honeyBees = Math.min(maxHoneyBees, honeyBeesToGet);
        p.freeBees = freeBeesToGet;
        p.freeBees += Math.max(0, foragerBeesToGet - Math.min(maxForagerBees, foragerBeesToGet));
        p.freeBees += Math.max(0, honeyBeesToGet - Math.min(maxHoneyBees, honeyBeesToGet));
    }
    else {
        p.freeBees = freeBees;
        p.foragerBees = 0;
        p.honeyBees = 0;
    }
    p.bees = 0;
    p.flowerFields = 1;
    p.hives = 1;
    // d.neededBeesToSacrifice.innerHTML = `you need ${format(requiredBeesToSacrifice() - totalBees())} more bees to sacrifice`;
    // let beesLeft = 1.03 ** p.honeyGodTributes;
    // if (p.autoAsignBeesTo[0] != undefined) beesLeft = assignBeesTo(p.autoAsignBeesTo[0], beesLeft);
    // if (p.autoAsignBeesTo[1] != undefined) beesLeft = assignBeesTo(p.autoAsignBeesTo[1], beesLeft);
    // assignBeesTo("free", beesLeft);
    // pernament first tribute effects
    if (p.pollenGodTributes > 0)
        p.pge = true;
    if (p.nectarGodTributes > 0)
        p.nge = true;
    if (p.honeyGodTributes > 0)
        p.hge = true;
    if (p.flowerGodTributes > 0)
        p.fge = true;
    if (p.capitalistGodTributes > 0)
        p.cge = true;
    p.totalSacrifices++;
};
const tributesFromSacrifice = (maxTributes, tributes, highestResource) => {
    let tributesToGet = Math.max(0, Math.min(maxTributes - tributes, Math.max(0, getSmallGodTribute(highestResource) - tributes)));
    return tributesToGet;
};
const tributesFromSacrifice2 = (maxTributes, tributes, highestResource) => {
    let tributesToGet = Math.max(0, Math.min(maxTributes - tributes, Math.max(0, getSmallGodTribute2(highestResource) - tributes)));
    return tributesToGet;
};
let sac = {
    pollen: () => (p.pollenGodTributes += n_sacrifices.tmp.pollenGodTributesToGet),
    nectar: () => (p.nectarGodTributes += n_sacrifices.tmp.nectarGodTributesToGet),
    flower: () => (p.flowerGodTributes += n_sacrifices.tmp.flowerGodTributesToGet),
    honey: () => (p.honeyGodTributes += n_sacrifices.tmp.honeyGodTributesToGet),
    money: () => (p.capitalistGodTributes += n_sacrifices.tmp.capitalistGodTributesToGet),
};
const sacrificeTo = (gods) => {
    gods.forEach((god) => {
        sac[god]();
    });
};
d.sacrificeToPollenGod.addEventListener("click", () => {
    if (p.settings.sacrificeConfirmation && !confirm("are you sure you want to sacrifice to Pollen God?"))
        return;
    sacrificeTo(getConnectedTo("pollen"));
    sacrificeToGod();
});
d.sacrificeToNectarGod.addEventListener("click", () => {
    if (p.settings.sacrificeConfirmation && !confirm("are you sure you want to sacrifice to Nectar God?"))
        return;
    sacrificeTo(getConnectedTo("nectar"));
    sacrificeToGod();
});
d.sacrificeToHoneyGod.addEventListener("click", () => {
    if (p.settings.sacrificeConfirmation && !confirm("are you sure you want to sacrifice to Honey God?"))
        return;
    sacrificeTo(getConnectedTo("honey"));
    sacrificeToGod();
});
d.sacrificeToFlowerGod.addEventListener("click", () => {
    if (p.settings.sacrificeConfirmation && !confirm("are you sure you want to sacrifice to Flower God?"))
        return;
    sacrificeTo(getConnectedTo("flower"));
    sacrificeToGod();
});
d.sacrificeToCapitalistGod.addEventListener("click", () => {
    if (p.settings.sacrificeConfirmation && !confirm("are you sure you want to sacrifice to Capitalist God?"))
        return;
    sacrificeTo(getConnectedTo("money"));
    sacrificeToGod();
});
d.foragerbeestextunderline.addEventListener("click", () => {
    if (p.autoAsignBeesTo[0] == "forager")
        p.autoAsignBeesTo.shift();
    else {
        p.autoAsignBeesTo = p.autoAsignBeesTo.filter((a) => a != "forager");
        p.autoAsignBeesTo.unshift("forager");
    }
});
d.honeybeestextunderline.addEventListener("click", () => {
    if (p.autoAsignBeesTo[0] == "honey")
        p.autoAsignBeesTo.shift();
    else {
        p.autoAsignBeesTo = p.autoAsignBeesTo.filter((a) => a != "honey");
        p.autoAsignBeesTo.unshift("honey");
    }
});
d.autosaves.addEventListener("click", toggleAutosave);
d.saveButton.addEventListener("click", save);
d.loadButton.addEventListener("click", load);
d.saveButton2.addEventListener("click", save);
d.loadButton2.addEventListener("click", load);
let tabs1 = ["main", "jelly", "gods", "statshelp", "settings"];
let tabs2 = ["combine", "challenges"];
let tabs3 = ["stats", "help"];
const e_switchTab1 = (tab) => {
    tabs1.forEach((_tab) => (d[`${_tab}TabContent`].style.display = "none"));
    d[`${tab}TabContent`].style.display = "";
    p.tab = tab;
};
tabs1.forEach((tab) => {
    d[`${tab}TabButton`].addEventListener("click", () => e_switchTab1(tab));
});
const e_switchTab2 = (tab) => {
    tabs2.forEach((_tab) => (d[`${_tab}TabContent`].style.display = "none"));
    d[`${tab}TabContent`].style.display = "";
    p.tab2 = tab;
};
tabs2.forEach((tab) => {
    d[`${tab}TabButton`].addEventListener("click", () => e_switchTab2(tab));
});
const e_switchTab3 = (tab) => {
    tabs3.forEach((_tab) => (d[`${_tab}TabContent`].style.display = "none"));
    d[`${tab}TabContent`].style.display = "";
    p.tab3 = tab;
};
tabs3.forEach((tab) => {
    d[`${tab}TabButton`].addEventListener("click", () => e_switchTab3(tab));
});
const exchangeProgress = () => {
    if (p.settings.toggleRJOfflineTime) {
        d.offlineTicksSpeed2.checked = false;
        d.offlineTicksSpeed5.checked = false;
        d.offlineTicksSpeed10.checked = false;
    }
    let rjToGet = RJToGet();
    if (p.settings.exchangeConfirmation && !confirm(`are you sure you want to reset all your progress for ${format(rjToGet, 1)} royal jelly`))
        return;
    p.RJ += rjToGet;
    p.totalRJ += rjToGet;
    p.highestRJ = Math.max(p.highestRJ, p.RJ);
    p.flowerGodTributes = 0;
    p.pollenGodTributes = 0;
    p.nectarGodTributes = 0;
    p.honeyGodTributes = 0;
    p.capitalistGodTributes = 0;
    if (rjToGet > 0) {
        p.lastRJfromflowers = n_stats.tmp.RJFromtotalflowers;
        p.lastRJfrompollen = n_stats.tmp.RJFromtotalpollen;
        p.lastRJfromnectar = n_stats.tmp.RJFromtotalnectar;
        p.lastRJfromhoney = n_stats.tmp.RJFromtotalhoney;
        p.lastRJfrommoney = n_stats.tmp.RJFromtotalmoney;
        p.totalExchanges++;
    }
    p.totalflowers = 0;
    p.totalpollen = 0;
    p.totalnectar = 0;
    p.totalhoney = 1;
    p.totalmoney = 0;
    n_tributes.tmp.totalTributes = getTotalSacrificeTributes();
    sacrificeToGod();
    p.unusedRJTributes += n_jelly.tmp.tmpunusedRJTributes;
    p.pollenGodRJTributes = p.pollenGodRJTributes + n_jelly.tmp.tmpRJpollenGodTributes;
    p.nectarGodRJTributes = p.nectarGodRJTributes + n_jelly.tmp.tmpRJnectarGodTributes;
    p.honeyGodRJTributes = p.honeyGodRJTributes + n_jelly.tmp.tmpRJhoneyGodTributes;
    p.flowerGodRJTributes = p.flowerGodRJTributes + n_jelly.tmp.tmpRJflowerGodTributes;
    p.capitalistGodRJTributes = p.capitalistGodRJTributes + n_jelly.tmp.tmpRJcapitalistGodTributes;
    n_jelly.tmp.tmpunusedRJTributes = 0;
    n_jelly.tmp.tmpRJpollenGodTributes = 0;
    n_jelly.tmp.tmpRJnectarGodTributes = 0;
    n_jelly.tmp.tmpRJhoneyGodTributes = 0;
    n_jelly.tmp.tmpRJflowerGodTributes = 0;
    n_jelly.tmp.tmpRJcapitalistGodTributes = 0;
};
d.exchangeForRJ.addEventListener("click", exchangeProgress);
const e_buyMaxFlowerFields = () => {
    let [bought, cost] = [n_structures.tmp.flowerFieldsToBuy, n_structures.tmp.flowerFieldsPrice];
    p.money -= cost;
    p.flowerFields += bought;
};
const e_buyMaxBees = () => {
    let [bought, cost] = [n_structures.tmp.beesToBuy, n_structures.tmp.beesPrice];
    p.honey -= cost;
    p.bees += bought;
    let beesLeft = bought * Math.pow(1.03, p.honeyGodTributes);
    autoAssignBees(beesLeft);
};
const autoAssignBees = (beesLeft) => {
    if (p.autoAsignBeesTo[0] != undefined)
        beesLeft = assignBeesTo(p.autoAsignBeesTo[0], beesLeft);
    if (p.autoAsignBeesTo[1] != undefined)
        beesLeft = assignBeesTo(p.autoAsignBeesTo[1], beesLeft);
    assignBeesTo("free", beesLeft);
};
const e_buyMaxHives = () => {
    let [bought, cost] = [n_structures.tmp.hivesToBuy, n_structures.tmp.hivesPrice];
    p.pollen -= cost;
    p.hives += bought;
};
d.buyMaxFlowerField.addEventListener("click", e_buyMaxFlowerFields);
d.buyMaxBee.addEventListener("click", e_buyMaxBees);
d.buyMaxHive.addEventListener("click", e_buyMaxHives);
const e_RJbuyflowerFields = () => {
    let price = structurePrice(p.RJflowerFields);
    if (p.RJ < price)
        return;
    p.RJflowerFields++;
    p.RJ -= price;
};
const e_RJbuybees = () => {
    let price = structurePrice(p.RJbees);
    if (p.RJ < price)
        return;
    p.RJbees++;
    let beesLeft = Math.pow(1.03, p.honeyGodTributes);
    autoAssignBees(beesLeft);
    p.RJ -= price;
};
const e_RJbuyhives = () => {
    let price = structurePrice(p.RJhives);
    if (p.RJ < price)
        return;
    p.RJhives++;
    p.RJ -= price;
};
d.RJbuyflowerFields.addEventListener("click", e_RJbuyflowerFields);
d.RJbuybees.addEventListener("click", e_RJbuybees);
d.RJbuyhives.addEventListener("click", e_RJbuyhives);
const e_RJsellflowerFields = () => {
    if (p.RJflowerFields <= 0)
        return;
    p.RJ += structurePrice(p.RJflowerFields - 1);
    p.RJflowerFields--;
};
const e_RJsellbees = () => {
    if (p.RJbees <= 0)
        return;
    p.RJ += structurePrice(p.RJbees - 1);
    p.RJbees--;
};
const e_RJsellhives = () => {
    if (p.RJhives <= 0)
        return;
    p.RJ += structurePrice(p.RJhives - 1);
    p.RJhives--;
};
// d.RJsellflowerFields.addEventListener("click", e_RJsellflowerFields);
// d.RJsellbees.addEventListener("click", e_RJsellbees);
// d.RJsellhives.addEventListener("click", e_RJsellhives);
d.buyTribute.addEventListener("click", () => {
    if (p.RJTributes >= 30)
        return; //cap
    let price = RJTributeCost.costFunction();
    if (p.RJ < price)
        return;
    p.RJTributes++;
    p.unusedRJTributes++;
    p.RJ -= price;
});
d.buyMaxTribute.addEventListener("click", () => {
    if (p.RJTributes >= 30)
        return; //cap
    let [bought, cost] = RJTributeCost.buy(p.RJ, "max");
    bought = Math.max(0, Math.min(30 - p.RJTributes, bought));
    cost = RJTributeCost.cumulativeFunction(bought);
    p.RJTributes += bought;
    p.unusedRJTributes += bought;
    p.RJ -= cost;
});
d.addpollenGodTribute.addEventListener("click", () => {
    if (p.unusedRJTributes > 0) {
        p.pollenGodRJTributes++;
        p.unusedRJTributes--;
    }
    else if (n_jelly.tmp.tmpunusedRJTributes > 0) {
        n_jelly.tmp.tmpRJpollenGodTributes++;
        n_jelly.tmp.tmpunusedRJTributes--;
    }
});
d.removepollenGodTribute.addEventListener("click", () => {
    if (p.pollenGodRJTributes + n_jelly.tmp.tmpRJpollenGodTributes <= 0)
        return;
    n_jelly.tmp.tmpRJpollenGodTributes--;
    n_jelly.tmp.tmpunusedRJTributes++;
});
d.addnectarGodTribute.addEventListener("click", () => {
    if (p.unusedRJTributes > 0) {
        p.nectarGodRJTributes++;
        p.unusedRJTributes--;
    }
    else if (n_jelly.tmp.tmpunusedRJTributes > 0) {
        n_jelly.tmp.tmpRJnectarGodTributes++;
        n_jelly.tmp.tmpunusedRJTributes--;
    }
});
d.removenectarGodTribute.addEventListener("click", () => {
    if (p.nectarGodRJTributes + n_jelly.tmp.tmpRJnectarGodTributes <= 0)
        return;
    n_jelly.tmp.tmpRJnectarGodTributes--;
    n_jelly.tmp.tmpunusedRJTributes++;
});
d.addhoneyGodTribute.addEventListener("click", () => {
    if (p.unusedRJTributes > 0) {
        p.honeyGodRJTributes++;
        p.unusedRJTributes--;
    }
    else if (n_jelly.tmp.tmpunusedRJTributes > 0) {
        n_jelly.tmp.tmpRJhoneyGodTributes++;
        n_jelly.tmp.tmpunusedRJTributes--;
    }
});
d.removehoneyGodTribute.addEventListener("click", () => {
    if (p.honeyGodRJTributes + n_jelly.tmp.tmpRJhoneyGodTributes <= 0)
        return;
    n_jelly.tmp.tmpRJhoneyGodTributes--;
    n_jelly.tmp.tmpunusedRJTributes++;
});
d.addflowerGodTribute.addEventListener("click", () => {
    if (p.unusedRJTributes > 0) {
        p.flowerGodRJTributes++;
        p.unusedRJTributes--;
    }
    else if (n_jelly.tmp.tmpunusedRJTributes > 0) {
        n_jelly.tmp.tmpRJflowerGodTributes++;
        n_jelly.tmp.tmpunusedRJTributes--;
    }
});
d.removeflowerGodTribute.addEventListener("click", () => {
    if (p.flowerGodRJTributes + n_jelly.tmp.tmpRJflowerGodTributes <= 0)
        return;
    n_jelly.tmp.tmpRJflowerGodTributes--;
    n_jelly.tmp.tmpunusedRJTributes++;
});
d.addcapitalistGodTribute.addEventListener("click", () => {
    if (p.unusedRJTributes > 0) {
        p.capitalistGodRJTributes++;
        p.unusedRJTributes--;
    }
    else if (n_jelly.tmp.tmpunusedRJTributes > 0) {
        n_jelly.tmp.tmpRJcapitalistGodTributes++;
        n_jelly.tmp.tmpunusedRJTributes--;
    }
});
d.removecapitalistGodTribute.addEventListener("click", () => {
    if (p.capitalistGodRJTributes + n_jelly.tmp.tmpRJcapitalistGodTributes <= 0)
        return;
    n_jelly.tmp.tmpRJcapitalistGodTributes--;
    n_jelly.tmp.tmpunusedRJTributes++;
});
const e_export = () => {
    let output = $("saveExport");
    let parent = output.parentElement;
    parent.style.display = "";
    output.value = btoa(JSON.stringify(p));
    output.onblur = function () {
        parent.style.display = "none";
    };
    output.focus();
    output.select();
    try {
        if (document.execCommand("copy")) {
            output.blur();
        }
        d.export.innerText = "exported";
        setTimeout(() => (d.export.innerText = "export"), 2500);
    }
    catch (ex) { }
};
d.export.addEventListener("click", e_export);
const e_import = () => {
    let save = prompt("paste your save string. MAKE SURE ITS CORRECT");
    if (save == null)
        return;
    try {
        if (save.length > 1500) {
            p = fix(JSON.parse(atob(save)));
            e_switchTab1("main");
            return;
        }
    }
    catch (e) {
        window.alert("loading save failed");
        return;
    }
    return window.alert("loading save failed");
};
d.import.addEventListener("click", e_import);
d.hardreset.addEventListener("click", () => {
    if (window.confirm("Are you sure you want to reset your save?"))
        if (window.confirm("Are you really sure? (last time)")) {
            p = fix(newEmptyPlayer());
            save();
            location.reload();
        }
});
d.equalResources.addEventListener("click", () => {
    if (!(p.hge || p.cge))
        return;
    let a = getNectarProduction(1);
    let b = getHoneyProduction(1);
    let c = totalBees();
    if (c == 0)
        return;
    let g = a / 2 / b;
    let r1 = c / (1 + g);
    let r2 = (c * g) / (1 + g);
    let d = Math.max(1, Math.max(r1 / getMaxForagerBees(), r2 / getMaxHoneyBees()));
    p.freeBees = c - r1 / d - r2 / d;
    p.foragerBees = r1 / d;
    p.honeyBees = r2 / d;
    // figuring this out stole 2h of my life and i dont feel any smarter
});
d.maxForagerProduction.addEventListener("click", () => {
    let a = getFlowerProduction();
    let b = getForagerBeeConsumption();
    let c = totalBees();
    if (c == 0)
        return;
    let g = a / b;
    let r1 = Math.min(c, g);
    let r2 = c - r1;
    let d = Math.max(1, r1 / getMaxForagerBees());
    p.freeBees = r2 + (r1 - r1 / d);
    p.foragerBees = r1 / d;
    p.honeyBees = 0;
});
d.maxHoneyProduction.addEventListener("click", () => {
    if (!(p.hge || p.cge))
        return;
    let a = getNectarProduction(1);
    let b = getHoneyProduction(1);
    let c = totalBees();
    if (c == 0)
        return;
    let g = a / b;
    let r1 = c / (1 + g);
    let r2 = (c * g) / (1 + g);
    let d = Math.max(1, Math.max(r1 / getMaxForagerBees(), r2 / getMaxHoneyBees()));
    p.freeBees = c - r1 / d - r2 / d;
    p.foragerBees = r1 / d;
    p.honeyBees = r2 / d;
    // and this took 10 seconds !!!!
});
const clamp = (min, num, max) => {
    return Math.max(min, Math.min(max, num));
};
const getV = (el) => {
    try {
        //@ts-ignore
        let a = el.value / 1;
        //@ts-ignore
        if (Number.isNaN(a))
            el.value = "" + el.placeholder;
        //@ts-ignore
        let v = clamp(0, el.value / 1, 100);
        el.value = "" + v;
    }
    catch (e) {
        el.value = "" + el.placeholder;
    }
    let v = Number.parseFloat(el.value);
    return isNaN(v) ? 100 : v; // just making sure
};
const strAutobuyerChange = (e, type) => {
    let el = e.target;
    p.autobuy.structures[`${type}BuyPercent`] = getV(el);
    setInputWidth(el);
};
const setInputWidth = (el) => {
    el.style.width = "" + Math.max(4, 1 + el.value.length) + "ch";
};
d.autoflowerBuyPercent.addEventListener("change", (e) => strAutobuyerChange(e, "flower"));
d.autobeeBuyPercent.addEventListener("change", (e) => strAutobuyerChange(e, "bee"));
d.autohiveBuyPercent.addEventListener("change", (e) => strAutobuyerChange(e, "hive"));
d.autoflowerBuyPercent.addEventListener("input", (e) => setInputWidth(e.target));
d.autobeeBuyPercent.addEventListener("input", (e) => setInputWidth(e.target));
d.autohiveBuyPercent.addEventListener("input", (e) => setInputWidth(e.target));
const blurEnter = (e) => e.key == "Enter" && e.target.blur();
d.autoflowerBuyPercent.addEventListener("keydown", blurEnter);
d.autobeeBuyPercent.addEventListener("keydown", blurEnter);
d.autohiveBuyPercent.addEventListener("keydown", blurEnter);
d.autoStructures.addEventListener("click", () => {
    p.autobuy.structures.on = d.autoStructures.checked;
});
d.autoflowerBuy.addEventListener("click", () => {
    p.autobuy.structures.flowerBuy = !p.autobuy.structures.flowerBuy;
});
d.autobeeBuy.addEventListener("click", () => {
    p.autobuy.structures.beeBuy = !p.autobuy.structures.beeBuy;
});
d.autohiveBuy.addEventListener("click", () => {
    p.autobuy.structures.hiveBuy = !p.autobuy.structures.hiveBuy;
});
d.quickautoflowerBuy.addEventListener("click", () => {
    p.autobuy.structures.flowerBuy = !p.autobuy.structures.flowerBuy;
});
d.quickautobeeBuy.addEventListener("click", () => {
    p.autobuy.structures.beeBuy = !p.autobuy.structures.beeBuy;
});
d.quickautohiveBuy.addEventListener("click", () => {
    p.autobuy.structures.hiveBuy = !p.autobuy.structures.hiveBuy;
});
d.autoflowerButton.addEventListener("click", () => {
    if (p.RJ < 5 || p.autobuy.structures.flower)
        return;
    p.autobuy.structures.flower = true;
    p.RJ -= 5;
});
d.autobeeButton.addEventListener("click", () => {
    if (p.RJ < 5 || p.autobuy.structures.bee)
        return;
    p.autobuy.structures.bee = true;
    p.RJ -= 5;
});
d.autohiveButton.addEventListener("click", () => {
    if (p.RJ < 5 || p.autobuy.structures.hive)
        return;
    p.autobuy.structures.hive = true;
    p.RJ -= 5;
});
