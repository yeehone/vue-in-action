export default {
	debounce(fn, delay) {
		var timer;
		return function() {
			var context = this,
				args = arguments;
			console.log('util[debounce] enter', timer, delay);
			timer && clearTimeout(timer);
			timer = setTimeout(function() {
				console.log('util[debounce] exec', timer, delay);
				fn && fn.apply(context, args);
			}, delay || 200);
		}
	},
	throttle(fn, threshold, oncePerThreshold){
		threshold = threshold || 200;
		var last, timer;
		return function(){
			var context = this,
				args = arguments;
			var now = +new Date();
			if(last && now < last + threshold){
				if(!oncePerThreshold) {
					clearTimeout(timer);
					timer = setTimeout(function(){
						last = now;
						fn && fn.apply(context, args);
					}, threshold);	
				}
			}else{
				last = now;
				fn && fn.apply(context, args);
			}
		}
	}
}