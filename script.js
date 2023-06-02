const search = document.querySelector('.search input');
const citiesContiner = document.querySelector('.cities');
const searchBtn = document.querySelector('.search-btn');
const notFound = document.querySelector('.not-found');
const loader = document.querySelector('.loader');


const key='2d4e9aba3bad61430f5797a5f778c3f9';
//Default Cities
const defaultCities = ['balochistan','turbat', 'delhi', 'manama'];


//load Default Cities
const load = async (city) => {
  notFound.style.display = 'none';
  if (citiesContiner.childElementCount == 4) {
    citiesContiner.innerHTML = '';
  };
  
  try {
    if (citiesContiner.childElementCount <1) {
      loader.style.display = 'block';
    };
    //Fetch data from Api
    const url = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`);
    if (!url.ok) {
      throw new Error(url.statusText);
      return;
    };
    const res = await url.json()
    
    const t = parseInt(res.main.temp).toString().split('')
    t.splice(1, 1);
    const tem = t.join('');
    //Fetch data In DOM
    citiesContiner.innerHTML += `
       <div class="city">
          <div>
            <h3 class="city-name">${res.name +' '+ res.sys.country}</h3>
            <span class="wind">Wind ${res.wind.speed} Km/h</span>
                 
          </div>
          <h1 class="temp">${tem}°C</h1>
       </div>
      `;
    loader.style.display = 'none';
  } catch (e) {
    citiesContiner.innerHTML = '';
    notFound.style.display = 'inline';
    notFound.innerHTML = e.message;
    loader.style.display = 'none';
  };

};

//looping default cities 
defaultCities.forEach(city => {
  load(city);
});

//btn
searchBtn.addEventListener('click', ()=> {
  load(search.value);
});