Minerva.colorModes.normal = function(a, b) {
	return {
		r: b.r,
		g: b.g,
		b: b.b,
	};
};

Minerva.colorModes.ignore = function(a, b) {
	return {
		r: a.r,
		g: a.g,
		b: a.b,
	};
};

Minerva.colorModes.average = function(a, b) {
	return {
		r: (a.r + b.r) / 2.0,
		g: (a.g + b.g) / 2.0,
		b: (a.b + b.b) / 2.0,
	};
};

Minerva.colorModes.stamp = function(a, b) {
	return {
		r: (a.r + (b.r * 2.0) - 1.0),
		g: (a.g + (b.g * 2.0) - 1.0),
		b: (a.b + (b.b * 2.0) - 1.0),
	};
};

Minerva.colorModes.punch = function(a, b) {
	return {
		r: (b.r + (a.r * 2.0) - 1.0),
		g: (b.g + (a.g * 2.0) - 1.0),
		b: (b.b + (a.b * 2.0) - 1.0),
	};
};

Minerva.colorModes.darken = function(a, b) {
	return {
		r: Math.min(a.r, b.r),
		g: Math.min(a.g, b.g),
		b: Math.min(a.b, b.b),
	};
};

Minerva.colorModes.multiply = function(a, b) {
	return {
		r: a.r * b.r,
		g: a.g * b.g,
		b: a.b * b.b,
	};
};

Minerva.colorModes.colorBurn = function(a, b) {
	return {
		r: (b.r == 0) ? 0 : 1.0 - (1.0 - a.r) / b.r,
		g: (b.g == 0) ? 0 : 1.0 - (1.0 - a.g) / b.g,
		b: (b.b == 0) ? 0 : 1.0 - (1.0 - a.b) / b.b,
	};
};

Minerva.colorModes.linearBurn = function(a, b) {
	return {
		r: a.r + b.r - 1,
		g: a.g + b.g - 1,
		b: a.b + b.b - 1,
	};
};

Minerva.colorModes.softBurn = function(a, b) {
	return {
		r: (b.r+a.r<1) ? ( (a.r==1)?1:(b.r/2)/(1-a.r) ) : ( (b.r==0)?0:(1-((1-a.r)/2)/b.r) ),
		g: (b.g+a.g<1) ? ( (a.g==1)?1:(b.g/2)/(1-a.g) ) : ( (b.g==0)?0:(1-((1-a.g)/2)/b.g) ),
		b: (b.b+a.b<1) ? ( (a.b==1)?1:(b.b/2)/(1-a.b) ) : ( (b.b==0)?0:(1-((1-a.b)/2)/b.b) ),
	};
};

Minerva.colorModes.lighten = function(a, b) {
	return {
		r: Math.max(a.r, b.r),
		g: Math.max(a.g, b.g),
		b: Math.max(a.b, b.b),
	};
};

Minerva.colorModes.screen = function(a, b) {
	return {
		r: 1-(1-a.r)*(1-b.r),
		g: 1-(1-a.g)*(1-b.g),
		b: 1-(1-a.b)*(1-b.b),
	};
};

Minerva.colorModes.linearDodge = function(a, b) {
	return {
		r: Math.min(1, a.r + b.r),
		g: Math.min(1, a.g + b.g),
		b: Math.min(1, a.b + b.b),
	};
};

Minerva.colorModes.colorDodge = function(a, b) {
	return {
		r: (b.r == 1) ? 1 : a.r / ( 1 - b.r ),
		g: (b.g == 1) ? 1 : a.g / ( 1 - b.g ),
		b: (b.b == 1) ? 1 : a.b / ( 1 - b.b ),
	};
};

Minerva.colorModes.softDodge = function(a, b) {
	return {
		r: ( (a.r+b.r<=1) ? ( (b.r==1) ? 1 : (a.r/2)/(1-b.r) ) : ( 1-((1-b.r)/2)/a.r ) ),
		g: ( (a.g+b.g<=1) ? ( (b.g==1) ? 1 : (a.g/2)/(1-b.g) ) : ( 1-((1-b.g)/2)/a.g ) ),
		b: ( (a.b+b.b<=1) ? ( (b.b==1) ? 1 : (a.b/2)/(1-b.b) ) : ( 1-((1-b.b)/2)/a.b ) ),
	};
};

