class AjaxWeather {
    constructor() {
        this.apiKey = 'f76b5b6c1bde762e1e7964071fad6ed4';

    }
    async getWeather(city) {
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${this.apiKey}&units=metric`;
        const weatherData = await fetch(url);
        const weather = await weatherData.json();
        return weather;
    }
}


class Display {
    constructor() {
        this.result = document.querySelector('.results');
        this.cityName = document.getElementById('cityName');
        this.cityCountry = document.getElementById('cityCountry');
        this.cityIcon = document.getElementById('cityIcon');
        this.cityTemp = document.getElementById('cityTemp');
        this.cityHumidity = document.getElementById('cityHumidity');
        this.cityWindSpeed = document.getElementById('cityWindSpeed');
        this.cityDescription = document.getElementById('cityDescription');
    }
    showWeather(data) {
        console.log(data);
        const { name, sys: { country }, main: { temp, humidity }, wind: { speed } } = data;
        const { icon, description } = data.weather[0];

        this.result.classList.add('showItem');
        this.cityName.textContent = name;
        this.cityCountry.textContent = country;
        this.cityTemp.textContent = temp;
        this.cityHumidity.textContent = humidity;
        this.cityWindSpeed.textContent = speed;
        this.cityDescription.textContent = description;
        this.cityIcon.src = `http://openweathermap.org/img/w/${icon}.png`;
    }
}


(function () {
    const form = document.getElementById('weatherForm');
    const cityInput = document.getElementById('cityInput');
    const feedback = document.querySelector('.feedback');

    // class
    const ajax = new AjaxWeather();
    const display = new Display();

    form.addEventListener('submit', event => {
        event.preventDefault();
        const city = cityInput.value;
        if (city.length === 0) {
            showFeedback('city value cannot be empty')
        } else {
            ajax.getWeather(city)
                .then(data => {
                    if (data.message === 'city not found') {
                        showFeedback('city cannot be found');
                    } else {
                        display.showWeather(data);
                    }
                });
        }

    });


    function showFeedback(text) {
        feedback.classList.add('showItem');
        feedback.innerHTML = `<p>${text}</p>`;

        setTimeout(() => {
            feedback.classList.remove('showItem');
        }, 3000)

    }

})();

$('#about-body').hide();

$('#about-click').click(() => {
    $('#results-body').hide();
    $('#about-body').show();
});

$('#home-click').click(() => {
    $('#results-body').show();
    $('#about-body').hide();
})