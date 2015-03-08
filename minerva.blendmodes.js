Minerva.blendmodes.normal = function(a, b) {
	return b;
};

Minerva.blendmodes.ignore = function(a, b) {
	return a;
};

Minerva.blendmodes.clip = function(a, b) {
	return a;
};

Minerva.blendmodes.replace = function(a, b) {
	return b;
};

Minerva.blendmodes.discard = function(a, b) {
	return 1.0;
};

Minerva.blendmodes.average = function(a, b) {
	return (a + b) / 2.0;
};

Minerva.blendmodes.stamp = function(a, b) {
	return (a + (b * 2.0) - 1.0);
};

Minerva.blendmodes.punch = function(a, b) {
	return (b + (a * 2.0) - 1.0);
};

Minerva.blendmodes.darken = function(a, b) {
	return Math.min(a, b);
};

Minerva.blendmodes.multiply = function(a, b) {
	return a * b;
};

Minerva.blendmodes.colorburn = function(a, b) {
	return (b == 0) ? 0 : 1.0 - (1.0 - a) / b;
};

Minerva.blendmodes.linearburn = function(a, b) {
	return a + b - 1;
};

Minerva.blendmodes.softburn = function(a, b) {
	return (b+a<1) ? ( (a==1)?1:(b/2)/(1-a) ) : ( (b==0)?0:(1-((1-a)/2)/b) );
};

Minerva.blendmodes.lighten = function(a, b) {
	return Math.max(a, b);
};

Minerva.blendmodes.screen = function(a, b) {
	return 1-(1-a)*(1-b);
};

Minerva.blendmodes.lineardodge = function(a, b) {
	return Math.min(1, a + b);
};

Minerva.blendmodes.colordodge = function(a, b) {
	return (b == 1) ? 1 : a / ( 1 - b );
};

Minerva.blendmodes.softdodge = function(a, b) {
	return ( (a+b<=1) ? ( (b==1) ? 1 : (a/2)/(1-b) ) : ( 1-((1-b)/2)/a ) );
};

Minerva.blendmodes.difference = function(a, b) {
	return Math.abs(a-b);
};

Minerva.blendmodes.negation = function(a, b) {
	return 1-Math.abs(1-a-b);
};

Minerva.blendmodes.exclusion = function(a, b) {
	return a+b-(2*a*b);
};

Minerva.blendmodes.divide = function(a, b) {
	return b==0 ? 0 : a/b;
};

Minerva.blendmodes.subtract = function(a, b) {
	return Math.max(0, Math.min(1, a-b));
};

Minerva.blendmodes.phoenix = function(a, b) {
	return (Math.min(a, b) - Math.max(a,b)) + 1.0;
};

Minerva.blendmodes.inversesubtract = function(a, b) {
	return b-(1-a);
};

Minerva.blendmodes.arctangent = function(a, b) {
	return ( (a == 0) ? ( b == 0 ? 0 : 1 ) : 2 * Math.atan(a / b) / Math.PI );
};

Minerva.blendmodes.parallel = function(a, b) {
	return ( (a==0) ? 1 : (b == 0 ? 1 : (2 / (1/a + 1/b)) ) );
};

Minerva.blendmodes.equivalence = function(a, b) {
	return (1 - Math.abs(a - b));
};

Minerva.blendmodes.grainmerge = function(a, b) {
	return a + b - 0.5;
};

Minerva.blendmodes.grainextract = function(a, b) {
	return a - b + 0.5;
};

Minerva.blendmodes.addsubtract = function(a, b) {
	return Math.abs(Math.sqrt(a) - Math.sqrt(b));
};

Minerva.blendmodes.gammadark = function(a, b) {
	return (b == 0) ? 0 : Math.pow(a, 1/b);
};

Minerva.blendmodes.gammalight = function(a, b) {
	return (a == 0) ? 0 : Math.pow(b, 1/a);
};

Minerva.blendmodes.geometricmean = function(a, b) {
	return Math.sqrt(a * b);
};

Minerva.blendmodes.softlightsvg = function(a, b) {
	return ( (a > 0.5) ? b + (2*a - 1) * ( (b > 0.25 ? Math.sqrt(b) : ((16*b-12)*b+4)) - b) : (b - (1 - 2 * a) * b * (1-b)) );
};

Minerva.blendmodes.overlay = function(a, b) {
	return ( (a>0.5) ? (1-2*(1-b)*(1-a)) : (2*b*a) );
};

