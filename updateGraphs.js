var dates = [];
var tavg = [];
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


function updateGraphs(month,year,stationID){
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
    tavg = [];
    dates = [];
    document.getElementById("no-selection-avg-temp").innerHTML = '<canvas id="temp-graph"></canvas>';
    /*-----------------------------------------------------------------*/
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
    /*-----------------------------------------------------------------*/
    console.log(tavg);

    new Chart(document.getElementById("temp-graph"), {
      type: 'line',
      data: {
        labels: dates,
        datasets: [{ 
            data: tavg,
            label: "TAVG",
            borderColor: "#009a9a",
            fill: false,
        }
          // }, { 
          //   data: [282,350,411,502,635,809,947,1402,3700,5267],
          //   label: "Asia",
          //   borderColor: "#8e5ea2",
          //   fill: false
          // }, { 
          //   data: [168,170,178,190,203,276,408,547,675,734],
          //   label: "Europe",
          //   borderColor: "#3cba9f",
          //   fill: false
          // }, { 
          //   data: [40,20,10,16,24,38,74,167,508,784],
          //   label: "Latin America",
          //   borderColor: "#e8c3b9",
          //   fill: false
          // }, { 
          //   data: [6,3,2,2,7,26,82,172,312,433],
          //   label: "North America",
          //   borderColor: "#c45850",
          //   fill: false
          // }
        ]
      },
      options: {
        title: {
          display: false,
          text: 'Average Temperature over Time'
        }
      }
    });
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