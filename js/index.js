
const apiKey =`20be27d0c4da4a6cb81195129250907`;

// const input =document.getElementById("location");
// input.addEventListener('keydown',function(e){
//     if(e.key==='Enter'){
//         findWeather(input.value);
//     }
// });
 
// async function findWeather(){
//     try {
//        const res = await fetch(`https://www.weatherapi.com/`);
//        const data =await res.json();
//        console.log(data)
//     //    display(data);
//     } catch (error) {
//         console.log(error);
//     }
// }

// findWeather();
//







const searchInput = document.getElementById('findLocation');

searchInput.addEventListener('input',function (e) {
  console.log(e.target.value);
  getWeather(e.target.value);
});

async function getWeather(cityName){
  if (cityName.length>2){
    let response=await fetch(`https://api.weatherapi.com/v1/forecast.json?q=${cityName}&days=3&key=20be27d0c4da4a6cb81195129250907`);
    let data=await response.json();
    console.log(data);
    displayData(data);
  }
}
function displayData(weatherData) {
  let forecastArr=weatherData.forecast.forecastday;
  let cartoona='';

  for (let i=0;i<forecastArr.length;i++){
    let dayDate=new Date(forecastArr[i].date);
    let dayDateName=dayDate.toLocaleString('en-us', { weekday: 'long' });
    let dayNum=dayDate.getDate();
    let monthName=dayDate.toLocaleString('en-us',{ month: 'long' });
    cartoona +=`
      <div class="col-lg-4 col-md-6 mb-4">
        <div class="weather-card ${i===1? 'bg-custom-two' : 'bg-custom'} p-4 text-black h-100">
          <div class="d-flex ${i===0?'justify-content-between' : 'justify-content-center'} mb-2">
            <div>${dayDateName}</div>
            <div>${i===0?dayNum +' '+monthName:''}</div>
          </div>
          <div>${i===0?weatherData.location.name : ''}</div>

          <div class="d-flex flex-column align-items-center">
            <div class="fs-1">
              <span>${forecastArr[i].day.maxtemp_c}</span>C
            </div>
            ${i!== 0
                ? `<div class="fs-5">
                    <span>${forecastArr[i].day.mintemp_c}</span>C
                   </div>`: ''
            }
            <div>
              <img src="https:${forecastArr[i].day.condition.icon}" alt="weather-icon" class="w-100">
            </div>
            <div class="text-primary">${forecastArr[i].day.condition.text}</div>
          </div>

          ${i===0? `
              <div class="mt-3">
                <img src="./images/icon-umberella@2x.png" class="w-20 me-1" alt="">
                <span>${weatherData.current.humidity}%</span>
                <img src="./images/icon-wind@2x.png" class="w-20 me-1" alt="">
                <span>${weatherData.current.wind_kph}km/h</span>
                <img src="./images/icon-compass@2x.png" class="w-20 me-1" alt="">
                <span>${weatherData.current.wind_dir}</span>
              </div>
              `:''
          }
        </div>
      </div>
    `;
  }
  document.getElementById('row-data').innerHTML = cartoona;
}
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function (position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    getWeather(`${lat},${lon}`);
  });
}

