export default {
	debounce(fn, delay) {
		var timer;
		return function() {
			var context = this,
				args = arguments;
			timer && clearTimeout(timer);
			timer = setTimeout(function() {
				fn && fn.apply(context, args);
			}, delay || 200);
		}
	},
	throttle(fn, threshold){
		threshold = threshold || 200;
		var last, timer;
		return function(){
			var context = this,
				args = arguments;
			var now = +new Date();
			if(last && now < last + threshold){
				clearTimeout(timer);
				timer = setTimeout(function(){
					last = now;
					fn && fn.apply(context, args);
				}, threshold);
			}else{
				last = now;
				fn && fn.apply(context, args);
			}
		}
	}
}