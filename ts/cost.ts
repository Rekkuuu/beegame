const blog = (b: number, number: number) => {
  return Math.log(number) / Math.log(b);
};

class BaseCost {
  /** returns cost for single level */
  public costFunction;
  /** returns cost for range of levels */
  public cumulativeFunction;
  /** returns max leves that can be bought
   *
   * return toBuy, cost
   */
  public maxFunction;
  /** current level */
  public level: number;
  /** price offset - (base ^ lvl) * offset */
  public offset: number;
  /** price offset2 - (base ^ lvl) + offset2 */
  public offset2: number;
  /** price growth - base^lvl
   *
   * base >=1 */
  public base: number;
  constructor(
    base: number,
    costFunction: (level?: number) => number,
    cumulativeFunction: (levels: number) => number,
    maxFunction: (currency: number) => [number, number], // amount, cost
    level: number,
    offset: number,
    offset2: number
  ) {
    this.base = base;
    this.costFunction = costFunction;
    this.cumulativeFunction = cumulativeFunction;
    this.maxFunction = maxFunction;
    this.level = level;
    this.offset = offset;
    this.offset2 = offset2;
  }
}
namespace Linear {
  export namespace Normal {
    export const costFunction = (level: number, base: number, offset: number = 1, offset2: number = 0) => {
      if (level < 0) return 0;
      return offset2 + offset * base ** level;
    };
    export const cumulativeFunction = (currentLevel: number, levels: number, base: number, offset: number = 1, offset2: number = 0) => {
      if (currentLevel < 0) return 0;
      if (base == 1) {
        return offset2 + levels * offset;
      } else if (base >= 2) {
        // v for exponential cost scaling? v
        // let l = currentLevel + levels;
        // let a = (l * (l + 1)) / 2;
        // let b = (currentLevel * (currentLevel + 1)) / 2;
        // return base ** (a - b) * offset;

        let a = (levels * offset2 + offset * base ** (currentLevel + levels) - (base - 2)) / (base - 1);
        let b = (offset * base ** currentLevel - (base - 2)) / (base - 1);
        return a - b;
      } else {
        if (offset2 >= 0) {
          return (levels * (base - 1) * offset2 + offset * (base ** currentLevel * (base ** levels - 1))) / (base - 1);
        } else {
          return offset2 * levels + (offset * (base ** currentLevel * (base ** levels - 1))) / (base - 1);
        }
      }
    };
    export const maxFunction = (
      currency: number,
      currentLevel: number,
      base: number,
      offset: number = 1,
      offset2: number = 0
    ): [number, number] => {
      if (currentLevel < 0) return [1, 0]; // free but one per buy
      if (!currency) return [0, 0]; // [ amount, cost ]
      if (base == 1) {
        let amountToBuy = Math.floor(currency / offset);
        return [amountToBuy, Math.floor(amountToBuy * offset)];
      }
      // v works with 2, 2.5, 3 so pretty sure its ok
      if (base >= 2) {
        let amountToBuy = Math.floor(blog(base, currency / costFunction(currentLevel, base, offset)));
        // amountToBuy = Math.floor(blog(base, (currency - amountToBuy * offset2) / costFunction(currentLevel, base, offset, offset2)));

        let a = (offset2 + offset * base ** (currentLevel + amountToBuy) - (base - 2)) / (base - 1);
        let b = (offset2 + offset * base ** currentLevel - (base - 2)) / (base - 1);

        currency -= a - b;

        // brain too small to get all of this in one formula
        let nextOne = offset * base ** Math.floor(amountToBuy + currentLevel);

        if (currency >= nextOne) {
          amountToBuy += 1;
        }
        if (amountToBuy < 1) return [0, 0]; // console.log("nothing to buy");

        //@ts-ignore
        // let ar = new Array(amountToBuy).fill(1).map((a, b) => a * 3 ** (currentLevel + b));
        // cost = ar.reduce((a, b) => a + b);

        a = (offset * base ** (currentLevel + amountToBuy) - (base - 2)) / (base - 1);
        b = (offset * base ** currentLevel - (base - 2)) / (base - 1);

        return [amountToBuy, a - b];
      } else {
        //TODO! figure out formula with oofset2
        if (offset2 == 0) {
          let amountToBuy = Math.floor(blog(base, (currency * (base - 1)) / (offset * base ** currentLevel) + 1));

          if (amountToBuy < 1) return [0, 0]; // console.log("nothing to buy");

          let a = (offset * base ** (currentLevel + amountToBuy) - (base - 2)) / (base - 1);
          let b = (offset * base ** currentLevel - (base - 2)) / (base - 1);

          return [amountToBuy, a - b];
        } else {
          return [0, 0];
        }
      }
    };
    export const canBuy = (
      currency: number,
      currentLevel: number,
      levels: number,
      base: number,
      offset: number = 1,
      offset2: number = 0
    ) => {
      if (currentLevel < 0) return true;
      return currency >= cumulativeFunction(currentLevel, levels, base, offset, offset2);
    };
  }

  export class Cost extends BaseCost {
    constructor(base: number, level: number = 0, offset: number = 1, /*offset2: number = 0,*/ levelOffset: number = 0) {
      super(
        base,
        (level: number = this.level) => Normal.costFunction(level + levelOffset, this.base, this.offset, this.offset2),
        (levels: number) => Normal.cumulativeFunction(this.level + levelOffset, levels, this.base, this.offset, this.offset2),
        (currency: number) => Normal.maxFunction(currency, this.level + levelOffset, this.base, this.offset, this.offset2),
        level,
        offset,
        // offset2
        0
      );
    }
    setOffset(offset: number = 1) {
      this.offset = offset;
    }
    /**buy {mode} of bees based on {currency}
     *
     * increases its level and returns {bought}, {cost} */
    buy(currency: number, mode: number | "max"): [number, number] {
      let [bought, cost] = [0, 0];
      if (mode == "max") {
        [bought, cost] = this.maxFunction(currency);
      } else {
        [bought, cost] = [mode, this.cumulativeFunction(mode)];
        if (currency < cost) [bought, cost] = [0, 0];
      }
      // console.log("bought: " + bought, "cost: " + cost, "level: " + this.level);
      return [bought, cost];
    }
    // deadass function names
    checkCost(currency: number, mode: number | "max"): [number, number] {
      let [bought, cost] = [0, 0];
      if (mode == "max") {
        [bought, cost] = this.maxFunction(currency);
      } else {
        [bought, cost] = [mode, this.cumulativeFunction(mode)];
        if (currency < cost) [bought, cost] = [0, 0];
      }

      this.level += bought;
      return [bought, cost];
    }
    cost(mode: number): number {
      return this.cumulativeFunction(mode);
    }
  }

  export class FirstFreeCost extends BaseCost {
    constructor(base: number, level: number = 0, offset: number = 1, offset2: number = 0, levelOffset: number = -1) {
      super(
        base,
        (level: number = this.level) => Normal.costFunction(level + levelOffset, this.base, this.offset, this.offset2),
        (levels: number) => Normal.cumulativeFunction(this.level + levelOffset, levels, this.base, this.offset, this.offset2),
        (currency: number) => Normal.maxFunction(currency, this.level + levelOffset, this.base, this.offset, this.offset2),
        level,
        offset,
        offset2
      );
    }
  }

  // note: didnt check if it works for any base other than 2
  // @ts-ignore
  const stepwisePowerSum = (level: number, base: number, step: number = 10) => {
    const a = base ** Math.floor(level / step);
    return step * a - step + (level % step) * a;
  };
}
