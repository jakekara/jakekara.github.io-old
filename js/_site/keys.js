d3.select("body")
    .on("keydown", function(a, b, c) {
	console.log("key pressed", this, a, b, c);
    });
