const temperatureField  = document.querySelector('.temp')
const cityField = document.querySelector('.time_location p')
const dateField = document.querySelector('.time_location span')
const emojiField = document.querySelector('.weather_condition img')
const weatherField = document.querySelector('.weather_condition span')

const searchField = document.querySelector('.searchField')
const form = document.querySelector('form')

let target = 'milan'

form.addEventListener('submit', search)

function search(e){
    e.preventDefault()
    target = searchField.value
    // console.log(target) 

    fetchData(target)
}

async function fetchData(targetLocation){
    try{
      
        let url = `https://api.weatherapi.com/v1/current.json?key=2c40ecfeedbd445393a75857242501&q=${targetLocation}&aqi=no`

        const response = await fetch(url);
        const data = await response.json();
        // console.log(data)

        let currentTemp = data.current.temp_c
        let currentCondition = data.current.condition.text
        let locationName = data.location.name
        let localTime = data.location.localtime
        let conditionEmoji = data.current.condition.icon

        // console.log(currentTemp , currentCondition, locationName, localTime, conditionEmoji)

        updateDom(currentTemp, locationName, localTime, conditionEmoji, currentCondition)

    }

    catch(error){
        console.log(error)
    }
}

function updateDom(temp, locationN, time,  emoji, condition){

   // time.split(" ")[1]
    const exactTime =time.split(" ")[1]
    const exactDate =time.split(" ")[0]

    const exactDay = getDayFullName (new Date(exactDate).getDay())
    // console.log(exactDay)
        
    temperatureField.innerHTML = temp
    cityField.innerHTML = locationN
    dateField.innerHTML= `${exactTime} ${exactDay} ${exactDate}`
    emojiField.src = emoji
    weatherField.innerHTML = condition
}
function getDayFullName(num) {
    switch (num) {
      case 0:
        return "Sunday";

      case 1:
        return "Monday";

      case 2:
        return "Tuesday";

      case 3:
        return "Wednesday";

      case 4:
        return "Thursday";

      case 5:
        return "Friday";

      case 6:
        return "Saturday";

      default:
        return "Don't Know";
    }
  }