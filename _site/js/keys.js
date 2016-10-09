var TERM = TERM || {};

TERM = function (in_div, out_div){
    this.output_count = 0;
    this.div = {};
    this.div.input  = in_div;
    this.div.output = out_div;
    this.cursor = "&block;"
    this.prompt = "$ ";
    this.go();
}

TERM.prototype.input = function(){
    return d3.select("#" + this.div.input);
}

TERM.prototype.output = function(){
    return d3.select("#" + this.div.output);
}

TERM.prototype.character = function(c){

    var valid = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
	+ "abcdefghijklmnopqrstuvwxyz"
	+ "0123456789()./ ~'+-*";

    if (!valid.includes(c)){
    	return;
    }
    var in_text = this.input().text();
    this.input().text(in_text + c.toLowerCase());
}

TERM.prototype.backspace = function(){
    var in_text = this.input().text();
    this.input().text(in_text.substring(0, in_text.length - 1));
}

TERM.prototype.evaluate = function(command, out_count){
    var that = this;
    var commands = {
	"help": function(){
	    return "commands: clear, help, random, whoami"
	},
	"random": function(){
	    return "42";
	},
	"whoami": function(){
	    // return "How should I know?"
	    d3.html("/whoami_plain/", function(fragment){
		var sel = "[data-output-id='" + out_count + "']";
		console.log(fragment);
		d3.select(sel).html("<br/>");
		d3.select(sel).node().appendChild(fragment);
	    });
	    return "Loading..."
	},
	"clear": function(){
	    var sel = "#" + that.div.output;
	    d3.select(sel).html("");
	}
	    
    }

    if (commands.hasOwnProperty(command)){
	return commands[command]();
    }
   
    else {
	return command;
    }
}

TERM.prototype.write = function(output){

    this.output()
	.append("div")
	.attr("data-output-id", this.output_count)
	.text(output);
    this.output_count++;
}

TERM.prototype.enter = function(){
    var command = this.input().text();
    this.input().text("");
    var stdout = this.output().text();
    var output = this.evaluate(command, this.output_count + 1);

    this.write(this.prompt + command);
    this.write(output);
}

TERM.prototype.go = function(){

    var that = this;
    document.onkeydown=function (event)
    {
	c = String.fromCharCode(event.keyCode);
	n = Number(c);
	if (Number.isNaN(n)){
	    that.character(c);
	}

	if (event.keyCode >= 48
	    && event.keyCode <= 57){
	    that.character(String(event.keyCode - 48));
	}
	if (event.keyCode == 32){
	    that.character(" ");
	}
	if (event.keyCode == 8){
	    that.backspace();
	}
	
	if (event.keyCode == 13){
	    that.enter();
	}
	// console.log(event.keyCode);    
    };

}

t = new TERM("terminal_input",
	     "terminal_output");
