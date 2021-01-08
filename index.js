const searchform = document.querySelector('.search-location');
const cityValue = document.querySelector('.search-location input');
const cityName = document.querySelector('.city-name p');
const timeImg = document.querySelector('.card-top img');
const cardInfo = document.querySelector('.back-card');
const cardBody = document.querySelector('.card-body');

const tellCelsius = (kelvin) => {
    celsius = Math.round(kelvin - 273);
    return celsius;
}


const isDay = (icon) => {
    if (icon.includes('d')) {
        return true;
    } else {
        return false;
    }
}
updateApp = (city) => {
    console.log(city);
    cityName.textContent = city.name;
    const imgName = city.weather[0].icon;
    const iconLink = " https://openweathermap.org/img/wn/" + imgName + "@2x.png";
    cardBody.innerHTML = `
            <div class="card-body">

                <div class="card-mid row ">
                    <div class="col-8 text-center temp ">
                        <span>${tellCelsius(city.main.temp)}&deg;C</span>
                    </div>
                    <div class="col-4 condition-temp ">
                        <p class="condition ">${city.weather[0].description}</p>
                        <p class="high ">${tellCelsius(city.main.temp_max)}&deg;C</p>
                        <p class="low ">${tellCelsius(city.main.temp_min)}&deg;C</p>
                    </div>


                    <div class="icon-container card shadow mx-auto ">
                        <img src="${iconLink}" alt=" " />
                    </div>

                    <div class="card-bottom px-5 py-4 row ">
                        <div class="col text-center ">
                            <p>${tellCelsius(city.main.feels_like)}&deg;C</p>
                            <span>Feels Like</span>
                        </div>
                        <div class="col text-center ">
                            <p>${city.main.humidity}%</p>
                            <span>Humidity</span>
                        </div>
                    </div>
    `;
    if (isDay(imgName)) {
        timeImg.setAttribute('src', 'img/day_image.svg');
        if (cityName.classList.contains('text-white')) {
            cityName.classList.remove('text-white');
        } else {
            cityName.classList.add('text-black');
        }
    } else {
        timeImg.setAttribute('src', 'img/night_image.svg');
        if (cityName.classList.contains('text-black')) {
            cityName.classList.remove('text-black');
        } else {
            cityName.classList.add('text-white');
        }
    }

    cardInfo.classList.remove('d-none');
}

searchform.addEventListener('submit', event => {
    event.preventDefault();
    const citySearched = cityValue.value.trim();
    console.log(citySearched);
    searchform.reset();

    requestCity(citySearched)
        .then((data) => { updateApp(data); })
        .catch((error) => { console.log(error) })
})