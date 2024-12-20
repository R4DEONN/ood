import {MallardDuck} from "./lib/Duck/MallardDuck";
import {RedheadDuck} from "./lib/Duck/RedheadDuck";
import {RubberDuck} from "./lib/Duck/RubberDuck";
import {DecoyDuck} from "./lib/Duck/DecoyDuck";
import {ModelDuck} from "./lib/Duck/ModelDuck";
import {playWithDuck} from "./lib/duckFunctions";
import {FlyWithWings} from "./lib/Duck/Fly/FlyWithWings";

const mallardDuck = new MallardDuck()
playWithDuck(mallardDuck)

const redheadDuck = new RedheadDuck()
playWithDuck(redheadDuck)

const rubberDuck = new RubberDuck()
playWithDuck(rubberDuck)

const decoyDuck = new DecoyDuck()
playWithDuck(decoyDuck)

const modelDuck = new ModelDuck()
playWithDuck(modelDuck)

modelDuck.setFlyBehavior(new FlyWithWings());
playWithDuck(modelDuck);