Minerva.blendmodes.softlight = function(a, b) {
	return ( ( b<0.5 ) ? ( (1-2*b)*(a*a)+(2*b*a) ) : ( (1-(2*b-1))*a+(2*b-1)*Math.sqrt(a) ) );
};

Minerva.blendmodes.peglight = function(a, b) {
	return (1-a)*(a*b)+a*(1-(1-a)*(1-b));
};

Minerva.blendmodes.hardlight = function(a, b) {
	return (b>0.5) ? (1-2*(1-a)*(1-b)) : (2*a*b);
};

Minerva.blendmodes.linearlight = function(a, b) {
	return (b>0.5) ? (a+(2*(b-0.5))) : (a+(2*b)-1);
};

Minerva.blendmodes.vividlight = function(a, b) {
	return (b<0.5) ? ( (b*2==0) ? 0 : (1-(1-a)/(b*2)) ) : ( (2*(b-0.5)==1) ? 1 : (a/(1-(2*(b-0.5)))) );
};

Minerva.blendmodes.pinlight = function(a, b) {
	return (b<2*a-1) ? (2*a-1) : ( (2*a-1<b) && (b<2*a)) ? b : 2*a;
};

Minerva.blendmodes.reflect = function(a, b) {
	return (b==1) ? 1 : ( (a*a)/(1-b) > 1 ? 1 : (a*a)/(1-b) );
};

Minerva.blendmodes.glow = function(a, b) {
	return (a==1) ? 1 : ( (b*b)/(1-a) > 1 ? 1 : (b*b)/(1-a) );
};

Minerva.blendmodes.freeze = function(a, b) {
	return (b==0) ? 0 : 1-((1-a)*(1-a))/b;
};

Minerva.blendmodes.heat = function(a, b) {
	return (a==0) ? 0 : 1-((1-b)*(1-b))/a;
};

Minerva.blendmodes.interpolation = function(a, b) {
	return 0.5-(0.25*Math.cos(Math.PI*a))-(0.25*Math.cos(Math.PI*b));
};

Minerva.blendmodes.hardmix = function(a, b) {
	return a<1-b ? 0 : 1;
};

Minerva.blendmodes.binaryand = function(a, b) {
	return ( (Math.round(a*255) & 255) & (Math.round(b*255) & 255) ) / 255;
};

Minerva.blendmodes.binaryor = function(a, b) {
	return ( (Math.round(a*255) & 255) | (Math.round(b*255) & 255) ) / 255;
};

Minerva.blendmodes.binaryxor = function(a, b) {
	return ( (Math.round(a*255) & 255) ^ (Math.round(b*255) & 255) ) / 255;
};

Minerva.blendmodes.binarynand = function(a, b) {
	return ( (Math.round(a*255) & 255) & ~(Math.round(b*255) & 255) ) / 255;
};

/* Channel Swaps */

Minerva.mixmodes.rgbRed = function(a, b) {
	return {
		r: b.r,
		g: a.g,
		b: a.b,
	};
};

Minerva.mixmodes.rgbGreen = function(a, b) {
	return {
		r: a.r,
		g: b.g,
		b: a.b,
	};
};

Minerva.mixmodes.rgbBlue = function(a, b) {
	return {
		r: a.r,
		g: a.g,
		b: b.b,
	};
};

Minerva.mixmodes.cmykcyan = function(a, b) {
	var cmykA = Minerva.convert.rgb2cmyk(a);
	var cmykB = Minerva.convert.rgb2cmyk(b);
	return Minerva.convert.cmyk2rgb({
		c:cmykB.c,
		m:cmykA.m,
		y:cmykA.y,
		k:cmykA.k,
	});
};

Minerva.mixmodes.cmykmagenta = function(a, b) {
	var cmykA = Minerva.convert.rgb2cmyk(a);
	var cmykB = Minerva.convert.rgb2cmyk(b);
	return Minerva.convert.cmyk2rgb({
		c:cmykA.c,
		m:cmykB.m,
		y:cmykA.y,
		k:cmykA.k,
	});
};

Minerva.mixmodes.cmykyellow = function(a, b) {
	var cmykA = Minerva.convert.rgb2cmyk(a);
	var cmykB = Minerva.convert.rgb2cmyk(b);
	return Minerva.convert.cmyk2rgb({
		c:cmykA.c,
		m:cmykA.m,
		y:cmykB.y,
		k:cmykA.k,
	});
};

