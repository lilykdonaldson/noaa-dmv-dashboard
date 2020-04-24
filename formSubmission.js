var extrayear1,extrayear2,extrayear3;
var first = true;
var periodMode;
var month, station, year;
var tavgTx = [];
var mm1 = [];
var mm2 = [];
var mm3 = [];
function updateDataSelection(){
	d3.selectAll("svg > *").remove();
	maybe();
	station = document.getElementById("station").value;
	month = document.getElementById("month").value;
	year = document.getElementById("year").value;
	if(month=="ALL MONTHS"){periodMode = "year";}
	else{periodMode = "month";}

	if(periodMode=="year"){
	document.getElementById("no-selection-avg-temp").innerHTML = '<canvas id="tempgraph"></canvas><br><i>Add more year(s) to the graph for the current station selection:</i><br><select id="extra-year1-selection"><optgroup style="max-height: 20px;" label=""><option></option><option value="2020">2020</option><option value="2019">2019</option><option value="2018">2018</option><option value="2017">2017</option><option value="2016">2016</option><option value="2015">2015</option><option value="2014">2014</option><option value="2013">2013</option><option value="2012">2012</option><option value="2011">2011</option><option value="2010">2010</option><option value="2009">2009</option><option value="2008">2008</option><option value="2007">2007</option><option value="2006">2006</option><option value="2005">2005</option><option value="2004">2004</option><option value="2003">2003</option><option value="2002">2002</option><option value="2001">2001</option><option value="2000">2000</option><option value="1999">1999</option></optgroup></select><select id="extra-year2-selection"><optgroup style="max-height: 20px;" label=""><option></option><option value="2020">2020</option><option value="2019">2019</option><option value="2018">2018</option><option value="2017">2017</option><option value="2016">2016</option><option value="2015">2015</option><option value="2014">2014</option><option value="2013">2013</option><option value="2012">2012</option><option value="2011">2011</option><option value="2010">2010</option><option value="2009">2009</option><option value="2008">2008</option><option value="2007">2007</option><option value="2006">2006</option><option value="2005">2005</option><option value="2004">2004</option><option value="2003">2003</option><option value="2002">2002</option><option value="2001">2001</option><option value="2000">2000</option><option value="1999">1999</option></optgroup></select><select id="extra-year3-selection"><optgroup style="max-height: 20px;" label=""><option></option><option value="2020">2020</option><option value="2019">2019</option><option value="2018">2018</option><option value="2017">2017</option><option value="2016">2016</option><option value="2015">2015</option><option value="2014">2014</option><option value="2013">2013</option><option value="2012">2012</option><option value="2011">2011</option><option value="2010">2010</option><option value="2009">2009</option><option value="2008">2008</option><option value="2007">2007</option><option value="2006">2006</option><option value="2005">2005</option><option value="2004">2004</option><option value="2003">2003</option><option value="2002">2002</option><option value="2001">2001</option><option value="2000">2000</option><option value="1999">1999</option></optgroup></select>';
		first = false;
	document.getElementById("extra-year1-selection").onchange = year1checked;
	document.getElementById("extra-year2-selection").onchange = year2checked;
	document.getElementById("extra-year3-selection").onchange = year3checked;
}
else {
	document.getElementById("no-selection-avg-temp").innerHTML ='<canvas id="tempgraph"></canvas><br><i>Add more month(s) to the graph for the current station selection:</i><br><select id="extra-year1-selection"><optgroup style="max-height: 20px;" label=""><option></option><option value="January">January</option><option value="February">February</option><option value="March">March</option><option value="April">April</option><option value="June">June</option><option value="July">July</option><option value="August">August</option><option value="September">September</option><option value="October">October</option><option value="November">November</option><option value="December">December</option></optgroup></select><select id="extra-year2-selection"><optgroup style="max-height: 20px;" label=""><option></option><option value="January">January</option><option value="February">February</option><option value="March">March</option><option value="April">April</option><option value="June">June</option><option value="July">July</option><option value="August">August</option><option value="September">September</option><option value="October">October</option><option value="November">November</option><option value="December">December</option></optgroup></select><select id="extra-year3-selection"><optgroup style="max-height: 20px;" label=""><option></option><option value="January">January</option><option value="February">February</option><option value="March">March</option><option value="April">April</option><option value="June">June</option><option value="July">July</option><option value="August">August</option><option value="September">September</option><option value="October">October</option><option value="November">November</option><option value="December">December</option></optgroup></select><br><i>Add another year for the selected month to compare:</i><br><select id="monthmatch1"><optgroup style="max-height: 20px;" label=""><option></option><option value="2020">2020</option><option value="2019">2019</option><option value="2018">2018</option><option value="2017">2017</option><option value="2016">2016</option><option value="2015">2015</option><option value="2014">2014</option><option value="2013">2013</option><option value="2012">2012</option><option value="2011">2011</option><option value="2010">2010</option><option value="2009">2009</option><option value="2008">2008</option><option value="2007">2007</option><option value="2006">2006</option><option value="2005">2005</option><option value="2004">2004</option><option value="2003">2003</option><option value="2002">2002</option><option value="2001">2001</option><option value="2000">2000</option><option value="1999">1999</option></optgroup></select><select id="monthmatch2"><optgroup style="max-height: 20px;" label=""><option></option><option value="2020">2020</option><option value="2019">2019</option><option value="2018">2018</option><option value="2017">2017</option><option value="2016">2016</option><option value="2015">2015</option><option value="2014">2014</option><option value="2013">2013</option><option value="2012">2012</option><option value="2011">2011</option><option value="2010">2010</option><option value="2009">2009</option><option value="2008">2008</option><option value="2007">2007</option><option value="2006">2006</option><option value="2005">2005</option><option value="2004">2004</option><option value="2003">2003</option><option value="2002">2002</option><option value="2001">2001</option><option value="2000">2000</option><option value="1999">1999</option></optgroup></select><select id="monthmatch3"><optgroup style="max-height: 20px;" label=""><option></option><option value="2020">2020</option><option value="2019">2019</option><option value="2018">2018</option><option value="2017">2017</option><option value="2016">2016</option><option value="2015">2015</option><option value="2014">2014</option><option value="2013">2013</option><option value="2012">2012</option><option value="2011">2011</option><option value="2010">2010</option><option value="2009">2009</option><option value="2008">2008</option><option value="2007">2007</option><option value="2006">2006</option><option value="2005">2005</option><option value="2004">2004</option><option value="2003">2003</option><option value="2002">2002</option><option value="2001">2001</option><option value="2000">2000</option><option value="1999">1999</option></optgroup></select>'
		first = false;
		document.getElementById("extra-year1-selection").onchange = month1checked;
		document.getElementById("extra-year2-selection").onchange = month2checked;
		document.getElementById("extra-year3-selection").onchange = month3checked;
		document.getElementById("monthmatch1").onchange = monthmatch1;
		document.getElementById("monthmatch2").onchange = monthmatch2;
		document.getElementById("monthmatch3").onchange = monthmatch3;
}

	updateGraphs(month,year,station);
}

