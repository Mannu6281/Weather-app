const api_key="6ea30f840deb45f77a49770077e19a07"
const cityinput=document.querySelector(".cityinput");
const card=document.querySelector(".card");
const weatherform=document.querySelector(".weatherform")

weatherform.addEventListener("submit", async function(event){
       event.preventDefault();
       const city=cityinput.value;
       if(city){
                try{
                        const weatherdata=await getweatherdata(city);
                        displayweatherdata(weatherdata);
                }
                catch(error){
                    console.error(error)
                    displayerror(error);
                }
       }
       else{
        displayerror("Please enter a city")
       }
})
function displayerror(error){
    const errortext=document.createElement("div");
    errortext.textContent=error;
    errortext.classList.add("error");
    card.textContent=""
    card.appendChild(errortext);
}
async function getweatherdata(city){
    const apiurl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`
     const response =await fetch(apiurl);
     if(!response.ok)
     {
        throw new Error("Could not fetch weather data");
     }
     else{
        return response.json();
     }
}
function displayweatherdata(weatherdata){
    const {
        name: city,
        main:{temp,humidity},
        weather:[{description,id}]
    }=weatherdata;
    card.textContent=""
    const citydisplay=document.createElement("h1");
    const tempdisplay=document.createElement("div");
    const humiditydisplay=document.createElement("div");
    const descripdisplay=document.createElement("div");
    const emojidisplay=document.createElement("div");
    citydisplay.textContent=city;
    tempdisplay.textContent=(temp-273.15).toFixed(2)+"°C";
    humiditydisplay.textContent="Humidity: "+humidity+"%"
    descripdisplay.textContent=description
    emojidisplay.textContent=getweatheremoji(id);
citydisplay.classList.add("city")
tempdisplay.classList.add("temp")
humiditydisplay.classList.add("humidity")
descripdisplay.classList.add("descrip")
emojidisplay.classList.add("emoji")

card.appendChild(citydisplay)
card.appendChild(tempdisplay)
card.appendChild(humiditydisplay)
card.appendChild(descripdisplay)
card.appendChild(emojidisplay)
}
function getweatheremoji(id){
    switch(true){
        case id>=200 && id<300:
            return "⛈️"
        case id>=300 && id<400:
            return "🌧️"
        case id>=500 && id<600:
            return "🌧️"
        case id>=600 && id<700:
            return "❄️"
        case id>=700 && id<800:
            return "🌫️"
        case id===800:
            return "☀️"
        case id>=801 && id<900:
            return "🌥️"
        default:
            return "❓"
    }
}