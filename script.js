var bingKey = "AhIiBnir2ooVR3-ozNIk7kd-NCiAKE0M7mBByPngxrELAl4e2kfZx200kR0JdWRK"
var lat;
var lon;

function GetMap() {
    map = new Microsoft.Maps.Map(document.getElementById('myMap'), {});     
 }
 
 function GeoLocate() {
 //get users current location
    if (navigator.geolocation) {
       navigator.geolocation.getCurrentPosition(GetUserLoc);
    }
 }
 
 function GetUserLoc(position) {
     //set the devices location to the lat and lon variable
     lat = position.coords.latitude;
     lon = position.coords.longitude;   
 
     UpdateMapUserLoc();
 }
 
 function UpdateMapUserLoc() {
   
     //on the map instance use the setView method to change the view of the map based on given settings
     map.setView({
         //specify the type of map style that should be displayed (aerial)
         mapTypeID: Microsoft.Maps.MapTypeId.aerial,
         //set center of the map to given location (devices current location)
         center: new Microsoft.Maps.Location(lat, lon),
         //controls how zoomed in the map will be
         zoom: 16,   
     });
 
     //returns the location of the center of the current map view (in the setView method)
     var center = map.getCenter();
 
     //access the pushpin class and pass in the center of the map view as arg (so pin is set to that location)
         pin = new Microsoft.Maps.Pushpin(center, {
         title: 'You are here',
         color: 'green',
         enableHoverStyle: true
     });
 
     //Add the pushpin to the map
     map.entities.push(pin);
 }//end function