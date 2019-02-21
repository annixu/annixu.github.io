console.log("Welcome to my Data Land")

d3.text("/Data/textData.txt", function(error,data) {
    console.log("error:", error);
    console.log("text:", data);
});

d3.csv("Data/csvData.csv", function(error,data) {
    console.log("csv:",data);
    data.forEach(function(d) {
        d.export=parseFloat(d.export);
        d.country=parseFloat(d.country)
    });
    console.log("csv:", data)
});

d3.json("Data/jsData.json", function(error,data) {
    console.log("error:", error);
    console.log("jason", data);
});

console.log("END OF LINE")