Minerva.colorModes.arcTangent = function(a, b) {
	return {
		r: ( (a.r == 0) ? ( b.r == 0 ? 0 : 1 ) : 2 * Math.atan(a.r / b.r) / Math.PI ),
		g: ( (a.g == 0) ? ( b.g == 0 ? 0 : 1 ) : 2 * Math.atan(a.g / b.g) / Math.PI ),
		b: ( (a.b == 0) ? ( b.b == 0 ? 0 : 1 ) : 2 * Math.atan(a.b / b.b) / Math.PI ),
	};
};

Minerva.colorModes.parallel = function(a, b) {
	return {
		r: ( (a.r==0) ? 1 : (b.r == 0 ? 1 : (2 / (1/a.r + 1/b.r)) ) ),
		g: ( (a.g==0) ? 1 : (b.g == 0 ? 1 : (2 / (1/a.g + 1/b.g)) ) ),
		b: ( (a.b==0) ? 1 : (b.b == 0 ? 1 : (2 / (1/a.b + 1/b.b)) ) ),
	};
};

Minerva.colorModes.equivalence = function(a, b) {
	return {
		r: (1 - Math.abs(a.r - b.r)),
		g: (1 - Math.abs(a.g - b.g)),
		b: (1 - Math.abs(a.b - b.b)),
	};
};

Minerva.colorModes.grainMerge = function(a, b) {
	return {
		r: a.r + b.r - 0.5,
		g: a.g + b.g - 0.5,
		b: a.b + b.b - 0.5,
	};
};

Minerva.colorModes.grainExtract = function(a, b) {
	return {
		r: a.r - b.r + 0.5,
		g: a.g - b.g + 0.5,
		b: a.b - b.b + 0.5,
	};
};

Minerva.colorModes.addSubtract = function(a, b) {
	return {
		r: Math.abs(Math.sqrt(a.r) - Math.sqrt(b.r)),
		g: Math.abs(Math.sqrt(a.g) - Math.sqrt(b.g)),
		b: Math.abs(Math.sqrt(a.b) - Math.sqrt(b.b)),
	};
};

Minerva.colorModes.gammaDark = function(a, b) {
	return {
		r: (b.r == 0) ? 0 : Math.pow(a.r, 1/b.r),
		g: (b.g == 0) ? 0 : Math.pow(a.g, 1/b.g),
		b: (b.b == 0) ? 0 : Math.pow(a.b, 1/b.b),
	};
};

Minerva.colorModes.gammaLight = function(a, b) {
	return {
		r: (a.r == 0) ? 0 : Math.pow(b.r, 1/a.r),
		g: (a.g == 0) ? 0 : Math.pow(b.g, 1/a.g),
		b: (a.b == 0) ? 0 : Math.pow(b.b, 1/a.b),
	};
};

Minerva.colorModes.geometricMean = function(a, b) {
	return {
		r: Math.sqrt(a.r * b.r),
		g: Math.sqrt(a.g * b.g),
		b: Math.sqrt(a.b * b.b),
	};
};

Minerva.colorModes.softLightSVG = function(a, b) {
	return {
		r: ( (a.r > 0.5) ? b.r + (2*a.r - 1) * ( (b.r > 0.25 ? Math.sqrt(b.r) : ((16*b.r-12)*b.r+4)) - b.r) : (b.r - (1 - 2 * a.r) * b.r * (1-b.r)) ),
		g: ( (a.g > 0.5) ? b.g + (2*a.g - 1) * ( (b.g > 0.25 ? Math.sqrt(b.g) : ((16*b.g-12)*b.g+4)) - b.g) : (b.g - (1 - 2 * a.g) * b.g * (1-b.g)) ),
		b: ( (a.b > 0.5) ? b.b + (2*a.b - 1) * ( (b.b > 0.25 ? Math.sqrt(b.b) : ((16*b.b-12)*b.b+4)) - b.b) : (b.b - (1 - 2 * a.b) * b.b * (1-b.b)) ),
	};
};

