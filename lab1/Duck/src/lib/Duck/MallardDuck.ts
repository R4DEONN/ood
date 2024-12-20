import {Duck} from "./Duck";
import {FlyWithWings} from "./Fly/FlyWithWings";
import {QuackBehavior} from "./Quack/QuackBehavior";
import {DanceWaltz} from "./Dance/DanceWaltz";

class MallardDuck extends Duck {
	constructor() {
		super(new FlyWithWings(), new QuackBehavior(), new DanceWaltz());
	}

	display() {
		console.log('I\'m mallard duck')
	}
}

export {MallardDuck}