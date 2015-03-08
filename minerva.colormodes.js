Minerva.colormodes.normal = function(a, b) {
	return {
		r: b.r,
		g: b.g,
		b: b.b,
	};
};

Minerva.colormodes.ignore = function(a, b) {
	return {
		r: a.r,
		g: a.g,
		b: a.b,
	};
};

Minerva.colormodes.average = function(a, b) {
	return {
		r: (a.r + b.r) / 2.0,
		g: (a.g + b.g) / 2.0,
		b: (a.b + b.b) / 2.0,
	};
};

Minerva.colormodes.stamp = function(a, b) {
	return {
		r: (a.r + (b.r * 2.0) - 1.0),
		g: (a.g + (b.g * 2.0) - 1.0),
		b: (a.b + (b.b * 2.0) - 1.0),
	};
};

Minerva.colormodes.punch = function(a, b) {
	return {
		r: (b.r + (a.r * 2.0) - 1.0),
		g: (b.g + (a.g * 2.0) - 1.0),
		b: (b.b + (a.b * 2.0) - 1.0),
	};
};

Minerva.colormodes.darken = function(a, b) {
	return {
		r: Math.min(a.r, b.r),
		g: Math.min(a.g, b.g),
		b: Math.min(a.b, b.b),
	};
};

Minerva.colormodes.multiply = function(a, b) {
	return {
		r: a.r * b.r,
		g: a.g * b.g,
		b: a.b * b.b,
	};
};

Minerva.colormodes.colorburn = function(a, b) {
	return {
		r: (b.r == 0) ? 0 : 1.0 - (1.0 - a.r) / b.r,
		g: (b.g == 0) ? 0 : 1.0 - (1.0 - a.g) / b.g,
		b: (b.b == 0) ? 0 : 1.0 - (1.0 - a.b) / b.b,
	};
};

Minerva.colormodes.linearburn = function(a, b) {
	return {
		r: a.r + b.r - 1,
		g: a.g + b.g - 1,
		b: a.b + b.b - 1,
	};
};

Minerva.colormodes.softburn = function(a, b) {
	return {
		r: (b.r+a.r<1) ? ( (a.r==1)?1:(b.r/2)/(1-a.r) ) : ( (b.r==0)?0:(1-((1-a.r)/2)/b.r) ),
		g: (b.g+a.g<1) ? ( (a.g==1)?1:(b.g/2)/(1-a.g) ) : ( (b.g==0)?0:(1-((1-a.g)/2)/b.g) ),
		b: (b.b+a.b<1) ? ( (a.b==1)?1:(b.b/2)/(1-a.b) ) : ( (b.b==0)?0:(1-((1-a.b)/2)/b.b) ),
	};
};

Minerva.colormodes.lighten = function(a, b) {
	return {
		r: Math.max(a.r, b.r),
		g: Math.max(a.g, b.g),
		b: Math.max(a.b, b.b),
	};
};

Minerva.colormodes.screen = function(a, b) {
	return {
		r: 1-(1-a.r)*(1-b.r),
		g: 1-(1-a.g)*(1-b.g),
		b: 1-(1-a.b)*(1-b.b),
	};
};

Minerva.colormodes.lineardodge = function(a, b) {
	return {
		r: Math.min(1, a.r + b.r),
		g: Math.min(1, a.g + b.g),
		b: Math.min(1, a.b + b.b),
	};
};

Minerva.colormodes.colordodge = function(a, b) {
	return {
		r: (b.r == 1) ? 1 : a.r / ( 1 - b.r ),
		g: (b.g == 1) ? 1 : a.g / ( 1 - b.g ),
		b: (b.b == 1) ? 1 : a.b / ( 1 - b.b ),
	};
};

Minerva.colormodes.softdodge = function(a, b) {
	return {
		r: ( (a.r+b.r<=1) ? ( (b.r==1) ? 1 : (a.r/2)/(1-b.r) ) : ( 1-((1-b.r)/2)/a.r ) ),
		g: ( (a.g+b.g<=1) ? ( (b.g==1) ? 1 : (a.g/2)/(1-b.g) ) : ( 1-((1-b.g)/2)/a.g ) ),
		b: ( (a.b+b.b<=1) ? ( (b.b==1) ? 1 : (a.b/2)/(1-b.b) ) : ( 1-((1-b.b)/2)/a.b ) ),
	};
};

