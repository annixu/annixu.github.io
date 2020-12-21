d3.csv("./data&image/Clean_foodTranscript.csv").then(function (data) {

    const width = document.querySelector("#chart").clientWidth;
    const height = document.querySelector("#chart").clientHeight;
    const svg = d3.select("#chart")
        .append("svg")
        .attr("width", width)
        .attr("height", height);
    const g = svg.append("g").attr("transform", "translate(" + (width / 2 - 15) + "," + (height / 2 + 25) + ")");

    const grouped = d3.group(data, function (d) {
        return d.Category;
    });
    console.log(grouped);

    tree = d3.cluster().size([2 * Math.PI, height / 2 - 120])

    const hierarchy = d3.hierarchy(grouped)
        .sum(function (d) {
            return +d.Frequency;
        });

    console.log(hierarchy);

    const Categories = ["Food", "Health", "Lifestyle", "People", "Policy", "Culture"]

    const colors = d3.scaleOrdinal()
        .domain(["Food", "Health", "Lifestyle", "People", "Policy", "Culture"])
        .range(["#CA3B7E", "#F5B63F", "#63D0DF", "#556EF2", "#337887", "#9FDE7B"]);

    const root = tree(hierarchy);

    const rScale = d3.scaleSqrt()
        .domain([1, 127])
        .range([2, 35])

    g.append("g")
        .attr("fill", "none")
        .attr("stroke", "#555")
        .attr("stroke-opacity", 0.4)
        .attr("stroke-width", 1.5)
        .selectAll("path")
        .data(root.links())
        .join("path")
        .attr("d", d3.linkRadial()
            .angle(d => d.x)
            .radius(d => d.y))

    const circles =
        g.append("g")
        .selectAll("circle")
        .data(root.descendants())
        .join("circle")
        .attr("opacity", 0.6)
        .attr("transform", d => `
                rotate(${d.x * 180 / Math.PI - 90})
                translate(${d.y},0)`)
        .attr("fill", function (d) {
            return colors(d.data.Category);
        })
        .attr("r", function (d) {
            return rScale(d.data.Frequency)
        });

    g.append("g")
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
        .attr("stroke-linejoin", "round")
        .attr("stroke-width", 3)
        .selectAll("text")
        .data(root.descendants())
        .join("text")
        .attr("transform", d => `
        rotate(${d.x * 180 / Math.PI - 90}) 
        translate(${d.y},0) 
        rotate(${d.x >= Math.PI ? 180 : 0})
        `)
        .attr("dy", "0.31em")
        .attr("x", d => d.x < Math.PI === !d.children ? 6 : -6)
        .attr("text-anchor", d => d.x < Math.PI === !d.children ? "start" : "end")
        .text(function (d) {
            console.log(d.depth, d.data)

            if (d.depth == 2) {
                return d.data.Keyword;
            } else if (d.depth == 1) {
                return d.data[0];
            }
        })
        .clone(true).lower()
        .attr("stroke", "white");

    const tooltip = d3.select("#chart")
        .append("div")
        .attr("class", "tooltip");
    
    function updateImage(imageName) {
        imgUrl = "images/" + imageName;
        var tester=new Image();
        tester.onload=function() { // when .png ok
            document.getElementById("tooltip-image").src = imgUrl + '.png';
        };
        tester.onerror=function() { // when .png failed
            document.getElementById("tooltip-image").src = imgUrl + '.jpg';      
        };
        tester.src=imgUrl + '.png'; // execute the test
    }

   circles.on("mouseover", function (e, d) {
        d3.select(this).attr("stroke-width", 2)
            .attr("stroke", "blue")

        tooltip.html(`<b>Keyword: </b>${d.data.Keyword}
        <br> <br>
        </b> <div class = "context"> ${d.data.Context.replace(/<br>/g, "<span class = 'spacer'></span>")}
        <br><img id="tooltip-image" src="images/${d.data.Keyword}.png" alt="placeholder" width="100%">
        </div>`);
        // Checks if png or jpg image should exist.
        updateImage(d.data.Keyword);
    }).on("mouseout", function () {
        d3.select(this).attr("stroke-width", 0)
    })
});