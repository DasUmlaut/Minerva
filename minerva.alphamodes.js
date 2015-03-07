Minerva.alphaModes.discard = function(a, b) {
	return {
		a: 1.0,
	};
};

Minerva.alphaModes.replace = function(a, b) {
	return {
		a: b.a,
	};
};

Minerva.alphaModes.clip = function(a, b) {
	return {
		a: a.a,
	};
};

Minerva.alphaModes.average = function(a, b) {
	return {
		a: (a.a + b.a) / 2.0,
	};
};

Minerva.alphaModes.stamp = function(a, b) {
	return {
		a: (a.a + (b.a * 2.0) - 1.0),
	};
};

Minerva.alphaModes.punch = function(a, b) {
	return {
		a: (b.a + (a.a * 2.0) - 1.0),
	};
};

Minerva.alphaModes.darken = function(a, b) {
	return {
		a: Math.min(a.a, b.a),
	};
};

Minerva.alphaModes.multiply = function(a, b) {
	return {
		a: a.a * b.a,
	};
};

Minerva.alphaModes.colorBurn = function(a, b) {
	return {
		a: (b.a == 0) ? 0 : 1.0 - (1.0 - a.a) / b.a,
	};
};

Minerva.alphaModes.linearBurn = function(a, b) {
	return {
		a: a.a + b.a - 1,
	};
};

Minerva.alphaModes.softBurn = function(a, b) {
	return {
		a: (b.a+a.a<1) ? ( (a.a==1)?1:(b.a/2)/(1-a.a) ) : ( (b.a==0)?0:(1-((1-a.a)/2)/b.a) ),
	};
};

Minerva.alphaModes.lighten = function(a, b) {
	return {
		a: Math.max(a.a, b.a),
	};
};

Minerva.alphaModes.screen = function(a, b) {
	return {
		a: 1-(1-a.a)*(1-b.a),
	};
};

Minerva.alphaModes.linearDodge = function(a, b) {
	return {
		a: Math.min(1, a.a + b.a),
	};
};

Minerva.alphaModes.colorDodge = function(a, b) {
	return {
		a: (b.a == 1) ? 1 : a.a / ( 1 - b.a ),
	};
};

Minerva.alphaModes.softDodge = function(a, b) {
	return {
		a: ( (a.a+b.a<=1) ? ( (b.a==1) ? 1 : (a.a/2)/(1-b.a) ) : ( 1-((1-b.a)/2)/a.a ) ),
	};
};

Minerva.alphaModes.overlay = function(a, b) {
	return {
		a: ( (a.a>0.5) ? (1-2*(1-b.a)*(1-a.a)) : (2*b.a*a.a) ),
	};
};

Minerva.alphaModes.softLight = function(a, b) {
	return {
		a: ( ( b.a<0.5 ) ? ( (1-2*b.a)*(a.a*a.a)+(2*b.a*a.a) ) : ( (1-(2*b.a-1))*a.a+(2(b.a-1)*Math.sqrt(a.a) ) ) ),
	};
};

Minerva.alphaModes.pegLight = function(a, b) {
	return {
		a: (1-a.a)*(a.a*b.a)+a.a*(1-(1-a.a)*(1-b.a)),
	};
};

Minerva.alphaModes.hardLight = function(a, b) {
	return {
		a: (b.a>0.5) ? (1-2*(1-a.a)*(1-b.a)) : (2*a.a*b.a),
	};
};

Minerva.alphaModes.furyLight = function(a, b) {
	return {
		a: a.a + b.a - 0.5,
	};
};

Minerva.alphaModes.linearLight = function(a, b) {
	return {
		a: (b.a>0.5) ? (a.a+(2*(b.a-0.5))) : (a.a+(2*b.a)-1),
	};
};

Minerva.alphaModes.vividLight = function(a, b) {
	return {
		a: (b.a<0.5) ? ( (b.a*2==0) ? 0 : (1-(1-a.a)/(b.a*2)) ) : ( (2*(b.a-0.5)==1) ? 1 : (a.a/(1-(2*(b.a-0.5)))) ),
	};
};

Minerva.alphaModes.pinLight = function(a, b) {
	return {
		a: (b.a<2*a.a-1) ? (2*a.a-1) : ( (2*a.a-1<b.a) && (b.a<2*a.a)) ? b.a : 2*a.a,
	};
};

Minerva.alphaModes.reflect = function(a, b) {
	return {
		a: (b.a==1) ? 1 : ( (a.a*a.a)/(1-b.a) > 1 ? 1 : (a.a*a.a)/(1-b.a) ),
	};
};

Minerva.alphaModes.glow = function(a, b) {
	return {
		a: (a.a==1) ? 1 : ( (b.a*b.a)/(1-a.a) > 1 ? 1 : (b.a*b.a)/(1-a.a) ),
	};
};

Minerva.alphaModes.freeze = function(a, b) {
	return {
		a: (b.a==0) ? 0 : 1-((1-a.a)*(1-a.a))/b.a,
	};
};

Minerva.alphaModes.heat = function(a, b) {
	return {
		a: (a.a==0) ? 0 : 1-((1-b.a)*(1-b.a))/a.a,
	};
};

Minerva.alphaModes.difference = function(a, b) {
	return {
		a: Math.abs(a.a-b.a),
	};
};

Minerva.alphaModes.negation = function(a, b) {
	return {
		a: 1-Math.abs(1-a.a-b.a),
	};
};

Minerva.alphaModes.exclusion = function(a, b) {
	return {
		a: a.a+b.a-(2*a.a*b.a),
	};
};

Minerva.alphaModes.divide = function(a, b) {
	return {
		a: b.a==0 ? 0 : a.a/b.a,
	};
};

Minerva.alphaModes.subtract = function(a, b) {
	return {
		a: Math.max(0, Math.min(1, a.a-b.a)),
	};
};

Minerva.alphaModes.phoenix = function(a, b) {
	return {
		a: (Math.min(a.a, b.a) - Math.max(a.a,b.a)) + 1.0,
	};
};

Minerva.alphaModes.interpolation = function(a, b) {
	return {
		a: 0.5-(0.25*Math.cos(Math.pi()*a.a))-(0.25*Math.cos(Math.pi()*b.a)),
	};
};

Minerva.alphaModes.hardMix = function(a, b) {
	return {
		a: a.a<1-b.a ? 0 : 1,
	};
};
