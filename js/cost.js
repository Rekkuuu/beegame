"use strict";
const blog = (b, number) => {
    return Math.log(number) / Math.log(b);
};
class BaseCost {
    constructor(base, costFunction, cumulativeFunction, maxFunction, // amount, cost
    level, offset, offset2) {
        this.base = base;
        this.costFunction = costFunction;
        this.cumulativeFunction = cumulativeFunction;
        this.maxFunction = maxFunction;
        this.level = level;
        this.offset = offset;
        this.offset2 = offset2;
    }
}
var Linear;
(function (Linear) {
    let Normal;
    (function (Normal) {
        Normal.costFunction = (level, base, offset = 1, offset2 = 0) => {
            if (level < 0)
                return 0;
            return offset2 + offset * Math.pow(base, level);
        };
        Normal.cumulativeFunction = (currentLevel, levels, base, offset = 1, offset2 = 0) => {
            if (currentLevel < 0)
                return 0;
            if (base == 1) {
                return offset2 + levels * offset;
            }
            else if (base >= 2) {
                // v for exponential cost scaling? v
                // let l = currentLevel + levels;
                // let a = (l * (l + 1)) / 2;
                // let b = (currentLevel * (currentLevel + 1)) / 2;
                // return base ** (a - b) * offset;
                let a = (levels * offset2 + offset * Math.pow(base, (currentLevel + levels)) - (base - 2)) / (base - 1);
                let b = (offset * Math.pow(base, currentLevel) - (base - 2)) / (base - 1);
                return a - b;
            }
            else {
                if (offset2 >= 0) {
                    return (levels * (base - 1) * offset2 + offset * (Math.pow(base, currentLevel) * (Math.pow(base, levels) - 1))) / (base - 1);
                }
                else {
                    return offset2 * levels + (offset * (Math.pow(base, currentLevel) * (Math.pow(base, levels) - 1))) / (base - 1);
                }
            }
        };
        Normal.maxFunction = (currency, currentLevel, base, offset = 1, offset2 = 0) => {
            if (currentLevel < 0)
                return [1, 0]; // free but one per buy
            if (!currency)
                return [0, 0]; // [ amount, cost ]
            if (base == 1) {
                let amountToBuy = Math.floor(currency / offset);
                return [amountToBuy, Math.floor(amountToBuy * offset)];
            }
            // v works with 2, 2.5, 3 so pretty sure its ok
            if (base >= 2) {
                let amountToBuy = Math.floor(blog(base, currency / Normal.costFunction(currentLevel, base, offset)));
                // amountToBuy = Math.floor(blog(base, (currency - amountToBuy * offset2) / costFunction(currentLevel, base, offset, offset2)));
                let a = (offset2 + offset * Math.pow(base, (currentLevel + amountToBuy)) - (base - 2)) / (base - 1);
                let b = (offset2 + offset * Math.pow(base, currentLevel) - (base - 2)) / (base - 1);
                currency -= a - b;
                // brain too small to get all of this in one formula
                let nextOne = offset * Math.pow(base, Math.floor(amountToBuy + currentLevel));
                if (currency >= nextOne) {
                    amountToBuy += 1;
                }
                if (amountToBuy < 1)
                    return [0, 0]; // console.log("nothing to buy");
                //@ts-ignore
                // let ar = new Array(amountToBuy).fill(1).map((a, b) => a * 3 ** (currentLevel + b));
                // cost = ar.reduce((a, b) => a + b);
                a = (offset * Math.pow(base, (currentLevel + amountToBuy)) - (base - 2)) / (base - 1);
                b = (offset * Math.pow(base, currentLevel) - (base - 2)) / (base - 1);
                return [amountToBuy, a - b];
            }
            else {
                //TODO! figure out formula with oofset2
                if (offset2 == 0) {
                    let amountToBuy = Math.floor(blog(base, (currency * (base - 1)) / (offset * Math.pow(base, currentLevel)) + 1));
                    if (amountToBuy < 1)
                        return [0, 0]; // console.log("nothing to buy");
                    let a = (offset * Math.pow(base, (currentLevel + amountToBuy)) - (base - 2)) / (base - 1);
                    let b = (offset * Math.pow(base, currentLevel) - (base - 2)) / (base - 1);
                    return [amountToBuy, a - b];
                }
                else {
                    return [0, 0];
                }
            }
        };
        Normal.canBuy = (currency, currentLevel, levels, base, offset = 1, offset2 = 0) => {
            if (currentLevel < 0)
                return true;
            return currency >= Normal.cumulativeFunction(currentLevel, levels, base, offset, offset2);
        };
    })(Normal = Linear.Normal || (Linear.Normal = {}));
    class Cost extends BaseCost {
        constructor(base, level = 0, offset = 1, /*offset2: number = 0,*/ levelOffset = 0) {
            super(base, (level = this.level) => Normal.costFunction(level + levelOffset, this.base, this.offset, this.offset2), (levels) => Normal.cumulativeFunction(this.level + levelOffset, levels, this.base, this.offset, this.offset2), (currency) => Normal.maxFunction(currency, this.level + levelOffset, this.base, this.offset, this.offset2), level, offset, 
            // offset2
            0);
        }
        setOffset(offset = 1) {
            this.offset = offset;
        }
        /**buy {mode} of bees based on {currency}
         *
         * increases its level and returns {bought}, {cost} */
        buy(currency, mode) {
            let [bought, cost] = [0, 0];
            if (mode == "max") {
                [bought, cost] = this.maxFunction(currency);
            }
            else {
                [bought, cost] = [mode, this.cumulativeFunction(mode)];
                if (currency < cost)
                    [bought, cost] = [0, 0];
            }
            // console.log("bought: " + bought, "cost: " + cost, "level: " + this.level);
            return [bought, cost];
        }
        // deadass function names
        checkCost(currency, mode) {
            let [bought, cost] = [0, 0];
            if (mode == "max") {
                [bought, cost] = this.maxFunction(currency);
            }
            else {
                [bought, cost] = [mode, this.cumulativeFunction(mode)];
                if (currency < cost)
                    [bought, cost] = [0, 0];
            }
            this.level += bought;
            return [bought, cost];
        }
        cost(mode) {
            return this.cumulativeFunction(mode);
        }
    }
    Linear.Cost = Cost;
    class FirstFreeCost extends BaseCost {
        constructor(base, level = 0, offset = 1, offset2 = 0, levelOffset = -1) {
            super(base, (level = this.level) => Normal.costFunction(level + levelOffset, this.base, this.offset, this.offset2), (levels) => Normal.cumulativeFunction(this.level + levelOffset, levels, this.base, this.offset, this.offset2), (currency) => Normal.maxFunction(currency, this.level + levelOffset, this.base, this.offset, this.offset2), level, offset, offset2);
        }
    }
    Linear.FirstFreeCost = FirstFreeCost;
    // note: didnt check if it works for any base other than 2
    // @ts-ignore
    const stepwisePowerSum = (level, base, step = 10) => {
        const a = Math.pow(base, Math.floor(level / step));
        return step * a - step + (level % step) * a;
    };
})(Linear || (Linear = {}));
