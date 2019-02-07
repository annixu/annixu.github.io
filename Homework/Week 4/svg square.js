var popRanking1 = [
	{name: 'New York', population: 3437202},
	{name: 'Chicago', population: 1698575},
	{name: 'Philadelphia', population: 1293697},

];

var popRanking2 = [
	{name: 'New York', population: 8336697},
	{name: 'LA', population: 3857799},
	{name: 'Chicago', population: 2714856},
	{name: 'Houston', population: 2160821}
];


//button for 1900
d3.select('#year-1900').on('click', function(){
	d3.event.preventDefault();
	drawSquare(popRanking1);
});

//button for 2000
d3.select('#year-2000').on('click', function(){
	drawSquare(popRanking2);
});

function drawSquare(data){

	var cityNodesUpdate = plot1.selectAll('.square')
		.data(data, function(d){ return d.name }); 

//Enter
	var citySquareEnter = citySquareUpdate.enter()
		.append('g')
		.attr('class','square');

	cityNodesEnter
		.append('square');

	cityNodesEnter
		.append('text');

//Exit
	var citySquareExit = citySquareUpdate.exit()
		.remove();
}