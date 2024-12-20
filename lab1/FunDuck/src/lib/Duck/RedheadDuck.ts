import {Duck} from "./Duck";
import {danceMinuet} from "./Dance/DanceMinuet";
import {makeFlyWithWings} from "./Fly/FlyWithWings";
import {quackBehavior} from "./Quack/QuackBehavior";

class RedheadDuck extends Duck {
	constructor() {
		super(makeFlyWithWings(), quackBehavior, danceMinuet);
	}

	display() {
		console.log('I\'m redhead duck')
	}
}

export {RedheadDuck}