function year1checked(){
	clearMonths();
	tavgTx = [];
	var year = document.getElementById("extra-year1-selection").value;
	if(year!=""){
		jsonData = callNOAA(month,year,station);
		for (item in jsonData['results']){
		        sortingHat(jsonData['results'][item].date,jsonData['results'][item].value);
		    }
		tavgTx.push(arrAvg(jan));
		tavgTx.push(arrAvg(feb));
		tavgTx.push(arrAvg(mar));
		tavgTx.push(arrAvg(apr));
		tavgTx.push(arrAvg(may));
		tavgTx.push(arrAvg(jun));
		tavgTx.push(arrAvg(jul));
		tavgTx.push(arrAvg(aug));
		tavgTx.push(arrAvg(sep));
		tavgTx.push(arrAvg(oct));
		tavgTx.push(arrAvg(nov));
		tavgTx.push(arrAvg(dec));
		}
		addData(linegraphT);

}
function year2checked(){
	clearMonths();
	tavgT2 = [];
	var year = document.getElementById("extra-year2-selection").value;
	if(year!=""){
		jsonData = callNOAA(month,year,station);
		for (item in jsonData['results']){
		        sortingHat(jsonData['results'][item].date,jsonData['results'][item].value);
		    }
		tavgT2.push(arrAvg(jan));
		tavgT2.push(arrAvg(feb));
		tavgT2.push(arrAvg(mar));
		tavgT2.push(arrAvg(apr));
		tavgT2.push(arrAvg(may));
		tavgT2.push(arrAvg(jun));
		tavgT2.push(arrAvg(jul));
		tavgT2.push(arrAvg(aug));
		tavgT2.push(arrAvg(sep));
		tavgT2.push(arrAvg(oct));
		tavgT2.push(arrAvg(nov));
		tavgT2.push(arrAvg(dec));
		}
		addData(linegraphT);

}
function year3checked(){
	clearMonths();
	tavgT3 = [];
	var year = document.getElementById("extra-year3-selection").value;
	if(year!=""){
		jsonData = callNOAA(month,year,station);
		for (item in jsonData['results']){
		        sortingHat(jsonData['results'][item].date,jsonData['results'][item].value);
		    }
		tavgT3.push(arrAvg(jan));
		tavgT3.push(arrAvg(feb));
		tavgT3.push(arrAvg(mar));
		tavgT3.push(arrAvg(apr));
		tavgT3.push(arrAvg(may));
		tavgT3.push(arrAvg(jun));
		tavgT3.push(arrAvg(jul));
		tavgT3.push(arrAvg(aug));
		tavgT3.push(arrAvg(sep));
		tavgT3.push(arrAvg(oct));
		tavgT3.push(arrAvg(nov));
		tavgT3.push(arrAvg(dec));
		}
		addData(linegraphT);

}
function month1checked(){
	tavgTx = [];
	var month = document.getElementById("extra-year1-selection").value;
	if(month!=""){
		var JSONdata = callNOAA(month,year,station);
		for (item in JSONdata['results']){
	        var tempF = ((JSONdata['results'][item].value)/10)* 9 / 5 + 32;
	        tavgTx.push(tempF);
		}
	}
	addData(linegraphT);
}
function month2checked(){
	tavgT2 = [];
	var month = document.getElementById("extra-year2-selection").value;
	if(month!=""){
		var JSONdata = callNOAA(month,year,station);
		for (item in JSONdata['results']){
	        var tempF = ((JSONdata['results'][item].value)/10)* 9 / 5 + 32;
	        tavgT2.push(tempF);
		}
	}
	addData(linegraphT);
}
function month3checked(){
	tavgT3 = [];
	var month = document.getElementById("extra-year3-selection").value;
	if(month!=""){
		var JSONdata = callNOAA(month,year,station);
		for (item in JSONdata['results']){
	        var tempF = ((JSONdata['results'][item].value)/10)* 9 / 5 + 32;
	        tavgT3.push(tempF);
		}
	}
	addData(linegraphT);
}

