import {IObserver, Observable} from "./Observer";
import {StatsData} from "./StatsData/StatsData";

class SWeatherData {
	temperature = 0
	humidity = 0
	pressure = 0
	sourceId = ''
}

class Display implements IObserver<SWeatherData> {
	update(data: SWeatherData) {
		console.log(`Source: ${data.sourceId}`);
		console.log(`Current Temp: ${data.temperature}`);
		console.log(`Current Humidity: ${data.humidity}`);
		console.log(`Current Pressure: ${data.pressure}`);
		console.log("----------------");
	}
}
class StatsDisplay implements IObserver<SWeatherData> {
	private _weatherDataIn = this._createWeatherData()
	private _weatherDataOut = this._createWeatherData()

	update({temperature, humidity, pressure, sourceId}: SWeatherData) {
		if (sourceId === "in")
		{
			this._weatherDataIn.temperature.update(temperature)
			this._weatherDataIn.humidity.update(humidity)
			this._weatherDataIn.pressure.update(pressure)

			console.log(`Indoor`)
			console.log(`Temperature:\n${this._weatherDataIn.temperature}`)
			console.log(`Humidity:\n${this._weatherDataIn.humidity}`)
			console.log(`Pressure:\n${this._weatherDataIn.pressure}`)
		}
		else if (sourceId === "out")
		{
			this._weatherDataOut.temperature.update(temperature)
			this._weatherDataOut.humidity.update(humidity)
			this._weatherDataOut.pressure.update(pressure)

			console.log(`Outdoor\n`)
			console.log(`Temperature:\n${this._weatherDataOut.temperature}`)
			console.log(`Humidity:\n${this._weatherDataOut.humidity}`)
			console.log(`Pressure:\n${this._weatherDataOut.pressure}`)
		}
	}

	_createWeatherData() {
		return {
			temperature: new StatsData(),
			humidity: new StatsData(),
			pressure: new StatsData(),
		}
	}
}

class WeatherData extends Observable<SWeatherData> {
	private _temperature = 0
	private _humidity = 0
	private _pressure = 760
	private _id: string

	constructor(id: string) {
		super();
		this._id = id
	}

	getTemperature() {
		return this._temperature
	}

	getPressure(): number {
		return this._pressure;
	}

	getHumidity(): number {
		return this._humidity;
	}

	measurementsChanged() {
		this.notifyObservers()
	}

	setMeasurements(temp: number, humidity: number, pressure: number) {
		this._humidity = humidity
		this._temperature = temp
		this._pressure = pressure

		this.measurementsChanged()
	}

	protected getChangedData(): SWeatherData {
		const data = new SWeatherData()
		data.humidity = this.getHumidity()
		data.temperature = this.getTemperature()
		data.pressure = this.getPressure()
		data.sourceId = this._id
		return data
	}
}

export {WeatherData, Display, StatsDisplay}