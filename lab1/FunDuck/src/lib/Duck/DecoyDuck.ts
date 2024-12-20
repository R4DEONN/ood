import {Duck} from "./Duck";
import {flyNoWay} from "./Fly/FlyNoWay";
import {muteQuackBehavior} from "./Quack/MuteQuackBehavior";
import {danceNoWay} from "./Dance/DanceNoWay";

class DecoyDuck extends Duck {
	constructor() {
		super(flyNoWay, muteQuackBehavior, danceNoWay);
	}

	display() {
		console.log('I\'m decoy duck')
	}

	dance() {}
}

export {DecoyDuck}