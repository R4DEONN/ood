import {IObserver, Observable} from "./Observer";
import {StatsData} from "./StatsData/StatsData";

class SWeatherData {
	temperature = 0
	humidity = 0
	pressure = 0
	windSpeed = 0
	windDirection = 0
}

class Display implements IObserver<SWeatherData> {
	update(data: SWeatherData) {
		console.log(`Current Temp: ${data.temperature}`);
		console.log(`Current Humidity: ${data.humidity}`);
		console.log(`Current Pressure: ${data.pressure}`);
		console.log(`Wind Speed: ${data.windSpeed} m/s`);
		console.log(`Wind Direction: ${data.windDirection}°`);
		console.log("----------------");
	}
}
class StatsDisplay implements IObserver<SWeatherData> {
	private _temperatureData= new StatsData()
	private _pressureData = new StatsData()
	private _humidityData = new StatsData()
	private _windSpeedData = new StatsData();

	private _windDirectionX = 0;
	private _windDirectionY = 0;

	update({temperature, humidity, pressure, windSpeed, windDirection}: SWeatherData) {
		this._temperatureData.update(temperature)
		this._humidityData.update(humidity)
		this._pressureData.update(pressure)
		this._windSpeedData.update(windSpeed)

		const windRadians = windDirection * (Math.PI / 180); //TODO: Выделить в отдельный класс
		this._windDirectionX += Math.cos(windRadians);
		this._windDirectionY += Math.sin(windRadians);

		console.log(`Temperature:\n${this._temperatureData}`)
		console.log(`Humidity:\n${this._humidityData}`)
		console.log(`Pressure:\n${this._pressureData}`)
		console.log(`Wind speed:\n${this._windSpeedData}`)
		console.log(`Wind Direction:\n${this._getAverageWindDirection()} degrees`);
	}

	private _getAverageWindDirection(): number {
		const avgX = this._windDirectionX;
		const avgY = this._windDirectionY;
		const avgDirectionRadians = Math.atan2(avgY, avgX);
		let avgDirectionDegrees = avgDirectionRadians * (180 / Math.PI);

		if (avgDirectionDegrees < 0) {
			avgDirectionDegrees += 360;
		}

		return avgDirectionDegrees;
	}
}

class WeatherData extends Observable<SWeatherData> {
	private _temperature = 0
	private _humidity = 0
	private _pressure = 760
	private _windSpeed = 0;
	private _windDirection = 0;

	getTemperature() {
		return this._temperature
	}

	getPressure(): number {
		return this._pressure;
	}

	getHumidity(): number {
		return this._humidity;
	}

	getWindSpeed(): number {
		return this._windSpeed;
	}

	getWindDirection(): number {
		return this._windDirection;
	}

	measurementsChanged() {
		this.notifyObservers()
	}

	setMeasurements(temp: number, humidity: number, pressure: number, windSpeed: number, windDirection: number) {
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
		data.windDirection = this.getWindDirection()
		data.windSpeed = this.getWindSpeed()
		return data
	}
}

export {WeatherData, Display, StatsDisplay}