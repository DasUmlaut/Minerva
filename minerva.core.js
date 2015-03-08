var Minerva = {};
Minerva.colorModes = {};
Minerva.alphaModes = {};
Minerva.convert = {};
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

Minerva.util.getAverageTotal(img) {
	if (img instanceof Minerva.image) {
		var tR = 0;
		var tG = 0;
		var tB = 0;
		for (i = 0; i < img.width * img.height; i++) {
			var c = img.getColorAt(i);
			tR += c.r;
			tG += c.g;
			tB += c.b;
		}
		return {
			r : tR / (img.width * img.height),
			g : tG / (img.width * img.height),
			b : tB / (img.width * img.height)
		}
	}
};

Minerva.util.getAverageVisible(img) {
	if (img instanceof Minerva.image) {
		var tR = 0;
		var tG = 0;
		var tB = 0;
		var tA = 0;
		for (i = 0; i < img.width * img.height; i++) {
			var c = img.getColorAt(i);
			var a = img.getAlphaAt(i);
			tR += c.r * a.a;
			tG += c.g * a.a;
			tB += c.b * a.a;
			tA += a.a;
		}
		return {
			r : tR / (img.width * img.height) / tA,
			g : tG / (img.width * img.height) / tA,
			b : tB / (img.width * img.height) / tA
		}
	}
};

Minerva.channel = function() {
	
	var data = [];
	this.add = function(val) {
		data.push(val);
	}
	this.set = function(replaceMe) {
		if (replaceMe instanceof Minerva.channel) {
			data = replaceMe.get();
		}
	}
	this.setAt = function(i, color) {
		data[i] = color;
	}
	this.get = function() {
		return data;
	}
	this.getAt = function(i) {
		return data[i];
	}
	
};

Minerva.image = function() {

	this.width = 0;
	this.height = 0;
	
	var cR = new Minerva.channel();
	var cG = new Minerva.channel();
	var cB = new Minerva.channel();
	var cA = new Minerva.channel();
	
	this.getChannel = function(cName) {
		if (cName == "r") {
			return cR;
		} else if (cName == "g") {
			return cG;
		} else if (cName == "b") {
			return cB;
		} else if (cName == "a") {
			return cA;
		}
	}
	
	this.setChannel = function(cName, cData) {
		if (cName == "r") {
			cR = cData;
		} else if (cName == "g") {
			cG = cData;
		} else if (cName == "b") {
			cB = cData;
		} else if (cName == "a") {
			cA = cData;
		}
	}
	
	this.setSize = function(width, height) {
		this.width = width;
		this.height = height;
	}
	
	this.getColorAt = function(i) {
		return {
			r: cR.getAt(i),
			g: cG.getAt(i),
			b: cB.getAt(i),
		}
	}
	
	this.getAlphaAt = function(i) {
		return {
			a: cA.getAt(i)
		}
	}
	
	this.setColorAt = function(i, c) {
		cR.setAt(i, Math.min(1, Math.max(0, c.r)));
		cG.setAt(i, Math.min(1, Math.max(0, c.g)));
		cB.setAt(i, Math.min(1, Math.max(0, c.b)));
	}
	
	this.setAlphaAt = function(i, a) {
		cA.setAt(i, Math.min(1, Math.max(0, a)));
	}
	
	this.fromUrl = function(url) {
		var img = new Image();
		img.src = url;
		this.fromImage(img);
	}

	this.fromImage = function(img) {
		this.width = img.width;
		this.height = img.height;
		
		var canvas = document.createElement("canvas");
		canvas.width = this.width;
		canvas.height = this.height;
		
		var ctx = canvas.getContext('2d');
		ctx.drawImage(img, 0, 0);
		
		var imageData = ctx.getImageData(0, 0, this.width, this.height);
		for (var i = 0; i < imageData.data.length / 4; i++) {
			cR.add(imageData.data[i*4+0] / 255);
			cG.add(imageData.data[i*4+1] / 255);
			cB.add(imageData.data[i*4+2] / 255);
			cA.add(imageData.data[i*4+3] / 255);
		}
	};
	
	this.toCanvas = function() {
		var canvas = document.createElement("canvas");
		canvas.width = this.width;
		canvas.height = this.height;
		var ctx = canvas.getContext('2d');
		var newData = ctx.createImageData(this.width, this.height);
		for (var i = 0; i < newData.data.length / 4; i++) {
			newData.data[i*4+0] = (cR.getAt(i) * 255) & 255;
			newData.data[i*4+1] = (cG.getAt(i) * 255) & 255;
			newData.data[i*4+2] = (cB.getAt(i) * 255) & 255;
			newData.data[i*4+3] = (cA.getAt(i) * 255) & 255;
		}
		ctx.putImageData(newData, 0, 0);
		return canvas;
	};
	
	this.toFileData = function() {
		var canvas = this.toCanvas();
		var dataUrl = canvas.toDataURL();
		return dataUrl.replace("data:image/png;base64,", "");
	};
	
};

