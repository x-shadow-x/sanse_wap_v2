<template>
	<div class="goods_detail_main">
		<div class="head_bar">
			<img :src="selectColorGoodsDetail.goods_detail_brand_logo" alt="品牌logo" class="brand_logo">
            <div class="link_box">
                <router-link class="user_index" to="/user_index"></router-link>
                <router-link class="shopping_bag" to="/shopping_bag"></router-link>
            </div>
		</div>
        <div class="goods_title_box">
            <h2 class="goods_name">{{selectColorGoodsDetail.goods_name}}</h2>
            <h3 class="alias_goods_sn">{{selectColorGoodsDetail.alias_goods_sn}}</h3>
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

	// const goodsCodeRoot = process.env.TEMP_GOODS_CODE_ROOT;

	export default {
		data() {
	        return {
	        	mySwiper: null,
	        	// 一个商品会对应不同的颜色，不同颜色的商品会独立出现在商品列表中，
	        	// 所以进到详情页的时候不仅需要获取当前选中的商品~还要获取当前商品的当前的颜色对应的商品数据
	        	selectColorGoodsDetail: {},
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
                    // console.log(data);
                    let goodsImageMessage = JSON.parse(data.GoodsImageMessage);
					let goodsColorMessage = JSON.parse(data.GoodsColorMessage);
					this.selectColorGoodsDetail = data.GoodsColorMessage;

					let tempImgList = [];

					goodsImageMessage.forEach((item, index) => {
						if(item.img_color == this.colorId) {
							tempImgList.push({'img_url': item.img_url});
						}
					});

                    for(let i = 0, len = goodsColorMessage.length; i < len; i++) {
                        let currentItem = goodsColorMessage[i];
                        if(currentItem.img_color == this.colorId) {
                            this.selectColorGoodsDetail = currentItem;
                            break;
                        }
                    }

					this.goodsImageList = tempImgList;

                    console.log(this.selectColorGoodsDetail.brand_logo);
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
                console.log(this.selectColorGoodsDetail);
			}

			this.$store.commit('HIDE_LOAD');



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
        text-align: center;
	}

    .brand_logo {
        height: 48px;
    }

    .link_box {
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
    }

    .link_box:after {
        content: '';
        display: inline-block;
        vertical-align: middle;
        height: 100%;
        width: 0;
    }

    .user_index,
    .shopping_bag {
        display: inline-block;
        vertical-align: middle;
        width: 48px;
        height: 48px;
        position: relative;
        background: url('../../images/common/user_icon.png') center no-repeat;
        background-size: 26px auto;
        margin-top: -10px;
    }

    .shopping_bag {
        background-image: url('../../images/common/shopping_bag_icon.png');
    }

    .goods_title_box {
        text-align: center;
        margin-top: 50px;
    }

    .goods_name {
        font-size: 18px;
        font-weight: bolder;
    }

    .alias_goods_sn {
        font-size: 16px;
        font-weight: bolder;
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
