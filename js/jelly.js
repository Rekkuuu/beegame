"use strict";
const canExchange = () => {
    return n_tributes.tmp.totalTributes >= n_tributes.tributes[9].unlockAt;
};
const RJToGet = () => {
    if (!canExchange())
        return 0;
    let RJToGet = n_stats.tmp.RJFromtotalflowers +
        n_stats.tmp.RJFromtotalhoney +
        n_stats.tmp.RJFromtotalmoney +
        n_stats.tmp.RJFromtotalnectar +
        n_stats.tmp.RJFromtotalpollen;
    return RJToGet * n_jelly.tmp.totalRJBonus * n_tributes.tmp.me[14];
};
const getRJBonus = (rj) => {
    return Math.pow(1.06, Math.log2(Math.max(1, 1 + rj)));
};
const getTotalRJBonus = (rj) => {
    return Math.pow(1.06, blog(3, Math.max(1, 1 + rj)));
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
