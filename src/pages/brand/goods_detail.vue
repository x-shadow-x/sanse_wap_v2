<template>
	<div class="goods_detail_main">
		<div class="head_bar">
			<span class="brand_logo"></span>
			<span class="customer"></span>
		</div>
		<div class="swiper-container">
	        <div class="swiper-wrapper">
	            <div class="swiper-slide goods_detail_item" v-for="item in goodsImageList">
	            	<img :src="item.img_url" :alt="selectColorGoodsDetail.goodsName" class="goods_img">
	            </div>
	            <!-- <div class="swiper-slide goods_detail_item">
	            	<iframe src="http://inno.mo2o.com.cn:8092/getContent.php?act=goods&id=14196&brand_id=1" width="100%" height="80%" class="goods_code_frame"></iframe>
	            </div> -->
	        </div>
	        <div class="swiper-pagination"></div>
	    </div>
	</div>
</template>

<script>

	import '../../plugins/swiper/swiper.min.js';
	import '../../plugins/swiper/swiper.min.css';
	import '../../../config/dev.env.js';

	const goodsCodeRoot = process.env.TEMP_GOODS_CODE_ROOT;

	export default {
		data() {
	        return {
	        	mySwiper: null,
	        	// 一个商品会对应不同的颜色，不同颜色的商品会独立出现在商品列表中，
	        	// 所以进到详情页的时候不仅需要获取当前选中的商品~还要获取当前商品的当前的颜色对应的商品数据
	        	selectColorGoodsDetail: null, 
	        	goodsImageList: [],
	        	goodsId: this.$route.query.goodsId,
	        	colorId: this.$route.query.colorId
	        }
	    },

		mounted() {
			let goodsDetailList = this.$store.state.goodsListRecord;

			this.mySwiper = new Swiper('.swiper-container', {
		        pagination: '.swiper-pagination',
		        direction: 'vertical',
		        lazyLoading : true
		    });

			if(goodsDetailList.length == 0) {
				// store中未保存相应的数据，则可能是直接通过连接跳到详情页的，此时通过另一个接口根据goodsid直接拿对应的商品数据
				this.$request.get(this.$interface.GET_GOODS_DETAIL_LIST_GOODSID_MESSAGE, {
					'goodsId': this.goodsId,
                    'userId': '304014'
                }, (response) => {
					let data = response.data;
					let goodsImageMessage = JSON.parse(data.GoodsImageMessage);
					this.selectColorGoodsDetail = JSON.parse(data.GoodsColorMessage);
					
					let tempImgList = [];

					goodsImageMessage.forEach((item, index) => {
						if(item.img_color == this.colorId) {
							tempImgList.push({'img_url': item.img_url});
						}
					});

					this.goodsImageList = tempImgList;
				});
			} else {
				let selectGoodsDetail = [];
				goodsDetailList.forEach((item, index) => {
					if(item.goodsId == this.goodsId) {
						selectGoodsDetail = item;
					}
				});

				selectGoodsDetail.dataList.forEach((item, index) => {
					if(item.img_color == this.colorId) {
						this.selectColorGoodsDetail = item;
						this.goodsImageList = item.goodsListEntity;
					}
				});
			}

			this.$store.commit('HIDE_LOAD');

			console.log(this.selectColorGoodsDetail);

			setTimeout(() => {
				this.mySwiper.update();
			}, 500);



			// this.$http.get('getContent.php',{
			// 	params:{
			// 		'act': 'goods',
			// 		'id': '14196',
			// 		'brand_id': '1'
			// 	},
			// 	baseURL: goodsCodeRoot,
			// }).then(function(response) {

			// 	var REG_BODY = /<body[^>]*>([\s\S]*)<\/body>/;

		 //        function getBody(content){
		 //            var result = REG_BODY.exec(content);
		 //            if(result && result.length === 2)
		 //                return result[1];
		 //            return content;
		 //        }

			// 	let data = response.data;
			// 	console.log(getBody(data));

			// }).catch(function(err){
			// 	console.log(err);
			// });
		}
	}
</script>

<style scoped>
	.goods_detail_main {
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background: #fff;
		z-index: 3;
	}

	.head_bar {
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
	}

	.swiper-container {
		position: absolute;
		left: 0;
		top: 50%;
		transform: translateY(-50%);
		width: 100%;
		height: 100vw;
	}

	.goods_detail_item {
		overflow: hidden;
	}

	.goods_img {
		width: 100%;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}

	.swiper-container-vertical>.swiper-pagination-bullets {
		left: 10px;
		right: auto;
	}

	.goods_code_frame {
		position: absolute;
		left: 0;
		top: 50%;
		transform: translateY(-50%);
	}
</style>