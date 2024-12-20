import { ChocolateCrumbs, Cinnamon, CoconutFlakes, IceCubes, IceCubeType, Lemon, Syrup, SyrupType } from "./Condiment.js";
import { Coffee, Latte, Milkshake, Tea } from "./Beverage.js";
import { createInterface } from 'readline';
function makeCondiment(Condiment, ...args) {
    return (beverage) => new Condiment(beverage, ...args);
}
function chain(beverage, ...decorators) {
    return decorators.reduce((prev, decorator) => decorator(prev), beverage);
}
const rl = createInterface({
    input: process.stdin,
    output: process.stdout
});
function askQuestion(query) {
    return new Promise(resolve => rl.question(query, resolve));
}
async function dialogWithUser() {
    let beverage = null;
    const beverageChoice = await askQuestion('Type 1 for coffee or 2 for tea: ');
    if (beverageChoice === '1') {
        beverage = new Coffee();
    }
    else if (beverageChoice === '2') {
        beverage = new Tea();
    }
    else {
        rl.close();
        return;
    }
    let condimentChoice;
    do {
        condimentChoice = await askQuestion('1 - Lemon, 2 - Cinnamon, 0 - Checkout: ');
        if (condimentChoice === '1') {
            beverage = new Lemon(beverage, 2);
        }
        else if (condimentChoice === '2') {
            beverage = new Cinnamon(beverage);
        }
        else if (condimentChoice === '0') {
            break;
        }
        else {
            rl.close();
            return;
        }
    } while (true);
    console.log(`${beverage.getDescription()}, cost: ${beverage.getCost()}`);
    rl.close();
}
async function main() {
    await dialogWithUser();
    const beverage = chain(new Latte(), makeCondiment(Cinnamon), makeCondiment(Lemon, 2), makeCondiment(IceCubes, 2, IceCubeType.Dry), makeCondiment(ChocolateCrumbs, 2));
    console.log(`${beverage.getDescription()} costs ${beverage.getCost()}`);
    const milkshake = chain(new Milkshake(), makeCondiment(Syrup, SyrupType.Maple), makeCondiment(CoconutFlakes, 8));
    console.log(`${milkshake.getDescription()} costs ${milkshake.getCost()}`);
}
await main();
