// https://api.openweathermap.org/data/2.5/weather?q=Kyiv&appid=f7c576ba3699bdd0b98ddcf196639992&units=metric

/*
Задача: зробити погодний віджет
Алгоритм вирішення задачі:
+ 1. Зробити верстку елементів, які отримують від користувача дані про місто
+ 2. Отримати дані з апі і обробити їх (підготувати дані до запиту на сервер)
3. Зробити картки з погодою та відобразити їх
*/

const API_KEY = 'f7c576ba3699bdd0b98ddcf196639992';
const API_BASE = 'https://api.openweathermap.org/data/2.5/weather';

const btn = document.querySelector('.btn');
btn.addEventListener('click', buttonClickHandler);

function buttonClickHandler({target}) {
    const selectValue = target.previousElementSibling.value;
    requestAPI(selectValue);
}

function requestAPI(city) {
    // робимо тут запит
    // готуємо URL
    const url = `${API_BASE}?q=${city}&appid=${API_KEY}&units=metric`;
    fetch(url)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        displayWeather(data);
    })
}

function displayWeather(weatherData) {
    // 1. Ми повинні витягнути з того великого об'єкта необхідні нам дані
    // 2. Динамічно створюємо картку з погодою
    // 3. Додаємо цю створену картку з погодою до секції з класом wrapper
    // console.log(weatherData)

    // const city = weatherData.name;
    // const temperature = Math.round(weatherData.main.temp);
    // const pressure = weatherData.main.pressure;
    // const description = weatherData.weather[0].description;
    // const wind = weatherData.wind.speed; 
    // console.log(city, temperature, pressure, description, wind);

    const cityText = document.createElement('p');
    cityText.append(`City: ${weatherData.name}`);  
    const temperatureText = document.createElement('p');
    temperatureText.append(`Temperature: ${Math.round(weatherData.main.temp)} \u00b0C`);
    const pressureText = document.createElement('p');
    pressureText.append(`Pressure: ${weatherData.main.pressure} hpa`);
    const descriptionText = document.createElement('p');
    descriptionText.append(`Weather description: ${weatherData.weather[0].description}`);
    const windText = document.createElement('p');
    windText.append(`Wind: ${weatherData.wind.speed} m/s`);
    const weather = document.createElement('article');
    weather.setAttribute('id', 'weather');
    weather.append(cityText, temperatureText, pressureText, descriptionText, windText);
    const wrapper = document.querySelector('.wrapper');
    wrapper.append(weather);

    // if(document.querySelector('#weather') !== null) {
    //     document.querySelector('#weather')?.remove();
    // }
    // wrapper.append(weather);

    document.querySelector('#weather')?.remove();
    wrapper.append(weather);
}


/*
<!-- <article class="weather">
        <p>City: </p>
        <p>Temperature: </p>
        <p>Pressure: </p>
        <p>Weather description: </p>
        <p>Wind: </p>
    </article> -->
*/