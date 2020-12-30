console.log("app working")

var txtCity = document.getElementById("txtCity");
var resultOut = document.getElementById("result");
var btnForecast = document.getElementById("btnForecast");
var key = "d16ad09ee7b645660c202ca363ac444f";


btnForecast.onclick = function (){
    var city = txtCity.value;
    var url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;
    
    fetch(url)
    .then(response => {response.json().then(json => {
        let data = json;
        console.log(data);
        
        let output = formatResponse(data);
        resultOut.innerHTML = output;
        });
    });
};



function kelvinToFahrenheit(kTemp){
    const fTemp = kTemp * (9/5) - 459.67;
    return fTemp;
};

function msToMPH(ms){
    return ms * 2.237;
};

function formatResponse(data){
    var conditions = "";
    if(data.weather.length>1){
        for(var i = 0; i < data.weather.length; i++ ){
            conditions += data.weather[i].main;
            if (i != (data.weather.length -1)) {
                conditions += " and ";
            }
        }
    } else {
        conditions += data.weather[0].main;
    }
var out = `<p><strong>Current Conditions for ${data.name}</strong></p>
<p><strong>Temperature:</strong> ${Math.round(kelvinToFahrenheit(data.main.temp))}F<br/>
<p><strong>Humidity:</strong> ${data.main.humidity}%<br/>
<p><strong>Wind Speed:</strong> ${Math.round(msToMPH(data.wind.speed))} MPH<br/>
<p>${conditions}</p>`;
return(out);
}
