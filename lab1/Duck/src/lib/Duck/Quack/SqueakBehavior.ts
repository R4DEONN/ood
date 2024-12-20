import {IQuackBehavior} from "./IQuackBehavior";

class SqueakBehavior implements IQuackBehavior {
	quack() {
		console.log('Squeek!!!')
	}
}

export {SqueakBehavior}