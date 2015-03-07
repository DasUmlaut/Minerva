var Minerva = {};
Minerva.colorModes = {};
Minerva.alphaModes = {};
Minerva.util = {};

Minerva.settings = {
	
	lumaR: 0.3,
	lumaG: 0.59,
	lumaB: 0.11,
	
	/*
	lumaR: 0.2126,
	lumaG: 0.7152,
	lumaB: 0.0722,
	*/
	
};

Minerva.util.rgb2cmyk = function(rgb) {
	var k = Math.min(1.0-rgb.r, 1.0-rgb.g, 1.0-rgb.b);
	return {
		c: (1.0-rgb.r-k)/(1-k),
		m: (1.0-rgb.g-k)/(1-k),
		y: (1.0-rgb.b-k)/(1-k),
		k: k,
	};
};

Minerva.util.cmyk2rgb = function(cmyk) {
	return {
		r: 1.0-Math.min(1.0, cmyk.c*(1.0-cmyk.k) + cmyk.k),
		g: 1.0-Math.min(1.0, cmyk.m*(1.0-cmyk.k) + cmyk.k),
		b: 1.0-Math.min(1.0, cmyk.y*(1.0-cmyk.k) + cmyk.k),
	};
};

Minerva.util.rgb2hsv = function(rgb) {
	var minVal = Math.min(rgb.r, rgb.g, rgb.b);
	var maxVal = Math.max(rgb.r, rgb.g, rgb.b);
	var delta = maxVal - minVal;
	
	var h = 0;
	var s = 0;
	var v = maxVal;
	
	if (delta != 0) {
		s = delta/maxVal;
		var del_R = (((maxVal - rgb.r) / 6) + (delta / 2)) / delta;
		var del_G = (((maxVal - rgb.g) / 6) + (delta / 2)) / delta;
		var del_B = (((maxVal - rgb.b) / 6) + (delta / 2)) / delta;

		if (rgb.r == maxVal) {
			h = del_B - del_G;
		} else if (rgb.g == maxVal) {
			h = (1/3) + del_R - del_B;
		} else if (rgb.b == maxVal) {
			h = (2/3) + del_G - del_R;
		}
		if (h < 0) {
			h = h + 1;
		}
		if (h > 1) {
			h = h - 1;
		}		
	}
	return {
		h:h,
		s:s,
		v:v
	};
};

Minerva.util.hsv2rgb = function(hsv) {
	if (hsv.s == 0) {
		return {
			r:hsv.v,
			g:hsv.v,
			b:hsv.v
		}
	} else {
		var_h = hsv.h * 6;
		var_i = Math.floor(var_h);
		var_1 = hsv.v * (1 - hsv.s);
		var_2 = hsv.v * (1 - hsv.s * (var_h - var_i));
		var_3 = hsv.v * (1 - hsv.s * (1 - (var_h - var_i)));
		if (var_i == 0) {
			var_r = hsv.v;
			var_g = var_3;
			var_b = var_1;
		} else if (var_i == 1) {
			var_r = var_2;
			var_g = hsv.v;
			var_b = var_1;
		} else if (var_i == 2) {
			var_r = var_1;
			var_g = hsv.v;
			var_b = var_3;
		} else if (var_i == 3) {
			var_r = var_1;
			var_g = var_2;
			var_b = hsv.v;
		} else if (var_i == 4) {
			var_r = var_3;
			var_g = var_1;
			var_b = hsv.v;
		} else {
			var_r = hsv.v;
			var_g = var_1;
			var_b = var_2;
		};
		return {
			r: var_r,
			g: var_g,
			b: var_b,
		};
	}
};

Minerva.util.rgb2hsy = function(rgb) {
	
	var h = 0;
	var s = 0;
	var y = rgb.r * Minerva.settings.lumaR + rgb.g * Minerva.settings.lumaG + rgb.b * Minerva.settings.lumaB;
	
	if (rgb.r == rgb.g && rgb.g == rgb.b) {
		
	} else if ((r >= g) && (g >= b)) {
        s = rgb.r - rgb.b;
        h = (1/6) * (rgb.g - rgb.b) / s;
    } else if ((rgb.g > rgb.r) && (rgb.r >= rgb.b)) {
        s = rgb.g - rgb.b;
        h = (1/6) * (rgb.g - rgb.r) / s  + (1/6);
    } else if ((rgb.g >= rgb.b) && (rgb.b > rgb.r)) {
        s = rgb.g - rgb.r;
        h = (1/6) * (rgb.b - rgb.r) / s + (2/6);
    } else if ((rgb.b > rgb.g) && (rgb.g > rgb.r)) {
        s = rgb.b - rgb.r;
        h = (1/6) * (rgb.b - rgb.g) / s + (3/6);
    } else if ((rgb.b > rgb.r) && (rgb.r >= rgb.g)) {
        s = rgb.b - rgb.g;
        h = (1/6) * (rgb.r - rgb.g) / s + (4/6);
    } else {
        s = rgb.r - rgb.g;
        h = (1/6) * (rgb.r - rgb.b) / s + (5/6);
    }

	return {
		h:h,
		s:Math.min(Math.max(s, 0, 1)),
		y:Math.min(Math.max(y, 0, 1))
	}
	
};

Minerva.util.hsy2rgb = function(hsy) {

    var r = 0;
    var g = 0;
    var b = 0;
	
	var k = 0;

    if (hsy.h >= 0 && hsy.h < (1/6)) {
        k = hsy.s * hsy.h / (1/6);
        b = hsy.y - Minerva.settings.lumaR * hsy.s - Minerva.settings.lumaG * k;
        r = b + hsy.s;
        g = b + k;
    } else if (hsy.h >= (1/6) && hsy.h < (2/6)) {
        k = hsy.s * (hsy.h - (1/6)) / (1/6);
        g = hsy.y + Minerva.settings.lumaB * hsy.s + Minerva.settings.lumaR * k;
        b = g - hsy.s;
        r = g - k;
    } else if (hsy.h >= (2/6) && hsy.h < (3/6)) {
        k = hsy.s * (hsy.h - (2/6)) / (1/6);
        r = hsy.y - Minerva.settings.lumaG * hsy.s - Minerva.settings.lumaB * k;
        g = r + hsy.s;
        b = r + k;
    } else if (hsy.h >= (3/6) && hsy.h < (4/6)) {
        k = hsy.s * (hsy.h - (3/6)) / (1/6);
        b = hsy.y + Minerva.settings.lumaR * hsy.s + Minerva.settings.lumaG * k;
        r = b - hsy.s;
        g = b - k;
    } else if (hsy.h >= (4/6) && hsy.h < (5/6)) {
        k = hsy.s * (hsy.h - (4/6)) / (1/6);
        g = hsy.y - Minerva.settings.lumaB * hsy.s - Minerva.settings.lumaR * k;
        b = g + hsy.s;
        r = g + hsy.k;
    } else {
        k = hsy.s * (hsy.h - (5/6)) / (1/6);
        r = hsy.y + Minerva.settings.lumaG * hsy.s + Minerva.settings.lumaB * k;
        g = r - hsy.s;
        b = r - hsy.k;
    }
	
	return {
		r:r,
		g:g,
		b:b
	}

};