Minerva.colormodes.difference = function(a, b) {
	return {
		r: Math.abs(a.r-b.r),
		g: Math.abs(a.g-b.g),
		b: Math.abs(a.b-b.b),
	};
};

Minerva.colormodes.negation = function(a, b) {
	return {
		r: 1-Math.abs(1-a.r-b.r),
		g: 1-Math.abs(1-a.g-b.g),
		b: 1-Math.abs(1-a.b-b.b),
	};
};

Minerva.colormodes.exclusion = function(a, b) {
	return {
		r: a.r+b.r-(2*a.r*b.r),
		g: a.g+b.g-(2*a.g*b.g),
		b: a.b+b.b-(2*a.b*b.b),
	};
};

Minerva.colormodes.divide = function(a, b) {
	return {
		r: b.r==0 ? 0 : a.r/b.r,
		g: b.g==0 ? 0 : a.g/b.g,
		b: b.b==0 ? 0 : a.b/b.b,
	};
};

Minerva.colormodes.subtract = function(a, b) {
	return {
		r: Math.max(0, Math.min(1, a.r-b.r)),
		g: Math.max(0, Math.min(1, a.g-b.g)),
		b: Math.max(0, Math.min(1, a.b-b.b)),
	};
};

Minerva.colormodes.phoenix = function(a, b) {
	return {
		r: (Math.min(a.r, b.r) - Math.max(a.r,b.r)) + 1.0,
		g: (Math.min(a.g, b.g) - Math.max(a.g,b.g)) + 1.0,
		b: (Math.min(a.b, b.b) - Math.max(a.b,b.b)) + 1.0,
	};
};

Minerva.colormodes.inversesubtract = function(a, b) {
	return {
		r: b.r-(1-a.r),
		g: b.g-(1-a.g),
		b: b.b-(1-a.b),
	};
};

Minerva.colormodes.arctangent = function(a, b) {
	return {
		r: ( (a.r == 0) ? ( b.r == 0 ? 0 : 1 ) : 2 * Math.atan(a.r / b.r) / Math.PI ),
		g: ( (a.g == 0) ? ( b.g == 0 ? 0 : 1 ) : 2 * Math.atan(a.g / b.g) / Math.PI ),
		b: ( (a.b == 0) ? ( b.b == 0 ? 0 : 1 ) : 2 * Math.atan(a.b / b.b) / Math.PI ),
	};
};

Minerva.colormodes.parallel = function(a, b) {
	return {
		r: ( (a.r==0) ? 1 : (b.r == 0 ? 1 : (2 / (1/a.r + 1/b.r)) ) ),
		g: ( (a.g==0) ? 1 : (b.g == 0 ? 1 : (2 / (1/a.g + 1/b.g)) ) ),
		b: ( (a.b==0) ? 1 : (b.b == 0 ? 1 : (2 / (1/a.b + 1/b.b)) ) ),
	};
};

Minerva.colormodes.equivalence = function(a, b) {
	return {
		r: (1 - Math.abs(a.r - b.r)),
		g: (1 - Math.abs(a.g - b.g)),
		b: (1 - Math.abs(a.b - b.b)),
	};
};

Minerva.colormodes.grainmerge = function(a, b) {
	return {
		r: a.r + b.r - 0.5,
		g: a.g + b.g - 0.5,
		b: a.b + b.b - 0.5,
	};
};

Minerva.colormodes.grainextract = function(a, b) {
	return {
		r: a.r - b.r + 0.5,
		g: a.g - b.g + 0.5,
		b: a.b - b.b + 0.5,
	};
};

Minerva.colormodes.addsubtract = function(a, b) {
	return {
		r: Math.abs(Math.sqrt(a.r) - Math.sqrt(b.r)),
		g: Math.abs(Math.sqrt(a.g) - Math.sqrt(b.g)),
		b: Math.abs(Math.sqrt(a.b) - Math.sqrt(b.b)),
	};
};

