var bingKey = "AhIiBnir2ooVR3-ozNIk7kd-NCiAKE0M7mBByPngxrELAl4e2kfZx200kR0JdWRK"
var lat;
var lon;
var map;
var pushpins = [];

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
        var requestUrl = "https://dev.virtualearth.net/REST/v1/LocalSearch/?query=" + select + "&userLocation=" + lat + "," + lon +"&key=AhIiBnir2ooVR3-ozNIk7kd-NCiAKE0M7mBByPngxrELAl4e2kfZx200kR0JdWRK"
        //var value = select.options[select.selectedIndex.value];

        
        fetch(requestUrl)
        .then((response) => {
            return response.text();
        })
        .then(function (data) {
            //parse data into object
            jsonData = JSON.parse(data);
            
            //call function
            GetPoiData(jsonData);
        });//end fetch
    }//end function

    function GetPoiData() {//dustin

        clearPushPins();
        //declare variables for POI
        let poiName = [];
        let poiAddress = [];
        let poiPhoneNumber = [];
        let pointsOfInterest = [];
        let poiGeocodePoints = [];
        let poiCoordinates = [];
        let resourceSet = [];
        let coords = [];
        let poiLat = [];
        let poiLon = [];
        let pin = [];
        
        //grab the resourceSet, grab resources from resourceset
        resourceSet = jsonData.resourceSets[0].resources;
    
        //for loop to run through the resourceSet (from our json object)
        for (let i = 0; i < resourceSet.length; i++) {
    
            poiName = resourceSet[i].name;
            poiAddress = resourceSet[i].Address.formattedAddress;    
            poiPhoneNumber = resourceSet[i].PhoneNumber;
            poiGeocodePoints = resourceSet[i].geocodePoints[0];   
            poiCoordinates = poiGeocodePoints.coordinates;
    
            poiLat = poiCoordinates[0];
            poiLon = poiCoordinates[1];
            coords[i] = [poiLat, poiLon];
    
            pointsOfInterest[i] = poiName + ' ' + poiAddress + ' ' + poiPhoneNumber + '\n';
    
            //change the map view
            map.setView({
                mapTypeID: Microsoft.Maps.MapTypeId.aerial,
                center: new Microsoft.Maps.Location(poiLat, poiLon),
                zoom: 13,
            });
            //center the map
            let center = map.getCenter(lat, lon);
    
            //Create Entities Pushpins
            pushpins[i] = new Microsoft.Maps.Pushpin(center, {
                title: poiName,
                color: 'blue'
            });
    
            //Add the pushpins to the map
            map.entities.push(pushpins[i]);
    
        }//end for 
    
        //display POI results into text area
        for (let i = 0; i < pointsOfInterest.length; i++) { 
            displayData = document.getElementById("PoiList").innerHTML = pointsOfInterest;
        }//end for
    
    }//end function

    function clearPushPins(){
            //remove previous pushpins
        for (var i = 0; i < pushpins.length; i++) {
            map.entities.remove(pushpins[i]);
        }
    }