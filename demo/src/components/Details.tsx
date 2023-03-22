import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import { Response, weatherData } from '../models/data'
import styled from "styled-components";
import List from "../UI/List";
import Input from "../UI/Input";
import Button from "../UI/Button"



const API_KEY = '74bc25049d607aba173d4d9c2f51b9d1'

const options = [
  { id: 1, value: 'Hyderabad' },
  { id: 2, value: 'Chennai' },
  { id: 3, value: 'Mumbai' },
  { id: 4, value: 'Delhi' },
  { id: 5, value: "Maharastra" },
]

const DetailsContainer = styled.div`
    display:flex;
    border : 2px solid darkgray;
    width:70%;
    border-radius: 10px;
    flex-direction : column;
    & h3{
        margin: 0.2em 0.5em;
    }
    & small{
        margin: 0.2em 0.75em;
        // color: transparent;
    }
    & span{
        margin: 0.2em 0.75em;
    }
    & h1{
        margin:auto
    }

  `

const ExtraDetailsContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 70%;


  
  `

const SmallContainer = styled.div`
  display: flex;
  width: 40%;
  -webkit-box-pack: justify;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: column;
  
    
  `
const InputFields = styled.div`
    width:70%;
    display:flex;
    align-items: flex-start;
    justify-content: center;
    justify-content: space-around;


    
  `




const getWeatherDetails = async (city: string | undefined) => {
  try {
    const response = await axios
      .get<Response>(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`, {
      }).then((res) => {

        //   console.log('response from the api function ',res)
        return res
      }).catch((e) => {
        console.log('error Fetching the data', e)
      });
    return response
  }
  catch (e) {
    console.log("error Occured ", e)
  }
}


const Details: React.FC = () => {

  const [details, setDetails] = useState<weatherData>()
  const [value, setValue] = useState<typeof options[0] | undefined>();
  const [city, setCity] = useState<typeof options[0] | undefined>();


  const getTime = (timestamp: number | undefined) => {
    let dateFormat: Date | string = new Date(timestamp! * 1000);
    dateFormat = dateFormat.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
    return dateFormat
  }

  let time: string | Date = getTime(details?.dt)

  useEffect(() => {
    city?.value && getWeatherDetails(city?.value)
      .then((res: any) => {
        // console.log('response', res.data)
        setDetails(res.data)
      });
  }, [city])


  return (

    <>
      <InputFields>
        <Input options={options} value={value} onChange={o => setValue(o)}></Input>
        <Button onClick={() => setCity(value)}>Submit</Button>
      </InputFields>
      {/* <Input></Input> */}
      {details ?
        <DetailsContainer>
          <h3>{details?.name} , {details?.sys.country}. Weather</h3>
          <small>As of {time}</small>
          <h1>{(details?.main.temp)?.toFixed(0)}&deg;C</h1>
          <span>{details?.weather[0].main}</span>

        </DetailsContainer> : <p>Please Select a Location</p>}
      {
        details && <ExtraDetailsContainer>
          <SmallContainer>
            <List title="High/Low" value={undefined} />
            <List title="Humidity" value={details?.main.humidity} units="%" />
            <List title="Pressure" value={details?.main.pressure} units="hPa" />
            <List title="Visibility" value={details?.visibility} units="Km" />
          </SmallContainer>
          <SmallContainer>
            {/* <p>Wind</p>
                <p>{details?.wind.speed} km/hr</p> */}
            <List title="Wind" value={details?.wind.speed} units="km/hr" />
            <List title="Wind Direction" value={details?.wind.deg} units="&deg;deg" />
            <List title="Sunrise" value={getTime(details?.sys.sunrise)} />
            <List title="Sunset" value={getTime(details?.sys.sunset)} />
          </SmallContainer>
        </ExtraDetailsContainer>}
    </>
  )

}

export default Details;