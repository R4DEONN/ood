import {Duck} from "./Duck";
import {FlyWithWings} from "./Fly/FlyWithWings";
import {QuackBehavior} from "./Quack/QuackBehavior";
import {DanceMinuet} from "./Dance/DanceMinuet";

class RedheadDuck extends Duck {
	constructor() {
		super(new FlyWithWings(), new QuackBehavior(), new DanceMinuet());
	}

	display() {
		console.log('I\'m redhead duck')
	}
}

export {RedheadDuck}