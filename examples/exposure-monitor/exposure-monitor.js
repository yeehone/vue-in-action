import Util from './util.js'

export default {
	opts: {},
	watches: [],
	params: ['exposure-opt'],
	checkInview (node) {
		var rect = node.getBoundingClientRect();
		console.log('directives[exposure]: checkInview, rect: ', rect, 'clientHeight: ', document.documentElement.clientHeight);
		return rect.width && rect.height && rect.top >= 0 && rect.top <= document.documentElement.clientHeight;
	},
	dealExposures () {
		for (var selector in this.opts) {
			var opt = this.opts[selector];
			console.log('directives[exposure]: dealExposures opt', opt);
			var arr = opt.arr || [];
			var fn = this.vm.$options.methods[opt.dealMethod];
			for (var i = 0, length = arr.length, one; i < length && (one = arr[i]); i++) {
				if(one.getAttribute('data-is-exposed-' + opt.dealMethod) == 1) continue;
				if (this.checkInview(one)) {
					typeof fn == 'function' && fn.call(this, one);
					!opt.always && one.setAttribute('data-is-exposed-' + opt.dealMethod, 1);
				}
			}
		}
	},
	getDomNodes (opt) {
		return this.vm.$el.querySelectorAll(opt.selector);
	},
	bindEvent (opt) {
		if(!opt.selector || !opt.domUpdateTrigger || !opt.dealMethod) {
			return;
		}

		var that = this;
		var domUpdate = function() {
			console.log('directives[exposure]: domUpdate opt: ', opt);
			opt.arr = this.getDomNodes(opt);
			this.throttleOncePerThresholdDealExposures();
		};
		
		var unwatch = this.vm.$watch(opt.domUpdateTrigger, function() {
			console.log('directives[exposure]: domUpdateTrigger: ', arguments, this);
			domUpdate.call(that);
		});
		this.watches.push(unwatch);

		this.opts[opt.selector] = opt;
		
		console.log('directives[exposure]: bindEvent', arguments);

		this.vm.$nextTick(function() {
			domUpdate.call(that);
		});
	},
	bind () {
		console.log('directives[exposure]: bind', arguments);

		this.throttleOncePerThresholdDealExposures = Util.throttle(this.dealExposures, 1, true);
		this.throttleDealExposures = Util.throttle(this.dealExposures, 150);

		var exposureOpt = this.params && this.params['exposureOpt'];
		if (exposureOpt) {
			if (Object.prototype.toString.call(exposureOpt) == '[object Array]') {
				for (var i = 0; i < exposureOpt.length; i++) {
					this.bindEvent.call(this, exposureOpt[i]);
				}
			} else if (Object.prototype.toString.call(exposureOpt) == '[object Object]') {
				this.bindEvent.call(this, exposureOpt);
			}
		} else if (this.expression) {
			var opt = {};
			try {
				opt = JSON.parse(this.expression || {});
			} catch (e) {}
			this.bindEvent.call(this, opt);
		}

		window.addEventListener('scroll', this.throttleDealExposures.bind(this), false);
		window.addEventListener('resize', this.throttleDealExposures.bind(this), false);
	},
	update () {
		console.log('directives[exposure]: update', arguments);
	},
	unbind () {
		console.log('directives[exposure]: unbind', arguments);
		window.removeEventListener('scroll', this.dispatchScrollEvt.bind(this), false);
		window.removeEventListener('resize', this.dispatchScrollEvt.bind(this), false);
		for(var i = 0, length = this.watches.length, one; i < length && (one = this.watches[i]); i++) {
			one();
		}
	}
}