Minerva.blend = function(base, blend, colorMode, opacity, mask, alphaMode) {
	
	if (opacity == null) {
		opacity = 1.0;
	}
	
	
	if (colorMode == null) {
		colorMode = "normal";
	}
	if (alphaMode == null) {
		alphaMode = "clip";
	}
	
	var colorBlendFunction = Minerva.colorModes[colorMode];
	var alphaBlendFunction = Minerva.alphaModes[alphaMode];
	
	var baseType = "none";
	var blendType = "none";
	var maskType = "none";
	
	if (base instanceof Minerva.image) {
		baseType = "image";
	} else if (typeof(base) == "number") {
		baseType = "number";
	} else {
		return;
	}
	
	if (blend instanceof Minerva.image) {
		blendType = "image";
		if (mask == null) {
			mask = blend.getChannel("a");
			maskType = "channel";
		}
	} else if (typeof(blend) == "number") {
		blendType = "number";
	} else {
		return;
	}
	
	if (mask instanceof Minerva.channel) {
		maskType = "channel";
	}
	
	if (baseType == "number" && blendType == "number") {
		
		return colorBlendFunction(Minerva.convert.hex2rgb(base), Minerva.convert.hex2rgb(blend));
		
	} else if (baseType == "image" && blendType == "number") {
		var result = new Minerva.image();
		result.setSize(base.width, base.height);
		for (var i = 0; i < (base.width * base.height); i++) {
			var rC = colorBlendFunction(base.getColorAt(i), Minerva.convert.hex2rgb(blend));
			var aV = alphaBlendFunction(base.getAlphaAt(i), 1.0);
			var mV = 1.0;
			if (maskType == "channel") {
				mV = mask.getAt(i) * opacity;
			} else if (maskType == "none") {
				mV = opacity;
			}
			result.setColorAt(i, {
				r: mV * rC.r + (1.0 - mV) * base.getColorAt(i).r,
				g: mV * rC.g + (1.0 - mV) * base.getColorAt(i).g,
				b: mV * rC.b + (1.0 - mV) * base.getColorAt(i).b,
			});
			result.setColorAt(i, mV * base.getColorAt(i) + (1.0 - mV) * rC);
			result.setAlphaAt(i, aV.a);
		}
		return result;
	} else if (baseType == "number" && blendType == "image") {
		var result = new Minerva.image();
		result.setSize(base.width, base.height);
		for (var i = 0; i < (base.width * base.height); i++) {
			var rC = colorBlendFunction(Minerva.convert.hex2rgb(base), blend.getColorAt(i));
			var aV = alphaBlendFunction(1.0, blend.getAlphaAt(i));
			var mV = 1.0;
			if (maskType == "channel") {
				mV = mask.getAt(i) * opacity;
			} else if (maskType == "none") {
				mV = opacity;
			}
			result.setColorAt(i, {
				r: mV * rC.r + (1.0 - mV) * Minerva.convert.hex2rgb(base).r,
				g: mV * rC.g + (1.0 - mV) * Minerva.convert.hex2rgb(base).g,
				b: mV * rC.b + (1.0 - mV) * Minerva.convert.hex2rgb(base).b,
			});
			result.setAlphaAt(i, aV.a);
		}
		return result;
	} else if (baseType == "image" && baseType == "image") {
		if ( (base.width == blend.width) && (base.height == blend.height) ) {
			var result = new Minerva.image();
			result.setSize(base.width, base.height);
			for (var i = 0; i < (base.width * base.height); i++) {
				var rC = colorBlendFunction(base.getColorAt(i), blend.getColorAt(i));
				var aV = alphaBlendFunction(base.getAlphaAt(i), blend.getAlphaAt(i));
				var mV = 1.0;
				if (maskType == "channel") {
					mV = mask.getAt(i) * opacity;
				} else if (maskType == "none") {
					mV = opacity;
				}
				
				//out = alpha * new + (1 - alpha) * old
				result.setColorAt(i, {
					r: mV * rC.r + (1.0 - mV) * base.getColorAt(i).r,
					g: mV * rC.g + (1.0 - mV) * base.getColorAt(i).g,
					b: mV * rC.b + (1.0 - mV) * base.getColorAt(i).b,
				});
				result.setAlphaAt(i, aV.a);
			}
			return result;
		}
	}
	return;
	
};

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
		c: (1.0-rgb.r-k)/(1-k),
		m: (1.0-rgb.g-k)/(1-k),
		y: (1.0-rgb.b-k)/(1-k),
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
		s:Math.min(Math.max(s, 0, 1)),
		y:Math.min(Math.max(y, 0, 1))
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

};