Minerva.mixmodes.cmykkey = function(a, b) {
	var cmykA = Minerva.convert.rgb2cmyk(a);
	var cmykB = Minerva.convert.rgb2cmyk(b);
	return Minerva.convert.cmyk2rgb({
		c:cmykA.c,
		m:cmykA.m,
		y:cmykA.y,
		k:cmykB.k,
	});
};

Minerva.mixmodes.hsvhue = function(a, b) {
	var hsvA = Minerva.convert.rgb2hsv(a);
	var hsvB = Minerva.convert.rgb2hsv(b);
	return Minerva.convert.hsv2rgb({
		h:hsvB.h,
		s:hsvA.s,
		v:hsvA.v
	});
};

Minerva.mixmodes.hsvsaturation = function(a, b) {
	var hsvA = Minerva.convert.rgb2hsv(a);
	var hsvB = Minerva.convert.rgb2hsv(b);
	return Minerva.convert.hsv2rgb({
		h:hsvA.h,
		s:hsvB.s,
		v:hsvA.v
	});
};

Minerva.mixmodes.hsvvalue = function(a, b) {
	var hsvA = Minerva.convert.rgb2hsv(a);
	var hsvB = Minerva.convert.rgb2hsv(b);
	return Minerva.convert.hsv2rgb({
		h:hsvA.h,
		s:hsvA.s,
		v:hsvB.v
	});
};

Minerva.mixmodes.hsyhue = function(a, b) {
	var hsyA = Minerva.convert.rgb2hsy(a);
	var hsyB = Minerva.convert.rgb2hsy(b);
	return Minerva.convert.hsy2rgb({
		h:hsyB.h,
		s:hsyA.s,
		y:hsyA.y
	});
};

Minerva.mixmodes.hsysaturation = function(a, b) {
	var hsyA = Minerva.convert.rgb2hsy(a);
	var hsyB = Minerva.convert.rgb2hsy(b);
	return Minerva.convert.hsy2rgb({
		h:hsyA.h,
		s:hsyB.s,
		y:hsyA.y
	});
};

Minerva.mixmodes.hsyluminance = function(a, b) {
	var hsyA = Minerva.convert.rgb2hsy(a);
	var hsyB = Minerva.convert.rgb2hsy(b);
	return Minerva.convert.hsy2rgb({
		h:hsyA.h,
		s:hsyA.s,
		y:hsyB.y
	});
};

Minerva.mixmodes.labluminance = function(a, b) {
	var labA = Minerva.convert.rgb2lab(a);
	var labB = Minerva.convert.rgb2lab(b);
	return Minerva.convert.lab2rgb({
		l:labB.l,
		a:labA.a,
		b:labA.b,
	});
};

Minerva.mixmodes.labalpha = function(a, b) {
	var labA = Minerva.convert.rgb2lab(a);
	var labB = Minerva.convert.rgb2lab(b);
	return Minerva.convert.lab2rgb({
		l:labA.l,
		a:labB.a,
		b:labA.b,
	});
};


Minerva.mixmodes.labbeta = function(a, b) {
	var labA = Minerva.convert.rgb2lab(a);
	var labB = Minerva.convert.rgb2lab(b);
	return Minerva.convert.lab2rgb({
		l:labA.l,
		a:labA.a,
		b:labB.b,
	});
};

Minerva.mixmodes.lchluminance = function(a, b) {
	var lchA = Minerva.convert.rgb2lch(a);
	var lchB = Minerva.convert.rgb2lch(b);
	return Minerva.convert.lch2rgb({
		l:lchB.l,
		c:lchA.c,
		h:lchA.h,
	});
};

Minerva.mixmodes.lchchroma = function(a, b) {
	var lchA = Minerva.convert.rgb2lch(a);
	var lchB = Minerva.convert.rgb2lch(b);
	return Minerva.convert.lch2rgb({
		l:lchA.l,
		c:lchB.c,
		h:lchA.h,
	});
};

Minerva.mixmodes.lchhue = function(a, b) {
	var lchA = Minerva.convert.rgb2lch(a);
	var lchB = Minerva.convert.rgb2lch(b);
	return Minerva.convert.lch2rgb({
		l:lchA.l,
		c:lchA.c,
		h:lchB.h,
	});
};
