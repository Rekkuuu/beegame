"use strict";
let challenges = {
    c1: {
        name: "challenge I",
        desc: () => `forager bees consume ${Math.pow(3, (1 + p.challengeCompletions.c1))}x more flowers`,
        effect: () => `1.04x forager bee production per log${Math.min(8, 9 - p.challengeCompletions.c1)} of flowers`,
        eff: (x) => format(x) + "x",
    },
    c2: {
        name: "challenge II",
        desc: () => `${Math.pow(3, (p.challengeCompletions.c2 + 1))}x less worker space for bees`,
        effect: () => `1.04x space per log${Math.min(8, 9 - p.challengeCompletions.c2)} of bees`,
        eff: (x) => format(x) + "x",
    },
    c3: {
        name: "challenge III",
        desc: () => `required bees for tribute are multiplied by ${3 + p.challengeCompletions.c3} instead of 2 per 3 tributes`,
        effect: () => `increase tribute cap`,
        eff: (x) => "+" + x,
    },
    c4: {
        name: "challenge IV",
        desc: () => `lose ${1 + p.challengeCompletions.c4}% of resources per second`,
        effect: () => `1.04x royal jelly per log${Math.min(8, 9 - p.challengeCompletions.c4)} of time spent in RJ`,
        eff: (x) => format(x) + "x",
    },
    c5: {
        name: "challenge V",
        desc: () => `lose ${1 + p.challengeCompletions.c5}% of structures per second`,
        effect: () => `structures price increases by 10x per ${12 + Math.max(1, p.challengeCompletions.c5)} instead of 12`,
        eff: (x) => `12 -> ${12 + x}`,
    },
    c12: {
        name: "challenge I + II",
        desc: () => `combination of challenges I and II`,
        effect: () => `1.04x cheaper hive expansions per log${Math.min(8, 9 - p.challengeCompletions.c12)} of pollen`,
        eff: (x) => format(x) + "x",
    },
    c23: {
        name: "challenge II + III",
        desc: () => `combination of challenges II and III`,
        effect: () => `1.04x cheaper bees per log${Math.min(8, 9 - p.challengeCompletions.c23)} of honey`,
        eff: (x) => format(x) + "x",
    },
    c34: {
        name: "challenge III + IV",
        desc: () => `combination of challenges III and IV`,
        effect: () => `1.04x tribute efficiency cap per log${Math.min(8, 9 - p.challengeCompletions.c34)} of completed challenges`,
        eff: (x) => format(x) + "x",
    },
    c45: {
        name: "challenge IV + V",
        desc: () => `combination of challenges IV and V`,
        effect: () => `1.04x time speed per log${Math.min(8, 9 - p.challengeCompletions.c45)} of product of all resources`,
        eff: (x) => format(x) + "x",
    },
    c51: {
        name: "challenge V + I",
        desc: () => `combination of challenges V and I`,
        effect: () => `1.04x royal jelly per log${Math.min(8, 9 - p.challengeCompletions.c51)} of product of all structures`,
        eff: (x) => format(x) + "x",
    },
};
const setupChallenges = () => {
    $("challengesContainer").innerHTML = "";
    Object.keys(challenges).forEach((key, i) => {
        if (i <= 4)
            $("challengesContainer").innerHTML += makeChallenge(challenges[key], key);
        else
            $("challengesContainer").innerHTML += makeChallenge(challenges[key], key, "d");
    });
    Object.keys(challenges).forEach((key) => {
        d[`CH${key}Completions`] = $(`CH${key}Completions`);
        d[`CH${key}Effect`] = $(`CH${key}Effect`);
        d[`CH${key}Desc`] = $(`CH${key}Desc`);
        d[`CH${key}Eff`] = $(`CH${key}Eff`);
        d[`CH${key}Button`] = $(`CH${key}Button`);
        d[`CH${key}Wrapper`] = $(`CH${key}Wrapper`);
    });
};
const makeChallenge = ({ name }, key, c = "") => {
    return `<div id="CH${key}Wrapper" class="wrapper ${c}"><div class="up">
  <div>${name} <span id="CH${key}Completions"></span></div><div class="line"></div>
  <div id="CH${key}Desc"></div></div><div class="down"><button class="btn" id="CH${key}Button">start</button>
  <div id="CH${key}Effect" class="smallgap"></div><div>Reward: <span id="CH${key}Eff"></span></div></div></div>
  `;
};
