

Minerva.preloader = new function() {
	var queue = [];
	var map = {};
	
	this.add = function(url) {
		if (Array.isArray(url)) {
			for (var i = 0; i < url.length; i++) {
				queue.push(url[i]);
			}
		} else {
			queue.push(url);
		}
	}
	
	this.getImages = function() {
		return map;
	}
	
	this.onComplete = function(callback) {
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
	
};
