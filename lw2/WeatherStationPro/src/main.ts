import {Display, StatsDisplay, WeatherData} from "./WeatherData";

const wd = new WeatherData()

const display = new Display()
wd.registerObserver(display)

const statsDisplay = new StatsDisplay()
wd.registerObserver(statsDisplay)

wd.setMeasurements(3, 0.7, 760, 10, 90);
wd.setMeasurements(4, 0.8, 761, 5, 180);

wd.removeObserver(statsDisplay);

wd.setMeasurements(10, 0.8, 761, 0, 0);
wd.setMeasurements(-10, 0.8, 761, 0, 0);