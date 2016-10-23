var Ratchet = function(){
    this.__first = null;
    this.__last = null;
    this.__length = 0;
    this.__sum = 0;
    this.__compare = function(a, b){
	if (a < b) return -1;
	else if (a == b) return 0;
	else return 1;
    }
    return this;
}

Ratchet.Node = function(val){
    this.__val = val;
    this.__next = null;
    this.__prev = null;
}

Ratchet.prototype.comparator = function(f){
    this.__compare == f;
}

Ratchet.prototype.min = function(){
    return this.__first.__val;
}

Ratchet.prototype.max = function(){
    return this.__last.__val;
}

Ratchet.prototype.avg = function(){
    return this.__avg;
}

Ratchet.prototype.sum = function(){
    return this.__sum;
}

Ratchet.prototype.length = function(){
    return this.__length;
}

Ratchet.prototype.add = function(val){
    var n = new Ratchet.Node(val);

    if (this.__first == null){
	this.__first = n;
	return this;
    }
    
    var curr = this.__first;
    while(curr != null){

	if (this.__compare(n.__val, curr.__val) <= 0){
	    // console.log("Inserting " + n.__val + " before " + curr.__val);
	    var prev = curr.__prev;
	    var next = curr;
	    n.__next = next;
	    n.__prev = prev;
	    try {n.__prev.__next = n}catch(e){};
	    n.__next.__prev = n;

	    if (curr == this.__first) {
		this.__first = n;
	    }
	    break;
	}

	if (curr.__next == null){
	    // console.log("inserting " + val + " at the end");
	    curr.__next = n;
	    n.__prev = curr;
	    this.__last = n;
	    break;
	}
	
	curr = curr.__next;
    }

    this.__length++;
    this.__sum = this.__sum + Number(n.__val);
    this.__avg = this.sum() / this.length();

    return this;
}

Ratchet.prototype.toString = function(){
    var curr = this.__first;
    var ret = "{ ";
    while (curr != null){
	ret = ret + curr.__val + " " ;
	curr = curr.__next;
    }
    ret += "}";
    return ret;
    
}

r = new Ratchet();
r.add(100);
r.add(200);
r.add(300);
r.add(500);
r.add(350);
r.add(250);
r.add(150);
r.add(50);
console.log(r);
