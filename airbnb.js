d3.csv("listings 2.csv").then(function(data) {
    console.log(data);

  data.forEach(function(d) {
    let amenities = d.amenities.replace("{", "").replace("}", "").replace(/\"/g, "").split(",");

  d.amenities = amenities.filter(function(a){
    return a.includes("translation missing")==false
    });       
  });

    const margin = {top: 150, right: 100, bottom: 100, left: 120};
      width = document.querySelector("#Beeswarm").clientWidth;
      height = 3000;

    const svg = d3.select("#Beeswarm")
          .append("svg")
          .attr("width",width)
          .attr("height",height);
          
    const xScale = d3.scalePoint()
      .domain(["Studio1b", "1b1b","1b2b","2b1b","2b2b","3b1b"])
      .range([180, width - margin.right])

    const xAxis = svg.append("g")
      .attr("transform", `translate(0, 80)`)
      .attr("class", "x-Axis")
      .call(d3.axisTop().scale(xScale));

    const yScale = d3.scalePoint()
      .domain(["Allston", "Back Bay", "Bay Village", "Beacon Hill", "Brighton", "Charlestown", "Chinatown", "Dorchester", "Downtown", "East Boston", "Fenway","Hyde Park", "Jamaica Plain", "Longwood Medical", "Mattapan", "Mission Hill", "North End", "Roslindale", "Roxbury", "South Boston","South End", "West End", "West Roxbury" ])
      .range([margin.top, height - margin.bottom])

    const yAxis = svg.append("g")
    .attr("transform", `translate(${margin.left}, 0)`)
    .attr("class", "y-Axis")
    .call(d3.axisLeft().scale(yScale));

    const roomType = ["Apartment", "Private room", "Shared room"]

    const colors = d3.scaleOrdinal()
      .domain(roomType)
      .range(["#CA3B7E", "#F5B63F", "#5ECEC1"]);

    let circles = svg.selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
        .attr("r",1.5)
        .attr("class",function (d) { return })
        .attr("fill", function (d) { return colors(d.room_type); })
        .attr("cx", function(d) { return xScale(d["Bed&Bath"]); })
        .attr("cy", function(d) { return yScale(d.neighbourhood); })

    let simulation = d3.forceSimulation(data)
      .force("charge", d3.forceManyBody(-100).strength(0.2))
      .force("collide", d3.forceCollide(5))
      .force("x", d3.forceX(function(d) { return xScale(d["Bed&Bath"]); }))
      .force("y",d3.forceY(function(d) { return yScale(d.neighbourhood); })
      ) .alphaDecay(0.035)

    simulation.on("tick",function(){
      circles.attr("cx", function(d){ return d.x; })
        .attr("cy", function(d) {return d.y; });
    });

    d3.select("#total").on("click",function(){
      svg.attr("height", 700)
      simulation.force("y", d3.forceY(height/12))
      .force("x", d3.forceX(function(d) { return xScale(d["Bed&Bath"]); }).strength(1))
      simulation.alpha(0.5).restart();
      yAxis.attr("opacity", 0)
    });

    d3.select("#by-neighborhood").on("click",function(){
      svg.attr("height", height)
      simulation.force("y", d3.forceY(function(d) { return yScale(d.neighbourhood); }).strength(0.5))
      .force("x", d3.forceX(function(d) { return xScale(d["Bed&Bath"]); }).strength(0.5))
      simulation.alpha(0.5).restart();
      yAxis.attr("opacity", 1)
    }); 

    d3.selectAll(".type-option").on("click", function() {

      let amenity = d3.select(this).property("value");
      let selection = circles.filter(function(d) {
        return d.amenities.indexOf(amenity) >= 0;            
      });

      console.log(selection);

      let isChecked = d3.select(this).property("checked");

        if (isChecked == true) {
          selection.attr("opacity",1);
        } else {
          selection.attr("opacity",0);
        }

      });

      const tooltip = d3.select("#Beeswarm")
        .append("div")
        .attr("class", "tooltip");
    
      circles.on("mouseover", function(e, d) {

        let cx = +d3.select(this).attr("cx");
        let cy = +d3.select(this).attr("cy");

        tooltip.style("visibility", "visible")
          .style("left", `${cx}px`)
          .style("top", `${cy}px`)
          .html(`<b>Listing URL:</b> <a href="${d.url}" target="_blank">Click Here!</a> <br><b>Price</b> ${d.price}<br><b>Accommodates:</b> ${d.accommodates} <br><b>Amenities:</b> ${d.amenities.join(", ")} `)
          .on("click", function() {
              tooltip.style("visibility", "hidden");             
           });
            });
  });