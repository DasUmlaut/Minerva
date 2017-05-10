var Minerva = new function() {
	
	var queue = [];
	var map = {};
	
	this.Utility = {};
	this.Helper = {
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
	
	this.Utility.getAverageTotal = function(img) {
		if (img instanceof Minerva.Img) {
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
	
	this.Utility.getAverageVisible = function(img) {
		if (img instanceof Minerva.Img) {
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
	
	this.preload = function(url) {
		if (typeof(url) == "string") {
			queue.push(url);
		} else if (Array.isArray(url)) {
			for (var i = 0; i < url.length; i++) {
				queue.push(url[i]);
			}
		}
	}
	
	this.getPreloadedImages = function() {
		return map;
	}
	
	this.onPreloaded = function(callback) {
		var loaded = 0;
		var inc = function() {
			loaded++;
			if (loaded == queue.length) {
				callback();
			}
		};
		for (var i = 0; i < queue.length; i++) {
			var theImage = new Image();
			theImage.addEventListener("load", inc);
			theImage.src = queue[i];
			map[queue[i]] = theImage;
		}
	}
	
	this.Channel = function() {
		var data = [];
		this.width = 0;
		this.height = 0;
		this.add = function(val) {
			data.push(val);
		}
		this.set = function(replaceMe) {
			if (replaceMe instanceof Minerva.Channel) {
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
		this.setSize = function(w, h) {
			this.width = w;
			this.height = h;
		}
	}; //end channel
	
	this.Img = function(val) {
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
		this.setSize = function(w, h) {
			this.width = w;
			this.height = h;
			cR.setSize(w, h);
			cG.setSize(w, h);
			cB.setSize(w, h);
			cA.setSize(w, h);
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
		this.fromImage = function(img) {
			this.width = img.width;
			this.height = img.height;
			cR.setSize(img.width, img.height);
			cG.setSize(img.width, img.height);
			cB.setSize(img.width, img.height);
			cA.setSize(img.width, img.height);
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
		this.fromUrl = function(url) {
			var img = new Image();
			img.src = url;
			this.fromImage(img);
		}
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
			return dataUrl.replace("data:image/png;baseData64,", "");
		};
		this.width = 0;
		this.height = 0;
		var cR = new Minerva.Channel();
		var cG = new Minerva.Channel();
		var cB = new Minerva.Channel();
		var cA = new Minerva.Channel();
		
		//Constructor
		if (val == null) {
			
		} else {
			if (typeof(val) == "string") {
				this.fromUrl(val);
			} else if (val instanceof Image) {
				this.fromImage(val);
			}
		}
	}; //end image
	
	var settings = {
		lumaR: 0.3,
		lumaG: 0.59,
		lumaB: 0.11,
	};
	
	this.Convert = {
		hex2rgb:function(hex) {
			var r = (hex >> 16) & 255;
			var g = (hex >> 8) & 255;
			var b = hex & 255;
			return {
				r: r / 255,
				g: g / 255,
				b: b / 255
			};
		},
		
		rgb2hex:function(rgb) {
			var bin = rgb[0] << 16 | rgb[1] << 8 | rgb[2];
			return (function(h){
				return new Array(7-h.length).join("0")+h
			})(bin.toString(16).toUpperCase());
		},
		
		rgb2hsl:function(rgb) {
		  var r = rgb[0]/255,
			  g = rgb[1]/255,
			  b = rgb[2]/255,
			  min = Math.min(r, g, b),
			  max = Math.max(r, g, b),
			  delta = max - min,
			  h, s, l;

		  if (max == min)
			h = 0;
		  else if (r == max)
			h = (g - b) / delta;
		  else if (g == max)
			h = 2 + (b - r) / delta;
		  else if (b == max)
			h = 4 + (r - g)/ delta;

		  h = Math.min(h * 60, 360);

		  if (h < 0)
			h += 360;

		  l = (min + max) / 2;

		  if (max == min)
			s = 0;
		  else if (l <= 0.5)
			s = delta / (max + min);
		  else
			s = delta / (2 - max - min);

		  return [h, s * 100, l * 100];
		},
		rgb2hsv:function(rgb) {
		  var r = rgb[0],
			  g = rgb[1],
			  b = rgb[2],
			  min = Math.min(r, g, b),
			  max = Math.max(r, g, b),
			  delta = max - min,
			  h, s, v;

		  if (max == 0)
			s = 0;
		  else
			s = (delta/max * 1000)/10;
		  if (max == min)
			h = 0;
		  else if (r == max)
			h = (g - b) / delta;
		  else if (g == max)
			h = 2 + (b - r) / delta;
		  else if (b == max)
			h = 4 + (r - g) / delta;

		  h = Math.min(h * 60, 360);

		  if (h < 0)
			h += 360;

		  v = ((max / 255) * 1000) / 10;

		  return [h, s, v];
		},
		rgb2hwb:function(rgb) {
		  var r = rgb[0],
			  g = rgb[1],
			  b = rgb[2],
			  h = Minerva.Convert.rgb2hsl(rgb)[0],
			  w = 1/255 * Math.min(r, Math.min(g, b)),
			  b = 1 - 1/255 * Math.max(r, Math.max(g, b));

		  return [h, w * 100, b * 100];
		},
		rgb2cmyk:function(rgb) {
		  var r = rgb[0] / 255,
			  g = rgb[1] / 255,
			  b = rgb[2] / 255,
			  c, m, y, k;

		  k = Math.min(1 - r, 1 - g, 1 - b);
		  c = (1 - r - k) / (1 - k) || 0;
		  m = (1 - g - k) / (1 - k) || 0;
		  y = (1 - b - k) / (1 - k) || 0;
		  return [c * 100, m * 100, y * 100, k * 100];
		},
		rgb2xyz:function(rgb) {
		  var r = rgb[0] / 255,
			  g = rgb[1] / 255,
			  b = rgb[2] / 255;

		  // assume sRGB
		  r = r > 0.04045 ? Math.pow(((r + 0.055) / 1.055), 2.4) : (r / 12.92);
		  g = g > 0.04045 ? Math.pow(((g + 0.055) / 1.055), 2.4) : (g / 12.92);
		  b = b > 0.04045 ? Math.pow(((b + 0.055) / 1.055), 2.4) : (b / 12.92);

		  var x = (r * 0.4124) + (g * 0.3576) + (b * 0.1805);
		  var y = (r * 0.2126) + (g * 0.7152) + (b * 0.0722);
		  var z = (r * 0.0193) + (g * 0.1192) + (b * 0.9505);

		  return [x * 100, y *100, z * 100];
		},
		rgb2lab:function(rgb) {
		  var xyz = Minerva.Convert.rgb2xyz(rgb),
				x = xyz[0],
				y = xyz[1],
				z = xyz[2],
				l, a, b;

		  x /= 95.047;
		  y /= 100;
		  z /= 108.883;

		  x = x > 0.008856 ? Math.pow(x, 1/3) : (7.787 * x) + (16 / 116);
		  y = y > 0.008856 ? Math.pow(y, 1/3) : (7.787 * y) + (16 / 116);
		  z = z > 0.008856 ? Math.pow(z, 1/3) : (7.787 * z) + (16 / 116);

		  l = (116 * y) - 16;
		  a = 500 * (x - y);
		  b = 200 * (y - z);

		  return [l, a, b];
		},
		rgb2lch:function(args) {
		  return Minerva.Convert.lab2lch(Minerva.Convert.rgb2lab(args));
		},
		hsl2rgb:function(hsl) {
		  var h = hsl[0] / 360,
			  s = hsl[1] / 100,
			  l = hsl[2] / 100,
			  t1, t2, t3, rgb, val;

		  if (s == 0) {
			val = (l * 255) & 255;
			return [val, val, val];
		  }

		  if (l < 0.5)
			t2 = l * (1 + s);
		  else
			t2 = l + s - l * s;
		  t1 = 2 * l - t2;

		  rgb = [0, 0, 0];
		  for (var i = 0; i < 3; i++) {
			t3 = h + 1 / 3 * - (i - 1);
			t3 < 0 && t3++;
			t3 > 1 && t3--;

			if (6 * t3 < 1)
			  val = t1 + (t2 - t1) * 6 * t3;
			else if (2 * t3 < 1)
			  val = t2;
			else if (3 * t3 < 2)
			  val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
			else
			  val = t1;

			rgb[i] = Math.round(val * 255) & 255;
		  }

		  return rgb;
		},
		hsl2hsv:function(hsl) {
		  var h = hsl[0],
			  s = hsl[1] / 100,
			  l = hsl[2] / 100,
			  sv, v;
		  l *= 2;
		  s *= (l <= 1) ? l : 2 - l;
		  v = (l + s) / 2;
		  sv = (2 * s) / (l + s);
		  return [h, sv * 100, v * 100];
		},
		hsl2hwb:function(args) {
		  return Minerva.Convert.rgb2hwb(Minerva.Convert.hsl2rgb(args));
		},

		hsl2cmyk:function(args) {
		  return Minerva.Convert.rgb2cmyk(Minerva.Convert.hsl2rgb(args));
		},
		hsv2rgb:function(hsv) {
		  var h = hsv[0] / 60,
			  s = hsv[1] / 100,
			  v = hsv[2] / 100,
			  hi = Math.floor(h) % 6;

		  var f = h - Math.floor(h),
			  p = 255 * v * (1 - s),
			  q = 255 * v * (1 - (s * f)),
			  t = 255 * v * (1 - (s * (1 - f))),
			  v = 255 * v;

		  switch(hi) {
			case 0:
			  return [v, t, p];
			case 1:
			  return [q, v, p];
			case 2:
			  return [p, v, t];
			case 3:
			  return [p, q, v];
			case 4:
			  return [t, p, v];
			case 5:
			  return [v, p, q];
		  }
		},
		hsv2hsl:function(hsv) {
		  var h = hsv[0],
			  s = hsv[1] / 100,
			  v = hsv[2] / 100,
			  sl, l;

		  l = (2 - s) * v;
		  sl = s * v;
		  sl /= (l <= 1) ? l : 2 - l;
		  sl = sl || 0;
		  l /= 2;
		  return [h, sl * 100, l * 100];
		},
		hsv2hwb:function(args) {
		  return Minerva.Convert.rgb2hwb(Minerva.Convert.hsv2rgb(args))
		},
		hsv2cmyk:function(args) {
		  return Minerva.Convert.rgb2cmyk(Minerva.Convert.hsv2rgb(args));
		},
		hwb2rgb:function(hwb) {
		  var h = hwb[0] / 360,
			  wh = hwb[1] / 100,
			  bl = hwb[2] / 100,
			  ratio = wh + bl,
			  i, v, f, n;

		  // wh + bl cant be > 1
		  if (ratio > 1) {
			wh /= ratio;
			bl /= ratio;
		  }

		  i = Math.floor(6 * h);
		  v = 1 - bl;
		  f = 6 * h - i;
		  if ((i & 0x01) != 0) {
			f = 1 - f;
		  }
		  n = wh + f * (v - wh);  // linear interpolation

		  switch (i) {
			default:
			case 6:
			case 0: r = v; g = n; b = wh; break;
			case 1: r = n; g = v; b = wh; break;
			case 2: r = wh; g = v; b = n; break;
			case 3: r = wh; g = n; b = v; break;
			case 4: r = n; g = wh; b = v; break;
			case 5: r = v; g = wh; b = n; break;
		  }

		  return [Math.round(r * 255) & 255, Math.round(g * 255) & 255, Math.round(b * 255) & 255];
		},

		hwb2hsl:function(args) {
		  return Minerva.Convert.rgb2hsl(Minerva.Convert.hwb2rgb(args));
		},

		hwb2hsv:function(args) {
		  return Minerva.Convert.rgb2hsv(Minerva.Convert.hwb2rgb(args));
		},

		hwb2cmyk:function(args) {
		  return Minerva.Convert.rgb2cmyk(Minerva.Convert.hwb2rgb(args));
		},

		cmyk2rgb:function(cmyk) {
		  var c = cmyk[0] / 100,
			  m = cmyk[1] / 100,
			  y = cmyk[2] / 100,
			  k = cmyk[3] / 100,
			  r, g, b;

		  r = 1 - Math.min(1, c * (1 - k) + k);
		  g = 1 - Math.min(1, m * (1 - k) + k);
		  b = 1 - Math.min(1, y * (1 - k) + k);
		  return [Math.round(r * 255) & 255, Math.round(g * 255) & 255, Math.round(b * 255) & 255];
		},

		cmyk2hsl:function(args) {
		  return Minerva.Convert.rgb2hsl(Minerva.Convert.cmyk2rgb(args));
		},

		cmyk2hsv:function(args) {
		  return Minerva.Convert.rgb2hsv(Minerva.Convert.cmyk2rgb(args));
		},

		cmyk2hwb:function(args) {
		  return Minerva.Convert.rgb2hwb(Minerva.Convert.cmyk2rgb(args));
		},
		xyz2rgb:function(xyz) {
		  var x = xyz[0] / 100,
			  y = xyz[1] / 100,
			  z = xyz[2] / 100,
			  r, g, b;

		  r = (x * 3.2406) + (y * -1.5372) + (z * -0.4986);
		  g = (x * -0.9689) + (y * 1.8758) + (z * 0.0415);
		  b = (x * 0.0557) + (y * -0.2040) + (z * 1.0570);

		  // assume sRGB
		  r = r > 0.0031308 ? ((1.055 * Math.pow(r, 1.0 / 2.4)) - 0.055)
			: r = (r * 12.92);

		  g = g > 0.0031308 ? ((1.055 * Math.pow(g, 1.0 / 2.4)) - 0.055)
			: g = (g * 12.92);

		  b = b > 0.0031308 ? ((1.055 * Math.pow(b, 1.0 / 2.4)) - 0.055)
			: b = (b * 12.92);

		  r = Math.min(Math.max(0, r), 1);
		  g = Math.min(Math.max(0, g), 1);
		  b = Math.min(Math.max(0, b), 1);

		  return [Math.round(r * 255) & 255, Math.round(g * 255) & 255, Math.round(b * 255) & 255];
		},
		xyz2lab:function(xyz) {
		  var x = xyz[0],
			  y = xyz[1],
			  z = xyz[2],
			  l, a, b;

		  x /= 95.047;
		  y /= 100;
		  z /= 108.883;

		  x = x > 0.008856 ? Math.pow(x, 1/3) : (7.787 * x) + (16 / 116);
		  y = y > 0.008856 ? Math.pow(y, 1/3) : (7.787 * y) + (16 / 116);
		  z = z > 0.008856 ? Math.pow(z, 1/3) : (7.787 * z) + (16 / 116);

		  l = (116 * y) - 16;
		  a = 500 * (x - y);
		  b = 200 * (y - z);

		  return [l, a, b];
		},

		xyz2lch:function(args) {
		  return Minerva.Convert.lab2lch(Minerva.Convert.xyz2lab(args));
		},

		lab2xyz:function(lab) {
		  var l = lab[0],
			  a = lab[1],
			  b = lab[2],
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

		  return [x, y, z];
		},

		lab2lch:function(lab) {
		  var l = lab[0],
			  a = lab[1],
			  b = lab[2],
			  hr, h, c;

		  hr = Math.atan2(b, a);
		  h = hr * 360 / 2 / Math.PI;
		  if (h < 0) {
			h += 360;
		  }
		  c = Math.sqrt(a * a + b * b);
		  return [l, c, h];
		},

		lab2rgb:function(args) {
		  return Minerva.Convert.xyz2rgb(Minerva.Convert.lab2xyz(args));
		},

		lch2lab:function(lch) {
		  var l = lch[0],
			  c = lch[1],
			  h = lch[2],
			  a, b, hr;

		  hr = h / 360 * 2 * Math.PI;
		  a = c * Math.cos(hr);
		  b = c * Math.sin(hr);
		  return [l, a, b];
		},

		lch2xyz:function(args) {
		  return Minerva.Convert.lab2xyz(Minerva.Convert.lch2lab(args));
		},

		lch2rgb:function(args) {
		  return Minerva.Convert.lab2rgb(Minerva.Convert.lch2lab(args));
		},

		rgb2hsy:function(args) {
			var r = args[0] / 255;
			var g = args[1] / 255;
			var b = args[2] / 255;
			
			var h = 0;
			var s = 0;
			var y = r * settings.lumaR + g * settings.lumaG + b * settings.lumaB;
			
			if (r == g && g == b) {
				
			} else if ((r >= g) && (g >= b)) {
				s = r - b;
				h = (1/6) * (g - b) / s;
			} else if ((g > r) && (r >= b)) {
				s = g - b;
				h = (1/6) * (g - r) / s  + (1/6);
			} else if ((g >= b) && (b > r)) {
				s = g - r;
				h = (1/6) * (b - r) / s + (2/6);
			} else if ((b > g) && (g > r)) {
				s = b - r;
				h = (1/6) * (b - g) / s + (3/6);
			} else if ((b > r) && (r >= g)) {
				s = b - g;
				h = (1/6) * (r - g) / s + (4/6);
			} else {
				s = r - g;
				h = (1/6) * (r - b) / s + (5/6);
			}
			
			return [
				h,
				Math.min(Math.max(s, 0), 1),
				Math.min(Math.max(y, 0), 1),
			];
			
		},

		hsy2rgb:function(args) {
			var r = 0;
			var g = 0;
			var b = 0;
			
			var k = 0;

			var h = args[0];
			var s = args[1];
			var y = args[2];
			
			if (h >= 0 && h < (1/6)) {
				k = s * h / (1/6);
				b = y - settings.lumaR * s - settings.lumaG * k;
				r = b + s;
				g = b + k;
			} else if (h >= (1/6) && h < (2/6)) {
				k = s * (h - (1/6)) / (1/6);
				g = y + settings.lumaB * s + settings.lumaR * k;
				b = g - s;
				r = g - k;
			} else if (h >= (2/6) && h < (3/6)) {
				k = s * (h - (2/6)) / (1/6);
				r = y - settings.lumaG * s - settings.lumaB * k;
				g = r + s;
				b = r + k;
			} else if (h >= (3/6) && h < (4/6)) {
				k = s * (h - (3/6)) / (1/6);
				b = y + settings.lumaR * s + settings.lumaG * k;
				r = b - s;
				g = b - k;
			} else if (h >= (4/6) && h < (5/6)) {
				k = s * (h - (4/6)) / (1/6);
				g = y - settings.lumaB * s - settings.lumaR * k;
				b = g + s;
				r = g + k;
			} else {
				k = s * (h - (5/6)) / (1/6);
				r = y + settings.lumaG * s + settings.lumaB * k;
				g = r - s;
				b = r - k;
			}
			
			r = Math.max(0, Math.min(1, r));
			g = Math.max(0, Math.min(1, g));
			b = Math.max(0, Math.min(1, b));
			
			return [
				Math.round(r * 255) & 255,
				Math.round(g * 255) & 255,
				Math.round(b * 255) & 255
			];
		},

	};
	
	var blendmodes = {
		
		'normal':function(a, b) {
			return b;
		},

		'ignore':function(a, b) {
			return a;
		},

		'clip':function(a, b) {
			return a;
		},

		'replace':function(a, b) {
			return b;
		},

		'discard':function(a, b) {
			return 1.0;
		},

		'average':function(a, b) {
			return (a + b) / 2.0;
		},

		'stamp':function(a, b) {
			return (a + (b * 2.0) - 1.0);
		},

		'punch':function(a, b) {
			return (b + (a * 2.0) - 1.0);
		},

		'darken':function(a, b) {
			return Math.min(a, b);
		},

		'multiply':function(a, b) {
			return a * b;
		},

		'colorburn':function(a, b) {
			return (b == 0) ? 0 : 1.0 - (1.0 - a) / b;
		},

		'linearburn':function(a, b) {
			return a + b - 1;
		},

		'softburn':function(a, b) {
			return (b+a<1) ? ( (a==1)?1:(b/2)/(1-a) ) : ( (b==0)?0:(1-((1-a)/2)/b) );
		},

		'lighten':function(a, b) {
			return Math.max(a, b);
		},

		'screen':function(a, b) {
			return 1-(1-a)*(1-b);
		},

		'lineardodge':function(a, b) {
			return Math.min(1, a + b);
		},

		'colordodge':function(a, b) {
			return (b == 1) ? 1 : a / ( 1 - b );
		},

		'softdodge':function(a, b) {
			return ( (a+b<=1) ? ( (b==1) ? 1 : (a/2)/(1-b) ) : ( 1-((1-b)/2)/a ) );
		},

		'difference':function(a, b) {
			return Math.abs(a-b);
		},

		'negation':function(a, b) {
			return 1-Math.abs(1-a-b);
		},

		'exclusion':function(a, b) {
			return a+b-(2*a*b);
		},

		'divide':function(a, b) {
			return b==0 ? 0 : a/b;
		},

		'subtract':function(a, b) {
			return Math.max(0, Math.min(1, a-b));
		},

		'phoenix':function(a, b) {
			return (Math.min(a, b) - Math.max(a,b)) + 1.0;
		},

		'inversesubtract':function(a, b) {
			return b-(1-a);
		},

		'arctangent':function(a, b) {
			return ( (a==0) ? ( (b==0)?0:1 ) : 2*Math.atan(b/a)/Math.PI );
		},

		'parallel':function(a, b) {
			return (2 * 1 / ( ((b == 0) ? 1 : 1/b) + ((a == 0) ? 1 : 1/a) ));
		},

		'equivalence':function(a, b) {
			return 1 - Math.abs(b-a);
		},

		'grainmerge':function(a, b) {
			return a + b - 0.5;
		},

		'grainextract':function(a, b) {
			return a - b + 0.5;
		},

		'addsubtract':function(a, b) {
			return Math.abs(Math.sqrt(a) - Math.sqrt(b));
		},

		'gammadark':function(a, b) {
			return (b == 0) ? 0 : Math.pow(a, 1/b);
		},

		'gammalight':function(a, b) {
			return (a == 0) ? 0 : Math.pow(b, 1/a);
		},

		'geometricmean':function(a, b) {
			return Math.sqrt(a * b);
		},

		'softlightsvg':function(a, b) {
			if (b > 0.5) {
				return a + (2*b-1)*( ((a > 0.25) ? Math.sqrt(a) : ((16*a - 12)*a + 4)*a)-a);
			}
			return (a-(1-2*b)*a*(1-a));
		},

		'overlay':function(a, b) {
			return ( (a>0.5) ? (1-2*(1-b)*(1-a)) : (2*b*a) );
		},

		'softlight':function(a, b) {
			return ( ( b<0.5 ) ? ( (1-2*b)*(a*a)+(2*b*a) ) : ( (1-(2*b-1))*a+(2*b-1)*Math.sqrt(a) ) );	
		},

		'peglight':function(a, b) {
			return (1-a)*(a*b)+a*(1-(1-a)*(1-b));
		},

		'hardlight':function(a, b) {
			return (b>0.5) ? (1-2*(1-a)*(1-b)) : (2*a*b);
		},

		'linearlight':function(a, b) {
			return (b>0.5) ? (a+(2*(b-0.5))) : (a+(2*b)-1);
		},

		'vividlight':function(a, b) {
			return (b<0.5) ? ( (b*2==0) ? 0 : (1-(1-a)/(b*2)) ) : ( (2*(b-0.5)==1) ? 1 : (a/(1-(2*(b-0.5)))) );
		},

		'pinlight':function(a, b) {
			return ( b > 0.5  ? (Math.max(a, 2*(b-0.5))) : (Math.min(a, 2 * b)));
		},

		'reflect':function(a, b) {
			return (b==1) ? 1 : ( (a*a)/(1-b) > 1 ? 1 : (a*a)/(1-b) );
		},

		'glow':function(a, b) {
			return (a==1) ? 1 : ( (b*b)/(1-a) > 1 ? 1 : (b*b)/(1-a) );
		},

		'freeze':function(a, b) {
			return (b==0) ? 0 : 1-((1-a)*(1-a))/b;
		},

		'heat':function(a, b) {
			return (a==0) ? 0 : 1-((1-b)*(1-b))/a;
		},

		'interpolation':function(a, b) {
			return 0.5-(0.25*Math.cos(Math.PI*a))-(0.25*Math.cos(Math.PI*b));
		},

		'hardmix':function(a, b) {
			return a<1-b ? 0 : 1;
		},

		'binaryand':function(a, b) {
			return ( (Math.round(a*255) & 255) & (Math.round(b*255) & 255) ) / 255;
		},

		'binaryor':function(a, b) {
			return ( (Math.round(a*255) & 255) | (Math.round(b*255) & 255) ) / 255;
		},

		'binaryxor':function(a, b) {
			return ( (Math.round(a*255) & 255) ^ (Math.round(b*255) & 255) ) / 255;
		},

		'binarynand':function(a, b) {
			return ( (Math.round(a*255) & 255) & ~(Math.round(b*255) & 255) ) / 255;
		},
		
	}; //end blendmodes
	
	var mixmodes = {
		
		'hslhue':function(a, b) {
			var hslA = Minerva.Convert.rgb2hsl([(a.r * 255) & 255, (a.g * 255) & 255, (a.b * 255) & 255]);
			var hslB = Minerva.Convert.rgb2hsl([(b.r * 255) & 255, (b.g * 255) & 255, (b.b * 255) & 255]);
			var theOut = Minerva.Convert.hsl2rgb([hslB[0], hslA[1], hslA[2]]);
			return {
				r:theOut[0] / 255,
				g:theOut[1] / 255,
				b:theOut[2] / 255,
			}
		},

		'hslsaturation':function(a, b) {
			var hslA = Minerva.Convert.rgb2hsl([(a.r * 255) & 255, (a.g * 255) & 255, (a.b * 255) & 255]);
			var hslB = Minerva.Convert.rgb2hsl([(b.r * 255) & 255, (b.g * 255) & 255, (b.b * 255) & 255]);
			var theOut = Minerva.Convert.hsl2rgb([hslA[0], hslB[1], hslA[2]]);
			return {
				r:theOut[0] / 255,
				g:theOut[1] / 255,
				b:theOut[2] / 255,
			}
		},

		'hsllightness':function(a, b) {
			var hslA = Minerva.Convert.rgb2hsl([(a.r * 255) & 255, (a.g * 255) & 255, (a.b * 255) & 255]);
			var hslB = Minerva.Convert.rgb2hsl([(b.r * 255) & 255, (b.g * 255) & 255, (b.b * 255) & 255]);
			var theOut = Minerva.Convert.hsl2rgb([hslA[0], hslA[1], hslB[2]]);
			return {
				r:theOut[0] / 255,
				g:theOut[1] / 255,
				b:theOut[2] / 255,
			}
		},

		'hsvhue':function(a, b) {
			var hsvA = Minerva.Convert.rgb2hsv([(a.r * 255) & 255, (a.g * 255) & 255, (a.b * 255) & 255]);
			var hsvB = Minerva.Convert.rgb2hsv([(b.r * 255) & 255, (b.g * 255) & 255, (b.b * 255) & 255]);
			var theOut = Minerva.Convert.hsv2rgb([hsvB[0], hsvA[1], hsvA[2]]);
			return {
				r:theOut[0] / 255,
				g:theOut[1] / 255,
				b:theOut[2] / 255,
			}
		},

		'hsvsaturation':function(a, b) {
			var hsvA = Minerva.Convert.rgb2hsv([(a.r * 255) & 255, (a.g * 255) & 255, (a.b * 255) & 255]);
			var hsvB = Minerva.Convert.rgb2hsv([(b.r * 255) & 255, (b.g * 255) & 255, (b.b * 255) & 255]);
			var theOut = Minerva.Convert.hsv2rgb([hsvA[0], hsvB[1], hsvA[2]]);
			return {
				r:theOut[0] / 255,
				g:theOut[1] / 255,
				b:theOut[2] / 255,
			}
		},

		'hsvvalue':function(a, b) {
			var hsvA = Minerva.Convert.rgb2hsv([(a.r * 255) & 255, (a.g * 255) & 255, (a.b * 255) & 255]);
			var hsvB = Minerva.Convert.rgb2hsv([(b.r * 255) & 255, (b.g * 255) & 255, (b.b * 255) & 255]);
			var theOut = Minerva.Convert.hsv2rgb([hsvA[0], hsvA[1], hsvB[2]]);
			return {
				r:theOut[0] / 255,
				g:theOut[1] / 255,
				b:theOut[2] / 255,
			}
		},

		'hwbhue':function(a, b) {
			var hwbA = Minerva.Convert.rgb2hwb([(a.r * 255) & 255, (a.g * 255) & 255, (a.b * 255) & 255]);
			var hwbB = Minerva.Convert.rgb2hwb([(b.r * 255) & 255, (b.g * 255) & 255, (b.b * 255) & 255]);
			var theOut = Minerva.Convert.hwb2rgb([hwbB[0], hwbA[1], hwbA[2]]);
			return {
				r:theOut[0] / 255,
				g:theOut[1] / 255,
				b:theOut[2] / 255,
			}
		},

		'hwbwhiteness':function(a, b) {
			var hwbA = Minerva.Convert.rgb2hwb([(a.r * 255) & 255, (a.g * 255) & 255, (a.b * 255) & 255]);
			var hwbB = Minerva.Convert.rgb2hwb([(b.r * 255) & 255, (b.g * 255) & 255, (b.b * 255) & 255]);
			var theOut = Minerva.Convert.hwb2rgb([hwbA[0], hwbB[1], hwbA[2]]);
			return {
				r:theOut[0] / 255,
				g:theOut[1] / 255,
				b:theOut[2] / 255,
			}
		},

		'hwbblackness':function(a, b) {
			var hwbA = Minerva.Convert.rgb2hwb([(a.r * 255) & 255, (a.g * 255) & 255, (a.b * 255) & 255]);
			var hwbB = Minerva.Convert.rgb2hwb([(b.r * 255) & 255, (b.g * 255) & 255, (b.b * 255) & 255]);
			var theOut = Minerva.Convert.hwb2rgb([hwbA[0], hwbA[1], hwbB[2]]);
			return {
				r:theOut[0] / 255,
				g:theOut[1] / 255,
				b:theOut[2] / 255,
			}
		},

		'lablightness':function(a, b) {
			var labA = Minerva.Convert.rgb2lab([(a.r * 255) & 255, (a.g * 255) & 255, (a.b * 255) & 255]);
			var labB = Minerva.Convert.rgb2lab([(b.r * 255) & 255, (b.g * 255) & 255, (b.b * 255) & 255]);
			var theOut = Minerva.Convert.lab2rgb([labB[0], labA[1], labA[2]]);
			return {
				r:theOut[0] / 255,
				g:theOut[1] / 255,
				b:theOut[2] / 255,
			}
		},

		'labalpha':function(a, b) {
			var labA = Minerva.Convert.rgb2lab([(a.r * 255) & 255, (a.g * 255) & 255, (a.b * 255) & 255]);
			var labB = Minerva.Convert.rgb2lab([(b.r * 255) & 255, (b.g * 255) & 255, (b.b * 255) & 255]);
			var theOut = Minerva.Convert.lab2rgb([labA[0], labB[1], labA[2]]);
			return {
				r:theOut[0] / 255,
				g:theOut[1] / 255,
				b:theOut[2] / 255,
			}
		},

		'labbeta':function(a, b) {
			var labA = Minerva.Convert.rgb2lab([(a.r * 255) & 255, (a.g * 255) & 255, (a.b * 255) & 255]);
			var labB = Minerva.Convert.rgb2lab([(b.r * 255) & 255, (b.g * 255) & 255, (b.b * 255) & 255]);
			var theOut = Minerva.Convert.lab2rgb([labA[0], labA[1], labB[2]]);
			return {
				r:theOut[0] / 255,
				g:theOut[1] / 255,
				b:theOut[2] / 255,
			}
		},

		'lchlightness':function(a, b) {
			var lchA = Minerva.Convert.rgb2lch([(a.r * 255) & 255, (a.g * 255) & 255, (a.b * 255) & 255]);
			var lchB = Minerva.Convert.rgb2lch([(b.r * 255) & 255, (b.g * 255) & 255, (b.b * 255) & 255]);
			var theOut = Minerva.Convert.lch2rgb([lchB[0], lchA[1], lchA[2]]);
			return {
				r:theOut[0] / 255,
				g:theOut[1] / 255,
				b:theOut[2] / 255,
			}
		},

		'lchchroma':function(a, b) {
			var lchA = Minerva.Convert.rgb2lch([(a.r * 255) & 255, (a.g * 255) & 255, (a.b * 255) & 255]);
			var lchB = Minerva.Convert.rgb2lch([(b.r * 255) & 255, (b.g * 255) & 255, (b.b * 255) & 255]);
			var theOut = Minerva.Convert.lch2rgb([lchA[0], lchB[1], lchA[2]]);
			return {
				r:theOut[0] / 255,
				g:theOut[1] / 255,
				b:theOut[2] / 255,
			}
		},

		'lchhue':function(a, b) {
			var lchA = Minerva.Convert.rgb2lch([(a.r * 255) & 255, (a.g * 255) & 255, (a.b * 255) & 255]);
			var lchB = Minerva.Convert.rgb2lch([(b.r * 255) & 255, (b.g * 255) & 255, (b.b * 255) & 255]);
			var theOut = Minerva.Convert.lch2rgb([lchA[0], lchA[1], lchB[2]]);
			return {
				r:theOut[0] / 255,
				g:theOut[1] / 255,
				b:theOut[2] / 255,
			}
		},

		'hsyhue':function(a, b) {
			var hsyA = Minerva.Convert.rgb2hsy([(a.r * 255) & 255, (a.g * 255) & 255, (a.b * 255) & 255]);
			var hsyB = Minerva.Convert.rgb2hsy([(b.r * 255) & 255, (b.g * 255) & 255, (b.b * 255) & 255]);
			var theOut = Minerva.Convert.hsy2rgb([hsyB[0], hsyA[1], hsyA[2]]);
			return {
				r:theOut[0] / 255,
				g:theOut[1] / 255,
				b:theOut[2] / 255,
			}
		},

		'hsysaturation':function(a, b) {
			var hsyA = Minerva.Convert.rgb2hsy([(a.r * 255) & 255, (a.g * 255) & 255, (a.b * 255) & 255]);
			var hsyB = Minerva.Convert.rgb2hsy([(b.r * 255) & 255, (b.g * 255) & 255, (b.b * 255) & 255]);
			var theOut = Minerva.Convert.hsy2rgb([hsyA[0], hsyB[1], hsyA[2]]);
			return {
				r:theOut[0] / 255,
				g:theOut[1] / 255,
				b:theOut[2] / 255,
			}
		},

		'hsyluma':function(a, b) {
			var hsyA = Minerva.Convert.rgb2hsy([(a.r * 255) & 255, (a.g * 255) & 255, (a.b * 255) & 255]);
			var hsyB = Minerva.Convert.rgb2hsy([(b.r * 255) & 255, (b.g * 255) & 255, (b.b * 255) & 255]);
			var theOut = Minerva.Convert.hsy2rgb([hsyA[0], hsyA[1], hsyB[2]]);
			return {
				r:theOut[0] / 255,
				g:theOut[1] / 255,
				b:theOut[2] / 255,
			}
		},

		'cmykcyan':function(a, b) {
			var cmykA = Minerva.Convert.rgb2cmyk([(a.r * 255) & 255, (a.g * 255) & 255, (a.b * 255) & 255]);
			var cmykB = Minerva.Convert.rgb2cmyk([(b.r * 255) & 255, (b.g * 255) & 255, (b.b * 255) & 255]);
			var theOut = Minerva.Convert.cmyk2rgb([cmykB[0], cmykA[1], cmykA[2], cmykA[3]]);
			return {
				r:theOut[0] / 255,
				g:theOut[1] / 255,
				b:theOut[2] / 255,
			}
		},

		'cmykmagenta':function(a, b) {
			var cmykA = Minerva.Convert.rgb2cmyk([(a.r * 255) & 255, (a.g * 255) & 255, (a.b * 255) & 255]);
			var cmykB = Minerva.Convert.rgb2cmyk([(b.r * 255) & 255, (b.g * 255) & 255, (b.b * 255) & 255]);
			var theOut = Minerva.Convert.cmyk2rgb([cmykA[0], cmykB[1], cmykA[2], cmykA[3]]);
			return {
				r:theOut[0] / 255,
				g:theOut[1] / 255,
				b:theOut[2] / 255,
			}
		},

		'cmykyellow':function(a, b) {
			var cmykA = Minerva.Convert.rgb2cmyk([(a.r * 255) & 255, (a.g * 255) & 255, (a.b * 255) & 255]);
			var cmykB = Minerva.Convert.rgb2cmyk([(b.r * 255) & 255, (b.g * 255) & 255, (b.b * 255) & 255]);
			var theOut = Minerva.Convert.cmyk2rgb([cmykA[0], cmykA[1], cmykB[2], cmykA[3]]);
			return {
				r:theOut[0] / 255,
				g:theOut[1] / 255,
				b:theOut[2] / 255,
			}
		},

		'cmykkey':function(a, b) {
			var cmykA = Minerva.Convert.rgb2cmyk([(a.r * 255) & 255, (a.g * 255) & 255, (a.b * 255) & 255]);
			var cmykB = Minerva.Convert.rgb2cmyk([(b.r * 255) & 255, (b.g * 255) & 255, (b.b * 255) & 255]);
			var theOut = Minerva.Convert.cmyk2rgb([cmykA[0], cmykA[1], cmykA[2], cmykB[3]]);
			return {
				r:theOut[0] / 255,
				g:theOut[1] / 255,
				b:theOut[2] / 255,
			}
		},
		
	}; //end mixmodes
	
	this.blend = function(baseData, blendData, colorMode, opacity, mask, alphaMode) {
		if (opacity == null) {
			opacity = 1.0;
		}
		//ensure blendData modes
		if (colorMode == null) {
			colorMode = "normal";
		}
		if (alphaMode == null) {
			alphaMode = "clip";
		}
		colorMode = colorMode.toLowerCase();
		alphaMode = alphaMode.toLowerCase();
		var colorBlendFn = blendmodes['normal'];
		var alphaBlendFn = blendmodes['clip'];
		var whichBlendMode = "b";
		if (colorMode != null) {
			if (hasOwnProperty.call(blendmodes, colorMode)) {
				colorBlendFn = blendmodes[colorMode];
			} else if (hasOwnProperty.call(mixmodes, colorMode)) {
				colorBlendFn = mixmodes[colorMode];
				whichBlendMode = "m";
			}
		}
		if (alphaMode != null) {
			if (hasOwnProperty.call(blendmodes, alphaMode)) {
				alphaBlendFunction = blendmodes[alphaMode];
			}
		}
		
		var baseDataType = 0;
		var blendDataType = 0;
		var maskType = 0;
		
		if (baseData instanceof Minerva.Img) {
			baseDataType = 3;
		} else if (baseData instanceof Channel) {
			baseDataType = 2;
		} else if (typeof(baseData) == "number") {
			baseDataType = 1;
		} else {
			return;
		}
		
		if (blendData instanceof Minerva.Img) {
			blendDataType = 3;
			if (mask == null) {
				mask = blendData.getChannel("a");
				maskType = 1;
			}
		} else if (blendData instanceof Channel) {
			blendDataType = 2;
		} else if (typeof(blendData) == "number") {
			blendDataType = 1;
		} else {
			return;
		}
		
		if (mask instanceof Channel) {
			maskType = 1;
		}
		
		if (baseDataType == 1 && blendDataType == 1) {
			var rC = {};
			var cbaseData = Minerva.Convert.hex2rgb(baseData);
			var cblendData = Minerva.Convert.hex2rgb(blendData);
			if (whichBlendMode == "b") {
				rC = {
					r: colorBlendFn(cbaseData.r, cblendData.r),
					g: colorBlendFn(cbaseData.g, cblendData.g),
					b: colorBlendFn(cbaseData.b, cblendData.b),
				};
			} else {
				rC = colorBlendFn(cbaseData, cblendData);
			}
			return rC;
			
		} else if ((baseDataType == 2 || baseDataType == 3) && blendDataType == 1) {
			var result = new Minerva.Img();
			result.setSize(baseData.width, baseData.height);
			for (var i = 0; i < (baseData.width * baseData.height); i++) {
				var rC = {};
				var cBase = {};
				if (baseDataType == 2) {
					cBase = {
						r: baseData.getAt(i),
						g: baseData.getAt(i),
						b: baseData.getAt(i)
					};
				} else {
					cBase = baseData.getColorAt(i);
				}
				var cBlend = Minerva.Convert.hex2rgb(blendData);
				if (whichBlendMode == "b") {
					rC = {
						r: colorBlendFn(cBase.r, cBlend.r),
						g: colorBlendFn(cBase.g, cBlend.g),
						b: colorBlendFn(cBase.b, cBlend.b),
					};
				} else {
					rC = colorBlendFn(cBase, cBlend);
				}
				var mV = 1.0;
				if (maskType == 1) {
					mV = mask.getAt(i) * opacity;
				} else if (maskType == 0) {
					mV = opacity;
				}
				result.setColorAt(i, {
					r: mV * rC.r + (1.0 - mV) * cBase.r,
					g: mV * rC.g + (1.0 - mV) * cBase.g,
					b: mV * rC.b + (1.0 - mV) * cBase.b,
				});
				if (baseDataType == 3) {
					var aV = alphaBlendFn(baseData.getAlphaAt(i), 1.0);
					result.setAlphaAt(i, aV);
				} else {
					result.setAlphaAt(i, 1);
				}
			}
			return result;
		} else if (baseDataType == 1 && (blendDataType == 2 || blendDataType == 3)) {
			var result = new Minerva.Img();
			result.setSize(baseData.width, baseData.height);
			for (var i = 0; i < (baseData.width * baseData.height); i++) {
				var rC = {};
				var cBlend = {};
				if (blendDataType == 2) {
					cBlend = {
						r: blendData.getAt(i),
						g: blendData.getAt(i),
						b: blendData.getAt(i)
					};
				} else {
					cBlend = blendData.getColorAt(i);
				}
				var cBase = Minerva.Convert.hex2rgb(baseData);
				if (whichBlendMode == "b") {
					rC = {
						r: colorBlendFn(cBase.r, cBlend.r),
						g: colorBlendFn(cBase.g, cBlend.g),
						b: colorBlendFn(cBase.b, cBlend.b),
					};
				} else {
					rC = colorBlendFn(cBase, cBlend);
				}
				var mV = 1.0;
				if (maskType == 1) {
					mV = mask.getAt(i) * opacity;
				} else if (maskType == 0) {
					mV = opacity;
				}
				result.setColorAt(i, {
					r: mV * rC.r + (1.0 - mV) * cBase.r,
					g: mV * rC.g + (1.0 - mV) * cBase.g,
					b: mV * rC.b + (1.0 - mV) * cBase.b,
				});
				if (blenDataType == 3) {
					var aV = alphaBlendFn(baseData.getAlphaAt(i), 1.0);
					result.setAlphaAt(i, aV);
				} else {
					result.setAlphaAt(i, 1);
				}
			}
			return result;
		} else if ( (baseDataType == 2 || baseDataType == 3) && (blendDataType == 2 || blendDataType == 3)) {
			if ((baseData.width == blendData.width) && (baseData.height == blendData.height)) {
				var result = new Minerva.Img();
				result.setSize(baseData.width, baseData.height);
				for (var i = 0; i < (baseData.width * baseData.height); i++) {
					var rC = {};
					var cBase = {};
					var cBlend = {};
					if (baseDataType == 2) { //channel
						cBase = {
							r: baseData.getAt(i),
							g: baseData.getAt(i),
							b: baseData.getAt(i)
						}
					} else { //image
						cBase = baseData.getColorAt(i);
					}
					if (blendDataType == 2) { //channel
						cBlend = {
							r: baseData.getAt(i),
							g: baseData.getAt(i),
							b: baseData.getAt(i)
						}
					} else { //image
						cBlend = blendData.getColorAt(i);
					}
					if (whichBlendMode == "b") {
						rC = {
							r: colorBlendFn(cBase.r, cBlend.r),
							g: colorBlendFn(cBase.g, cBlend.g),
							b: colorBlendFn(cBase.b, cBlend.b),
						};
					} else {
						rC = colorBlendFn(cBase, cBlend);
					}
					var mV = 1.0;
					if (maskType == 1) {
						mV = mask.getAt(i) * opacity;
					} else if (maskType == 0) {
						mV = opacity;
					}
					result.setColorAt(i, {
						r: mV * rC.r + (1.0 - mV) * cBase.r,
						g: mV * rC.g + (1.0 - mV) * cBase.g,
						b: mV * rC.b + (1.0 - mV) * cBase.b,
					});
					if (baseDataType == 3 && blendDataType == 3) {
						result.setAlphaAt(i, alphaBlendFn(baseData.getAlphaAt(i), blendData.getAlphaAt(i)));
					} else if (baseDataType == 3) {
						result.setAlphaAt(i, alphaBlendFn(baseData.getAlphaAt(i), 1.0));
					} else if (blendDataType == 3) {
						result.setAlphaAt(i, alphaBlendFn(1.0, blendData.getAlphaAt(i)));
					} else {
						result.setAlphaAt(i, 1);
					}
				}
				return result;
			}
		}
		return;
	}; //end blend
	
	this.getSupportedBlendmodes = function() {
		return Object.keys(blendmodes).concat(Object.keys(mixmodes));
	};
	
};
