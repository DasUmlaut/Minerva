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


Minerva.convert.rgb2hsl = function(rgb) {
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
}

Minerva.convert.rgb2hsv = function(rgb) {
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
}

Minerva.convert.rgb2hwb = function(rgb) {
  var r = rgb[0],
      g = rgb[1],
      b = rgb[2],
      h = Minerva.convert.rgb2hsl(rgb)[0],
      w = 1/255 * Math.min(r, Math.min(g, b)),
      b = 1 - 1/255 * Math.max(r, Math.max(g, b));

  return [h, w * 100, b * 100];
}

Minerva.convert.rgb2cmyk = function(rgb) {
  var r = rgb[0] / 255,
      g = rgb[1] / 255,
      b = rgb[2] / 255,
      c, m, y, k;

  k = Math.min(1 - r, 1 - g, 1 - b);
  c = (1 - r - k) / (1 - k) || 0;
  m = (1 - g - k) / (1 - k) || 0;
  y = (1 - b - k) / (1 - k) || 0;
  return [c * 100, m * 100, y * 100, k * 100];
}

Minerva.convert.rgb2xyz = function(rgb) {
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
}

Minerva.convert.rgb2lab = function(rgb) {
  var xyz = Minerva.convert.rgb2xyz(rgb),
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
}

Minerva.convert.rgb2lch = function(args) {
  return Minerva.convert.lab2lch(Minerva.convert.rgb2lab(args));
}

Minerva.convert.hsl2rgb = function(hsl) {
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
}

Minerva.convert.hsl2hsv = function(hsl) {
  var h = hsl[0],
      s = hsl[1] / 100,
      l = hsl[2] / 100,
      sv, v;
  l *= 2;
  s *= (l <= 1) ? l : 2 - l;
  v = (l + s) / 2;
  sv = (2 * s) / (l + s);
  return [h, sv * 100, v * 100];
}

Minerva.convert.hsl2hwb = function(args) {
  return Minerva.convert.rgb2hwb(Minerva.convert.hsl2rgb(args));
}

Minerva.convert.hsl2cmyk = function(args) {
  return Minerva.convert.rgb2cmyk(Minerva.convert.hsl2rgb(args));
}


Minerva.convert.hsv2rgb = function(hsv) {
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
}

Minerva.convert.hsv2hsl = function(hsv) {
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
}

Minerva.convert.hsv2hwb = function(args) {
  return Minerva.convert.rgb2hwb(Minerva.convert.hsv2rgb(args))
}

Minerva.convert.hsv2cmyk = function(args) {
  return Minerva.convert.rgb2cmyk(Minerva.convert.hsv2rgb(args));
}


// http://dev.w3.org/csswg/css-color/#hwb-to-rgb
Minerva.convert.hwb2rgb = function(hwb) {
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
}

Minerva.convert.hwb2hsl = function(args) {
  return Minerva.convert.rgb2hsl(Minerva.convert.hwb2rgb(args));
}

Minerva.convert.hwb2hsv = function(args) {
  return Minerva.convert.rgb2hsv(Minerva.convert.hwb2rgb(args));
}

Minerva.convert.hwb2cmyk = function(args) {
  return Minerva.convert.rgb2cmyk(Minerva.convert.hwb2rgb(args));
}

Minerva.convert.cmyk2rgb = function(cmyk) {
  var c = cmyk[0] / 100,
      m = cmyk[1] / 100,
      y = cmyk[2] / 100,
      k = cmyk[3] / 100,
      r, g, b;

  r = 1 - Math.min(1, c * (1 - k) + k);
  g = 1 - Math.min(1, m * (1 - k) + k);
  b = 1 - Math.min(1, y * (1 - k) + k);
  return [Math.round(r * 255) & 255, Math.round(g * 255) & 255, Math.round(b * 255) & 255];
}

Minerva.convert.cmyk2hsl = function(args) {
  return Minerva.convert.rgb2hsl(Minerva.convert.cmyk2rgb(args));
}

Minerva.convert.cmyk2hsv = function(args) {
  return Minerva.convert.rgb2hsv(Minerva.convert.cmyk2rgb(args));
}

Minerva.convert.cmyk2hwb = function(args) {
  return Minerva.convert.rgb2hwb(Minerva.convert.cmyk2rgb(args));
}


Minerva.convert.xyz2rgb = function(xyz) {
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
}

Minerva.convert.xyz2lab = function(xyz) {
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
}

Minerva.convert.xyz2lch = function(args) {
  return Minerva.convert.lab2lch(Minerva.convert.xyz2lab(args));
}

Minerva.convert.lab2xyz = function(lab) {
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
}

Minerva.convert.lab2lch = function(lab) {
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
}

Minerva.convert.lab2rgb = function(args) {
  return Minerva.convert.xyz2rgb(Minerva.convert.lab2xyz(args));
}

Minerva.convert.lch2lab = function(lch) {
  var l = lch[0],
      c = lch[1],
      h = lch[2],
      a, b, hr;

  hr = h / 360 * 2 * Math.PI;
  a = c * Math.cos(hr);
  b = c * Math.sin(hr);
  return [l, a, b];
}

Minerva.convert.lch2xyz = function(args) {
  return Minerva.convert.lab2xyz(Minerva.convert.lch2lab(args));
}

Minerva.convert.lch2rgb = function(args) {
  return Minerva.convert.lab2rgb(Minerva.convert.lch2lab(args));
}

Minerva.convert.rgb2hsy = function(args) {
	var r = args[0] / 255;
	var g = args[1] / 255;
	var b = args[2] / 255;
	
	var h = 0;
	var s = 0;
	var y = r * Minerva.settings.lumaR + g * Minerva.settings.lumaG + b * Minerva.settings.lumaB;
	
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
	
};

Minerva.convert.hsy2rgb = function(args) {
	var r = 0;
    var g = 0;
    var b = 0;
	
	var k = 0;

	var h = args[0];
	var s = args[1];
	var y = args[2];
	
    if (h >= 0 && h < (1/6)) {
        k = s * h / (1/6);
        b = y - Minerva.settings.lumaR * s - Minerva.settings.lumaG * k;
        r = b + s;
        g = b + k;
    } else if (h >= (1/6) && h < (2/6)) {
        k = s * (h - (1/6)) / (1/6);
        g = y + Minerva.settings.lumaB * s + Minerva.settings.lumaR * k;
        b = g - s;
        r = g - k;
    } else if (h >= (2/6) && h < (3/6)) {
        k = s * (h - (2/6)) / (1/6);
        r = y - Minerva.settings.lumaG * s - Minerva.settings.lumaB * k;
        g = r + s;
        b = r + k;
    } else if (h >= (3/6) && h < (4/6)) {
        k = s * (h - (3/6)) / (1/6);
        b = y + Minerva.settings.lumaR * s + Minerva.settings.lumaG * k;
        r = b - s;
        g = b - k;
    } else if (h >= (4/6) && h < (5/6)) {
        k = s * (h - (4/6)) / (1/6);
        g = y - Minerva.settings.lumaB * s - Minerva.settings.lumaR * k;
        b = g + s;
        r = g + k;
    } else {
        k = s * (h - (5/6)) / (1/6);
        r = y + Minerva.settings.lumaG * s + Minerva.settings.lumaB * k;
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
};
