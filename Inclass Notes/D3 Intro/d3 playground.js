console.log("hello!")

//var jstitle = document.getElementById("title")

var title = d3.select("#title")

title
        .attr("class", "big")
        .style("color","red")
        .style("font-family","comic sans MS");


    var svg = d3.select("svg");
    var circles = d3.selectAll(".dot");

function changeColor(color) {
    circles.attr("fill", color);
}

function dance(){
    circles.attr("cx", function() {
        return Math.random() * 200;
    });
}

function radius() {
    circles.data([12,33,17]);
    circles.attr("r", function(d) {
        return d;
    });
}


var starterData=[
        {name:"Dvae", height:72},
        {name:"matthew", height:67},
        {name:"diana", height:50},
        {name:"thor", height:86}
];

function reDrawCircles() {

    
    var newCircles = svg.selectAll(".dot")
        .data(starterData);

    //entering 
    newCircles.enter().append("circle")
        .attr("class","dot")
        .attr("cx", function() {
            return Math.random() *200;
        })
        .attr("cy", 50)
        .attr("r", 20);


    
    newCircles.exit().remove(); 

   
    // existing     
    newCircles.attr("r", function(d) {
        return d.height /2
    }) 

}
