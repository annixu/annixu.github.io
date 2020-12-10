d3.csv("./data/2018-boston-crimes-grouped.csv").then(function(data) {

    /* TASK 1

    Modify the d3.csv() above to load YOUR data set

    */

    /*
    BOSTON CRIME DATA from the BOSTON POLICE DEPARTMENT, 2018
    Adapted from:
    https://www.kaggle.com/ankkur13/boston-crime-data/

    These data have been grouped before loading with D3;
    look at the data set first, and you'll see this data structure
    is very similar to your data structure.

    */
    console.log(data);

    /*
    BEGIN BY DEFINING THE DIMENSIONS OF THE SVG and CREATING THE SVG CANVAS
    */
    const width = document.querySelector("#chart").clientWidth;
    const height = document.querySelector("#chart").clientHeight;
    const svg = d3.select("#chart")
        .append("svg")
        .attr("width", width)
        .attr("height", height);


    /*
    TRANSFORM THE DATA
    We want to create a treemap that is color-coded by OFFENSE_CODE_GROUP; each rectangle
    inside each color group represents the proportion of crimes committed in that
    crime category for every DAY_OF_WEEK value.

    We need to get the data into a structure that the treemap will understand.
    Specifically, we need to get it into a hierarchical data structure, that
    shows parent-child relationships in the data.

    In D3 v6, the d3.group() method takes a data set and turns it into a
    JavaScript 'Map', which is an iterable data structure in JavaScript.
    (NOT THE SAME AS A GEOGRAPHIC MAP.)

    We use d3.group() as follows:

    d3.group(DATASET, KEYS)

    In the example below, we are passing the data set in `data` into d3.group()
    as the first argument; after that, we are passing in 2 accessor functions
    that indicate what column names (properties) should be used as the KEYS for
    the grouped data structure.

    Here, we want to group the data first by OFFENSE_CODE_GROUP, and then second
    by DAY_OF_WEEK. Notice that these are indicated by TWO accessor functions.

    */

    const grouped = d3.group(data, function(d) { return d.OFFENSE_CODE_GROUP; }, function(d) { return d.DAY_OF_WEEK; });

    /* Examine the data structure of `grouped`: What do you observe about the structure? */
    console.log(grouped);

    /* TASK 2

    Modify the d3.group() above to turn your data set into a grouped structure,
    based on the columns in your data set

    */



    /*
    CREATE THE TREEMAP LAYOUT GENERATOR

    d3.treemap() creates a new layout generator for a treemap.
    We don't need to modify anything here.

    */
    
    const treemap = d3.treemap()
        .size([width, height])
        .padding(1);
    
    /*
    CREATE THE HIERARCHY

    The grouped data set above, `grouped` is still not quite in the right data structure.
    Specifically, it doesn't directly encode parent-child relationships in the data.

    We can convert the grouped data structure into a hierarchical data structure using
    d3.hierarchy().

    Here, we are passing in the `grouped` data structure; remember that this `grouped`
    is called a JavaScript 'Map' (iterable), and if we pass in a JS iterable into d3.hierarchy(),
    then d3.hierarchy() already knows what to do with it to construct the parent-child relationships.

    The .sum() part of the code below is used to tell D3 what property/column name to use
    to compute the SIZES of the rectangles in the treemap -- here, it will be based on
    the column named `count`.


    */  

    const hierarchy = d3.hierarchy(grouped)
        .sum(function(d) { return +d.count; });

    /* Look at the data structure! What do you see? */
    console.log(hierarchy);

    /* TASK 3

    Modify the .sum() part of the d3.hierarchy() call above to sum/aggregate
    the values in your data set based on the appropriate column name
    in your data set

    */





    /* 
    GENERATE THE ROOT HIERARCHY
    By passing in our hierarchical data structure into our treemap() function,
    we generate the geometries required to create the treemap in the SVG canvas.

    */

    const root = treemap(hierarchy);

    /* Look at the data structure! What do you see? */
    console.log(root);
    console.log(root.leaves());

    /*
    DRAW THE RECTANGLES FOR THE TREEMAP
    We will use our `root` structure, from above, to draw the rectangles for the treemap;
    we will do this by performing a data join with the array of nodes returned by root.leaves()
    (What does this return? Inspect the structure in the JS console)
    */

    const color = d3.scaleOrdinal(d3.schemeDark2);

    let rect = svg.selectAll("rect")
        .data(root.leaves())
        .enter()
        .append("rect")
            .attr("x", function (d) { return d.x0; })
            .attr("y", function (d) { return d.y0; })
            .attr("width", function (d) { return d.x1 - d.x0; })
            .attr("height", function (d) { return d.y1 - d.y0; })
            .attr("stroke", "#FFFFFF")
            .attr("fill", function(d) {
                /* The fill color of each rectangle is being based
                on the value of OFFENSE_CODE_GROUP associated with
                each rectangle.
                
                To see the structure of the data bound to each rect
                element, use: console.log(d)

                */

                return color(d.data.OFFENSE_CODE_GROUP);
            });



    /* TASK 4

    Modify the accessor function for the 'fill' attribute above to color
    the rectangles in the treemap based on a column name in your data set

    */



    /*
    ADD LABELS
    We can join the same root.leaves(), used to create the rectangles, to a new selection
    to generate text labels for the rectangles.
    */
    svg.selectAll("text")
        .data(root.leaves())
        .enter()
        .append("text")
            .attr("x", function(d){ return d.x0+10})    // +10 to adjust position (more right)
            .attr("y", function(d){ return d.y0+20})    // +20 to adjust position (lower)
            .attr("font-size", "15px")
            .attr("fill", "white")
            .text(function(d){ return d.data.OFFENSE_CODE_GROUP; });

    /* TASK 5

    Modify the accessor function for the 'text' method above to label
    each rectangle in the treemap with the value in a column named
    in your data set

    */
});
