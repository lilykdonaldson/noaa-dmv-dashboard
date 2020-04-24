var dates = [];
var tavg = [];
var tavgT1 = [];
var tavgT2 = [];
var tavgT3 = [];
var T1bool = false;
var jan = [];
var feb = [];
var mar = [];
var apr = [];
var may = [];
var jun = [];
var jul = [];
var aug = [];
var sep = [];
var oct = [];
var nov = [];
var dec = [];

const arrAvg = arr => (arr.reduce((a,b) => a + b, 0) / arr.length).toFixed(2);

var ctx;
var linegraphT;

function updateGraphs(month,year,stationID){
    tavg = [];
    dates = [];
    ctx = document.getElementById('tempgraph').getContext('2d');
    clearMonths();
    /*-----------------------------------------------------------------*/
    callMe(month,year,stationID);
    /*-----------------------------------------------------------------*/
    chartMe();
}

function sortingHat(dateS, temperatureC){
    var temperature = (temperatureC/10)* 9 / 5 + 32;
    switch(dateS[5]+dateS[6]) {
        case '01':
            jan.push(temperature);
            break;
        case '02':
            feb.push(temperature);
            break;
        case '03':
            mar.push(temperature);
            break;
        case '04':
            apr.push(temperature);
            break;
        case '05':
            may.push(temperature);
            break;
        case '06':
            jun.push(temperature);
            break;
        case '07':
            jul.push(temperature);
            break;
        case '08':
            aug.push(temperature);
            break;
        case '09':
            sep.push(temperature);
            break;
        case '10':
            oct.push(temperature);
            break;
        case '11':
            nov.push(temperature);
            break;
        case '12':
            dec.push(temperature);
            break;

    }
}
function callMe(month,year,stationID){
    jsonData = callNOAA(month,year,stationID);
    for (item in jsonData['results']){
        if(periodMode=="month"){
            var tempF = ((jsonData['results'][item].value)/10)* 9 / 5 + 32;
            tavg.push(tempF);
            dates.push((jsonData['results'][item].date).slice(0, 10));
        }
        else{
            sortingHat(jsonData['results'][item].date,jsonData['results'][item].value);
        }
    }
    if(periodMode=='year'){
        tavg.push(arrAvg(jan));
        tavg.push(arrAvg(feb));
        tavg.push(arrAvg(mar));
        tavg.push(arrAvg(apr));
        tavg.push(arrAvg(may));
        tavg.push(arrAvg(jun));
        tavg.push(arrAvg(jul));
        tavg.push(arrAvg(aug));
        tavg.push(arrAvg(sep));
        tavg.push(arrAvg(oct));
        tavg.push(arrAvg(nov));
        tavg.push(arrAvg(dec));
        dates = ['JAN','FEB','MARCH','APRIL','MAY','JUNE','JULY','AUG','SEP','OCT','NOV','DEC'];

    }
}
function clearMonths(){
    jan = [];
    feb = [];
    mar = [];
    apr = [];
    may = [];
    jun = [];
    jul = [];
    aug = [];
    sep = [];
    oct = [];
    nov = [];
    dec = [];
}
function chartMe(){
  if(periodMode=="month"){
    var labell = month;
  }
  else{
    var labell = year;
  }
  linegraphT = new Chart(ctx, {
    type: 'line',
    data: {
      labels: dates,
      datasets: [{ 
          data: tavg,
          label: labell,
          borderColor: "#009a9a",
          fill: false,
        }, 
      ]
    },
    options: {
      title: {
        display: false,
        text: 'Average Temperature over Time'
      },
      scales: {
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Degrees Fahrenheit'
          }
        }]
      } 
    }
  });
}