Minerva.colormodes.gammadark = function(a, b) {
	return {
		r: (b.r == 0) ? 0 : Math.pow(a.r, 1/b.r),
		g: (b.g == 0) ? 0 : Math.pow(a.g, 1/b.g),
		b: (b.b == 0) ? 0 : Math.pow(a.b, 1/b.b),
	};
};

Minerva.colormodes.gammalight = function(a, b) {
	return {
		r: (a.r == 0) ? 0 : Math.pow(b.r, 1/a.r),
		g: (a.g == 0) ? 0 : Math.pow(b.g, 1/a.g),
		b: (a.b == 0) ? 0 : Math.pow(b.b, 1/a.b),
	};
};

Minerva.colormodes.geometricmean = function(a, b) {
	return {
		r: Math.sqrt(a.r * b.r),
		g: Math.sqrt(a.g * b.g),
		b: Math.sqrt(a.b * b.b),
	};
};

Minerva.colormodes.softlightsvg = function(a, b) {
	return {
		r: ( (a.r > 0.5) ? b.r + (2*a.r - 1) * ( (b.r > 0.25 ? Math.sqrt(b.r) : ((16*b.r-12)*b.r+4)) - b.r) : (b.r - (1 - 2 * a.r) * b.r * (1-b.r)) ),
		g: ( (a.g > 0.5) ? b.g + (2*a.g - 1) * ( (b.g > 0.25 ? Math.sqrt(b.g) : ((16*b.g-12)*b.g+4)) - b.g) : (b.g - (1 - 2 * a.g) * b.g * (1-b.g)) ),
		b: ( (a.b > 0.5) ? b.b + (2*a.b - 1) * ( (b.b > 0.25 ? Math.sqrt(b.b) : ((16*b.b-12)*b.b+4)) - b.b) : (b.b - (1 - 2 * a.b) * b.b * (1-b.b)) ),
	};
};

Minerva.colormodes.overlay = function(a, b) {
	return {
		r: ( (a.r>0.5) ? (1-2*(1-b.r)*(1-a.r)) : (2*b.r*a.r) ),
		g: ( (a.g>0.5) ? (1-2*(1-b.g)*(1-a.g)) : (2*b.g*a.g) ),
		b: ( (a.b>0.5) ? (1-2*(1-b.b)*(1-a.b)) : (2*b.b*a.b) ),
	};
};

Minerva.colormodes.softlight = function(a, b) {
	return {
		r: ( ( b.r<0.5 ) ? ( (1-2*b.r)*(a.r*a.r)+(2*b.r*a.r) ) : ( (1-(2*b.r-1))*a.r+(2*b.r-1)*Math.sqrt(a.r) ) ),
		g: ( ( b.g<0.5 ) ? ( (1-2*b.g)*(a.g*a.g)+(2*b.g*a.g) ) : ( (1-(2*b.g-1))*a.g+(2*b.g-1)*Math.sqrt(a.g) ) ),
		b: ( ( b.b<0.5 ) ? ( (1-2*b.b)*(a.b*a.b)+(2*b.b*a.b) ) : ( (1-(2*b.b-1))*a.b+(2*b.b-1)*Math.sqrt(a.b) ) ),
	};
};

Minerva.colormodes.peglight = function(a, b) {
	return {
		r: (1-a.r)*(a.r*b.r)+a.r*(1-(1-a.r)*(1-b.r)),
		g: (1-a.g)*(a.g*b.g)+a.g*(1-(1-a.g)*(1-b.g)),
		b: (1-a.b)*(a.b*b.b)+a.b*(1-(1-a.b)*(1-b.b)),
	};
};

Minerva.colormodes.hardlight = function(a, b) {
	return {
		r: (b.r>0.5) ? (1-2*(1-a.r)*(1-b.r)) : (2*a.r*b.r),
		g: (b.g>0.5) ? (1-2*(1-a.g)*(1-b.g)) : (2*a.g*b.g),
		b: (b.b>0.5) ? (1-2*(1-a.b)*(1-b.b)) : (2*a.b*b.b),
	};
};

