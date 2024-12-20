import {IObserver, Observable} from "./Observer";
import {StatsData} from "./StatsData/StatsData";

class SWeatherData {
	temperature = 0
	humidity = 0
	pressure = 0
}

class Display implements IObserver<SWeatherData> {
	update(data: SWeatherData) {
		console.log(`Current Temp: ${data.temperature}`);
		console.log(`Current Humidity: ${data.humidity}`);
		console.log(`Current Pressure: ${data.pressure}`);
		console.log("----------------");
	}
}
class StatsDisplay implements IObserver<SWeatherData> {
	private _temperatureData= new StatsData()
	private _pressureData = new StatsData()
	private _humidityData = new StatsData()

	update({temperature, humidity, pressure}: SWeatherData) {
		this._temperatureData.update(temperature)
		this._humidityData.update(humidity)
		this._pressureData.update(pressure)

		console.log(`Temperature:`)
		this.outputStats(this._temperatureData)
		console.log("----------------")

		console.log(`Humidity:`)
		this.outputStats(this._humidityData)
		console.log("----------------")

		console.log(`Pressure:`)
		this.outputStats(this._pressureData)
		console.log("----------------")
	}

	outputStats(data: StatsData) {
		console.log(`Max: ${data.maxValue}`)
		console.log(`Min: ${data.minValue}`)
		console.log(`Avg: ${data.getAverage()}`)
	}
}

class WeatherData extends Observable<SWeatherData> {
	private _temperature = 0
	private _humidity = 0
	private _pressure = 760

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
		return data
	}
}

export {WeatherData, Display, StatsDisplay}