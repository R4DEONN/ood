import {IObserver, Observable} from "./Observer";
import {StatsData} from "./StatsData/StatsData";

class SWeatherData {
	temperature = 0
	humidity = 0
	pressure = 0
	windSpeed = 0
	windDirection = 0
	sourceId = ''
}

class Display implements IObserver<SWeatherData> {
	update(data: SWeatherData) {
		console.log(`Source: ${data.sourceId}`);
		console.log(`Current Temp: ${data.temperature}`);
		console.log(`Current Humidity: ${data.humidity}`);
		console.log(`Current Pressure: ${data.pressure}`);
		if (data.sourceId === 'out')
		{
			console.log(`Wind Speed: ${data.windSpeed} m/s`);
			console.log(`Wind Direction: ${data.windDirection}°`);
		}
		console.log("----------------");
	}
}
class StatsDisplay implements IObserver<SWeatherData> {
	private _weatherDataIn = this._createWeatherData()
	private _weatherDataOut = Object.assign(this._createWeatherData(), {
		windSpeed: new StatsData(),
		windDirectionX: 0,
		windDirectionY: 0,
		windCount: 0
	})

	update({temperature, humidity, pressure, sourceId, windSpeed, windDirection}: SWeatherData) {
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
			this._weatherDataOut.windSpeed.update(windSpeed)

			const windRadians = windDirection * (Math.PI / 180);
			this._weatherDataOut.windDirectionX += Math.cos(windRadians);
			this._weatherDataOut.windDirectionY += Math.sin(windRadians);
			this._weatherDataOut.windCount++;

			console.log(`Outdoor\n`)
			console.log(`Temperature:\n${this._weatherDataOut.temperature}`)
			console.log(`Humidity:\n${this._weatherDataOut.humidity}`)
			console.log(`Pressure:\n${this._weatherDataOut.pressure}`)
			console.log(`Wind Speed: ${this._weatherDataOut.windSpeed} m/s`);
			console.log(`Wind Direction: ${this._getAverageWindDirection()}°`);
		}
	}

	private _getAverageWindDirection(): number {
		const avgX = this._weatherDataOut.windDirectionX / this._weatherDataOut.windCount;
		const avgY = this._weatherDataOut.windDirectionY / this._weatherDataOut.windCount;
		const avgDirectionRadians = Math.atan2(avgY, avgX);
		let avgDirectionDegrees = avgDirectionRadians * (180 / Math.PI);

		if (avgDirectionDegrees < 0) {
			avgDirectionDegrees += 360;
		}

		return avgDirectionDegrees;
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
	private _windSpeed = 0;
	private _windDirection = 0;
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

	getWindSpeed(): number {
		return this._windSpeed;
	}

	getWindDirection(): number {
		return this._windDirection;
	}

	setMeasurements(temp: number, humidity: number, pressure: number, windSpeed: number = 0, windDirection: number = 0) {
		this._humidity = humidity
		this._temperature = temp
		this._pressure = pressure
		this._windSpeed = windSpeed;
		this._windDirection = windDirection;

		this.measurementsChanged()
	}

	protected getChangedData(): SWeatherData {
		const data = new SWeatherData()
		data.humidity = this.getHumidity()
		data.temperature = this.getTemperature()
		data.pressure = this.getPressure()
		data.sourceId = this._id
		data.windDirection = this.getWindDirection()
		data.windSpeed = this.getWindSpeed()
		return data
	}
}

export {WeatherData, Display, StatsDisplay}