"use strict";
const e_maxForagerBees = () => {
    if (p.freeBees != 0) {
        let availableBees = Math.min(tmp.maxForagerBees - p.foragerBees, p.freeBees);
        p.foragerBees += availableBees;
        p.freeBees -= availableBees;
    }
    else if (p.foragerBees != tmp.maxForagerBees) {
        let availableBees = Math.min(tmp.maxForagerBees - p.foragerBees, p.honeyBees);
        p.foragerBees += availableBees;
        p.honeyBees -= availableBees;
    }
};
const e_maxHoneyBees = () => {
    if (p.freeBees != 0) {
        let availableBees = Math.min(tmp.maxHoneyBees - p.honeyBees, p.freeBees);
        p.honeyBees += availableBees;
        p.freeBees -= availableBees;
    }
    else if (p.honeyBees != tmp.maxHoneyBees) {
        let availableBees = Math.min(tmp.maxHoneyBees - p.honeyBees, p.foragerBees);
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
    if (p.freeBees >= 1 && p.foragerBees != tmp.maxForagerBees) {
        p.freeBees -= 1;
        p.foragerBees += 1;
    }
    else if (p.foragerBees != tmp.maxForagerBees && p.honeyBees >= 1) {
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
    if (p.freeBees >= 1 && p.honeyBees != tmp.maxHoneyBees) {
        p.freeBees -= 1;
        p.honeyBees += 1;
    }
    else if (p.honeyBees != tmp.maxForagerBees && p.foragerBees >= 1) {
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
    console.log(beesLeft);
    if (p.autoAsignBeesTo[1] != undefined)
        beesLeft = assignBeesTo(p.autoAsignBeesTo[1], beesLeft);
    console.log(beesLeft);
    assignBeesTo("free", beesLeft);
    console.log(beesLeft);
};
const buyBee = () => {
    if (p.honey < getBeePrice())
        return;
    p.honey -= getBeePrice();
    p.bees++;
    let beesLeft = Math.pow(1.03, p.honeyGodTributes);
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
// TODO: SMART ADD BEES
const sacrificeToGod = () => {
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
    tmp.totalTributes = totalTributes();
    freeBees += p.RJbees;
    if (tmp.totalTributes >= tributeMilestones[3])
        freeBees += Math.floor(tmp.totalTributes / 5);
    tmp.m5e = Math.min(9, Math.pow(1.02, ((tmp.totalTributes / 10) * tmp.m5e)));
    tmp.m5e = Math.min(9, Math.pow(1.02, ((tmp.totalTributes / 10) * tmp.m5e)));
    tmp.m5e = Math.min(9, Math.pow(1.02, ((tmp.totalTributes / 10) * tmp.m5e)));
    if (p.honeyGodTributes + p.honeyGodRJTributes > 0)
        freeBees *= Math.pow(1.03, ((p.honeyGodTributes + p.honeyGodRJTributes) * tmp.m5e));
    let a = pfreeBees + pforagerBees + phoneyBees;
    if (a > 0) {
        p.freeBees = (pfreeBees * freeBees) / (a || 1);
        p.foragerBees = (pforagerBees * freeBees) / (a || 1);
        p.honeyBees = (phoneyBees * freeBees) / (a || 1);
    }
    else {
        p.freeBees = freeBees;
        p.foragerBees = 0;
        p.honeyBees = 0;
    }
    p.bees = 0;
    p.flowerFields = 1;
    p.hives = 0;
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
    d.offlineTicksSpeed5.checked = false;
    d.offlineTicksSpeed10.checked = false;
};
d.donateToPollenGod.addEventListener("click", () => {
    /*prettier-ignore*/ p.pollenGodTributes += Math.max(0, Math.min(lgmaxnumber - p.pollenGodTributes, Math.max(0, getSmallGodTribute(p.highestpollen, p.pollenGodTributes))));
    sacrificeToGod();
});
d.donateToNectarGod.addEventListener("click", () => {
    /*prettier-ignore*/ p.nectarGodTributes += Math.max(0, Math.min(lgmaxnumber - p.nectarGodTributes, Math.max(0, getSmallGodTribute(p.highestnectar, p.nectarGodTributes))));
    sacrificeToGod();
});
d.donateToHoneyGod.addEventListener("click", () => {
    /*prettier-ignore*/ p.honeyGodTributes += Math.max(0, Math.min(lgmaxnumber - p.honeyGodTributes, Math.max(0, getSmallGodTribute(p.highesthoney, p.honeyGodTributes))));
    sacrificeToGod();
});
d.donateToFlowerGod.addEventListener("click", () => {
    /*prettier-ignore*/ p.flowerGodTributes += Math.max(0, Math.min(lgmaxnumber - p.flowerGodTributes, Math.max(0, getSmallGodTribute2(p.highestflowers, p.flowerGodTributes))));
    sacrificeToGod();
});
d.donateToCapitalistGod.addEventListener("click", () => {
    /*prettier-ignore*/ p.capitalistGodTributes += Math.max(0, Math.min(lgmaxnumber - p.capitalistGodTributes, Math.max(0, getSmallGodTribute(p.highestmoney, p.capitalistGodTributes))));
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
let tabs1 = ["main", "jelly", "help", "settings"];
const e_switchTab1 = (tab) => {
    tabs1.forEach((_tab) => (d[`${_tab}TabContent`].style.display = "none"));
    d[`${tab}TabContent`].style.display = "";
    p.tab = tab;
};
tabs1.forEach((tab) => {
    d[`${tab}TabButton`].addEventListener("click", () => e_switchTab1(tab));
});
const exchangeProgress = () => {
    let rjToGet = RJToGet();
    if (p.exchangeConfirmation && !confirm(`are you sure you want to reset all your progress for ${format(rjToGet, 1)} royal jelly`))
        return;
    p.RJ += rjToGet;
    p.totalRJ += rjToGet;
    p.highestRJ = Math.max(p.highestRJ, p.RJ);
    p.flowerGodTributes = 0;
    p.pollenGodTributes = 0;
    p.nectarGodTributes = 0;
    p.honeyGodTributes = 0;
    p.capitalistGodTributes = 0;
    p.totalflowers = 0;
    p.totalpollen = 0;
    p.totalnectar = 0;
    p.totalhoney = 1;
    p.totalmoney = 0;
    tmp.totalTributes = totalTributes();
    sacrificeToGod();
    p.unusedRJTributes += tmp.tmpunusedRJTributes;
    p.pollenGodRJTributes = p.pollenGodRJTributes + tmp.tmpRJpollenGodTributes;
    p.nectarGodRJTributes = p.nectarGodRJTributes + tmp.tmpRJnectarGodTributes;
    p.honeyGodRJTributes = p.honeyGodRJTributes + tmp.tmpRJhoneyGodTributes;
    p.flowerGodRJTributes = p.flowerGodRJTributes + tmp.tmpRJflowerGodTributes;
    p.capitalistGodRJTributes = p.capitalistGodRJTributes + tmp.tmpRJcapitalistGodTributes;
    tmp.tmpunusedRJTributes = 0;
    tmp.tmpRJpollenGodTributes = 0;
    tmp.tmpRJnectarGodTributes = 0;
    tmp.tmpRJhoneyGodTributes = 0;
    tmp.tmpRJflowerGodTributes = 0;
    tmp.tmpRJcapitalistGodTributes = 0;
};
d.exchangeForRJ.addEventListener("click", exchangeProgress);
const e_buyMaxFlowerFields = () => {
    let [bought, cost] = flowerFieldCost.buy(p.money, "max");
    p.money -= cost;
    p.flowerFields += bought;
};
const e_buyMaxBees = () => {
    let [bought, cost] = beeCost.buy(p.honey, "max");
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
    let [bought, cost] = hiveCost.buy(p.pollen, "max");
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
    else if (tmp.tmpunusedRJTributes > 0) {
        tmp.tmpRJpollenGodTributes++;
        tmp.tmpunusedRJTributes--;
    }
});
d.removepollenGodTribute.addEventListener("click", () => {
    if (p.pollenGodRJTributes + tmp.tmpRJpollenGodTributes <= 0)
        return;
    tmp.tmpRJpollenGodTributes--;
    tmp.tmpunusedRJTributes++;
});
d.addnectarGodTribute.addEventListener("click", () => {
    if (p.unusedRJTributes > 0) {
        p.nectarGodRJTributes++;
        p.unusedRJTributes--;
    }
    else if (tmp.tmpunusedRJTributes > 0) {
        tmp.tmpRJnectarGodTributes++;
        tmp.tmpunusedRJTributes--;
    }
});
d.removenectarGodTribute.addEventListener("click", () => {
    if (p.nectarGodRJTributes + tmp.tmpRJnectarGodTributes <= 0)
        return;
    tmp.tmpRJnectarGodTributes--;
    tmp.tmpunusedRJTributes++;
});
d.addhoneyGodTribute.addEventListener("click", () => {
    if (p.unusedRJTributes > 0) {
        p.honeyGodRJTributes++;
        p.unusedRJTributes--;
    }
    else if (tmp.tmpunusedRJTributes > 0) {
        tmp.tmpRJhoneyGodTributes++;
        tmp.tmpunusedRJTributes--;
    }
});
d.removehoneyGodTribute.addEventListener("click", () => {
    if (p.honeyGodRJTributes + tmp.tmpRJhoneyGodTributes <= 0)
        return;
    tmp.tmpRJhoneyGodTributes--;
    tmp.tmpunusedRJTributes++;
});
d.addflowerGodTribute.addEventListener("click", () => {
    if (p.unusedRJTributes > 0) {
        p.flowerGodRJTributes++;
        p.unusedRJTributes--;
    }
    else if (tmp.tmpunusedRJTributes > 0) {
        tmp.tmpRJflowerGodTributes++;
        tmp.tmpunusedRJTributes--;
    }
});
d.removeflowerGodTribute.addEventListener("click", () => {
    if (p.flowerGodRJTributes + tmp.tmpRJflowerGodTributes <= 0)
        return;
    tmp.tmpRJflowerGodTributes--;
    tmp.tmpunusedRJTributes++;
});
d.addcapitalistGodTribute.addEventListener("click", () => {
    if (p.unusedRJTributes > 0) {
        p.capitalistGodRJTributes++;
        p.unusedRJTributes--;
    }
    else if (tmp.tmpunusedRJTributes > 0) {
        tmp.tmpRJcapitalistGodTributes++;
        tmp.tmpunusedRJTributes--;
    }
});
d.removecapitalistGodTribute.addEventListener("click", () => {
    if (p.capitalistGodRJTributes + tmp.tmpRJcapitalistGodTributes <= 0)
        return;
    tmp.tmpRJcapitalistGodTributes--;
    tmp.tmpunusedRJTributes++;
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
