import {IDanceBehavior} from "./IDanceBehavior";

class DanceWaltz implements IDanceBehavior {
	dance() {
		console.log('I\'m dancing waltz') //TODO: подумать по-какому принципу const
	}

	isDancing() {
		return true;
	}
}

export {DanceWaltz}