Minerva.colorModes.overlay = function(a, b) {
	return {
		r: ( (a.r>0.5) ? (1-2*(1-b.r)*(1-a.r)) : (2*b.r*a.r) ),
		g: ( (a.g>0.5) ? (1-2*(1-b.g)*(1-a.g)) : (2*b.g*a.g) ),
		b: ( (a.b>0.5) ? (1-2*(1-b.b)*(1-a.b)) : (2*b.b*a.b) ),
	};
};

Minerva.colorModes.softLight = function(a, b) {
	return {
		r: ( ( b.r<0.5 ) ? ( (1-2*b.r)*(a.r*a.r)+(2*b.r*a.r) ) : ( (1-(2*b.r-1))*a.r+(2*b.r-1)*Math.sqrt(a.r) ) ),
		g: ( ( b.g<0.5 ) ? ( (1-2*b.g)*(a.g*a.g)+(2*b.g*a.g) ) : ( (1-(2*b.g-1))*a.g+(2*b.g-1)*Math.sqrt(a.g) ) ),
		b: ( ( b.b<0.5 ) ? ( (1-2*b.b)*(a.b*a.b)+(2*b.b*a.b) ) : ( (1-(2*b.b-1))*a.b+(2*b.b-1)*Math.sqrt(a.b) ) ),
	};
};

Minerva.colorModes.pegLight = function(a, b) {
	return {
		r: (1-a.r)*(a.r*b.r)+a.r*(1-(1-a.r)*(1-b.r)),
		g: (1-a.g)*(a.g*b.g)+a.g*(1-(1-a.g)*(1-b.g)),
		b: (1-a.b)*(a.b*b.b)+a.b*(1-(1-a.b)*(1-b.b)),
	};
};

Minerva.colorModes.hardLight = function(a, b) {
	return {
		r: (b.r>0.5) ? (1-2*(1-a.r)*(1-b.r)) : (2*a.r*b.r),
		g: (b.g>0.5) ? (1-2*(1-a.g)*(1-b.g)) : (2*a.g*b.g),
		b: (b.b>0.5) ? (1-2*(1-a.b)*(1-b.b)) : (2*a.b*b.b),
	};
};

Minerva.colorModes.furyLight = function(a, b) {
	return {
		r: a.r + b.r - 0.5,
		g: a.g + b.g - 0.5,
		b: a.b + b.b - 0.5,
	};
};

Minerva.colorModes.linearLight = function(a, b) {
	return {
		r: (b.r>0.5) ? (a.r+(2*(b.r-0.5))) : (a.r+(2*b.r)-1),
		g: (b.g>0.5) ? (a.g+(2*(b.g-0.5))) : (a.g+(2*b.g)-1),
		b: (b.b>0.5) ? (a.b+(2*(b.b-0.5))) : (a.b+(2*b.b)-1),
	};
};

Minerva.colorModes.vividLight = function(a, b) {
	return {
		r: (b.r<0.5) ? ( (b.r*2==0) ? 0 : (1-(1-a.r)/(b.r*2)) ) : ( (2*(b.r-0.5)==1) ? 1 : (a.r/(1-(2*(b.r-0.5)))) ),
		g: (b.g<0.5) ? ( (b.g*2==0) ? 0 : (1-(1-a.g)/(b.g*2)) ) : ( (2*(b.g-0.5)==1) ? 1 : (a.g/(1-(2*(b.g-0.5)))) ),
		b: (b.b<0.5) ? ( (b.b*2==0) ? 0 : (1-(1-a.b)/(b.b*2)) ) : ( (2*(b.b-0.5)==1) ? 1 : (a.b/(1-(2*(b.b-0.5)))) ),
	};
};

Minerva.colorModes.pinLight = function(a, b) {
	return {
		r: (b.r<2*a.r-1) ? (2*a.r-1) : ( (2*a.r-1<b.r) && (b.r<2*a.r)) ? b.r : 2*a.r,
		g: (b.g<2*a.g-1) ? (2*a.g-1) : ( (2*a.g-1<b.g) && (b.g<2*a.g)) ? b.g : 2*a.g,
		b: (b.b<2*a.b-1) ? (2*a.b-1) : ( (2*a.b-1<b.b) && (b.b<2*a.b)) ? b.b : 2*a.b,
	};
};

