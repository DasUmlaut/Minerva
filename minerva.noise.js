Minerva.noise = new function() {
	
	var lib = {
		'seed': 0,
		'perm': [ 151, 160, 137, 91, 90, 15, 131, 13, 201, 95, 96, 53, 194, 233, 7, 225, 140, 36, 103, 30, 69, 142, 8, 99, 37, 240, 21, 10, 23, 190, 6, 148, 247, 120, 234, 75, 0, 26, 197, 62, 94, 252, 219, 203, 117, 35, 11, 32, 57, 177, 33, 88, 237, 149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175, 74, 165, 71, 134, 139, 48, 27, 166, 77, 146, 158, 231, 83, 111, 229, 122, 60, 211, 133, 230, 220, 105, 92, 41, 55, 46, 245, 40, 244, 102, 143, 54, 65, 25, 63, 161, 1, 216, 80, 73, 209, 76, 132, 187, 208, 89, 18, 169, 200, 196, 135, 130, 116, 188, 159, 86, 164, 100, 109, 198, 173, 186, 3, 64, 52, 217, 226, 250, 124, 123, 5, 202, 38, 147, 118, 126, 255, 82, 85, 212, 207, 206, 59, 227, 47, 16, 58, 17, 182, 189, 28, 42, 223, 183, 170, 213, 119, 248, 152, 2, 44, 154, 163, 70, 221, 153, 101, 155, 167, 43, 172, 9, 129, 22, 39, 253, 19, 98, 108, 110, 79, 113, 224, 232, 178, 185, 112, 104, 218, 246, 97, 228, 251, 34, 242, 193, 238, 210, 144, 12, 191, 179, 162, 241, 81, 51, 145, 235, 249, 14, 239, 107, 49, 192, 214, 31, 181, 199, 106, 157, 184, 84, 204, 176, 115, 121, 50, 45, 127, 4, 150, 254, 138, 236, 205, 93, 222, 114, 67, 29, 24, 72, 243, 141, 128, 195, 78, 66, 215, 61, 156, 180, 151, 160, 137, 91, 90, 15, 131, 13, 201, 95, 96, 53, 194, 233, 7, 225, 140, 36, 103, 30, 69, 142, 8, 99, 37, 240, 21, 10, 23, 190, 6, 148, 247, 120, 234, 75, 0, 26, 197, 62, 94, 252, 219, 203, 117, 35, 11, 32, 57, 177, 33, 88, 237, 149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175, 74, 165, 71, 134, 139, 48, 27, 166, 77, 146, 158, 231, 83, 111, 229, 122, 60, 211, 133, 230, 220, 105, 92, 41, 55, 46, 245, 40, 244, 102, 143, 54, 65, 25, 63, 161, 1, 216, 80, 73, 209, 76, 132, 187, 208, 89, 18, 169, 200, 196, 135, 130, 116, 188, 159, 86, 164, 100, 109, 198, 173, 186, 3, 64, 52, 217, 226, 250, 124, 123, 5, 202, 38, 147, 118, 126, 255, 82, 85, 212, 207, 206, 59, 227, 47, 16, 58, 17, 182, 189, 28, 42, 223, 183, 170, 213, 119, 248, 152, 2, 44, 154, 163, 70, 221, 153, 101, 155, 167, 43, 172, 9, 129, 22, 39, 253, 19, 98, 108, 110, 79, 113, 224, 232, 178, 185, 112, 104, 218, 246, 97, 228, 251, 34, 242, 193, 238, 210, 144, 12, 191, 179, 162, 241, 81, 51, 145, 235, 249, 14, 239, 107, 49, 192, 214, 31, 181, 199, 106, 157, 184, 84, 204, 176, 115, 121, 50, 45, 127, 4, 150, 254, 138, 236, 205, 93, 222, 114, 67, 29, 24, 72, 243, 141, 128, 195, 78, 66, 215, 61, 156, 180 ],
		'permMod8' : [],
		'igrad': [ [1, 1], [-1, 1], [1, -1], [-1, -1], [1, 0], [-1, 0], [0, 1], [0, -1] ],
	};
	
	var helper = {
		'setSeed': function(seed) {
			lib.seed = seed;
		},
		'random': function() {
			lib.seed = (lib.seed * 9301 + 49297) % 233280;
			var rnd = lib.seed / 233280.0;
			return rnd;
		},
		'permutate': function(size) {
			var t = [];
			var u = [];
			
			for (i = 0; i < size*2; i++) {
				var v = Math.round(helper.random() * 255) & 255;
				t[i] = v;
				u[i] = v % 8;
			}
			lib.perm = t.concat(t);
			lib.permMod8 = u.concat(u);
		},
		'grad2': function(hash, x, y) {
			var h = hash & 7;
			var u = h<4 ? x : y;
			var v = h<4 ? y : x;
			return ((h&1)?-u : u) + ((h&2)?-2*v : 2*v);
		},
		'fade': function(t) {
			return  t * t * t * ( t * ( t * 6 - 15 ) + 10 );
		},
		'lerp': function(t, a, b) {
			return (a) + (t)*((b)-(a));
		},
	};
	
	var noiseFNs = {
		'random': function(x, y, px, py, args) {
			var n = helper.random() * 2 - 1;
			return n;
		},
		'classicperlin': function(x, y, px, py, args) {
			
			var bx0, bx1, by0, by1, b00, b01, b10, b11, rx0, rx1, ry0, ry1, sx, sy, a, b, t, u, v, i, j;
			var perm = lib.perm;
			bx0 = Math.floor(x) % px;
			bx1 = (bx0 + 1) % py;
			rx0 = x - Math.floor(x);
			rx1 = rx0 - 1;
			by0 = Math.floor(y) % px;
			by1 = (by0 + 1) % py;
			ry0 = y - Math.floor(y);
			ry1 = ry0 - 1;
			i = perm[bx0];
			j = perm[bx1];
			b00 = perm[i + by0];
			b10 = perm[j + by0];
			b01 = perm[i + by1];
			b11 = perm[j + by1];
			sx = helper.fade(rx0);
			sy = helper.fade(ry0);
			u = helper.grad2(b00, rx0, ry0);
			v = helper.grad2(b10, rx1, ry0);
			a = helper.lerp(sx, u, v);
			u = helper.grad2(b01, rx0, ry1);
			v = helper.grad2(b11, rx1, ry1);
			b = helper.lerp(sx, u, v);
			return 0.5 * (1 + helper.lerp(sy, a, b));
		},
		'improvedperlin': function(x, y, px, py, args) {
			var bx0, bx1, by0, by1, b00, b01, b10, b11, rx0, rx1, ry0, ry1, sx, sy, a, b, t, u, v, i, j;
			var perm = lib.perm;
			var permMod8 = lib.permMod8;
			var igrad = lib.igrad;
			
			bx0 = Math.floor(x) % px;
			bx1 = (bx0 + 1) % py;
			rx0 = x - Math.floor(x);
			rx1 = rx0 - 1;
			by0 = Math.floor(y) % px;
			by1 = (by0 + 1) % py;
			ry0 = y - Math.floor(y);
			ry1 = ry0 - 1;
			i = perm[bx0];
			j = perm[bx1];
			b00 = permMod8[i + by0];
			b10 = permMod8[j + by0];
			b01 = permMod8[i + by1];
			b11 = permMod8[j + by1];
			sx = helper.fade(rx0);
			sy = helper.fade(ry0);
			u = rx0 * igrad[b00][0] + ry0 * igrad[b00][1];
			v = rx1 * igrad[b10][0] + ry0 * igrad[b10][1];
			a = helper.lerp(sx, u, v);
			u = rx0 * igrad[b01][0] + ry1 * igrad[b01][1];
			v = rx1 * igrad[b11][0] + ry1 * igrad[b11][1];
			b = helper.lerp(sx, u, v);
			return 0.5 * (1 + helper.lerp(sy, a, b));
		}
	};
	
	var octaveFNs = {
		'additive': function(n, v, args) {
			return n + v;
		},
		'subtractive': function(n, v, args) {
			return n - v;
		},
		'turbulence': function(n, v, args) {
			var r = Math.abs(v);
			return (n+ Math.abs(v));
		},
	};
	
	var fractalFNs = {
		'none': function(noiseType, x, y, pw, ph, args) {
			var n = noiseFNs[noiseType](x, y, pw, ph, args);
			return summationFNs[args.sumationType](n, args);
		},
		'fBM': function(noiseType, x, y, pw, ph, args) {
			var curPersistence = 1;
			var n = 0;
			for (var o = 0; o < args.octaves; o++) {
				var signal = noiseFNs[noiseType](x, y, pw, ph, args);
				n = octaveFNs[args.octaveType](n, signal * curPersistence);
				x *= args.fbmLacunarity;
				y *= args.fbmLacunarity;
				pw *= args.fbmLacunarity;
				ph *= args.fbmLacunarity;
				curPersistence *= args.fbmPersistence;
			}
			return summationFNs[args.sumationType](n, args);
		},
	};
	
	var summationFNs = {
		'normal': function(n, args) {
			return (n / 2)+0.5;
		},
		'absolute': function(n, args) {
			return Math.abs(n);
		},
		'modular': function(n, args) {
			return (n + 1) % 1;
		},
		'threshold': function(n, args) {
			return (n > 0 ? 1 : 0);
		},
	};
	
	var defaultSettings = {
		
		//colors
		'color': 'grayscale',
		
		'noiseType': 'improvedperlin',
		'fractalType': 'fBM',
		'octaveType': 'additive',
		'sumationType': 'normal',
		
		'scale': 1,
		'seed': 1,
		'octaves': 5,
		
		//fBM
		'fbmLacunarity': 2,
		'fbmPersistence': 0.5,
	};

	function noise(noiseType, fractalType, x, y, pw, ph, args) {
		return fractalFNs[fractalType](noiseType, x, y, pw, ph, args);
	}
	
	this.generateChannel = function(w, h, params) {
		args = {};
		for (var k in defaultSettings) { args[k] = defaultSettings[k]; }
		for (var k in params) { args[k] = params[k]; }
		args.width = w;
		args.height = h;
		if (args.seed == 0) {
			helper.setSeed(Math.random());
		} else {
			helper.setSeed(args.seed);
		}
		var scale = 1/64;
		var pw = w;
		var ph = h;
		
		var result = new Minerva.Channel();
		result.setSize(w, h);

		var noiseValues = [];
		helper.permutate(Math.sqrt(pw * ph));
		
		var theMax = -1000;
		var theMin = 1000;
		
		for (var x = 0; x < w; x++) {
			noiseValues[x] = [];
			for (var y = 0; y < h; y++) {
				var val = fractalFNs[args.fractalType](args.noiseType, scale*x, scale*y, scale*pw, scale*ph, args);
				noiseValues[x][y] = val;
				theMin = Math.min(theMin, val);
				theMax = Math.max(theMax, val);
			}
		}
		
		var rng = theMax - theMin;
		
		for (var x = 0; x < w; x++) {
			for (var y = 0; y < h; y++) {
				result.setAt((y*h)+x, (noiseValues[0][x][y] - theMin) / rng);
			}
		}
		
		return result;
		
	}
	
	this.generate = function(w, h, params) {
		
		var theMax = -1000;
		var theMin = 1000;
		
		var result = new Minerva.Img();
		result.setSize(w, h);
		
		args = {};
		for (var k in defaultSettings) { args[k] = defaultSettings[k]; }
		for (var k in params) { args[k] = params[k]; }
		
		args.width = w;
		args.height = h;
		
		if (args.seed == 0) {
			helper.setSeed(Math.random());
		} else {
			helper.setSeed(args.seed);
		}
		
		var scale = 1/64;
		
		var pw = w;
		var ph = h;
		
		var channels = 1;
		if (args.color == "rgb") {
			channels = 3;
		} else if (args.color == "rgba") {
			channels = 4;
		}
		
		var noiseValues = [];
		
		for (var c = 0; c < channels; c++) {
			helper.permutate(Math.sqrt(pw * ph));
			noiseValues[c] = [];
			for (var x = 0; x < w; x++) {
				noiseValues[c][x] = [];
				for (var y = 0; y < h; y++) {
					var val = fractalFNs[args.fractalType](args.noiseType, scale*x, scale*y, scale*pw, scale*ph, args);
					noiseValues[c][x][y] = val;
					theMin = Math.min(theMin, val);
					theMax = Math.max(theMax, val);
				}
			}
		}
		
		var rng = theMax - theMin;
		
		for (var x = 0; x < w; x++) {
			for (var y = 0; y < h; y++) {
				var red = 0;
				var green = 0;
				var blue = 0;
				var alpha = 1;
				if (args.color == "grayscale") {
					red = (noiseValues[0][x][y] - theMin) / rng;
					green = (noiseValues[0][x][y] - theMin) / rng;
					blue = (noiseValues[0][x][y] - theMin) / rng;
				} else if (args.color == "rgb") {
					red = (noiseValues[0][x][y] - theMin) / rng;
					green = (noiseValues[1][x][y] - theMin) / rng;
					blue = (noiseValues[2][x][y] - theMin) / rng;
				} else if (args.color == "rgba") {
					red = (noiseValues[0][x][y] - theMin) / rng;
					green = (noiseValues[1][x][y] - theMin) / rng;
					blue = (noiseValues[2][x][y] - theMin) / rng;
					alpha = (noiseValues[3][x][y] - theMin) / rng;
				}
				result.setColorAt((y*h)+x, {r:red, g:green, b:blue});
				result.setAlphaAt((y*h)+x, alpha);
			}
		}

		
		/*
		var col = {
					r : val,
					g : val,
					b : val
				};
				result.setColorAt((y*h)+x, col);
				result.setAlphaAt((y*h)+x, 1);
		*/
		
		return result;
		
	}
	
};
