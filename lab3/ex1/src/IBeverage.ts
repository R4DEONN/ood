interface IBeverage {
	getDescription(): string;
	getCost(): number;
}

export {IBeverage}; //TODO: Подумать насчет аргументов композиция против агрегации