Minerva.colorModes.reflect = function(a, b) {
	return {
		r: (b.r==1) ? 1 : ( (a.r*a.r)/(1-b.r) > 1 ? 1 : (a.r*a.r)/(1-b.r) ),
		g: (b.g==1) ? 1 : ( (a.g*a.g)/(1-b.g) > 1 ? 1 : (a.g*a.g)/(1-b.g) ),
		b: (b.b==1) ? 1 : ( (a.b*a.b)/(1-b.b) > 1 ? 1 : (a.b*a.b)/(1-b.b) ),
	};
};

Minerva.colorModes.glow = function(a, b) {
	return {
		r: (a.r==1) ? 1 : ( (b.r*b.r)/(1-a.r) > 1 ? 1 : (b.r*b.r)/(1-a.r) ),
		g: (a.g==1) ? 1 : ( (b.g*b.g)/(1-a.g) > 1 ? 1 : (b.g*b.g)/(1-a.g) ),
		b: (a.b==1) ? 1 : ( (b.b*b.b)/(1-a.b) > 1 ? 1 : (b.b*b.b)/(1-a.b) ),
	};
};

Minerva.colorModes.freeze = function(a, b) {
	return {
		r: (b.r==0) ? 0 : 1-((1-a.r)*(1-a.r))/b.r,
		g: (b.g==0) ? 0 : 1-((1-a.g)*(1-a.g))/b.g,
		b: (b.b==0) ? 0 : 1-((1-a.b)*(1-a.b))/b.b,
	};
};

Minerva.colorModes.heat = function(a, b) {
	return {
		r: (a.r==0) ? 0 : 1-((1-b.r)*(1-b.r))/a.r,
		g: (a.g==0) ? 0 : 1-((1-b.g)*(1-b.g))/a.g,
		b: (a.b==0) ? 0 : 1-((1-b.b)*(1-b.b))/a.b,
	};
};

Minerva.colorModes.difference = function(a, b) {
	return {
		r: Math.abs(a.r-b.r),
		g: Math.abs(a.g-b.g),
		b: Math.abs(a.b-b.b),
	};
};

Minerva.colorModes.negation = function(a, b) {
	return {
		r: 1-Math.abs(1-a.r-b.r),
		g: 1-Math.abs(1-a.g-b.g),
		b: 1-Math.abs(1-a.b-b.b),
	};
};

Minerva.colorModes.exclusion = function(a, b) {
	return {
		r: a.r+b.r-(2*a.r*b.r),
		g: a.g+b.g-(2*a.g*b.g),
		b: a.b+b.b-(2*a.b*b.b),
	};
};

Minerva.colorModes.divide = function(a, b) {
	return {
		r: b.r==0 ? 0 : a.r/b.r,
		g: b.g==0 ? 0 : a.g/b.g,
		b: b.b==0 ? 0 : a.b/b.b,
	};
};

Minerva.colorModes.subtract = function(a, b) {
	return {
		r: Math.max(0, Math.min(1, a.r-b.r)),
		g: Math.max(0, Math.min(1, a.g-b.g)),
		b: Math.max(0, Math.min(1, a.b-b.b)),
	};
};

Minerva.colorModes.phoenix = function(a, b) {
	return {
		r: (Math.min(a.r, b.r) - Math.max(a.r,b.r)) + 1.0,
		g: (Math.min(a.g, b.g) - Math.max(a.g,b.g)) + 1.0,
		b: (Math.min(a.b, b.b) - Math.max(a.b,b.b)) + 1.0,
	};
};

Minerva.colorModes.inverseSubtract = function(a, b) {
	return {
		r: b.r-(1-a.r),
		g: b.g-(1-a.g),
		b: b.b-(1-a.b),
	};
};

