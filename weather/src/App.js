import React, { Component } from 'react';

import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state = {
      value: '',
      temp: null,
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.apiCall = this.apiCall.bind(this);
  }

  componentDidMount(){
    // fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${this.state.value},us&APPID=10265925c20369085517b922da616764`)
    // .then(res => res.json())
    // .then(res => {
    //   this.setState({
    //     temp: res.main.temp - 273
    //   })
    // })
  }

  apiCall(zip){console.log('zip is', zip)
    fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zip},us&APPID=10265925c20369085517b922da616764`)
    .then(res => res.json())
    .then(res => {
      let humanbeanSunset = new Date(res.sys.sunset * 1000).toString();
      let humanbeanSunrise = new Date(res.sys.sunrise * 1000).toString();
      this.setState({
        temp: Math.trunc(res.main.temp * 9 / 5 - 459.67),
        country: res.sys.country,
        city: res.name,
        temp_min: Math.trunc(res.main.temp_min * 9 / 5 - 459.67),
        temp_max: Math.trunc(res.main.temp_max * 9 / 5 - 459.67),
        humidity: res.main.humidity,
        windspeed: res.wind.speed,
        sunrise: humanbeanSunrise,
        sunset: humanbeanSunset
      })
    })
  }

  handleChange(event) {
    this.setState({value: event.target.value});
    console.log(this.state.value);
  }

  handleClick(event){
    event.preventDefault();
    let zip = this.state.value
    this.apiCall(zip);
  }

  render() {
    return (
      <div className="App">
        <form>
          <input type="text" value={this.state.value} onChange={this.handleChange} />
          <input type="submit" onClick={this.handleClick} />
        </form>

        <div>
          weather for {this.state.city}, {this.state.country}
        </div>
        <div>
          temp {this.state.temp} fahrenheit
        </div>
        <div>
          {this.state.temp_min} fahrenheit min
        </div>
        <div>
          {this.state.temp_max} fahrenheit max
        </div>
        <div>
          {this.state.humidity} humidity
        </div>
        <div>
          {this.state.windspeed} windspeed
        </div>
        <div>
          {this.state.sunrise} sunrise
        </div>
        <div>
          {this.state.sunset} sunset
        </div>
      </div>
    );
  }
}
//var myDate = new Date( your epoch date *1000);
// class City extends Component {
//   render(){
//     return(
//
//     )
//   }
// }
export default App;
