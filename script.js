//Unslpash APi
const count=10;
const apiKey="-BJoFDUIAXQlmL9d_tnFvzaaUabTbFlGwK3DY7hrMOQ"
// search/photos?page=1&query=office
let searchField=getCook("searchfield");


let ready=false;
let imagesloaded=0;
let totalImages=0;
let photosArray=[];
const imageContainer=document.getElementById('image-container')
const loader= document.getElementById('loader');
const submit= document.getElementById('submit');




function imageloaded(){
    // console.log("imageload")
    imagesloaded++;
    // console.log(imagesloaded);
    if(imagesloaded==totalImages){
        ready=true;
        loader.hidden=true;

    }
}
//Get photos
function displayPhotos(){
    imagesloaded=0;
    totalImages=photosArray.results.length;
    console.log("hello");
    // numbers.forEach(myFunction)
    photosArray.results.forEach((photo)=>{
        // console.log("prints")
        const item = document.createElement('a');
        item.setAttribute('href',photo.links.html);
        item.setAttribute('target',"_blank");
        const img= document.createElement('img');
        img.setAttribute('src',photo.urls.regular);
        img.setAttribute("alt",photo.alt_description);
        img.setAttribute("title",photo.alt_description)


        img.addEventListener("load",imageloaded)
        item.appendChild(img);
        imageContainer.appendChild(item)
    });
}
async function getPhotos(){
    try{
        
        // console.log("here")
        const ApiUrl=`https://api.unsplash.com/search/photos/?client_id=${apiKey}&count=${count}&query=${searchField}`;
        const response = await fetch(ApiUrl)
        photosArray=await response.json();
        // console.log (photosArray);
        displayPhotos();
    }
    catch(err){
        // console.log("oops",err)
    }
}
document.getElementById('submit').addEventListener("click",()=>{
    // console.log("hello")
   
    searchField=document.getElementById('gsearch').value
    document.cookie = `searchfield=${searchField}`;
  
    // location.reload();
    getPhotos()
    location.reload();
    // console.log(document.getElementById('gsearch').value)
})
window.addEventListener("scroll",()=>{
    if(window.innerHeight+window.scrollY>=document.body.offsetHeight-1000 && ready){
        ready=false;
        getPhotos();

    }
})
function getCook(cookiename) 
{
// Get name followed by anything except a semicolon
var cookiestring=RegExp(cookiename+"=[^;]+").exec(document.cookie);
// Return everything after the equal sign, or an empty string if the cookie name not found
return decodeURIComponent(!!cookiestring ? cookiestring.toString().replace(/^[^=]+./,"") : "");
}

//Sample usage
var cookieValue = getCook('searchfield');
// console.log(cookieValue)
getPhotos()  