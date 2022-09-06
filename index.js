// Fetch random photo
const unsplashURL =
  "https://api.unsplash.com/photos/random?client_id=TB0tW4ee-gvg7RV8lPFPUmryIa_LELhuR8b14Air84Q&orientation=landscape&query=fishing";
fetch(unsplashURL)
  .then((res) => {
    if (!res.ok) {
      throw Error("Picture update not available");
    }
    return res.json();
  })
  .then((data) => {
    document.body.style.backgroundImage = `url(${data.urls.regular})`;
    document.getElementById("author").textContent = `By: ${data.user.name}`;
  })
  .catch((err) => {
    console.log(err);
    // Use a default background image/author
    document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1604336102823-1a4df72dfa26?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NjI0NzEwNjE&ixlib=rb-1.2.1&q=80&w=1080
    )`;
    document.getElementById("author").textContent = `By: Léonard`;
  });
// Fetch crypto data
fetch("https://api.coingecko.com/api/v3/coins/shiba-inu")
  .then((res) => {
    if (!res.ok) {
      throw Error("Something went wrong");
    }
    return res.json();
  })
  .then((data) => {
    document.getElementById("crypto-top").innerHTML = `
            <img src=${data.image.small} />
            <span>${data.name}</span>
        `;
    document.getElementById("crypto").innerHTML += `
            <p>🎯: $${data.market_data.current_price.usd}</p>
            <p>👆: $${data.market_data.high_24h.usd}</p>
            <p>👇: $${data.market_data.low_24h.usd}</p>
        `;
  })
  .catch((err) => console.error(err));

// Time updating function
function getCurrentTime() {
  const date = new Date();
  document.getElementById("time").textContent = date.toLocaleTimeString(
    "en-us",
    { timeStyle: "short" }
  );
}

setInterval(getCurrentTime, 1000);

// Weather functionality
https: navigator.geolocation.getCurrentPosition((position) => {
  const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=5e032d00e07d7d338077469566016c8a`;
  fetch(weatherURL)
    .then((res) => {
      if (!res.ok) {
        throw Error("Weather data not available");
      }
      return res.json();
    })
    .then((data) => {
      const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      document.getElementById("weather").innerHTML = `
                <img src=${iconUrl} />
                <p class="weather-temp">${Math.round(data.main.temp)}º</p>
                <p class="weather-city">${data.name}</p>
            `;
    })
    .catch((err) => console.error(err));
});
