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
// todo: fix this !!!!!!!!!!!!!!!!!!!!!
//try buing one bee
// {
//   "flowers": 944.5180780923126,
//   "pollen": 7.278617519999898,
//   "nectar": 0,
//   "honey": 9.457599737765394,
//   "money": 0,
//   "highestflowers": 944.5180780923126,
//   "highestpollen": 7.278617519999898,
//   "highestnectar": 1.463636698183273,
//   "highesthoney": 10.839258042765472,
//   "highestmoney": 0,
//   "totalflowers": 6655.069848627492,
//   "totalpollen": 1311.4953903747737,
//   "totalnectar": 2323.7858133239706,
//   "totalhoney": 310.87024239274297,
//   "totalmoney": 661.2380631939391,
//   "bees": 3,
//   "freeBees": 0,
//   "foragerBees": 0,
//   "honeyBees": 1,
//   "flowerFields": 1,
//   "hives": 0,
//   "totalSacrifices": 0,
//   "pollenGodTributes": 0,
//   "nectarGodTributes": 3,
//   "honeyGodTributes": 3,
//   "flowerGodTributes": 1,
//   "capitalistGodTributes": 0,
//   "autoAsignBeesTo": [
//     "forager",
//     "honey"
//   ],
//   "pge": false,
//   "nge": true,
//   "hge": true,
//   "fge": true,
//   "cge": false,
//   "sellingHoney": false,
//   "autosaves": true,
//   "unlocks": {
//     "bees": true,
//     "foragerBees": true,
//     "hive": false,
//     "honeyBees": true,
//     "sacrificing": true,
//     "tributes": true
//   },
//   "lastUpdate": 1665353761692
// }
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
    if (p.autoAsignBeesTo[0] != undefined)
        beesLeft = assignBeesTo(p.autoAsignBeesTo[0], beesLeft);
    if (p.autoAsignBeesTo[1] != undefined)
        beesLeft = assignBeesTo(p.autoAsignBeesTo[1], beesLeft);
    assignBeesTo("free", beesLeft);
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
    if (totalTributes() >= 10) {
        freeBees = (totalTributes() / 5) * tmp.m5e;
        freeBees *= Math.pow(1.03, (p.honeyGodTributes * tmp.m5e));
        p.freeBees += freeBees;
    }
    let a = pfreeBees + pforagerBees + phoneyBees;
    p.freeBees = (pfreeBees * freeBees) / a;
    p.foragerBees = (pforagerBees * freeBees) / a;
    p.honeyBees = (phoneyBees * freeBees) / a;
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
    tmp.totalTributes = totalTributes();
};
d.donateToPollenGod.addEventListener("click", () => {
    p.pollenGodTributes += getSmallGodTribute(p.highestpollen, p.pollenGodTributes);
    sacrificeToGod();
});
d.donateToNectarGod.addEventListener("click", () => {
    p.nectarGodTributes += getSmallGodTribute(p.highestnectar, p.nectarGodTributes);
    sacrificeToGod();
});
d.donateToHoneyGod.addEventListener("click", () => {
    p.honeyGodTributes += getSmallGodTribute(p.highesthoney, p.honeyGodTributes);
    sacrificeToGod();
});
d.donateToFlowerGod.addEventListener("click", () => {
    p.flowerGodTributes += getSmallGodTribute2(p.highestflowers, p.flowerGodTributes);
    sacrificeToGod();
});
d.donateToCapitalistGod.addEventListener("click", () => {
    p.capitalistGodTributes += getSmallGodTribute(p.highestmoney, p.capitalistGodTributes);
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
