enum Color {
	Green = 'green',
	Blue = 'blue',
	Red = 'red',
	Yellow = 'yellow',
	White = 'white',
	Black = 'black',
	Pink = 'pink',
}

function colorEnumToColorString(color: Color): string {
	const colorMap = {
		[Color.Green]: '#008000',
		[Color.Blue]: '#0000FF',
		[Color.Red]: '#FF0000',
		[Color.Yellow]: '#FFFF00',
		[Color.White]: '#FFFFFF',
		[Color.Black]: '#000000',
		[Color.Pink]: '#FFC0CB',
	};

	return colorMap[color] || ''; // Возвращаем HEX-код или пустую строку, если цвет не найден
}

export {Color, colorEnumToColorString};