Minerva.colormodes.linearlight = function(a, b) {
	return {
		r: (b.r>0.5) ? (a.r+(2*(b.r-0.5))) : (a.r+(2*b.r)-1),
		g: (b.g>0.5) ? (a.g+(2*(b.g-0.5))) : (a.g+(2*b.g)-1),
		b: (b.b>0.5) ? (a.b+(2*(b.b-0.5))) : (a.b+(2*b.b)-1),
	};
};

Minerva.colormodes.vividlight = function(a, b) {
	return {
		r: (b.r<0.5) ? ( (b.r*2==0) ? 0 : (1-(1-a.r)/(b.r*2)) ) : ( (2*(b.r-0.5)==1) ? 1 : (a.r/(1-(2*(b.r-0.5)))) ),
		g: (b.g<0.5) ? ( (b.g*2==0) ? 0 : (1-(1-a.g)/(b.g*2)) ) : ( (2*(b.g-0.5)==1) ? 1 : (a.g/(1-(2*(b.g-0.5)))) ),
		b: (b.b<0.5) ? ( (b.b*2==0) ? 0 : (1-(1-a.b)/(b.b*2)) ) : ( (2*(b.b-0.5)==1) ? 1 : (a.b/(1-(2*(b.b-0.5)))) ),
	};
};

Minerva.colormodes.pinlight = function(a, b) {
	return {
		r: (b.r<2*a.r-1) ? (2*a.r-1) : ( (2*a.r-1<b.r) && (b.r<2*a.r)) ? b.r : 2*a.r,
		g: (b.g<2*a.g-1) ? (2*a.g-1) : ( (2*a.g-1<b.g) && (b.g<2*a.g)) ? b.g : 2*a.g,
		b: (b.b<2*a.b-1) ? (2*a.b-1) : ( (2*a.b-1<b.b) && (b.b<2*a.b)) ? b.b : 2*a.b,
	};
};

Minerva.colormodes.reflect = function(a, b) {
	return {
		r: (b.r==1) ? 1 : ( (a.r*a.r)/(1-b.r) > 1 ? 1 : (a.r*a.r)/(1-b.r) ),
		g: (b.g==1) ? 1 : ( (a.g*a.g)/(1-b.g) > 1 ? 1 : (a.g*a.g)/(1-b.g) ),
		b: (b.b==1) ? 1 : ( (a.b*a.b)/(1-b.b) > 1 ? 1 : (a.b*a.b)/(1-b.b) ),
	};
};

Minerva.colormodes.glow = function(a, b) {
	return {
		r: (a.r==1) ? 1 : ( (b.r*b.r)/(1-a.r) > 1 ? 1 : (b.r*b.r)/(1-a.r) ),
		g: (a.g==1) ? 1 : ( (b.g*b.g)/(1-a.g) > 1 ? 1 : (b.g*b.g)/(1-a.g) ),
		b: (a.b==1) ? 1 : ( (b.b*b.b)/(1-a.b) > 1 ? 1 : (b.b*b.b)/(1-a.b) ),
	};
};

Minerva.colormodes.freeze = function(a, b) {
	return {
		r: (b.r==0) ? 0 : 1-((1-a.r)*(1-a.r))/b.r,
		g: (b.g==0) ? 0 : 1-((1-a.g)*(1-a.g))/b.g,
		b: (b.b==0) ? 0 : 1-((1-a.b)*(1-a.b))/b.b,
	};
};

Minerva.colormodes.heat = function(a, b) {
	return {
		r: (a.r==0) ? 0 : 1-((1-b.r)*(1-b.r))/a.r,
		g: (a.g==0) ? 0 : 1-((1-b.g)*(1-b.g))/a.g,
		b: (a.b==0) ? 0 : 1-((1-b.b)*(1-b.b))/a.b,
	};
};

