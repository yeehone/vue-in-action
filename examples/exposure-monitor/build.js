/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _App = __webpack_require__(2);
	
	var _App2 = _interopRequireDefault(_App);
	
	var _exposureMonitor = __webpack_require__(5);
	
	var _exposureMonitor2 = _interopRequireDefault(_exposureMonitor);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	Vue.config.debug = true;
	
	Vue.directive('exposure', _exposureMonitor2.default);
	
	new Vue({
	  el: 'body',
	  components: { App: _App2.default }
	});

/***/ },
/* 1 */,
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(3)
	
	if (module.exports.__esModule) module.exports = module.exports.default
	;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(4)
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "/Users/yeehoneliu/WorkSpace/vue-in-action/examples/exposure-monitor/App.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
	  }
	})()}

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	// <template>
	// 	<div v-exposure='{
	// 				"selector": "[data-src]",
	// 				"domUpdateTrigger": "imgs",
	// 				"dealMethod": "imgLazyload"
	// 			}' :exposure-opt="lazyloadOpt">
	// 		<div v-for='img in imgs'>
	// 			<img data-src="{{img}}" style="width: 300px;height:300px">
	// 		</div>
	// 	</div>
	// </template>
	
	// <script>
	
	exports.default = {
		data: function data() {
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
			};
		},
	
		methods: {
			imgLazyload: function imgLazyload(node) {
				console.log('imgLazyload', node.nodeName);
				var src = node.getAttribute('data-src');
				if (src) {
					node.removeAttribute('data-src');
					node.src = src;
				}
			},
			exposureReport: function exposureReport(node) {
				console.log('exposureReport', node.nodeName);
			}
		}
	};
	// </script>

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = "<div v-exposure='{\n\t\t\t\t\"selector\": \"[data-src]\",\n\t\t\t\t\"domUpdateTrigger\": \"imgs\",\n\t\t\t\t\"dealMethod\": \"imgLazyload\"\n\t\t\t}' :exposure-opt=\"lazyloadOpt\">\n\t\t<div v-for='img in imgs'>\n\t\t\t<img data-src=\"{{img}}\" style=\"width: 300px;height:300px\">\n\t\t</div>\n\t</div>";

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _util = __webpack_require__(6);
	
	var _util2 = _interopRequireDefault(_util);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
		opts: {},
		watches: [],
		params: ['exposure-opt'],
		checkInview: function checkInview(node) {
			var rect = node.getBoundingClientRect();
			console.log('directives[exposure]: checkInview, rect: ', rect, 'clientHeight: ', document.documentElement.clientHeight);
			return rect.width && rect.height && rect.top >= 0 && rect.top <= document.documentElement.clientHeight;
		},
		dealExposures: function dealExposures() {
			for (var selector in this.opts) {
				var opt = this.opts[selector];
				console.log('directives[exposure]: dealExposures opt', opt);
				var arr = opt.arr || [];
				var fn = this.vm.$options.methods[opt.dealMethod];
				for (var i = 0, length = arr.length, one; i < length && (one = arr[i]); i++) {
					if (one.getAttribute('data-is-exposed-' + opt.dealMethod) == 1) continue;
					if (this.checkInview(one)) {
						typeof fn == 'function' && fn.call(this, one);
						!opt.always && one.setAttribute('data-is-exposed-' + opt.dealMethod, 1);
					}
				}
			}
		},
		getDomNodes: function getDomNodes(opt) {
			return this.vm.$el.querySelectorAll(opt.selector);
		},
		bindEvent: function bindEvent(opt) {
			if (!opt.selector || !opt.domUpdateTrigger || !opt.dealMethod) {
				return;
			}
	
			var that = this;
			var domUpdate = function domUpdate() {
				console.log('directives[exposure]: domUpdate opt: ', opt);
				opt.arr = this.getDomNodes(opt);
				this.throttleOncePerThresholdDealExposures();
			};
	
			var unwatch = this.vm.$watch(opt.domUpdateTrigger, function () {
				console.log('directives[exposure]: domUpdateTrigger: ', arguments, this);
				domUpdate.call(that);
			});
			this.watches.push(unwatch);
	
			this.opts[opt.selector] = opt;
	
			console.log('directives[exposure]: bindEvent', arguments);
	
			this.vm.$nextTick(function () {
				domUpdate.call(that);
			});
		},
		bind: function bind() {
			console.log('directives[exposure]: bind', arguments);
	
			this.throttleOncePerThresholdDealExposures = _util2.default.throttle(this.dealExposures, 1, true);
			this.throttleDealExposures = _util2.default.throttle(this.dealExposures, 150);
	
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
		update: function update() {
			console.log('directives[exposure]: update', arguments);
		},
		unbind: function unbind() {
			console.log('directives[exposure]: unbind', arguments);
			window.removeEventListener('scroll', this.dispatchScrollEvt.bind(this), false);
			window.removeEventListener('resize', this.dispatchScrollEvt.bind(this), false);
			for (var i = 0, length = this.watches.length, one; i < length && (one = this.watches[i]); i++) {
				one();
			}
		}
	};

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = {
		debounce: function debounce(fn, delay) {
			var timer;
			return function () {
				var context = this,
				    args = arguments;
				console.log('util[debounce] enter', timer, delay);
				timer && clearTimeout(timer);
				timer = setTimeout(function () {
					console.log('util[debounce] exec', timer, delay);
					fn && fn.apply(context, args);
				}, delay || 200);
			};
		},
		throttle: function throttle(fn, threshold, oncePerThreshold) {
			threshold = threshold || 200;
			var last, timer;
			return function () {
				var context = this,
				    args = arguments;
				var now = +new Date();
				if (last && now < last + threshold) {
					if (!oncePerThreshold) {
						clearTimeout(timer);
						timer = setTimeout(function () {
							last = now;
							fn && fn.apply(context, args);
						}, threshold);
					}
				} else {
					last = now;
					fn && fn.apply(context, args);
				}
			};
		}
	};

/***/ }
/******/ ]);
//# sourceMappingURL=build.js.map