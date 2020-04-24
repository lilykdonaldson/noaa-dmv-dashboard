var weatherData = {}; //data from both stations from request to NOAA API
var stationName1, stationName2;
var stationNameToId = {}; //map name to GHCND ID
var APIkey = 'JsDVdrTYMcumWUloSrfsYLQFneUVwnie'; // for NOAA API, read from external file


var periodMode, startdate, enddate;

function callNOAA(month,year,stationID) {
  if(month=="ALL MONTHS"){
  	periodMode = "year";
  	startDate = year+"-01-01";
  	endDate = year+"-12-31";
  }
  else{
  	periodMode = "month";
  	var monthCode = monthToMonth(month);
  	startDate = year+"-"+monthCode+"-01";
  	if(monthCode == '01' || monthCode == '03' || monthCode == '05' || monthCode == '07' || monthCode == '08'|| monthCode == '10' || monthCode == '12'){
  		endDate = year+"-"+monthCode+"-31";
  	}
  	else if(monthCode=='02'){
  		var numYr = parseInt(year);
  		if(numYr%4==0 && !(numYr%100==0)){
  			endDate = year+"-"+monthCode+"-29";
  		}
  		else if(numYr%100==0 && numYr%400==0){
  			endDate = year+"-"+monthCode+"-30";
  		}
  		else{
  			endDate = year+"-"+monthCode+"-28";
  		}
  	}
  	else{
  		endDate = year+"-"+monthCode+"-30";
  	}
  	
  }
//stationID = 'US1MDBC0003';
console.log(stationID);
var url = 'https://www.ncdc.noaa.gov/cdo-web/api/v2/data?datasetid=GHCND&datatypeid=TAVG&limit=1000&stationid=GHCND:'+stationID+'&startdate='+startDate+'&enddate='+endDate;
var responseData = makeHttpRequest(url, APIkey);
console.log(responseData);
  if (Object.keys(responseData).length == 0) {
    alert('No NOAA data for ' + 'this' + ' station for those dates');
    document.getElementById("no-selection-avg-temp").innerHTML = "<i>Select a station, month, and year to view graph.</i>";
  }
  return responseData;
}

function makeHttpRequest(url, APIkey) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) { // readyState == DONE and status == OK
      //document.getElementById("debug").innerHTML = xhttp.responseText; //for debugging
      responseData = JSON.parse(xhttp.responseText);
    }
  };
  xhttp.open("GET", url, false);
  xhttp.setRequestHeader("token", APIkey.trim());
  xhttp.send();
  return responseData;
}

function range(start, end) {
    if(start === end) return [start];
    return [start, ...range(start + 1, end)];
}

function monthToMonth(month){
	switch(month) {
	    case 'January':
	        return('01');
	    case 'February':
	        return('02');
	    case 'March':
	        return('03');
	    case 'April':
	        return('04');
	    case 'May':
	        return('05');
	    case 'June':
	        return('06');
	    case 'July':
	        return('07');
	    case 'August':
	        return('08');
	    case 'September':
	        return('09');
	    case 'October':
	        return('10');
	    case 'November':
	        return('11');
	    case 'December':
	        return('12');

	}
}


