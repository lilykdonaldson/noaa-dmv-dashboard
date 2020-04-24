function updateDataSelection(){
	var stationIn = document.getElementById("station").value;
	var monthIn = document.getElementById("month").value;
	var yearIn = document.getElementById("year").value;
	updateGraphs(monthIn,yearIn,stationIn);
}

