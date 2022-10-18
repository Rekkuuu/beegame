const RJToGet = () => {
  if (totalTributes() < tributeMilestones[9]) return 0;
  //prettier-ignore
  return Math.log10(
    Math.max(1, p.totalflowers) *
    Math.max(1, p.totalhoney) *
    Math.max(1, p.totalmoney) *
    Math.max(1, p.totalnectar) *
    Math.max(1, p.totalpollen)
  );
};

const getRJBonus = (rj: number) => {
  return 1.06 ** Math.log2(Math.max(1, 1 + rj));
};

const structurePrice = (amount: number) => {
  return ft2(2 ** (amount / 3));
};

const getTotalRJTributes = () =>
  p.unusedRJTributes +
  p.pollenGodRJTributes +
  p.nectarGodRJTributes +
  p.honeyGodRJTributes +
  p.flowerGodRJTributes +
  p.capitalistGodRJTributes;
