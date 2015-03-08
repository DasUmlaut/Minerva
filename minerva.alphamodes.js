Minerva.alphamodes.discard = function(a, b) {
	return {
		a: 1.0,
	};
};

Minerva.alphamodes.replace = function(a, b) {
	return {
		a: b.a,
	};
};

Minerva.alphamodes.clip = function(a, b) {
	return {
		a: a.a,
	};
};

Minerva.alphamodes.average = function(a, b) {
	return {
		a: (a.a + b.a) / 2.0,
	};
};

Minerva.alphamodes.stamp = function(a, b) {
	return {
		a: (a.a + (b.a * 2.0) - 1.0),
	};
};

Minerva.alphamodes.punch = function(a, b) {
	return {
		a: (b.a + (a.a * 2.0) - 1.0),
	};
};

Minerva.alphamodes.darken = function(a, b) {
	return {
		a: Math.min(a.a, b.a),
	};
};

Minerva.alphamodes.multiply = function(a, b) {
	return {
		a: a.a * b.a,
	};
};

Minerva.alphamodes.colorburn = function(a, b) {
	return {
		a: (b.a == 0) ? 0 : 1.0 - (1.0 - a.a) / b.a,
	};
};

Minerva.alphamodes.linearburn = function(a, b) {
	return {
		a: a.a + b.a - 1,
	};
};

Minerva.alphamodes.softburn = function(a, b) {
	return {
		a: (b.a+a.a<1) ? ( (a.a==1)?1:(b.a/2)/(1-a.a) ) : ( (b.a==0)?0:(1-((1-a.a)/2)/b.a) ),
	};
};

Minerva.alphamodes.lighten = function(a, b) {
	return {
		a: Math.max(a.a, b.a),
	};
};

Minerva.alphamodes.screen = function(a, b) {
	return {
		a: 1-(1-a.a)*(1-b.a),
	};
};

Minerva.alphamodes.lineardodge = function(a, b) {
	return {
		a: Math.min(1, a.a + b.a),
	};
};

Minerva.alphamodes.colordodge = function(a, b) {
	return {
		a: (b.a == 1) ? 1 : a.a / ( 1 - b.a ),
	};
};

Minerva.alphamodes.softdodge = function(a, b) {
	return {
		a: ( (a.a+b.a<=1) ? ( (b.a==1) ? 1 : (a.a/2)/(1-b.a) ) : ( 1-((1-b.a)/2)/a.a ) ),
	};
};

Minerva.alphamodes.difference = function(a, b) {
	return {
		a: Math.abs(a.a-b.a),
	};
};

Minerva.alphamodes.negation = function(a, b) {
	return {
		a: 1-Math.abs(1-a.a-b.a),
	};
};

Minerva.alphamodes.exclusion = function(a, b) {
	return {
		a: a.a+b.a-(2*a.a*b.a),
	};
};

Minerva.alphamodes.divide = function(a, b) {
	return {
		a: b.a==0 ? 0 : a.a/b.a,
	};
};

Minerva.alphamodes.subtract = function(a, b) {
	return {
		a: Math.max(0, Math.min(1, a.a-b.a)),
	};
};

Minerva.alphamodes.phoenix = function(a, b) {
	return {
		a: (Math.min(a.a, b.a) - Math.max(a.a,b.a)) + 1.0,
	};
};

Minerva.alphamodes.inversesubtract = function(a, b) {
	return {
		a: b.a-(1-a.a),
	};
};

Minerva.alphamodes.arctangent = function(a, b) {
	return {
		a: ( (a.a == 0) ? ( b.a == 0 ? 0 : 1 ) : 2 * Math.atan(a.a / b.a) / Math.PI ),
	};
};

Minerva.alphamodes.parallel = function(a, b) {
	return {
		a: ( (a.a==0) ? 1 : (b.a == 0 ? 1 : (2 / (1/a.a + 1/b.a)) ) ),
	};
};

Minerva.alphamodes.equivalence = function(a, b) {
	return {
		a: (1 - Math.abs(a.a - b.a)),
	};
};

Minerva.alphamodes.grainmerge = function(a, b) {
	return {
		a: a.a + b.a - 0.5,
	};
};

Minerva.alphamodes.grainextract = function(a, b) {
	return {
		a: a.a - b.a + 0.5,
	};
};

Minerva.alphamodes.addsubtract = function(a, b) {
	return {
		a: Math.abs(Math.sqrt(a.a) - Math.sqrt(b.a)),
	};
};

