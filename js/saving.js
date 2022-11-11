"use strict";
const save = () => {
    localStorage.setItem("beegame", JSON.stringify(p));
    console.log("saved");
};
const load = () => {
    p = localStorage["beegame"] == undefined ? newEmptyPlayer() : JSON.parse(localStorage["beegame"]);
    p = fix(p);
    n_jelly.tmp.tmpunusedRJTributes = 0;
    n_jelly.tmp.tmpRJpollenGodTributes = 0;
    n_jelly.tmp.tmpRJnectarGodTributes = 0;
    n_jelly.tmp.tmpRJhoneyGodTributes = 0;
    n_jelly.tmp.tmpRJflowerGodTributes = 0;
    n_jelly.tmp.tmpRJcapitalistGodTributes = 0;
    console.log("save loaded");
};
const toggleAutosave = () => {
    p.settings.autosaves = !p.settings.autosaves;
    d.autosaves.checked = !!p.settings.autosaves;
    if (p.settings.autosaves) {
        clearInterval(saveLoop);
        saveLoop = setInterval(save, 10000);
    }
    else {
        clearInterval(saveLoop);
    }
    console.log(`autosave ${p.settings.autosaves ? "on" : "off"}`);
};
let fix = (save) => {
    var _a;
    if (save["version"] == undefined)
        save["version"] = [0, 0, 0, 0];
    if (typeof save["version"] == "number")
        save["version"] = [0, 0, 0, 0];
    let v = [0, 2, 5, 3];
    if (save["version"] < v) {
        // rj
        if (save["RJ"] == undefined)
            save["RJ"] = 0;
        if (save["highestRJ"] == undefined)
            save["highestRJ"] = 0;
        if (save["totalRJ"] == undefined)
            save["totalRJ"] = 0;
        if (save["RJbees"] == undefined)
            save["RJbees"] = 0;
        if (save["RJflowerFields"] == undefined)
            save["RJflowerFields"] = 0;
        if (save["RJhives"] == undefined)
            save["RJhives"] = 0;
        if (save["RJTributes"] == undefined)
            save["RJTributes"] = 0;
        if (save["unusedRJTributes"] == undefined)
            save["unusedRJTributes"] = 0;
        if (save["pollenGodRJTributes"] == undefined)
            save["pollenGodRJTributes"] = 0;
        if (save["nectarGodRJTributes"] == undefined)
            save["nectarGodRJTributes"] = 0;
        if (save["honeyGodRJTributes"] == undefined)
            save["honeyGodRJTributes"] = 0;
        if (save["flowerGodRJTributes"] == undefined)
            save["flowerGodRJTributes"] = 0;
        if (save["capitalistGodRJTributes"] == undefined)
            save["capitalistGodRJTributes"] = 0;
        if (save["lastRJfromflowers"] == undefined)
            save["lastRJfromflowers"] = 0;
        if (save["lastRJfrompollen"] == undefined)
            save["lastRJfrompollen"] = 0;
        if (save["lastRJfromnectar"] == undefined)
            save["lastRJfromnectar"] = 0;
        if (save["lastRJfromhoney"] == undefined)
            save["lastRJfromhoney"] = 0;
        if (save["lastRJfrommoney"] == undefined)
            save["lastRJfrommoney"] = 0;
        // rj unlocks
        if (save["unlocks"] == undefined)
            save["unlocks"] = newEmptyPlayer().unlocks;
        if (save["unlocks"] && save["unlocks"]["jelly"] == undefined)
            save["unlocks"]["jelly"] = false;
        if (save["unlocks"] && save["unlocks"]["jelly2"] == undefined)
            save["unlocks"]["jelly2"] = false;
        // tabs
        if (save["tab"] == undefined)
            save["tab"] = "main";
        if (save["tab2"] == undefined)
            save["tab2"] = "combine";
        if (save["tab3"] == undefined)
            save["tab3"] = "stats";
        // settings
        if (save["settings"] == undefined)
            save["settings"] = newEmptyPlayer().settings;
        // moving old settings / deleting old key
        if (save["darkmode"] != undefined) {
            save["settings"]["darkmode"] = save["darkmode"];
            delete save["darkmode"];
        }
        if (save["bigButtons"] != undefined) {
            save["settings"]["bigButtons"] = save["bigButtons"];
            delete save["bigButtons"];
        }
        if (save["displayEverything"] != undefined) {
            save["settings"]["displayEverything"] = save["displayEverything"];
            delete save["displayEverything"];
        }
        if (save["iconMove"] != undefined) {
            save["settings"]["iconMove"] = save["iconMove"];
            delete save["iconMove"];
        }
        if (save["harderTributes"] != undefined) {
            delete save["harderTributes"];
            if (save["settings"]["harderTributes"] != undefined)
                delete save["settings"]["harderTributes"];
        }
        if (save["exchangeConfirmation"] != undefined) {
            save["settings"]["exchangeConfirmation"] = save["exchangeConfirmation"];
            delete save["exchangeConfirmation"];
        }
        if (save["settings"]["toggleSacrificeOfflineTime"] == undefined) {
            save["toggleSacrificeOfflineTime"] = true;
        }
        if (save["settings"]["toggleRJOfflineTime"] == undefined) {
            save["toggleRJOfflineTime"] = true;
        }
        if (save["settings"]["autosaves"] == undefined) {
            (_a = save["settings"]["autosaves"] == p["autosaves"]) !== null && _a !== void 0 ? _a : true;
        }
        if (save["autosaves"] != undefined)
            delete save["autosaves"];
        // total exchanges
        if (save["totalExchanges"] == undefined)
            save["totalExchanges"] = 0;
        // auto buy
        // //@ts-ignore
        // delete save["autobuy"];
        if (save["autobuy"] == undefined)
            save.autobuy = newEmptyPlayer().autobuy;
        if (save["autobuy"]["structures"] == undefined)
            save["autobuy"]["structures"] = newEmptyPlayer().autobuy.structures;
        save["version"] = v;
    }
    v = [0, 3, 0, 1];
    if (save["version"] < v) {
        if (save["combinedGods"] == undefined)
            save["combinedGods"] = [];
        if (save["unlocks"]["c1"] == undefined)
            save["unlocks"]["c1"] = false;
        if (save["unlocks"]["c2"] == undefined)
            save["unlocks"]["c2"] = false;
        if (save["unlocks"]["c3"] == undefined)
            save["unlocks"]["c3"] = false;
        if (save["unlocks"]["c4"] == undefined)
            save["unlocks"]["c4"] = false;
        save["version"] = v;
    }
    v = [0, 3, 1, 0];
    save["version"] = v;
    // if (save["version"] < v) {
    if (true) {
        if (save["challenge"] == undefined)
            save["challenge"] = "";
        if (save["challengeCompletions"] == undefined)
            save["challengeCompletions"] = newEmptyPlayer().challengeCompletions;
        if (save["RJTime"] == undefined)
            save["RJTime"] = 0;
        if (save["unlocks"]["challenges"] == undefined)
            save["unlocks"]["challenges"] = false;
        if (save["unlocks"]["c12"] == undefined)
            save["unlocks"]["c12"] = false;
        if (save["unlocks"]["c23"] == undefined)
            save["unlocks"]["c23"] = false;
        if (save["unlocks"]["c34"] == undefined)
            save["unlocks"]["c34"] = false;
        if (save["unlocks"]["c45"] == undefined)
            save["unlocks"]["c45"] = false;
        if (save["unlocks"]["c51"] == undefined)
            save["unlocks"]["c51"] = false;
        if (save["settings"]["challengeConfirmation"] == undefined)
            save["settings"]["challengeConfirmation"] = false;
        save["version"] = v;
    }
    if (Number.isNaN(p.honey))
        p.honey = 0;
    if (Number.isNaN(p.highesthoney))
        p.highesthoney = 0;
    if (Number.isNaN(p.totalhoney))
        p.totalhoney = 0;
    if (Number.isNaN(p.money))
        p.money = 0;
    if (Number.isNaN(p.highestmoney))
        p.highestmoney = 0;
    if (Number.isNaN(p.totalmoney))
        p.totalmoney = 0;
    if (Number.isNaN(p.flowers))
        p.flowers = 0;
    if (Number.isNaN(p.highestflowers))
        p.highestflowers = 0;
    if (Number.isNaN(p.totalflowers))
        p.totalflowers = 0;
    if (Number.isNaN(p.pollen))
        p.pollen = 0;
    if (Number.isNaN(p.highestpollen))
        p.highestpollen = 0;
    if (Number.isNaN(p.totalpollen))
        p.totalpollen = 0;
    if (Number.isNaN(p.nectar))
        p.nectar = 0;
    if (Number.isNaN(p.highestnectar))
        p.highestnectar = 0;
    if (Number.isNaN(p.totalnectar))
        p.totalnectar = 0;
    if (Number.isNaN(p.totalRJ))
        p.totalRJ = 100; //? idk
    if (Number.isNaN(p.RJ))
        p.RJ = 100; //? idk
    return save;
};
// eyJmbG93ZXJzIjo1MTUyNi40MTA1MDEwMjY5MSwicG9sbGVuIjo5NTkyLjgxNDMxOTQ4NjgxNSwibmVjdGFyIjoxMjc2LjQ2MzQ1NjY0Nzg1NDQsImhvbmV5IjoyNjEyLjcwMzgyMDY3ODM2MTQsIm1vbmV5IjoxNzQxNC4wNzk4NzY5NjUzNSwiaGlnaGVzdGZsb3dlcnMiOjUxNTI2LjQxMDUwMTAyNjkxLCJoaWdoZXN0cG9sbGVuIjo5NTkyLjgxNDMxOTQ4NjgxNSwiaGlnaGVzdG5lY3RhciI6MTI3Ni40NjM0NTY2NDc4NTQ0LCJoaWdoZXN0aG9uZXkiOjE1NDQ2Ljg5OTM3MjEwNjUsImhpZ2hlc3Rtb25leSI6MTc0MTQuMDc5ODc2OTY1MzUsInRvdGFsZmxvd2VycyI6NjYzNTk5Ljk5NjU1Mzg3MTUsInRvdGFscG9sbGVuIjozODExNy45ODY1MTI0MjIyOCwidG90YWxuZWN0YXIiOjcwNTI0LjI4OTE3NzM4ODM3LCJ0b3RhbGhvbmV5Ijo0NzMzNi41MzI1OTQ1NDcxNCwidG90YWxtb25leSI6MjE5OTQuOTE3ODQxMjY1ODc3LCJiZWVzIjozNywiZnJlZUJlZXMiOjAsImZvcmFnZXJCZWVzIjozMS4wNDg3MjM1MjAyODA1MDQsImhvbmV5QmVlcyI6NDAuMjE2NjUzMjE2ODA0NSwiZmxvd2VyRmllbGRzIjozLCJoaXZlcyI6MjksInRvdGFsU2FjcmlmaWNlcyI6MCwicG9sbGVuR29kVHJpYnV0ZXMiOjExLCJuZWN0YXJHb2RUcmlidXRlcyI6MTUsImhvbmV5R29kVHJpYnV0ZXMiOjExLCJmbG93ZXJHb2RUcmlidXRlcyI6MTUsImNhcGl0YWxpc3RHb2RUcmlidXRlcyI6OSwiYXV0b0FzaWduQmVlc1RvIjpbImhvbmV5IiwiZm9yYWdlciJdLCJwZ2UiOnRydWUsIm5nZSI6dHJ1ZSwiaGdlIjp0cnVlLCJmZ2UiOnRydWUsImNnZSI6dHJ1ZSwic2VsbGluZ0hvbmV5Ijp0cnVlLCJhdXRvc2F2ZXMiOnRydWUsInVubG9ja3MiOnsiYmVlcyI6dHJ1ZSwiZm9yYWdlckJlZXMiOnRydWUsImhpdmUiOnRydWUsImhvbmV5QmVlcyI6dHJ1ZSwic2FjcmlmaWNpbmciOnRydWUsInRyaWJ1dGVzIjp0cnVlLCJqZWxseSI6ZmFsc2UsImplbGx5MiI6ZmFsc2V9LCJsYXN0VXBkYXRlIjoxNjY3MTQyNzMyNzg3LCJvZmZsaW5lVGltZSI6OTQ4NTUuMjQwMDAwMDMyODIsIlJKIjowLCJoaWdoZXN0UkoiOjAsInRvdGFsUkoiOjAsIlJKYmVlcyI6MCwiUkpmbG93ZXJGaWVsZHMiOjAsIlJKaGl2ZXMiOjAsIlJKVHJpYnV0ZXMiOjAsInVudXNlZFJKVHJpYnV0ZXMiOjAsInBvbGxlbkdvZFJKVHJpYnV0ZXMiOjAsIm5lY3RhckdvZFJKVHJpYnV0ZXMiOjAsImhvbmV5R29kUkpUcmlidXRlcyI6MCwiZmxvd2VyR29kUkpUcmlidXRlcyI6MCwiY2FwaXRhbGlzdEdvZFJKVHJpYnV0ZXMiOjAsInRhYiI6InNldHRpbmdzIiwiZGFya21vZGUiOnRydWUsImJpZ0J1dHRvbnMiOmZhbHNlLCJkaXNwbGF5RXZlcnl0aGluZyI6dHJ1ZSwiZXhjaGFuZ2VDb25maXJtYXRpb24iOnRydWUsImljb25Nb3ZlIjpmYWxzZSwibGFzdFJKZnJvbWZsb3dlcnMiOjAsImxhc3RSSmZyb21wb2xsZW4iOjAsImxhc3RSSmZyb21uZWN0YXIiOjAsImxhc3RSSmZyb21ob25leSI6MCwibGFzdFJKZnJvbW1vbmV5IjowfQ==
