import {Display, StatsDisplay, WeatherData} from "./WeatherData";

const weatherDataIn = new WeatherData("in")
const weatherDataOut = new WeatherData("out")

const display = new Display()
weatherDataIn.registerObserver(display)
weatherDataOut.registerObserver(display)

const statsDisplay = new StatsDisplay()
weatherDataIn.registerObserver(statsDisplay)
weatherDataOut.registerObserver(statsDisplay)

weatherDataIn.setMeasurements(3, 0.7, 760);
weatherDataIn.setMeasurements(4, 0.8, 761);
weatherDataOut.setMeasurements(10, 0.8, 761);

weatherDataIn.removeObserver(statsDisplay);

weatherDataIn.setMeasurements(10, 0.8, 761);
weatherDataIn.setMeasurements(-10, 0.8, 761);