Minerva.colormodes.interpolation = function(a, b) {
	return {
		r: 0.5-(0.25*Math.cos(Math.PI*a.r))-(0.25*Math.cos(Math.PI*b.r)),
		g: 0.5-(0.25*Math.cos(Math.PI*a.g))-(0.25*Math.cos(Math.PI*b.g)),
		b: 0.5-(0.25*Math.cos(Math.PI*a.b))-(0.25*Math.cos(Math.PI*b.b)),
	};
};

Minerva.colormodes.hardmix = function(a, b) {
	return {
		r: a.r<1-b.r ? 0 : 1,
		g: a.g<1-b.g ? 0 : 1,
		b: a.b<1-b.b ? 0 : 1,
	};
};

Minerva.colormodes.binaryand = function(a, b) {
	return {
		r: ( (Math.round(a.r*255) & 255) & (Math.round(b.r*255) & 255) ) / 255,
		g: ( (Math.round(a.g*255) & 255) & (Math.round(b.g*255) & 255) ) / 255,
		b: ( (Math.round(a.b*255) & 255) & (Math.round(b.b*255) & 255) ) / 255,
	};
};

Minerva.colormodes.binaryor = function(a, b) {
	return {
		r: ( (Math.round(a.r*255) & 255) | (Math.round(b.r*255) & 255) ) / 255,
		g: ( (Math.round(a.g*255) & 255) | (Math.round(b.g*255) & 255) ) / 255,
		b: ( (Math.round(a.b*255) & 255) | (Math.round(b.b*255) & 255) ) / 255,
	};
};

Minerva.colormodes.binaryxor = function(a, b) {
	return {
		r: ( (Math.round(a.r*255) & 255) ^ (Math.round(b.r*255) & 255) ) / 255,
		g: ( (Math.round(a.g*255) & 255) ^ (Math.round(b.g*255) & 255) ) / 255,
		b: ( (Math.round(a.b*255) & 255) ^ (Math.round(b.b*255) & 255) ) / 255,
	};
};

Minerva.colormodes.binarynand = function(a, b) {
	return {
		r: ( (Math.round(a.r*255) & 255) & ~(Math.round(b.r*255) & 255) ) / 255,
		g: ( (Math.round(a.g*255) & 255) & ~(Math.round(b.g*255) & 255) ) / 255,
		b: ( (Math.round(a.b*255) & 255) & ~(Math.round(b.b*255) & 255) ) / 255,
	};
};

/* Channel Swaps */

Minerva.colormodes.rgbRed = function(a, b) {
	return {
		r: b.r,
		g: a.g,
		b: a.b,
	};
};

Minerva.colormodes.rgbGreen = function(a, b) {
	return {
		r: a.r,
		g: b.g,
		b: a.b,
	};
};

Minerva.colormodes.rgbBlue = function(a, b) {
	return {
		r: a.r,
		g: a.g,
		b: b.b,
	};
};

Minerva.colormodes.cmykcyan = function(a, b) {
	var cmykA = Minerva.convert.rgb2cmyk(a);
	var cmykB = Minerva.convert.rgb2cmyk(b);
	return Minerva.convert.cmyk2rgb({
		c:cmykB.c,
		m:cmykA.m,
		y:cmykA.y,
		k:cmykA.k,
	});
};

Minerva.colormodes.cmykmagenta = function(a, b) {
	var cmykA = Minerva.convert.rgb2cmyk(a);
	var cmykB = Minerva.convert.rgb2cmyk(b);
	return Minerva.convert.cmyk2rgb({
		c:cmykA.c,
		m:cmykB.m,
		y:cmykA.y,
		k:cmykA.k,
	});
};

Minerva.colormodes.cmykyellow = function(a, b) {
	var cmykA = Minerva.convert.rgb2cmyk(a);
	var cmykB = Minerva.convert.rgb2cmyk(b);
	return Minerva.convert.cmyk2rgb({
		c:cmykA.c,
		m:cmykA.m,
		y:cmykB.y,
		k:cmykA.k,
	});
};

