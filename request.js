const apiKey = "c355abbae6f373c1b19c2e149c4cea93";

const requestCity = async(city) => {
    const baseURL = "https://api.openweathermap.org/data/2.5/weather";
    const query = "?q=" + city + "&appid=" + apiKey;

    const response = await fetch(baseURL + query);

    const data = await response.json();
    return data;
}
