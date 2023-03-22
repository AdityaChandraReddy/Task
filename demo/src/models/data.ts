
export interface Response {
    config: {},
    data: weatherData,
    headers: {},
    request:{},
    status : number,
    statusText : string

}

export interface weatherData {
     base : string,
     clouds: {
        all: string
     },
     cod : number,
     coord :{
        lat: number,
        lon: number
     },
     dt : number,
     id: number,
     main :{
        feels_like : number,
        humidity : number,
        pressure :number,
        temp: number,
        temp_max:number,
        temp_min:number,
     }
     name:string,
     sys:{
        country : string,
        id : number,
        sunrise : number,
        sunset: number,
        type: number
     }
     timezone: number,
     visibility: number,
     weather : {
        description : string,
        icon: string,
        id : number,
        main : string
     }[],
     wind : {
        speed : number,
        deg: number
     }



}
export interface InputOption {

      id: number
      value: string

  
}