function monthmatch1(){
	mm1 = [];
	var JSONdata = callNOAA(month,document.getElementById("monthmatch1").value,station);
		for (item in JSONdata['results']){
		    var tempF = ((JSONdata['results'][item].value)/10)* 9 / 5 + 32;
		    mm1.push(tempF);
		}
		addData(linegraphT);
}
function monthmatch2(){
	mm2 = [];
	var JSONdata = callNOAA(month,document.getElementById("monthmatch2").value,station);
		for (item in JSONdata['results']){
		    var tempF = ((JSONdata['results'][item].value)/10)* 9 / 5 + 32;
		    mm2.push(tempF);
		}
		addData(linegraphT);
}
function monthmatch3(){
	mm3 = [];
	var JSONdata = callNOAA(month,document.getElementById("monthmatch3").value,station);
		for (item in JSONdata['results']){
		    var tempF = ((JSONdata['results'][item].value)/10)* 9 / 5 + 32;
		    mm3.push(tempF);
		}
		addData(linegraphT);	
}

function addData(chart) {
	chart.destroy();
	chartMe();
	
    if(document.getElementById("extra-year1-selection").value!=""){
    	chart.data.datasets.push({
    	    label: document.getElementById("extra-year1-selection").value,
          	borderColor: "#00d500",
            fill: false,
          	data: tavgTx
        });
    }
    if(document.getElementById("extra-year2-selection").value!=""){
    	chart.data.datasets.push({
    	    label: document.getElementById("extra-year2-selection").value,
          	borderColor: "#004d9a",
            fill: false,
          	data: tavgT2
        });
    }
    if(document.getElementById("extra-year3-selection").value!=""){
    	chart.data.datasets.push({
    	    label: document.getElementById("extra-year2-selection").value,
          	borderColor: "#cdcd00",
            fill: false,
          	data: tavgT3
        });
    }
    if(periodMode=='month'){
	    if(document.getElementById("monthmatch1").value!=""){
	    	chart.data.datasets.push({
	    	    label: month+' '+document.getElementById("monthmatch1").value,
	          	borderColor: "#9a4d00",
	            fill: false,
	          	data: mm1
	        });
	    }
	    if(document.getElementById("monthmatch2").value!=""){
	    	chart.data.datasets.push({
	    	    label: month+' '+document.getElementById("monthmatch2").value,
	          	borderColor: "#e700e7",
	            fill: false,
	          	data: mm2
	        });
	    }
	    if(document.getElementById("monthmatch3").value!=""){
	    	chart.data.datasets.push({
	    	    label: month+' '+document.getElementById("monthmatch3").value,
	          	borderColor: "#e80000",
	            fill: false,
	          	data: mm3
	        });
	    }
	}
    chart.update();
}