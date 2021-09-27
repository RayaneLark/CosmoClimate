let weather = {
    APIKey: "111f96b44562d963cac762ec7b779721",
    fetchWeather: function (city) {       //city name as parameter
      fetch(
        //first part of the URL
        "https://api.openweathermap.org/data/2.5/weather?q=" +  
        //adding the city name to the URL
        city +
        //celcius option
          "&units=metric&appid=" +
          this.APIKey
      )
        .then((response) => {
          if (!response.ok) {
            alert("No weather found.");             //if an error occurs
            throw new Error("No weather found.");
          }
          return response.json();
        })
        .then((data) => this.displayWeather(data));  //if the request is okay
    },
    displayWeather: function (data) {
      //getting all the data we need from a JSON file provided by the API
      const { name } = data;
      const { icon, description } = data.weather[0];
      const { temp, humidity } = data.main;
      const { speed } = data.wind;

      //changing the display
      document.querySelector(".city").innerText = name;
      document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
      document.querySelector(".description").innerText = description;
      document.querySelector(".temp").innerText = Math.floor(temp) + "°C";
      document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
      document.querySelector(".wind").innerText = "Wind: " + speed + " km/h";
      document.querySelector(".weather").classList.remove("loading");
      document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')";
    },

    //function to search the city we want display
    search: function () {
      this.fetchWeather(document.querySelector(".search-bar").value);
    },
  };
  
  //start searching if we click on the search button
  document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
  });
  
  //start searching if we hit the ENTER key
  document.querySelector(".search-bar").addEventListener("keyup", function (event) {
      if (event.key == "Enter") {
        weather.search();
      }
    });
  
  //default display
  weather.fetchWeather("Algiers");