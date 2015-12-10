<template>
	<div v-exposure="{
				selector: '[data-src]',
				domUpdateTrigger: 'imgs',
				dealMethod: 'imgLazyload'
			}" v-bind:exposure-opt="lazyloadOpt">
		<div v-for='img in imgs'>
			<img data-src="{{img}}" style="width: 300px;height:300px">
		</div>
	</div>
</template>

<script>
import Util from './util.js'

export default {
	data() {
		return {
			imgs: ["http://img0.bdstatic.com/img/image/imglogo-r.png", "http://img0.bdstatic.com/img/image/shitulogo-r.png", "http://img0.bdstatic.com/img/image/inputurl-info.png", "http://img0.bdstatic.com/static/searchresult/img/uploading_ca6dc69.gif", "http://g.hiphotos.baidu.com/image/h%3D200/sign=77dd47223dc79f3d90e1e3308aa3cdbc/aec379310a55b319552480a845a98226cefc1709.jpg", "http://img0.imgtn.bdimg.com/it/u=4173592507,1356158505&fm=11&gp=0.jpg", "http://img0.imgtn.bdimg.com/it/u=2880119934,4249368622&fm=21&gp=0.jpg", "http://img2.imgtn.bdimg.com/it/u=172597849,68197783&fm=21&gp=0.jpg", "http://img5.imgtn.bdimg.com/it/u=3915822806,1331350747&fm=21&gp=0.jpg", "http://img0.imgtn.bdimg.com/it/u=2637034546,351351578&fm=21&gp=0.jpg", "http://img5.imgtn.bdimg.com/it/u=2421164664,2576407485&fm=21&gp=0.jpg", "http://img2.bdstatic.com/static/searchresult/img/loading_circle_40b82ef.gif", "http://img0.bdstatic.com/img/image/shouye/mnvd001.jpg", "http://img0.bdstatic.com/img/image/shouye/mnvf002.jpg", "http://img0.bdstatic.com/img/image/shouye/mnvf003.jpg", "http://img0.bdstatic.com/img/image/shouye/mnve004.jpg", "http://img0.bdstatic.com/img/image/shouye/mnvf005.jpg", "http://img0.bdstatic.com/img/image/shouye/mnvd006.jpg", "http://img0.bdstatic.com/img/image/shouye/mnvf007.jpg", "http://img0.bdstatic.com/img/image/shouye/mxn001.jpg"],
			lazyloadOpt: [{
				selector: '[data-src]',
				domUpdateTrigger: 'imgs',
				dealMethod: 'imgLazyload'
			}, {
				selector: 'img',
				domUpdateTrigger: 'imgs',
				dealMethod: 'exposureReport'
			}]
		}
	},
	methods: {
		imgLazyload: function(node) {
			console.log('imgLazyload', node);
			var src = node.getAttribute('data-src');
			if(src) {
				node.removeAttribute('data-src');
				node.src = src;
			}
		},
		exposureReport: function(node) {
			console.log('exposureReport', node);
		}
	},
	directives: {
		'exposure': {
			opts: {},
			watches: [],
			params: ['exposure-opt'],
			checkInview: function(node) {
				var rect = node.getBoundingClientRect();
				console.log('directives[exposure]: checkInview, rect: ', rect, 'clientHeight: ', document.documentElement.clientHeight);
				return rect.width && rect.height && rect.top >= 0 && rect.top <= document.documentElement.clientHeight;
			},
			dealExposures: function() {
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
			getDomNodes: function(opt) {
				return this.vm.$el.querySelectorAll(opt.selector);
			},
			bindEvent: function(opt) {
				if(!opt.selector || !opt.domUpdateTrigger || !opt.dealMethod) {
					return;
				}

				var that = this;
				var domUpdate = function() {
					console.log('directives[exposure]: domUpdate opt: ', opt);
					opt.arr = this.getDomNodes(opt);
					this.debounceDealExposures();
				};
				
				var unwatch = this.vm.$watch(opt.domUpdateTrigger, function() {
					console.log('directives[exposure]: domUpdateTrigger: ', arguments, this);
					domUpdate.call(that);
				});
				this.watches.push(unwatch);

				this.opts[opt.selector] = opt;
				
				this.vm.$nextTick(function() {
					domUpdate.call(that);
				});
			},
			bind: function() {
				console.log('directives[exposure]: bind', this, arguments);

				this.debounceDealExposures = Util.debounce(this.dealExposures, 0);
				this.throttleDealExposures = Util.throttle(this.dealExposures, 0);

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
			update: function() {
				console.log('directives[exposure]: update', this, arguments);
			},
			unbind: function() {
				console.log('directives[exposure]: unbind', this, arguments);
				window.removeEventListener('scroll', this.dispatchScrollEvt.bind(this), false);
				for(var i = 0, length = this.watches.length, one; i < length && (one = this.watches[i]); i++) {
					one();
				}
			}
		}
	}
}
</script>
