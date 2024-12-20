import {IQuackBehavior} from "./IQuackBehavior";

class QuackBehavior implements IQuackBehavior {
	quack() {
		console.log('Quack Quack!!!')
	}
}

export {QuackBehavior}