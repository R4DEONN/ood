import {Duck} from "./Duck";
import {danceWaltz} from "./Dance/DanceWaltz";
import {quackBehavior} from "./Quack/QuackBehavior";
import {makeFlyWithWings} from "./Fly/FlyWithWings";

class MallardDuck extends Duck {
	constructor() {
		super(makeFlyWithWings(), quackBehavior, danceWaltz);
	}

	display() {
		console.log('I\'m mallard duck')
	}
}

export {MallardDuck}