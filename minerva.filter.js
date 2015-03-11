Minerva.filter = new function() {
	
	/** Needs a parameter checks */
	
	this.gradientMap = function(input, startColor, endColor, params) {
		var defaultSettings = {
			'colorspace': 'hsv',
		};
		var args = {};
		for (var k in defaultSettings) { args[k] = defaultSettings[k]; }
		for (var k in params) { args[k] = params[k]; }
		
		var inputMode = 0;
		if (input instanceof Minerva.Channel) {
			inputMode = 1;
		} else if (input instanceof Minerva.Img) {
			inputMode = 2;
			console.log("Img mapping not yet supported, please use an instance of Minerva.Channel");
			return;
		}
		
		var w = input.width;
		var h = input.height;
		
		var result = new Minerva.Img();
		result.setSize(w, h);
		//var colorS = Minerva.Convert["rgb2"+args.colorspace](Minerva.Convert.hex2rgb(startColor));
		//var colorE = Minerva.Convert["rgb2"+args.colorspace](Minerva.Convert.hex2rgb(endColor));
		
		var tS = Minerva.Convert.hex2rgb(startColor);
		var tE = Minerva.Convert.hex2rgb(endColor);
		
		var colorS;
		var colorE;
		
		if (args.colorspace != "rgb") {
			colorS = Minerva.Convert["rgb2" + args.colorspace]([(tS.r * 255)& 255, (tS.g * 255)& 255, (tS.b * 255)& 255]);
			colorE = Minerva.Convert["rgb2" + args.colorspace]([(tE.r * 255)& 255, (tE.g * 255)& 255, (tE.b * 255)& 255]);
		} else {
			colorS = [(tS.r * 255)& 255, (tS.g * 255)& 255, (tS.b * 255)& 255];
			colorE = [(tE.r * 255)& 255, (tE.g * 255)& 255, (tE.b * 255)& 255];
		}
		
		for (var x = 0; x < w; x++) {
			for (var y = 0; y < h; y++) {
				
				var i = input.getAt((y*w)+x);
				//LERP
				var p = [];
				for (var c = 0; c < colorS.length; c++) {
					var e = Minerva.Helper.lerp(i, colorS[c], colorE[c]);
					p[c] = e;
				}
				var rgb = [];
				if (args.colorspace != "rgb") {
					rgb = Minerva.Convert[args.colorspace+"2rgb"](p);
				} else {
					rgb = [p[0], p[1], p[2]];
				}
				result.setColorAt((y*w)+x, {r : rgb[0]/255, g: rgb[1]/255, b: rgb[2]/255 });
				result.setAlphaAt((y*w)+x, 1);
				
			}
		}
		
		return result;
		
	};
	
};
