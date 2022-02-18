import axios from 'axios'
import { useState, useEffect } from 'react'
import "./app.css"

const api = {
  key: "4053c55a0e5194d6bf81323b6e03bbf2",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const iller = ["Select custom city", "Islamabad", "Ahmed Nager", "Ahmadpur East", "Ali Khan", "Alipur", "Arifwala", "Attock", "Bhera", "Bhalwal", "Bahawalnagar", "Bahawalpur", "Bhakkar", "Burewala", "Chillianwala", "Chakwal", "Chichawatni", "Chiniot", "Chishtian", "Daska", "Darya Khan", "Dera Ghazi", "Dhaular", "Dina", "Dinga", "Dipalpur", "Faisalabad", "Fateh Jhang", "Ghakhar Mandi", "Gojra", "Gujranwala", "Gujrat", "Gujar Khan", "Hafizabad", "Haroonabad", "Hasilpur", "Haveli", "Lakha", "Jalalpur", "Jattan", "Jampur", "Jaranwala", "Jhang", "Jhelum", "Kalabagh", "Karor Lal", "Kasur", "Kamalia", "Kamoke", "Khanewal", "Khanpur", "Kharian", "Khushab", "Kot Adu", "Jauharabad", "Lahore", "Lalamusa", "Layyah", "Liaquat Pur", "Lodhran", "Malakwal", "Mamoori", "Mailsi", "Mandi Bahauddin", "mian Channu", "Mianwali", "Multan", "Murree", "Muridke", "Mianwali Bangla", "Muzaffargarh", "Narowal", "Okara", "Renala Khurd", "Pakpattan", "Pattoki", "Pir Mahal", "Qaimpur", "Qila Didar", "Rabwah", "Raiwind", "Rajanpur", "Rahim Yar", "Rawalpindi", "Sadiqabad", "Safdarabad", "Sahiwal", "Sangla Hill", "Sarai Alamgir", "Sargodha", "Shakargarh", "Sheikhupura", "Sialkot", "Sohawa", "Soianwala", "Siranwali", "Talagang", "Taxila", "Toba Tek", "Vehari", "Wah Cantonment", "Wazirabad", "Badin", "Bhirkan", "Rajo Khanani", "Chak", "Dadu", "Digri", "Diplo", "Dokri", "Ghotki", "Haala", "Hyderabad", "Islamkot", "Jacobabad", "Jamshoro", "Jungshahi", "Kandhkot", "Kandiaro", "Karachi", "Kashmore", "Keti Bandar", "Khairpur", "Kotri", "Larkana", "Matiari", "Mehar", "Mirpur Khas", "Mithani", "Mithi", "Mehrabpur", "Moro", "Nagarparkar", "Naudero", "Naushahro Feroze", "Naushara", "Nawabshah", "Nazimabad", "Qambar", "Qasimabad", "Ranipur", "Ratodero", "Rohri", "Sakrand", "Sanghar", "Shahbandar", "Shahdadkot", "Shahdadpur", "Shahpur Chakar", "Shikarpaur", "Sukkur", "Tangwani", "Tando Adam", "Tando Allahyar", "Tando Muhammad", "Thatta", "Umerkot", "Warah", "Abbottabad", "Adezai", "Alpuri", "Akora Khattak", "Ayubia", "Banda Daud", "Bannu", "Batkhela", "Battagram", "Birote", "Chakdara", "Charsadda", "Chitral", "Daggar", "Dargai", "Darya Khan", "dera Ismail", "Doaba", "Dir", "Drosh", "Hangu", "Haripur", "Karak", "Kohat", "Kulachi", "Lakki Marwat", "Latamber", "Madyan", "Mansehra", "Mardan", "Mastuj", "Mingora", "Nowshera", "Paharpur", "Pabbi", "Peshawar", "Saidu Sharif", "Shorkot", "Shewa Adda", "Swabi", "Swat", "Tangi", "Tank", "Thall", "Timergara", "Tordher", "Awaran", "Barkhan", "Chagai", "Dera Bugti", "Gwadar", "Harnai", "Jafarabad", "Jhal Magsi", "Kacchi", "Kalat", "Kech", "Kharan", "Khuzdar", "Killa Abdullah", "Killa Saifullah", "Kohlu", "Lasbela", "Lehri", "Loralai", "Mastung", "Musakhel", "Nasirabad", "Nushki", "Panjgur", "Pishin valley", "Quetta", "Sherani", "Sibi", "Sohbatpur", "Washuk", "Zhob", "Ziarat"]

  const [selectedCity, setSelectedCity] = useState("")
  const [weather, setWeather] = useState("")
  const [lat, setLat] = useState("")
  const [long, setLong] = useState("")
  const [gotCity, setGotCity] = useState("")

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
    });
    fetch(`${api.base}weather/?lat=${lat}&lon=${long}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        if (result.name == undefined) { } else {
        if(gotCity == true){}else{
          setWeather(result);
          setGotCity(true)
          setSelectedCity('');
          document.getElementById('nolocation').innerHTML = 'City detected';
          document.getElementById('nolocation').style.color = 'white';
        }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  })

  const onClickHandler = () => {
    if (selectedCity !== ""){
      fetch(`${api.base}weather?q=${selectedCity}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          if (result.name == undefined) { } else {
            setWeather(result);
            setSelectedCity('');
            document.getElementById('nolocation').style.display = 'none';
          }
        });
    }else{alert('Please select a city from the dropdown menu.')}
  }

  const tempCheck = () => {
    if (weather !== "") {
      let temp = Math.round(weather.main.temp)
      let finalText = temp + "°c"
      return (
        finalText
      )
    }
  }

  const situationCheck = () => {
    if (weather !== "") {
      let situation = weather.weather[0].main
      if (situation == 'Clouds') { situation = 'Cloudy' }
      return (
        <div className='situation'>
          <h3>Weather is {situation}</h3>
        </div>
      )
    }
  }
  const locationCheck = () => {
    if (weather !== "") {
      let location = weather.name.split(" ").slice(0, 1)
      return (
        location
      )
    }
  }


  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 12) ? 'container warm' : 'container') : 'container'}>
      <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 12) ? 'app warm' : 'app') : 'app'}>
        <main>
          <h2 style={{ color: 'black' }}>Weather App <h6 style={{ color: 'black' }}>Jawan Pakistan/ BMJ Assignment#6 <h3 style={{ color: 'black' }}>By Shaheer Muhammad Khan</h3></h6></h2>
          <div className='top'>
          <p id='nolocation' style={{color: 'black', fontWeight: 'bold'}}>You have not enabled your location.<br /> You can manually select a city from below.</p>
            <div className='location'>
              {locationCheck()}
            </div>
            <div>
              <div className='temp'>
                <h2>{tempCheck()}</h2>
              </div>
              {situationCheck()}
            </div>
          </div>
          <div className='select-area'>
            <select className='custom-select' value={selectedCity} onChange={(e) => { setSelectedCity(e.target.value) }}>
              {
                iller.map((el, i) => {
                  return (
                    <option key={i} value={iller[i]}>{iller[i]}</option>
                  )
                })
              }
            </select>
            <br />
            <button className='btn' onClick={onClickHandler}>Submit</button>
            <br></br>
            <p style={{ color: 'white', fontStyle: 'italic' }}>*Click submit button after selecting custom city from dropdown menu to change city<br /> Made using openweathermap.com API</p>
          </div>

        </main>

      </div>
    </div>
  )
}

export default App
