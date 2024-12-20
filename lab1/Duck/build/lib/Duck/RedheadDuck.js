import { Duck } from "./Duck";
import { FlyWithWings } from "./Fly/FlyWithWings";
import { QuackBehavior } from "./Quack/QuackBehavior";
class RedheadDuck extends Duck {
    constructor() {
        super(new FlyWithWings(), new QuackBehavior());
    }
    display() {
        console.log('I\'m redhead duck');
    }
}
export { RedheadDuck };
//# sourceMappingURL=RedheadDuck.js.map