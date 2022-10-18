"use strict";
const RJToGet = () => {
    if (totalTributes() < tributeMilestones[9])
        return 0;
    //prettier-ignore
    return Math.log10(Math.max(1, p.totalflowers) *
        Math.max(1, p.totalhoney) *
        Math.max(1, p.totalmoney) *
        Math.max(1, p.totalnectar) *
        Math.max(1, p.totalpollen));
};
const getRJBonus = (rj) => {
    return Math.pow(1.06, Math.log2(Math.max(1, 1 + rj)));
};
const structurePrice = (amount) => {
    return ft2(Math.pow(2, (amount / 3)));
};
const getTotalRJTributes = () => p.unusedRJTributes +
    p.pollenGodRJTributes +
    p.nectarGodRJTributes +
    p.honeyGodRJTributes +
    p.flowerGodRJTributes +
    p.capitalistGodRJTributes;
