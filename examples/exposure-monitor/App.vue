<template>
	<div v-exposure='{
				"selector": "[data-src]",
				"domUpdateTrigger": "imgs",
				"dealMethod": "imgLazyload"
			}' :exposure-opt="lazyloadOpt">
		<div v-for='img in imgs'>
			<img data-src="{{img}}" style="width: 300px;height:300px">
		</div>
	</div>
</template>

<script>

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
			console.log('imgLazyload', node.nodeName);
			var src = node.getAttribute('data-src');
			if(src) {
				node.removeAttribute('data-src');
				node.src = src;
			}
		},
		exposureReport: function(node) {
			console.log('exposureReport', node.nodeName);
		}
	}
}
</script>
