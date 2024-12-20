import { Duck } from "./Duck";
import { FlyNoWay } from "./Fly/FlyNoWay";
import { MuteQuackBehavior } from "./Quack/MuteQuackBehavior";
class DecoyDuck extends Duck {
    constructor() {
        super(new FlyNoWay(), new MuteQuackBehavior());
    }
    display() {
        console.log('I\'m decoy duck');
    }
    dance() { }
}
export { DecoyDuck };
//# sourceMappingURL=DecoyDuck.js.map