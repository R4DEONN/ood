import {IDanceBehavior} from "./IDanceBehavior";

class DanceMinuet implements IDanceBehavior {
	dance() {
		console.log('I\'m dancing minuet')
	}

	isDancing() {
		return true;
	}
}

export {DanceMinuet}