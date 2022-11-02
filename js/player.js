"use strict";
const newEmptyPlayer = () => {
    return {
        flowers: 250,
        pollen: 0,
        nectar: 0,
        honey: 1,
        money: 0,
        highestflowers: 0,
        highestpollen: 0,
        highestnectar: 0,
        highesthoney: 1,
        highestmoney: 0,
        totalflowers: 0,
        totalpollen: 0,
        totalnectar: 0,
        totalhoney: 0,
        totalmoney: 0,
        lastRJfromflowers: 0,
        lastRJfrompollen: 0,
        lastRJfromnectar: 0,
        lastRJfromhoney: 0,
        lastRJfrommoney: 0,
        bees: 0,
        freeBees: 0,
        foragerBees: 0,
        honeyBees: 0,
        flowerFields: 1,
        hives: 1,
        totalSacrifices: 0,
        pollenGodTributes: 0,
        nectarGodTributes: 0,
        honeyGodTributes: 0,
        flowerGodTributes: 0,
        capitalistGodTributes: 0,
        autoAsignBeesTo: [],
        pge: false,
        nge: false,
        hge: false,
        fge: false,
        cge: false,
        sellingHoney: false,
        // bees -> foragerBees -> honeyBees -> sacrificing -> tributes -> jelly -> jelly2
        //              └> hive at 1 pollen         └> money
        // buy bee, get forager bee, get honey bee, unlock money from tributes, at least 50 of pollen etc and 1k flowers, at least one tribute
        unlocks: {
            bees: false,
            foragerBees: false,
            hive: false,
            honeyBees: false,
            sacrificing: false,
            tributes: false,
            jelly: false,
            jelly2: false,
        },
        lastUpdate: Date.now(),
        offlineTime: 1,
        totalExchanges: 0,
        RJ: 0,
        highestRJ: 0,
        totalRJ: 0,
        RJbees: 0,
        RJflowerFields: 0,
        RJhives: 0,
        RJTributes: 0,
        unusedRJTributes: 0,
        pollenGodRJTributes: 0,
        nectarGodRJTributes: 0,
        honeyGodRJTributes: 0,
        flowerGodRJTributes: 0,
        capitalistGodRJTributes: 0,
        combinedGods: [],
        tab: "main",
        tab2: "combine",
        tab3: "stats",
        settings: {
            darkmode: true,
            bigButtons: false,
            displayEverything: false,
            iconMove: false,
            sacrificeConfirmation: true,
            exchangeConfirmation: true,
            toggleHoneyOfflineTime: false,
            toggleSacrificeOfflineTime: true,
            toggleRJOfflineTime: true,
            autosaves: true,
        },
        autobuy: {
            structures: {
                on: true,
                flowerBuy: true,
                beeBuy: true,
                hiveBuy: true,
                flowerBuyPercent: 100,
                beeBuyPercent: 100,
                hiveBuyPercent: 100,
                flower: false,
                bee: false,
                hive: false,
            },
        },
        version: [0, 2, 5, 3],
    };
};
let p;
// p.pollenGodTributes = 5;
// p.nectarGodTributes = 5;
// p.honeyGodTributes = 5;
// p.flowerGodTributes = 5;
// p.capitalistGodTributes = 5;
