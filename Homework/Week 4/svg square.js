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

var rect = d3.scaleRect().domain([0, 1000000]).range([0,50]);

var margin = {t:50, r:200, b:50, l:200};
var W = d3.select('.chart').node().clientWidth;
var H = d3.select('.chart').node().clientHeight;
var w = W - margin.l - margin.r;
var h = H - margin.t - margin.b;

var plot1 = d3.select("#chart-1")
	.append('svg')
	.attr('width', W)
	.attr('height', H)
	.append('g')
	.attr('transform', `translate(${margin.l}, ${margin.t})`);


d3.select('#year-1900').on('click', function(){
	d3.event.preventDefault();
	drawNodes(popRanking1);
});

d3.select('#year-2000').on('click', function(){
	drawNodes(popRanking2);
});

function drawNodes(data){


	var cityNodesUpdate = plot1.selectAll('.node')
		.data(data, function(d){ return d.name }); 


	var cityNodesEnter = cityNodesUpdate.enter()
		.append('g')
		.attr('class','node');

	cityNodesEnter
		.append('circle');

	cityNodesEnter
		.append('text');


	cityNodesUpdate.merge(cityNodesEnter)
		.transition()
		.duration(2000)
		.attr('transform', function(d, index){
			return `translate(${w/3*index}, ${h/2})`
		});

	cityNodesUpdate.merge(cityNodesEnter)
		.select('circle')
		.transition()
		.duration(2000)
		.attr('r', function(d){return scaleRadius(d.population)});


	var cityNodesExit = cityNodesUpdate.exit()
		.remove();
}