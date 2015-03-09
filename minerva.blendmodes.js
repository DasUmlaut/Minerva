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
	return ( (a==0) ? ( (b==0)?0:1 ) : 2*Math.atan(b/a)/Math.PI );
};

Minerva.blendmodes.parallel = function(a, b) {
	return (2 * 1 / ( ((b == 0) ? 1 : 1/b) + ((a == 0) ? 1 : 1/a) ));
};

Minerva.blendmodes.equivalence = function(a, b) {
	return (Math.abs(b - a));
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
	if (b > 0.5) {
		return a + (2*b-1)*( ((a > 0.25) ? Math.sqrt(a) : ((16*a - 12)*a + 4)*a)-a);
	}
	return (a-(1-2*b)*a*(1-a));
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
	return ( b > 0.5  ? (Math.max(a, 2*(b-0.5))) : (Math.min(a, 2 * b)));
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
Minerva.mixmodes.hslhue = function(a, b) {
	var hslA = Minerva.convert.rgb2hsl([(a.r * 255) & 255, (a.g * 255) & 255, (a.b * 255) & 255]);
	var hslB = Minerva.convert.rgb2hsl([(b.r * 255) & 255, (b.g * 255) & 255, (b.b * 255) & 255]);
	var theOut = Minerva.convert.hsl2rgb([hslB[0], hslA[1], hslA[2]]);
	return {
		r:theOut[0] / 255,
		g:theOut[1] / 255,
		b:theOut[2] / 255,
	}
};

Minerva.mixmodes.hslsaturation = function(a, b) {
	var hslA = Minerva.convert.rgb2hsl([(a.r * 255) & 255, (a.g * 255) & 255, (a.b * 255) & 255]);
	var hslB = Minerva.convert.rgb2hsl([(b.r * 255) & 255, (b.g * 255) & 255, (b.b * 255) & 255]);
	var theOut = Minerva.convert.hsl2rgb([hslA[0], hslB[1], hslA[2]]);
	return {
		r:theOut[0] / 255,
		g:theOut[1] / 255,
		b:theOut[2] / 255,
	}
};

Minerva.mixmodes.hsllightness = function(a, b) {
	var hslA = Minerva.convert.rgb2hsl([(a.r * 255) & 255, (a.g * 255) & 255, (a.b * 255) & 255]);
	var hslB = Minerva.convert.rgb2hsl([(b.r * 255) & 255, (b.g * 255) & 255, (b.b * 255) & 255]);
	var theOut = Minerva.convert.hsl2rgb([hslA[0], hslA[1], hslB[2]]);
	return {
		r:theOut[0] / 255,
		g:theOut[1] / 255,
		b:theOut[2] / 255,
	}
};

Minerva.mixmodes.hsvhue = function(a, b) {
	var hsvA = Minerva.convert.rgb2hsv([(a.r * 255) & 255, (a.g * 255) & 255, (a.b * 255) & 255]);
	var hsvB = Minerva.convert.rgb2hsv([(b.r * 255) & 255, (b.g * 255) & 255, (b.b * 255) & 255]);
	var theOut = Minerva.convert.hsv2rgb([hsvB[0], hsvA[1], hsvA[2]]);
	return {
		r:theOut[0] / 255,
		g:theOut[1] / 255,
		b:theOut[2] / 255,
	}
};

Minerva.mixmodes.hsvsaturation = function(a, b) {
	var hsvA = Minerva.convert.rgb2hsv([(a.r * 255) & 255, (a.g * 255) & 255, (a.b * 255) & 255]);
	var hsvB = Minerva.convert.rgb2hsv([(b.r * 255) & 255, (b.g * 255) & 255, (b.b * 255) & 255]);
	var theOut = Minerva.convert.hsv2rgb([hsvA[0], hsvB[1], hsvA[2]]);
	return {
		r:theOut[0] / 255,
		g:theOut[1] / 255,
		b:theOut[2] / 255,
	}
};

Minerva.mixmodes.hsvvalue = function(a, b) {
	var hsvA = Minerva.convert.rgb2hsv([(a.r * 255) & 255, (a.g * 255) & 255, (a.b * 255) & 255]);
	var hsvB = Minerva.convert.rgb2hsv([(b.r * 255) & 255, (b.g * 255) & 255, (b.b * 255) & 255]);
	var theOut = Minerva.convert.hsv2rgb([hsvA[0], hsvA[1], hsvB[2]]);
	return {
		r:theOut[0] / 255,
		g:theOut[1] / 255,
		b:theOut[2] / 255,
	}
};

Minerva.mixmodes.hwbhue = function(a, b) {
	var hwbA = Minerva.convert.rgb2hwb([(a.r * 255) & 255, (a.g * 255) & 255, (a.b * 255) & 255]);
	var hwbB = Minerva.convert.rgb2hwb([(b.r * 255) & 255, (b.g * 255) & 255, (b.b * 255) & 255]);
	var theOut = Minerva.convert.hwb2rgb([hwbB[0], hwbA[1], hwbA[2]]);
	return {
		r:theOut[0] / 255,
		g:theOut[1] / 255,
		b:theOut[2] / 255,
	}
};

Minerva.mixmodes.hwbwhiteness = function(a, b) {
	var hwbA = Minerva.convert.rgb2hwb([(a.r * 255) & 255, (a.g * 255) & 255, (a.b * 255) & 255]);
	var hwbB = Minerva.convert.rgb2hwb([(b.r * 255) & 255, (b.g * 255) & 255, (b.b * 255) & 255]);
	var theOut = Minerva.convert.hwb2rgb([hwbA[0], hwbB[1], hwbA[2]]);
	return {
		r:theOut[0] / 255,
		g:theOut[1] / 255,
		b:theOut[2] / 255,
	}
};

Minerva.mixmodes.hwbblackness = function(a, b) {
	var hwbA = Minerva.convert.rgb2hwb([(a.r * 255) & 255, (a.g * 255) & 255, (a.b * 255) & 255]);
	var hwbB = Minerva.convert.rgb2hwb([(b.r * 255) & 255, (b.g * 255) & 255, (b.b * 255) & 255]);
	var theOut = Minerva.convert.hwb2rgb([hwbA[0], hwbA[1], hwbB[2]]);
	return {
		r:theOut[0] / 255,
		g:theOut[1] / 255,
		b:theOut[2] / 255,
	}
};

Minerva.mixmodes.lablightness = function(a, b) {
	var labA = Minerva.convert.rgb2lab([(a.r * 255) & 255, (a.g * 255) & 255, (a.b * 255) & 255]);
	var labB = Minerva.convert.rgb2lab([(b.r * 255) & 255, (b.g * 255) & 255, (b.b * 255) & 255]);
	var theOut = Minerva.convert.lab2rgb([labB[0], labA[1], labA[2]]);
	return {
		r:theOut[0] / 255,
		g:theOut[1] / 255,
		b:theOut[2] / 255,
	}
};

Minerva.mixmodes.labalpha = function(a, b) {
	var labA = Minerva.convert.rgb2lab([(a.r * 255) & 255, (a.g * 255) & 255, (a.b * 255) & 255]);
	var labB = Minerva.convert.rgb2lab([(b.r * 255) & 255, (b.g * 255) & 255, (b.b * 255) & 255]);
	var theOut = Minerva.convert.lab2rgb([labA[0], labB[1], labA[2]]);
	return {
		r:theOut[0] / 255,
		g:theOut[1] / 255,
		b:theOut[2] / 255,
	}
};

Minerva.mixmodes.labbeta = function(a, b) {
	var labA = Minerva.convert.rgb2lab([(a.r * 255) & 255, (a.g * 255) & 255, (a.b * 255) & 255]);
	var labB = Minerva.convert.rgb2lab([(b.r * 255) & 255, (b.g * 255) & 255, (b.b * 255) & 255]);
	var theOut = Minerva.convert.lab2rgb([labA[0], labA[1], labB[2]]);
	return {
		r:theOut[0] / 255,
		g:theOut[1] / 255,
		b:theOut[2] / 255,
	}
};

Minerva.mixmodes.lchlightness = function(a, b) {
	var lchA = Minerva.convert.rgb2lch([(a.r * 255) & 255, (a.g * 255) & 255, (a.b * 255) & 255]);
	var lchB = Minerva.convert.rgb2lch([(b.r * 255) & 255, (b.g * 255) & 255, (b.b * 255) & 255]);
	var theOut = Minerva.convert.lch2rgb([lchB[0], lchA[1], lchA[2]]);
	return {
		r:theOut[0] / 255,
		g:theOut[1] / 255,
		b:theOut[2] / 255,
	}
};

Minerva.mixmodes.lchchroma = function(a, b) {
	var lchA = Minerva.convert.rgb2lch([(a.r * 255) & 255, (a.g * 255) & 255, (a.b * 255) & 255]);
	var lchB = Minerva.convert.rgb2lch([(b.r * 255) & 255, (b.g * 255) & 255, (b.b * 255) & 255]);
	var theOut = Minerva.convert.lch2rgb([lchA[0], lchB[1], lchA[2]]);
	return {
		r:theOut[0] / 255,
		g:theOut[1] / 255,
		b:theOut[2] / 255,
	}
};

Minerva.mixmodes.lchhue = function(a, b) {
	var lchA = Minerva.convert.rgb2lch([(a.r * 255) & 255, (a.g * 255) & 255, (a.b * 255) & 255]);
	var lchB = Minerva.convert.rgb2lch([(b.r * 255) & 255, (b.g * 255) & 255, (b.b * 255) & 255]);
	var theOut = Minerva.convert.lch2rgb([lchA[0], lchA[1], lchB[2]]);
	return {
		r:theOut[0] / 255,
		g:theOut[1] / 255,
		b:theOut[2] / 255,
	}
};

Minerva.mixmodes.hsyhue = function(a, b) {
	var hsyA = Minerva.convert.rgb2hsy([(a.r * 255) & 255, (a.g * 255) & 255, (a.b * 255) & 255]);
	var hsyB = Minerva.convert.rgb2hsy([(b.r * 255) & 255, (b.g * 255) & 255, (b.b * 255) & 255]);
	var theOut = Minerva.convert.hsy2rgb([hsyB[0], hsyA[1], hsyA[2]]);
	return {
		r:theOut[0] / 255,
		g:theOut[1] / 255,
		b:theOut[2] / 255,
	}
};

Minerva.mixmodes.hsysaturation = function(a, b) {
	var hsyA = Minerva.convert.rgb2hsy([(a.r * 255) & 255, (a.g * 255) & 255, (a.b * 255) & 255]);
	var hsyB = Minerva.convert.rgb2hsy([(b.r * 255) & 255, (b.g * 255) & 255, (b.b * 255) & 255]);
	var theOut = Minerva.convert.hsy2rgb([hsyA[0], hsyB[1], hsyA[2]]);
	return {
		r:theOut[0] / 255,
		g:theOut[1] / 255,
		b:theOut[2] / 255,
	}
};

Minerva.mixmodes.hsyluma = function(a, b) {
	var hsyA = Minerva.convert.rgb2hsy([(a.r * 255) & 255, (a.g * 255) & 255, (a.b * 255) & 255]);
	var hsyB = Minerva.convert.rgb2hsy([(b.r * 255) & 255, (b.g * 255) & 255, (b.b * 255) & 255]);
	var theOut = Minerva.convert.hsy2rgb([hsyA[0], hsyA[1], hsyB[2]]);
	return {
		r:theOut[0] / 255,
		g:theOut[1] / 255,
		b:theOut[2] / 255,
	}
};

Minerva.mixmodes.cmykcyan = function(a, b) {
	var cmykA = Minerva.convert.rgb2cmyk([(a.r * 255) & 255, (a.g * 255) & 255, (a.b * 255) & 255]);
	var cmykB = Minerva.convert.rgb2cmyk([(b.r * 255) & 255, (b.g * 255) & 255, (b.b * 255) & 255]);
	var theOut = Minerva.convert.cmyk2rgb([cmykB[0], cmykA[1], cmykA[2], cmykA[3]]);
	return {
		r:theOut[0] / 255,
		g:theOut[1] / 255,
		b:theOut[2] / 255,
	}
};

Minerva.mixmodes.cmykmagenta = function(a, b) {
	var cmykA = Minerva.convert.rgb2cmyk([(a.r * 255) & 255, (a.g * 255) & 255, (a.b * 255) & 255]);
	var cmykB = Minerva.convert.rgb2cmyk([(b.r * 255) & 255, (b.g * 255) & 255, (b.b * 255) & 255]);
	var theOut = Minerva.convert.cmyk2rgb([cmykA[0], cmykB[1], cmykA[2], cmykA[3]]);
	return {
		r:theOut[0] / 255,
		g:theOut[1] / 255,
		b:theOut[2] / 255,
	}
};

Minerva.mixmodes.cmykyellow = function(a, b) {
	var cmykA = Minerva.convert.rgb2cmyk([(a.r * 255) & 255, (a.g * 255) & 255, (a.b * 255) & 255]);
	var cmykB = Minerva.convert.rgb2cmyk([(b.r * 255) & 255, (b.g * 255) & 255, (b.b * 255) & 255]);
	var theOut = Minerva.convert.cmyk2rgb([cmykA[0], cmykA[1], cmykB[2], cmykA[3]]);
	return {
		r:theOut[0] / 255,
		g:theOut[1] / 255,
		b:theOut[2] / 255,
	}
};

Minerva.mixmodes.cmykkey = function(a, b) {
	var cmykA = Minerva.convert.rgb2cmyk([(a.r * 255) & 255, (a.g * 255) & 255, (a.b * 255) & 255]);
	var cmykB = Minerva.convert.rgb2cmyk([(b.r * 255) & 255, (b.g * 255) & 255, (b.b * 255) & 255]);
	var theOut = Minerva.convert.cmyk2rgb([cmykA[0], cmykA[1], cmykA[2], cmykB[3]]);
	return {
		r:theOut[0] / 255,
		g:theOut[1] / 255,
		b:theOut[2] / 255,
	}
};



/* Lighter luma */
/* Darker luma */
/* Lighter color */
/* Darker color */

/* Aliases */

