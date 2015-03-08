Minerva.convert.hex2rgb = function(hex) {
	
    var r = (hex >> 16) & 255;
    var g = (hex >> 8) & 255;
    var b = hex & 255;
	
	return {
		r: r / 255,
		g: g / 255,
		b: b / 255
	};
};

Minerva.convert.rgb2cmyk = function(rgb) {
	var k = Math.min(1.0-rgb.r, 1.0-rgb.g, 1.0-rgb.b);
	return {
		c: (k == 1) ? 0 : (1.0-rgb.r-k)/(1-k),
		m: (k == 1) ? 0 : (1.0-rgb.g-k)/(1-k),
		y: (k == 1) ? 0 : (1.0-rgb.b-k)/(1-k),
		k: k,
	};
};

Minerva.convert.cmyk2rgb = function(cmyk) {
	return {
		r: 1.0-Math.min(1.0, cmyk.c*(1.0-cmyk.k) + cmyk.k),
		g: 1.0-Math.min(1.0, cmyk.m*(1.0-cmyk.k) + cmyk.k),
		b: 1.0-Math.min(1.0, cmyk.y*(1.0-cmyk.k) + cmyk.k),
	};
};

Minerva.convert.rgb2hsv = function(rgb) {
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

Minerva.convert.hsv2rgb = function(hsv) {
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

Minerva.convert.hsy2rgb = function(hsy) {
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
}

Minerva.convert.rgb2hsy = function(rgb) {
	
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
		s:Math.min(Math.max(s, 0), 1),
		y:Math.min(Math.max(y, 0), 1)
	}
	
};

Minerva.convert.rgb2xyz = function(rgb) {
	var r = rgb.r;
	var g = rgb.g;
	var b = rgb.b;
	
	r = r > 0.04045 ? Math.pow(((r + 0.055) / 1.055), 2.4) : (r / 12.92);
	g = g > 0.04045 ? Math.pow(((g + 0.055) / 1.055), 2.4) : (g / 12.92);
	b = b > 0.04045 ? Math.pow(((b + 0.055) / 1.055), 2.4) : (b / 12.92);
	var x = (r * 0.4124) + (g * 0.3576) + (b * 0.1805);
	var y = (r * 0.2126) + (g * 0.7152) + (b * 0.0722);
	var z = (r * 0.0193) + (g * 0.1192) + (b * 0.9505);
	return {
		x: x,
		y: y,
		z: z,
	}
};

Minerva.convert.rgb2lab = function(rgb) {
	var xyz = Minerva.convert.rgb2xyz(rgb);
	var x = xyz.x / 0.95047;
	var y = xyz.y / 1.0;
	var z = xyz.z / 1.08883;
	x = x > 0.008856 ? Math.pow(x, 1/3) : (7.787 * x) + (16 / 116);
	y = y > 0.008856 ? Math.pow(y, 1/3) : (7.787 * y) + (16 / 116);
	z = z > 0.008856 ? Math.pow(z, 1/3) : (7.787 * z) + (16 / 116);
	var l = (116 * y) - 16;
	var a = 500 * (x - y);
	var b = 200 * (y - z);
	
	//1.0 * lab.L / 100,
    //1.0 * (lab.A + 86.185) / 184.439,
    //1.0 * (lab.B + 107.863) / 202.345);
	
	return {
		l: l,
		a: a,
		b: b,
	}
};

Minerva.convert.lab2xyz = function(lab) {
	var l = lab.l,
		a = lab.a,
		b = lab.b,
		x, y, z, y2;
	
	if (l <= 8) {
		y = (l * 100) / 903.3;
		y2 = (7.787 * (y / 100)) + (16 / 116);
	} else {
		y = 100 * Math.pow((l + 16) / 116, 3);
		y2 = Math.pow(y / 100, 1/3);
	}
	x = x / 95.047 <= 0.008856 ? x = (95.047 * ((a / 500) + y2 - (16 / 116))) / 7.787 : 95.047 * Math.pow((a / 500) + y2, 3);
	z = z / 108.883 <= 0.008859 ? z = (108.883 * (y2 - (b / 200) - (16 / 116))) / 7.787 : 108.883 * Math.pow(y2 - (b / 200), 3);
	
	return {
		x: x / 100,
		y: y / 100,
		z: z / 100,
	}
	
};

Minerva.convert.xyz2rgb = function(xyz) {
	var x = xyz.x,
		y = xyz.y,
		z = xyz.z,
		r, g, b;
	r = (x * 3.2406) + (y * -1.5372) + (z * -0.4986);
	g = (x * -0.9689) + (y * 1.8758) + (z * 0.0415);
	b = (x * 0.0557) + (y * -0.2040) + (z * 1.0570);
	// assume sRGB
	r = r > 0.0031308 ? ((1.055 * Math.pow(r, 1.0 / 2.4)) - 0.055) : (r * 12.92);
	g = g > 0.0031308 ? ((1.055 * Math.pow(g, 1.0 / 2.4)) - 0.055) : (g * 12.92);
	b = b > 0.0031308 ? ((1.055 * Math.pow(b, 1.0 / 2.4)) - 0.055) : (b * 12.92);
	r = Math.min(Math.max(0, r), 1);
	g = Math.min(Math.max(0, g), 1);
	b = Math.min(Math.max(0, b), 1);
	return {
		r : r,
		g : g,
		b : b,
	}
};

Minerva.convert.lab2rgb = function(lab) {
	return Minerva.convert.xyz2rgb(Minerva.convert.lab2xyz(lab));
};

Minerva.convert.rgb2lch = function(rgb) {
	return Minerva.convert.lab2lch(Minerva.convert.rgb2lab(rgb));
};

Minerva.convert.lch2rgb = function(lch) {
	return Minerva.convert.lab2rgb(Minerva.convert.lch2lab(lch));
};


Minerva.convert.lab2lch = function(lab) {
	var l = lab.l,
		a = lab.a,
		b = lab.b,
		hr, h, c;
	hr = Math.atan2(b, a);
	h = hr * 360 / 2 / Math.PI;
	if (h < 0) {
		h += 360;
	}
	c = Math.sqrt(a * a + b * b);
	return {
		l:l,
		c:c,
		h:h
	};
};

Minerva.convert.lch2lab = function(lch) {
	var hr = lch.h / 360 * 2 * Math.PI;
	var a = lch.c * Math.cos(hr);
	var b = lch.c * Math.sin(hr);
	return {
		l:lch.l,
		a:a,
		b:b
	}
};
