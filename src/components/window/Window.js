import React, { useState } from "react";
import axios from 'axios'
import moment from 'moment';

import searchIcon from './windowImg/search.svg';
import windIcon from './windowImg/wind.svg';
import humidityIcon from './windowImg/humidity.svg'
import clear from './windowImg/clear.svg';
import rain from './windowImg/rain.svg'
import drizzle from './windowImg/drizzle.svg';
import snow from './windowImg/snow.svg'
import storm from './windowImg/storm.svg'
import clouds from './windowImg/clouds.svg'
import mist from './windowImg/mist.svg'

import './window.scss'
const Window = () => {
    const [data, setData] = useState({
        celcius: 10,
        name: 'Лондон',
        humidity: 10,
        speed: 2,
        descr: 'sunny',
        icon: clear
    }) 
    const currentTime = moment();
    console.log();
    let timer = new Date();
    let date = timer.toLocaleDateString();
    const [name, setName] = useState('');
    const apiKey = '879f1f83f51646496ce2802cf607447c';
    const handleClick = () => {
        if (name !== "") {
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${apiKey}&lang=ru`;
            axios.get(apiUrl)
            .then(response => {
                console.log(response.data.weather[0].main)
                let iconWeather = '';
                if (response.data.weather[0].main === 'Clear') {
                    iconWeather = clear;
                } else if (response.data.weather[0].main === 'Rain'){
                    iconWeather = rain;
                } else if (response.data.weather[0].main === 'Drizzle'){
                    iconWeather = drizzle;
                } else if (response.data.weather[0].main === 'Snow'){
                    iconWeather = snow;
                } else if (response.data.weather[0].main === 'Thunderstorm'){
                    iconWeather = storm;
                } else if (response.data.weather[0].main === 'Mist') {
                    iconWeather = mist;
                } else {
                    iconWeather = clouds;
                }

                setData({...data, 
                    celcius: Math.round(response.data.main.temp - 273), 
                    name: response.data.name, 
                    humidity: response.data.main.humidity,
                    speed: response.data.wind.speed,
                    descr: response.data.weather[0].description,
                    icon: iconWeather
                 })
            })
            .catch(error => console.log(error));
        }
    }
    const {celcius,speed, humidity, descr, icon} = data;
    return ( 
        <div className="window_container">
            <div className="search_container">
                <input className='search_input' type="text" placeholder="Введите название города" onChange={e => setName(e.target.value)}/>
                <button onClick={handleClick} className="search_button"><img src={searchIcon} alt="search" /></button>
                <div className="search_time">{currentTime.format('HH:mm')}</div>
                <div className="search_date">{date}</div>
            </div>
            <div className="window_city">{data.name}</div>
            <div className="winfo">
                <h1 className="window_temp">{celcius}°C</h1>
                <div className="weather_container">
                    <img className="weather" src={icon} alt="weather"/>
                </div>
                <div className="window_descr">{descr.toUpperCase()}</div>
                <div className="details">
                    <div className="details_humidity"><img src={humidityIcon} alt="humidity"/>{humidity}%</div>
                    <div className="details_speed"><img src={windIcon} alt="wind"/>{speed}м/c</div>
                </div>
            </div>
        </div>
    )
}

export default Window;