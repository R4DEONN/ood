import { Duck } from "./Duck";
import { FlyWithWings } from "./Fly/FlyWithWings";
import { QuackBehavior } from "./Quack/QuackBehavior";
class MallardDuck extends Duck {
    constructor() {
        super(new FlyWithWings(), new QuackBehavior());
    }
    display() {
        console.log('I\'m mallard duck');
    }
}
export { MallardDuck };
//# sourceMappingURL=MallardDuck.js.map