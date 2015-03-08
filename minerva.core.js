var Minerva = {};
Minerva.blendmodes = {};
Minerva.mixmodes = {};
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

Minerva.util.getAverageTotal = function(img) {
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

Minerva.util.getAverageVisible = function(img) {
	if (img instanceof Minerva.image) {
		var tR = 0;
		var tG = 0;
		var tB = 0;
		var tA = 0;
		for (i = 0; i < img.width * img.height; i++) {
			var c = img.getColorAt(i);
			var a = img.getAlphaAt(i);
			tR += c.r * a;
			tG += c.g * a;
			tB += c.b * a;
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
		return cA.getAt(i);
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
	
	colorMode = colorMode.toLowerCase();
	alphaMode = alphaMode.toLowerCase();
	
	var colorBlendFunction = Minerva.blendmodes.normal;
	var alphaBlendFunction = Minerva.blendmodes.clip;
	
	var whichBlendMode = "b";
	
	if (colorMode != null) {
		if (hasOwnProperty.call(Minerva.blendmodes, colorMode)) {
			colorBlendFunction = Minerva.blendmodes[colorMode];
		} else if (hasOwnProperty.call(Minerva.mixmodes, colorMode)) {
			colorBlendFunction = Minerva.mixmodes[colorMode];
			whichBlendMode = "m";
		}
	}
	
	if (alphaMode != null) {
		if (hasOwnProperty.call(Minerva.blendmodes, alphaMode)) {
			alphaBlendFunction = Minerva.blendmodes[alphaMode];
		}
	}
	
	var baseType = 0;
	var blendType = 0;
	var maskType = 0;
	
	if (base instanceof Minerva.image) {
		baseType = 2;
	} else if (typeof(base) == "number") {
		baseType = 1;
	} else {
		return;
	}
	
	if (blend instanceof Minerva.image) {
		blendType = 2;
		if (mask == null) {
			mask = blend.getChannel("a");
			maskType = 1;
		}
	} else if (typeof(blend) == "number") {
		blendType = 1;
	} else {
		return;
	}
	
	if (mask instanceof Minerva.channel) {
		maskType = 1;
	}
	
	if (baseType == 1 && blendType == 1) {
		
		var rC = {};
		var cBase = Minerva.convert.hex2rgb(base);
		var cBlend = Minerva.convert.hex2rgb(blend);
		if (whichBlendMode == "b") {
			rC = {
				r: colorBlendFunction(cBase.r, cBlend.r),
				g: colorBlendFunction(cBase.g, cBlend.g),
				b: colorBlendFunction(cBase.b, cBlend.b),
			};
		} else {
			rC = colorBlendFunction(cBase, cBlend);
		}
		return rC;
		
	} else if (baseType == 2 && blendType == 1) {
		var result = new Minerva.image();
		result.setSize(base.width, base.height);
		for (var i = 0; i < (base.width * base.height); i++) {
			var rC = {};
			var cBase = base.getColorAt(i);
			var cBlend = Minerva.convert.hex2rgb(blend);
			if (whichBlendMode == "b") {
				rC = {
					r: colorBlendFunction(cBase.r, cBlend.r),
					g: colorBlendFunction(cBase.g, cBlend.g),
					b: colorBlendFunction(cBase.b, cBlend.b),
				};
			} else {
				rC = colorBlendFunction(cBase, cBlend);
			}
			var aV = alphaBlendFunction(base.getAlphaAt(i), 1.0);
			var mV = 1.0;
			if (maskType == 1) {
				mV = mask.getAt(i) * opacity;
			} else if (maskType == 0) {
				mV = opacity;
			}
			result.setColorAt(i, {
				r: mV * rC.r + (1.0 - mV) * base.getColorAt(i).r,
				g: mV * rC.g + (1.0 - mV) * base.getColorAt(i).g,
				b: mV * rC.b + (1.0 - mV) * base.getColorAt(i).b,
			});
			//result.setColorAt(i, mV * base.getColorAt(i) + (1.0 - mV) * rC);
			result.setAlphaAt(i, aV);
		}
		return result;
	} else if (baseType == 1 && blendType == 2) {
		var result = new Minerva.image();
		result.setSize(base.width, base.height);
		for (var i = 0; i < (base.width * base.height); i++) {
			var rC = {};
			var cBase = Minerva.convert.hex2rgb(base);
			var cBlend = blend.getColorAt(i);
			if (whichBlendMode == "b") {
				rC = {
					r: colorBlendFunction(cBase.r, cBlend.r),
					g: colorBlendFunction(cBase.g, cBlend.g),
					b: colorBlendFunction(cBase.b, cBlend.b),
				};
			} else {
				rC = colorBlendFunction(cBase, cBlend);
			}
			var aV = alphaBlendFunction(1.0, blend.getAlphaAt(i));
			var mV = 1.0;
			if (maskType == 1) {
				mV = mask.getAt(i) * opacity;
			} else if (maskType == 0) {
				mV = opacity;
			}
			result.setColorAt(i, {
				r: mV * rC.r + (1.0 - mV) * Minerva.convert.hex2rgb(base).r,
				g: mV * rC.g + (1.0 - mV) * Minerva.convert.hex2rgb(base).g,
				b: mV * rC.b + (1.0 - mV) * Minerva.convert.hex2rgb(base).b,
			});
			result.setAlphaAt(i, aV);
		}
		return result;
	} else if (baseType == 2 && baseType == 2) {
		if ( (base.width == blend.width) && (base.height == blend.height) ) {
			var result = new Minerva.image();
			result.setSize(base.width, base.height);
			for (var i = 0; i < (base.width * base.height); i++) {
				
				var rC = {};
				var cBase = base.getColorAt(i);
				var cBlend = blend.getColorAt(i);
				if (whichBlendMode == "b") {
					rC = {
						r: colorBlendFunction(cBase.r, cBlend.r),
						g: colorBlendFunction(cBase.g, cBlend.g),
						b: colorBlendFunction(cBase.b, cBlend.b),
					};
				} else {
					rC = colorBlendFunction(cBase, cBlend);
				}
				
				var aV = alphaBlendFunction(base.getAlphaAt(i), blend.getAlphaAt(i));
				var mV = 1.0;
				if (maskType == 1) {
					mV = mask.getAt(i) * opacity;
				} else if (maskType == 1) {
					mV = opacity;
				}
				
				//out = alpha * new + (1 - alpha) * old
				result.setColorAt(i, {
					r: mV * rC.r + (1.0 - mV) * base.getColorAt(i).r,
					g: mV * rC.g + (1.0 - mV) * base.getColorAt(i).g,
					b: mV * rC.b + (1.0 - mV) * base.getColorAt(i).b,
				});
				result.setAlphaAt(i, aV);
			}
			return result;
		}
	}
	return;
	
};

