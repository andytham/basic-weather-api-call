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
        sunset: humanbeanSunset,
        zip: zip
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
        {this.state.temp ? <City city={this.state.city} temp={this.state.temp} temp_min={this.state.temp_min} temp_max={this.state.temp_max} humidity={this.state.humidity} windspeed={this.state.windspeed} sunrise={this.state.sunrise} sunset={this.state.sunset} country={this.state.country} zip={this.state.zip} /> : <div> LOADING </div> }
      </div>
    );
  }
}
//var myDate = new Date( your epoch date *1000);
class City extends Component {
  render(){
    return(
      <div>
        <div>
          Weather for {this.props.city}, {this.props.country}, {this.props.zip}
        </div>
        <div>
          {this.props.temp}°F
        </div>
        <div>
          {this.props.temp_min}°F min
        </div>
        <div>
          {this.props.temp_max}°F max
        </div>
        <div>
          {this.props.humidity} humidity
        </div>
        <div>
          {this.props.windspeed} windspeed
        </div>
        <div>
          Sunrise is at: {this.props.sunrise}
        </div>
        <div>
          Sunset is at: {this.props.sunset}
        </div>
      </div>
    )
  }
}
export default App;
