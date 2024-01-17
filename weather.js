let enterCity = document.querySelector(".weather>input")
let cityName = document.querySelector(".cityName")
let degree = document.querySelector(".degree")
let description = document.querySelector(".description")
let minMax = document.querySelector(".minMax")
enterCity.addEventListener("keyup", async (e) => {
    if (e.keyCode == "13") {
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${enterCity.value.toUpperCase()}&appid=984b93674eebdd56e15424e4c82a34c9&units=metric`

        fetch(url)
            .then((data) => {
                if (data.status !== 404) { return data.json() }
                else {
                    cityName.innerHTML = "City Not Found"
                }
            })
            .then((response) => {
                let min = Math.round(response.main.temp_min)
                let max = Math.round(response.main.temp_max)
                if (response !== undefined) {
                    cityName.innerHTML = response.name
                    degree.innerHTML = ` ${Math.round(response.main.temp)}℃ <img src="https://openweathermap.org/img/wn/${response.weather[0].icon}.png"> `
                    description.innerHTML = response.weather[0].description.toUpperCase()
                    minMax.innerHTML = `${min}℃ / ${max}℃ `
                }

            })


    }
})