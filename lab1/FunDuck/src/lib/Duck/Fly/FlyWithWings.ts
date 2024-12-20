function makeFlyWithWings() {
	let countOfFlights = 0;
	return () => {
		countOfFlights++;
		console.log(`I\'m flying with wings ${countOfFlights} times!!`);
		return countOfFlights;
	}
}

export {makeFlyWithWings}