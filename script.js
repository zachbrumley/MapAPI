var bingKey = "AhIiBnir2ooVR3-ozNIk7kd-NCiAKE0M7mBByPngxrELAl4e2kfZx200kR0JdWRK"
var lat;
var lon;

function GetMap() {
    map = new Microsoft.Maps.Map(document.getElementById('myMap'), {});     
 }
 
 function GeoLocate() {
 //get users current location
    if (navigator.geolocation) {
       navigator.geolocation.getCurrentPosition(GetUserLocation);
    }
 }
 
 function GetUserLocation(position) {
     lat = position.coords.latitude;
     lon = position.coords.longitude;   
 
     UpdateUserLocation();
 }
 
 function UpdateUserLocation() {
     map.setView({
         
         mapTypeID: Microsoft.Maps.MapTypeId.aerial,
         
         center: new Microsoft.Maps.Location(lat, lon),
         
         zoom: 16,   
     });

     var center = map.getCenter();

         pin = new Microsoft.Maps.Pushpin(center, {
         title: 'You are here',
         color: 'green',
         enableHoverStyle: true
     });
 
     map.entities.push(pin);
}

    function SearchByType(poiSearchValue){
        var select = document.getElementById("PointsOfInterest").value;
        //var value = select.options[select.selectedIndex.value];

        fetch("https://dev.virtualearth.net/REST/v1/LocalSearch/?query=" + {select} + "&userLocation=" + lat + "," + lon +"&key=AhIiBnir2ooVR3-ozNIk7kd-NCiAKE0M7mBByPngxrELAl4e2kfZx200kR0JdWRK")
        .then(response => response.json())
        .then(data => console.log(data)); 







    }