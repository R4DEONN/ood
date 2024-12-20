(()=>{"use strict";class e{_observers=new Map;registerObserver(e,t=0){this._observers.has(e)||this._observers.set(e,t)}removeObserver(e){this._observers.delete(e)}notifyObservers(){const e=this.getChangedData(),t=Array.from(this._observers.entries()).sort(((e,t)=>t[1]-e[1]));for(const[r]of t)r.update(e)}getChangedData(){throw new Error("not implemented")}}class t{_minValue=1/0;_maxValue=-1/0;_accValue=0;_accCount=0;update(e){this._minValue>e&&(this._minValue=e),this._maxValue<e&&(this._maxValue=e),this._accValue+=e,++this._accCount}toString(){return`Max: ${this._maxValue}\nMin: ${this._minValue}\nAverage: ${this._accValue/this._accCount}\n----------------`}}class r{temperature=0;humidity=0;pressure=0;sourceId=""}class s extends e{_temperature=0;_humidity=0;_pressure=760;_id;constructor(e){super(),this._id=e}getTemperature(){return this._temperature}getPressure(){return this._pressure}getHumidity(){return this._humidity}measurementsChanged(){this.notifyObservers()}setMeasurements(e,t,r){this._humidity=t,this._temperature=e,this._pressure=r,this.measurementsChanged()}getChangedData(){const e=new r;return e.humidity=this.getHumidity(),e.temperature=this.getTemperature(),e.pressure=this.getPressure(),e.sourceId=this._id,e}}const a=new s("in"),u=new s("out"),i=new class{update(e){console.log(`Source: ${e.sourceId}`),console.log(`Current Temp: ${e.temperature}`),console.log(`Current Humidity: ${e.humidity}`),console.log(`Current Pressure: ${e.pressure}`),console.log("----------------")}};a.registerObserver(i),u.registerObserver(i);const n=new class{_weatherDataIn=this._createWeatherData();_weatherDataOut=this._createWeatherData();update({temperature:e,humidity:t,pressure:r,sourceId:s}){"in"===s?(this._weatherDataIn.temperature.update(e),this._weatherDataIn.humidity.update(t),this._weatherDataIn.pressure.update(r),console.log("Indoor"),console.log(`Temperature:\n${this._weatherDataIn.temperature}`),console.log(`Humidity:\n${this._weatherDataIn.humidity}`),console.log(`Pressure:\n${this._weatherDataIn.pressure}`)):"out"===s&&(this._weatherDataOut.temperature.update(e),this._weatherDataOut.humidity.update(t),this._weatherDataOut.pressure.update(r),console.log("Outdoor\n"),console.log(`Temperature:\n${this._weatherDataOut.temperature}`),console.log(`Humidity:\n${this._weatherDataOut.humidity}`),console.log(`Pressure:\n${this._weatherDataOut.pressure}`))}_createWeatherData(){return{temperature:new t,humidity:new t,pressure:new t}}};a.registerObserver(n),u.registerObserver(n),a.setMeasurements(3,.7,760),a.setMeasurements(4,.8,761),u.setMeasurements(10,.8,761),a.removeObserver(n),a.setMeasurements(10,.8,761),a.setMeasurements(-10,.8,761)})();