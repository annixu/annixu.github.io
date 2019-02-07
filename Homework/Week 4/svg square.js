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
	drawNodes(popRanking1);
});

//button for 2000
d3.select('#year-2000').on('click', function(){
	drawNodes(popRanking2);
});

function drawNodes(data){

	var cityNodesUpdate = plot1.selectAll('.node')
		.data(data, function(d){ return d.name }); 

//Enter
	var cityNodesEnter = cityNodesUpdate.enter()
		.append('g')
		.attr('class','node');

	cityNodesEnter
		.append('circle');

	cityNodesEnter
		.append('text');

//Exit
	var cityNodesExit = cityNodesUpdate.exit()
		.remove();
}