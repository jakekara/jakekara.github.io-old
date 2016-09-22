var jk = jk || {};

jk.screen = function(){
    return {"height":window.innerHeight,
	    "width":window.innerWidth};
}

jk.setup = function(callback, suffix){
    d3.select(window).on("resize." + suffix,
			 callback);
}

jk.bonk = function (w, h){
    this.width = w;
    this.height = h;
    this.box_stroke = 3;
    this.lag = 250;
    this.draw();
    this.colors = {};
    var that = this;
    jk.setup(function(){
	that.draw();
    }, "bonk_" + w + "x"  + h);
}

jk.bonk.prototype.pixel = function(x, y){
    return this.svg.select("[data-col='" + x + "']"
			      + "[data-row='" + y + "']");
}

jk.bonk.prototype.off = function(x, y){
    this.color(x, y, "black");
}

jk.bonk.prototype.color = function(x, y, color){
    color = color || "green";
    var that = this;
    var lag = this.lag;

    if (this.colors.hasOwnProperty(x)
	&& this.colors[x].hasOwnProperty(y)
	&& this.colors[x][y] == "transition"){
	console.log("in transition");
	setTimeout(function(){
	    that.color(x, y, color)
	}, lag);
    }
    
    that.colors[x] = that.colors[x] || {};
    that.colors[x][y] = "transition";

    // setTimeout(function(){
	// console.log(x, y, that.colors[x][y]);
    that.pixel(x,y)
	.transition(lag)
	.style("fill", color);
    // that.colors[x] = that.colors[x] || {};
    setTimeout(function(){
	that.colors[x][y] = color;
	// console.log(x, y, that.colors[x][y]);
    }, lag);
    // }, lag);
}

jk.bonk.prototype.draw = function(){
    d3.select("body").html("");
    this.svg = d3.select("body")
	.append("svg")
	.attr("width", jk.screen().width)
	.attr("height", jk.screen().height)
	.classed("bonk", true);

    var box_width = jk.screen().width / this.width;
    var box_height = jk.screen().height / this.height;

    for (i = 0 ; i < this.width * this.height; i++){
	var col = i % this.width;
	var row = Math.floor(i / this.width);

	var that = this;

	d3.select("svg.bonk")
	    .append("rect")
	    .classed("bonk-line", true)
	    .attr("data-row", row)
	    .attr("data-col", col)
	    .attr("x", col * box_width)
	    .attr("y", row * box_height)
	    .attr("width", box_width)
	    .attr("height", box_height)
	    .on("mouseover", function(){
		// that.color(d3.select(this)
		// 	   .attr("data-col"),
		// 	   d3.select(this)
		// 	   .attr("data-row"));
		d3.select(this)
		    .transition()
		    .duration(250)
		    .style("fill", "green");
	    })
	    .on("mouseout", function(){
		// that.off(d3.select(this)
		// 	   .attr("data-col"),
		// 	   d3.select(this)
		// 	   .attr("data-row"));

		var that = this
		setTimeout(function(){
		    d3.select(that)
			.transition()
			.duration(500)
			.style("fill", null);
		}, 250)
	    });
    }
    
    
}

b = new jk.bonk(80, 100);