Minerva.colorModes.interpolation = function(a, b) {
	return {
		r: 0.5-(0.25*Math.cos(Math.PI*a.r))-(0.25*Math.cos(Math.PI*b.r)),
		g: 0.5-(0.25*Math.cos(Math.PI*a.g))-(0.25*Math.cos(Math.PI*b.g)),
		b: 0.5-(0.25*Math.cos(Math.PI*a.b))-(0.25*Math.cos(Math.PI*b.b)),
	};
};

Minerva.colorModes.hardMix = function(a, b) {
	return {
		r: a.r<1-b.r ? 0 : 1,
		g: a.g<1-b.g ? 0 : 1,
		b: a.b<1-b.b ? 0 : 1,
	};
};

Minerva.colorModes.binaryAnd = function(a, b) {
	return {
		r: ( (Math.round(a.r*255) & 255) & (Math.round(b.r*255) & 255) ) / 255,
		g: ( (Math.round(a.g*255) & 255) & (Math.round(b.g*255) & 255) ) / 255,
		b: ( (Math.round(a.b*255) & 255) & (Math.round(b.b*255) & 255) ) / 255,
	};
};

Minerva.colorModes.binaryOr = function(a, b) {
	return {
		r: ( (Math.round(a.r*255) & 255) | (Math.round(b.r*255) & 255) ) / 255,
		g: ( (Math.round(a.g*255) & 255) | (Math.round(b.g*255) & 255) ) / 255,
		b: ( (Math.round(a.b*255) & 255) | (Math.round(b.b*255) & 255) ) / 255,
	};
};

Minerva.colorModes.binaryXor = function(a, b) {
	return {
		r: ( (Math.round(a.r*255) & 255) ^ (Math.round(b.r*255) & 255) ) / 255,
		g: ( (Math.round(a.g*255) & 255) ^ (Math.round(b.g*255) & 255) ) / 255,
		b: ( (Math.round(a.b*255) & 255) ^ (Math.round(b.b*255) & 255) ) / 255,
	};
};

Minerva.colorModes.binaryNand = function(a, b) {
	return {
		r: ( (Math.round(a.r*255) & 255) & ~(Math.round(b.r*255) & 255) ) / 255,
		g: ( (Math.round(a.g*255) & 255) & ~(Math.round(b.g*255) & 255) ) / 255,
		b: ( (Math.round(a.b*255) & 255) & ~(Math.round(b.b*255) & 255) ) / 255,
	};
};

/* Channel Swaps */

Minerva.colorModes.rgbRed = function(a, b) {
	return {
		r: b.r,
		g: a.g,
		b: a.b,
	};
};

Minerva.colorModes.rgbGreen = function(a, b) {
	return {
		r: a.r,
		g: b.g,
		b: a.b,
	};
};

Minerva.colorModes.rgbBlue = function(a, b) {
	return {
		r: a.r,
		g: a.g,
		b: b.b,
	};
};

Minerva.colorModes.cmykCyan = function(a, b) {
	var cmykA = Minerva.convert.rgb2cmyk(a);
	var cmykB = Minerva.convert.rgb2cmyk(b);
	return Minerva.convert.cmyk2rgb({
		c:cmykB.c,
		m:cmykA.m,
		y:cmykA.y,
		k:cmykA.k,
	});
};

Minerva.colorModes.cmykMagenta = function(a, b) {
	var cmykA = Minerva.convert.rgb2cmyk(a);
	var cmykB = Minerva.convert.rgb2cmyk(b);
	return Minerva.convert.cmyk2rgb({
		c:cmykA.c,
		m:cmykB.m,
		y:cmykA.y,
		k:cmykA.k,
	});
};

Minerva.colorModes.cmykYellow = function(a, b) {
	var cmykA = Minerva.convert.rgb2cmyk(a);
	var cmykB = Minerva.convert.rgb2cmyk(b);
	return Minerva.convert.cmyk2rgb({
		c:cmykA.c,
		m:cmykA.m,
		y:cmykB.y,
		k:cmykA.k,
	});
};

