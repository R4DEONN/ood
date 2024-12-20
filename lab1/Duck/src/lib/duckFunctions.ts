import {Duck} from "./Duck/Duck";

function drawDuck(duck: Duck) {
	duck.display()
}

function playWithDuck(duck: Duck) {
	drawDuck(duck)
	duck.quack()
	duck.fly()
	duck.dance()
	console.log()
}

export {drawDuck, playWithDuck}