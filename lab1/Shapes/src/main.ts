import {Picture} from "./shapes/Picture";
import {HTMLCanvas} from "./gfx/HTMLCanvas";
import {PictureController} from "./shapes/PictureController";
import {test} from "@jest/globals";

const canvas = document.createElement('canvas');
canvas.width = window.innerWidth
canvas.height = window.innerHeight - 50
const contentContainer = document.getElementById('content')
const input: HTMLInputElement = document.getElementById('input') as HTMLInputElement
contentContainer!.appendChild(canvas)
const htmlCanvas = new HTMLCanvas(canvas)
const picture = new Picture(htmlCanvas)
const pictureController = new PictureController(picture)

input.addEventListener('change', () => {
	pictureController.applyCommand(input.value)
	input.value = ''
})

const tests = [
	'AddShape sh1 #123456 rectangle 100 200 30 40',
	'AddShape tr1 #00fefe triangle 0 0 100 0 0 100',
	'AddShape circ #febb38 circle 100 200 25',
	'AddShape ln1 #fe0000 line 10 20 35 88',
	'AddShape txt1 #ffaa88 text 100.3 100.2 12.8 Hello world',
	'DrawPicture',
	'List',
	'MoveShape circ 0 -50',
	'ChangeShape sh1 circle 100 200 15',
	'MovePicture 300 0',
	'DeleteShape txt1',
	'ChangeColor sh1 #febb38',
	'DrawPicture',
]
tests.forEach((test) => {
	pictureController.applyCommand(test)
})