Minerva.colormodes.cmykkey = function(a, b) {
	var cmykA = Minerva.convert.rgb2cmyk(a);
	var cmykB = Minerva.convert.rgb2cmyk(b);
	return Minerva.convert.cmyk2rgb({
		c:cmykA.c,
		m:cmykA.m,
		y:cmykA.y,
		k:cmykB.k,
	});
};

Minerva.colormodes.hsvhue = function(a, b) {
	var hsvA = Minerva.convert.rgb2hsv(a);
	var hsvB = Minerva.convert.rgb2hsv(b);
	return Minerva.convert.hsv2rgb({
		h:hsvB.h,
		s:hsvA.s,
		v:hsvA.v
	});
};

Minerva.colormodes.hsvsaturation = function(a, b) {
	var hsvA = Minerva.convert.rgb2hsv(a);
	var hsvB = Minerva.convert.rgb2hsv(b);
	return Minerva.convert.hsv2rgb({
		h:hsvA.h,
		s:hsvB.s,
		v:hsvA.v
	});
};

Minerva.colormodes.hsvvalue = function(a, b) {
	var hsvA = Minerva.convert.rgb2hsv(a);
	var hsvB = Minerva.convert.rgb2hsv(b);
	return Minerva.convert.hsv2rgb({
		h:hsvA.h,
		s:hsvA.s,
		v:hsvB.v
	});
};

Minerva.colormodes.hsyhue = function(a, b) {
	var hsyA = Minerva.convert.rgb2hsy(a);
	var hsyB = Minerva.convert.rgb2hsy(b);
	return Minerva.convert.hsy2rgb({
		h:hsyB.h,
		s:hsyA.s,
		y:hsyA.y
	});
};

Minerva.colormodes.hsysaturation = function(a, b) {
	var hsyA = Minerva.convert.rgb2hsy(a);
	var hsyB = Minerva.convert.rgb2hsy(b);
	return Minerva.convert.hsy2rgb({
		h:hsyA.h,
		s:hsyB.s,
		y:hsyA.y
	});
};

Minerva.colormodes.hsyluminance = function(a, b) {
	var hsyA = Minerva.convert.rgb2hsy(a);
	var hsyB = Minerva.convert.rgb2hsy(b);
	return Minerva.convert.hsy2rgb({
		h:hsyA.h,
		s:hsyA.s,
		y:hsyB.y
	});
};

Minerva.colormodes.labluminance = function(a, b) {
	var labA = Minerva.convert.rgb2lab(a);
	var labB = Minerva.convert.rgb2lab(b);
	return Minerva.convert.lab2rgb({
		l:labB.l,
		a:labA.a,
		b:labA.b,
	});
};

Minerva.colormodes.labalpha = function(a, b) {
	var labA = Minerva.convert.rgb2lab(a);
	var labB = Minerva.convert.rgb2lab(b);
	return Minerva.convert.lab2rgb({
		l:labA.l,
		a:labB.a,
		b:labA.b,
	});
};


Minerva.colormodes.labbeta = function(a, b) {
	var labA = Minerva.convert.rgb2lab(a);
	var labB = Minerva.convert.rgb2lab(b);
	return Minerva.convert.lab2rgb({
		l:labA.l,
		a:labA.a,
		b:labB.b,
	});
};

Minerva.colormodes.lchluminance = function(a, b) {
	var lchA = Minerva.convert.rgb2lch(a);
	var lchB = Minerva.convert.rgb2lch(b);
	return Minerva.convert.lch2rgb({
		l:lchB.l,
		c:lchA.c,
		h:lchA.h,
	});
};

Minerva.colormodes.lchchroma = function(a, b) {
	var lchA = Minerva.convert.rgb2lch(a);
	var lchB = Minerva.convert.rgb2lch(b);
	return Minerva.convert.lch2rgb({
		l:lchA.l,
		c:lchB.c,
		h:lchA.h,
	});
};

Minerva.colormodes.lchhue = function(a, b) {
	var lchA = Minerva.convert.rgb2lch(a);
	var lchB = Minerva.convert.rgb2lch(b);
	return Minerva.convert.lch2rgb({
		l:lchA.l,
		c:lchA.c,
		h:lchB.h,
	});
};
