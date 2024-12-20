import {IBeverage} from "./IBeverage";
import {
	CCondimentDecorator,
	ChocolateCrumbs,
	Cinnamon,
	CoconutFlakes,
	IceCubes,
	IceCubeType,
	Lemon,
	Syrup, SyrupType
} from "./Condiment";
import {BlackTea, Coffee, Latte, LargeMilkshake, Tea} from "./Beverage";
import { createInterface } from 'readline';

function makeCondiment<T extends CCondimentDecorator>(Condiment: { new (b: IBeverage, ...args: any[]): T }, ...args: any[]) {
	return (beverage: IBeverage) => new Condiment(beverage, ...args);
}

function chain(beverage: IBeverage, ...decorators: Array<(b: IBeverage) => IBeverage>): IBeverage {
	return decorators.reduce((prev, decorator) => decorator(prev), beverage);
}

const rl = createInterface({
	input: process.stdin,
	output: process.stdout
});

function askQuestion(query: string): Promise<string> {
	return new Promise(resolve => rl.question(query, resolve));
}

async function dialogWithUser() {
	let beverage: IBeverage | null = null;

	const beverageChoice = await askQuestion('Type 1 for coffee or 2 for tea: ');

	if (beverageChoice === '1') {
		beverage = new Coffee();
	} else if (beverageChoice === '2') {
		beverage = new BlackTea();
	} else {
		rl.close();
		return;
	}

	let condimentChoice: string; //TODO: сделать диаграмму

	do {
		condimentChoice = await askQuestion('1 - Lemon, 2 - Cinnamon, 0 - Checkout: ');

		if (condimentChoice === '1') {
			beverage = new Lemon(beverage, 2);
		} else if (condimentChoice === '2') {
			beverage = new Cinnamon(beverage);
		} else if (condimentChoice === '0') {
			break;
		} else {
			rl.close();
			return;
		}

	} while (true);

	console.log(`${beverage.getDescription()}, cost: ${beverage.getCost()}`);
	rl.close();
}

async function main() {
	await dialogWithUser();

	const beverage = chain(
		new Latte(),
		makeCondiment(Cinnamon),
		makeCondiment(Lemon, 2),
		makeCondiment(IceCubes, 2, IceCubeType.Dry),
		makeCondiment(ChocolateCrumbs, 2)
	);
	console.log(`${beverage.getDescription()} costs ${beverage.getCost()}`);

	const milkshake = chain(
		new LargeMilkshake(),
		makeCondiment(Syrup, SyrupType.Maple),
		makeCondiment(CoconutFlakes, 8)
	);
	console.log(`${milkshake.getDescription()} costs ${milkshake.getCost()}`);
}

await main();