const fetchData = (url) => {
return new Promise((res, rej) =>{
fetch(url).then((res)=>res.json()).then((data)=> res(data)).catch((e)=>rej(e));});};
let div_container = document.createElement("div");
div_container.setAttribute("class", "container");
document.body.append(div_container);

let div_row = document.createElement("div");
div_row.setAttribute("class", "row");

function getWeather(latlng)
{
    return "http://api.openweathermap.org/data/2.5/weather?lat="+latlng[0]+"&lon="+latlng[1]+"&appid=95f79a6bf2ed3c4f74ae65a29577fa89"
}
function addList(data)
{
    let div_card = document.createElement("div");
    div_card.setAttribute("class", "card")

    let countryName = document.createElement('div')
    countryName.setAttribute("class", "card-header bg-dark text-white")
    countryName.innerText=data[0].name;
    div_card.appendChild(countryName)

    let details = document.createElement('div')
    details.setAttribute("class", "card-body")
    let img = document.createElement("img")
    img.src = data[0].flag
    img.setAttribute("class", "main-image")
    let capital = document.createElement("ul")
    capital.innerText = "Capital : "+ data[0].capital
    let region = document.createElement("ul")
    region.innerText = "Region : "+ data[0].region
    let ccode = document.createElement("ul")
    ccode.innerText = "Country Code : "+ data[0].alpha3Code
    button = document.createElement('button')
    button.setAttribute("id","myBtn")
    button.setAttribute("class","btn btn-primary")
    button.textContent = "Click for Weather"
    latlng = data[0].latlng
    button.addEventListener("click",function(){
    document.location.href = getWeather(latlng)})
    details.append(img, capital, region, ccode,button)
    div_card.appendChild(details)
    return div_card;
}
fetchData("https://restcountries.eu/rest/v2/all").then((posts)=>{
console.log(posts);
const fetchpost=(index)=>{
fetchData("https://restcountries.eu/rest/v2/name/"+posts[index].name+"?fullText=true").then((post)=>{
console.log(post);
let column = document.createElement("div")
column.setAttribute("class", "col-lg-4 col-sm-12")
column.append(addList(post));
div_row.appendChild(column)
if(index%3==0)
{
    div_container.appendChild(div_row);
}
if(index < posts.length){fetchpost(index+1);}})
.catch((e)=>console.error(e));};
fetchpost(0);
});
