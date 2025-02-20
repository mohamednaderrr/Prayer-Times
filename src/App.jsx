import { useEffect , useState } from "react"
import Prayer from "./component/Prayer"

function App() {

  const[prayerTimes , setPrayerTimes] = useState({})
  const[dateTime , setDateTime] = useState("")
  const[city , setCity] = useState("Cairo")



  const cities =[
    {name: "القاهرة" , value:"Cairo"},
    {name: "الاسنكدرية" , value:"Alexandria"},
    {name: "الجيزة" , value:"Giza"},
    {name: "المنصورة" , value:"Mansoura"},
    {name: "اسوان" , value:"Aswan"},
    {name: "الاقصر" , value:"Luxor"}
  ]


useEffect(()=>{
  const fetchPrayerTimes =async()=>{
    try{
      const response = await fetch(`https://api.aladhan.com/v1/timingsByCity/21-02-2025?city=Eg&country=${city}`)
      const data_Prayer = await response.json()

      setPrayerTimes(data_Prayer.data.timings)  // set the fetched data to the state variable prayerTimes  // to access the data in the Prayer component, you can use the prayerTimes state variable.  // for example prayerTimes.timings.Fajr  to get fajr prayer time in the Prayer component.  // this is just an example, you can customize the component to display the prayer times as per your requirements.
      setDateTime(data_Prayer.data.date.gregorian.date)


      console.log(data_Prayer.data.date.gregorian.date);

    } catch(error){
      console.error(error)
    }
  }

fetchPrayerTimes()

},[city])


const formatTimes = (time) =>{
  if(!time){ 
    return "00:00";
  }

  let [hours , minutes] = time.split(':').map(Number)
  const pred = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  return `${hours}:${minutes < 10 ?"0" + minutes :minutes} ${pred}`

}


  return (
    <section>
      <div className="container">
        <div className="top_section">
          <div className="city">
            <h3>المدينة</h3>
            <select name="" id="" onChange={(e) => setCity(e.target.value)}>
              {cities.map((city_Obj) =>(
                <option key={city_Obj.value} value={city_Obj.value} > {city_Obj.name} </option>  // map over cities array and create an option tag for each city name and value
              ))}
            </select>
          </div>

          <div className="data">
          <h3>التاريخ</h3> 
          <h4>{dateTime}</h4>

          </div>
          
        </div>
        <Prayer name="الفجر" time={formatTimes(prayerTimes.Fajr)}/>
        <Prayer name="الظهر" time={formatTimes(prayerTimes.Dhuhr)}/>
        <Prayer name="العصر" time={formatTimes(prayerTimes.Asr)}/>
        <Prayer name="المغرب" time={formatTimes(prayerTimes.Maghrib)}/>
        <Prayer name="العشاء" time={formatTimes(prayerTimes.Isha)}/>

      </div>
    </section>

  )
}

export default App