Minerva.colorModes.cmykKey = function(a, b) {
	var cmykA = Minerva.convert.rgb2cmyk(a);
	var cmykB = Minerva.convert.rgb2cmyk(b);
	return Minerva.convert.cmyk2rgb({
		c:cmykA.c,
		m:cmykA.m,
		y:cmykA.y,
		k:cmykB.k,
	});
};

Minerva.colorModes.hsvHue = function(a, b) {
	var hsvA = Minerva.convert.rgb2hsv(a);
	var hsvB = Minerva.convert.rgb2hsv(b);
	return Minerva.convert.hsv2rgb({
		h:hsvB.h,
		s:hsvA.s,
		v:hsvA.v
	});
};

Minerva.colorModes.hsvSaturation = function(a, b) {
	var hsvA = Minerva.convert.rgb2hsv(a);
	var hsvB = Minerva.convert.rgb2hsv(b);
	return Minerva.convert.hsv2rgb({
		h:hsvA.h,
		s:hsvB.s,
		v:hsvA.v
	});
};

Minerva.colorModes.hsvValue = function(a, b) {
	var hsvA = Minerva.convert.rgb2hsv(a);
	var hsvB = Minerva.convert.rgb2hsv(b);
	return Minerva.convert.hsv2rgb({
		h:hsvA.h,
		s:hsvA.s,
		v:hsvB.v
	});
};

Minerva.colorModes.hsyHue = function(a, b) {
	var hsyA = Minerva.convert.rgb2hsy(a);
	var hsyB = Minerva.convert.rgb2hsy(b);
	return Minerva.convert.hsy2rgb({
		h:hsyB.h,
		s:hsyA.s,
		y:hsyA.y
	});
};

Minerva.colorModes.hsySaturation = function(a, b) {
	var hsyA = Minerva.convert.rgb2hsy(a);
	var hsyB = Minerva.convert.rgb2hsy(b);
	return Minerva.convert.hsy2rgb({
		h:hsyA.h,
		s:hsyB.s,
		y:hsyA.y
	});
};

Minerva.colorModes.hsyLuminance = function(a, b) {
	var hsyA = Minerva.convert.rgb2hsy(a);
	var hsyB = Minerva.convert.rgb2hsy(b);
	return Minerva.convert.hsy2rgb({
		h:hsyA.h,
		s:hsyA.s,
		y:hsyB.y
	});
};

Minerva.colorModes.labLuminance = function(a, b) {
	var labA = Minerva.convert.rgb2lab(a);
	var labB = Minerva.convert.rgb2lab(b);
	return Minerva.convert.lab2rgb({
		l:labB.l,
		a:labA.a,
		b:labA.b,
	});
};

Minerva.colorModes.labAlpha = function(a, b) {
	var labA = Minerva.convert.rgb2lab(a);
	var labB = Minerva.convert.rgb2lab(b);
	return Minerva.convert.lab2rgb({
		l:labA.l,
		a:labB.a,
		b:labA.b,
	});
};


Minerva.colorModes.labBeta = function(a, b) {
	var labA = Minerva.convert.rgb2lab(a);
	var labB = Minerva.convert.rgb2lab(b);
	return Minerva.convert.lab2rgb({
		l:labA.l,
		a:labA.a,
		b:labB.b,
	});
};

Minerva.colorModes.lchLuminance = function(a, b) {
	var lchA = Minerva.convert.rgb2lch(a);
	var lchB = Minerva.convert.rgb2lch(b);
	return Minerva.convert.lch2rgb({
		l:lchB.l,
		c:lchA.c,
		h:lchA.h,
	});
};

Minerva.colorModes.lchChroma = function(a, b) {
	var lchA = Minerva.convert.rgb2lch(a);
	var lchB = Minerva.convert.rgb2lch(b);
	return Minerva.convert.lch2rgb({
		l:lchA.l,
		c:lchB.c,
		h:lchA.h,
	});
};

Minerva.colorModes.lchHue = function(a, b) {
	var lchA = Minerva.convert.rgb2lch(a);
	var lchB = Minerva.convert.rgb2lch(b);
	return Minerva.convert.lch2rgb({
		l:lchA.l,
		c:lchA.c,
		h:lchB.h,
	});
};