Minerva.alphamodes.gammadark = function(a, b) {
	return {
		a: (b.a == 0) ? 0 : Math.pow(a.a, 1/b.a),
	};
};

Minerva.alphamodes.gammalight = function(a, b) {
	return {
		a: (a.a == 0) ? 0 : Math.pow(b.a, 1/a.a),
	};
};

Minerva.alphamodes.geometricmean = function(a, b) {
	return {
		a: Math.sqrt(a.a * b.a),
	};
};

Minerva.alphamodes.softlightsvg = function(a, b) {
	return {
		a: ( (a.a > 0.5) ? b.a + (2*a.a - 1) * ( (b.a > 0.25 ? Math.sqrt(b.a) : ((16*b.a-12)*b.a+4)) - b.a) : (b.a - (1 - 2 * a.a) * b.a * (1-b.a)) ),
	};
};

Minerva.alphamodes.overlay = function(a, b) {
	return {
		a: ( (a.a>0.5) ? (1-2*(1-b.a)*(1-a.a)) : (2*b.a*a.a) ),
	};
};

Minerva.alphamodes.softlight = function(a, b) {
	return {
		a: ( ( b.a<0.5 ) ? ( (1-2*b.a)*(a.a*a.a)+(2*b.a*a.a) ) : ( (1-(2*b.a-1))*a.a+(2*b.a-1)*Math.sqrt(a.a) ) ),
	};
};

Minerva.alphamodes.peglight = function(a, b) {
	return {
		a: (1-a.a)*(a.a*b.a)+a.a*(1-(1-a.a)*(1-b.a)),
	};
};

Minerva.alphamodes.hardlight = function(a, b) {
	return {
		a: (b.a>0.5) ? (1-2*(1-a.a)*(1-b.a)) : (2*a.a*b.a),
	};
};

Minerva.alphamodes.linearlight = function(a, b) {
	return {
		a: (b.a>0.5) ? (a.a+(2*(b.a-0.5))) : (a.a+(2*b.a)-1),
	};
};

Minerva.alphamodes.vividlight = function(a, b) {
	return {
		a: (b.a<0.5) ? ( (b.a*2==0) ? 0 : (1-(1-a.a)/(b.a*2)) ) : ( (2*(b.a-0.5)==1) ? 1 : (a.a/(1-(2*(b.a-0.5)))) ),
	};
};

Minerva.alphamodes.pinlight = function(a, b) {
	return {
		a: (b.a<2*a.a-1) ? (2*a.a-1) : ( (2*a.a-1<b.a) && (b.a<2*a.a)) ? b.a : 2*a.a,
	};
};

Minerva.alphamodes.reflect = function(a, b) {
	return {
		a: (b.a==1) ? 1 : ( (a.a*a.a)/(1-b.a) > 1 ? 1 : (a.a*a.a)/(1-b.a) ),
	};
};

Minerva.alphamodes.glow = function(a, b) {
	return {
		a: (a.a==1) ? 1 : ( (b.a*b.a)/(1-a.a) > 1 ? 1 : (b.a*b.a)/(1-a.a) ),
	};
};

Minerva.alphamodes.freeze = function(a, b) {
	return {
		a: (b.a==0) ? 0 : 1-((1-a.a)*(1-a.a))/b.a,
	};
};

Minerva.alphamodes.heat = function(a, b) {
	return {
		a: (a.a==0) ? 0 : 1-((1-b.a)*(1-b.a))/a.a,
	};
};

Minerva.alphamodes.interpolation = function(a, b) {
	return {
		a: 0.5-(0.25*Math.cos(Math.PI*a.a))-(0.25*Math.cos(Math.PI*b.a)),
	};
};

Minerva.alphamodes.hardmix = function(a, b) {
	return {
		a: a.a<1-b.a ? 0 : 1,
	};
};

Minerva.alphamodes.binaryand = function(a, b) {
	return {
		a: ( (Math.round(a.a*255) & 255) & (Math.round(b.a*255) & 255) ) / 255,
	};
};

Minerva.alphamodes.binaryor = function(a, b) {
	return {
		a: ( (Math.round(a.a*255) & 255) | (Math.round(b.a*255) & 255) ) / 255,
	};
};

Minerva.alphamodes.binaryxor = function(a, b) {
	return {
		a: ( (Math.round(a.a*255) & 255) ^ (Math.round(b.a*255) & 255) ) / 255,
	};
};

Minerva.alphamodes.binarynand = function(a, b) {
	return {
		a: ( (Math.round(a.a*255) & 255) & ~(Math.round(b.a*255) & 255) ) / 255,
	};
};

