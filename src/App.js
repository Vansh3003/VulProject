import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import {useEffect, useState} from "react";
import axios from "axios";

function App() {

  const apiKey="14fe05910c8bb61a8deac5ea0cd65a93";
  const[data,setData]=useState({})
  const[inputCity,setInputCity]=useState("")

  const getWeatherDetails=(cityName)=>{
    if(!cityName) return
    const apiURL="https://api.openweathermap.org/data/2.5/weather?q=" + cityName+ "&appid=" + apiKey;
    axios.get(apiURL).then((res)=>{
      console.log("response",res.data)

      setData(res.data)
      

    }).catch((err)=>{
      console.log("error",err)
    })

  }

  useEffect(()=>{
    getWeatherDetails("jaunpur")
  },[])

  const handleSearch=(()=>{
   getWeatherDetails(inputCity)
   setInputCity("")
  })

  const handleChangeInput=((e)=>{
    setInputCity(e.target.value)
  })

  return (
    <div className="col-md-12">
      <div className="weatherBg">
        <h1>Weather App</h1>

        <div className="d-grid col=4 mt=4">
        <input type="text" className="form-control" onChange={handleChangeInput} value={inputCity} placeholder="Enter City"/><br/>
        <button className=" btn btn-primary" type="button" onClick={handleSearch}>Search</button>
        </div>
      </div>


      <div className="col-md-12 text-center mt-5">
        <div className="shadow rounded weatherResultBox">
          <img className="weatherIcon" src="https://www.psdgraphics.com/file/weather-icon.jpg" alt="weather icon"/>

          <h5 className="weatherCity">{data?.name}</h5>
          <h5 className="weatherCountry">{data?.sys?.country}</h5>
          <h6 className="weatherTemp">{((data?.main?.temp)-273.15).toFixed(2)}°C</h6>
          
        </div>
      </div>
    </div>
  );
}

export default App;
