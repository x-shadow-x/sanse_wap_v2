<template>
	<div class="goods_detail_main">
		<div class="head_bar">
			<img :src="selectColorGoodsDetail.goods_detail_brand_logo || selectColorGoodsDetail.brand_logo" alt="品牌logo" class="brand_logo">
            <div class="link_box">
                <router-link class="user_index" to="/user_index"></router-link>
                <router-link class="shopping_bag" to="/shopping_bag"></router-link>
            </div>
		</div>
        <div class="goods_title_box">
            <h2 class="goods_name">{{selectColorGoodsDetail.goods_name}}123123123123123123123123</h2>
            <div class="alias_goods_sn_box">
            	<h3 class="alias_goods_sn">{{selectColorGoodsDetail.alias_goods_sn}}123123123123123123123123</h3>
            </div>
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

	    <div class="buy_bar">
	    	<div class="price_box">
	    		<div class="user_price_box">
	    			<span class="money_tip">¥</span>
	    			<span class="price user_price">{{selectColorGoodsDetail.user_price}}</span>
	    			<span>您的专属价</span>
	    		</div>
	    		<div class="market_price_box">
	    			<span class="money_tip">¥</span>
	    			<span class="price market_price">{{selectColorGoodsDetail.price}}</span>
	    		</div>
	    	</div>

	    	<div class="handle_box">
	    		<span class="add_goods_btn" @click="showGoodsList"></span>
	    		<span class="collection_btn"></span>
	    		<span class="store_search_btn"></span>
	    	</div>

	    	<ul class="code_list">
    			<li class="code_item" v-for="(item, index) in sizeList">
    				<span class="code">{{item.attr_value}}</span>
    				<div class="add_box" v-if="item.product_number > 0">
    					<div class="edit_num_box">
                            <span class="subtract num_edit_btn" :class="{disable: item.number <= 1}" @click="subtractGoods(index)"></span>
                            <span class="goods_num_result">{{item.number}}</span>
                            <span class="add num_edit_btn" :class="{disable: item.number >= item.product_number}" @click="addGoods(index)"></span>
                        </div>
                        <div class="add_to_shopping_bag" @click.self="addToShoppingBag($event, index)">
                        	<span class="add_to_shopping_bag_text">添加</span>
                        	<i class="add_tip"></i>
                        </div>
    				</div>
    				<span class="out_of_store" v-else>缺货</span>
    			</li>
    		</ul>
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
	        	colorId: this.$route.query.colorId,
	        	sizeList: [],
	        }
	    },

	    methods: {
	    	getSize() {
	    		if(this.selectColorGoodsDetail.sale_type == 6) {
	    			
	    		} else if(this.selectColorGoodsDetail.sale_type == 5) {
	    			this.$request.get(this.$interface.GET_SECKILL_GOODS_SIZE, {
						'issueId': this.selectColorGoodsDetail.issue_id,
	                    'imgColor': this.selectColorGoodsDetail.img_color
	                }, (response) => {
						let data = response.data;
	                    this.sizeList = data;
					});
	    		} else {
	    			this.$request.get(this.$interface.GET_GOODS_SIZE, {
						'goodsId': this.selectColorGoodsDetail.goods_id,
	                    'imgColor': this.selectColorGoodsDetail.img_color
	                }, (response) => {
						let data = response.data;
						data.forEach((item, index) => {
							if(item.product_number > 0)
							item.number = 1;
						});
						this.sizeList = data;
					});
	    		}
	    	},

	    	showGoodsList() {
	    		this.getSize();
	    	},


	    	subtractGoods(index) {
                let currentItem = this.sizeList[index];
                if(currentItem.number > 1) {
                    // 未到最小值~可以减少
                    currentItem.number = +currentItem.number - 1;
                    currentItem.product_number = +currentItem.product_number + 1;
                }
            },

            addGoods(index) {
                let currentItem = this.sizeList[index];
                console.log(index);
                if(currentItem.product_number > currentItem.number ) {
                    // 未超过库存量~可以继续添加
                    currentItem.number = +currentItem.number + 1;
                }
            },

            addToShoppingBag(e, index) {
            	//  todo 添加商品到购物车动画
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

                    console.log(this.selectColorGoodsDetail);
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
        height: 42px;
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
        width: 42px;
        height: 42px;
        position: relative;
        background: url('../../images/common/user_icon.png') center no-repeat;
        background-size: 26px auto;
        margin-top: -4px;
    }

    .shopping_bag {
        background-image: url('../../images/common/shopping_bag_icon.png');
    }

    .goods_title_box {
        text-align: center;
        margin-top: 42px;
    }

    .goods_name {
        font-size: 18px;
        font-weight: bolder;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        width: 80%;
        margin: 0 auto;
        line-height: 24px;
    }

    .alias_goods_sn_box {
    	margin-top: 0.120773rem;
    }

    .alias_goods_sn {
        font-size: 16px;
        font-weight: bolder;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        width: 50%;
        margin: 0 auto;
    }

	.swiper-container {
		position: relative;
		margin-top: 0.241546rem;
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

	.buy_bar {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		height: 1rem;
		padding: 0.24rem;
		z-index: 2;
	}

	.buy_bar:before {
		content: '';
		display: inline-block;
		width: 0;
		height: 100%;
		vertical-align: middle;
	}

	.price_box {
		display: inline-block;
		vertical-align: middle;
	}

	.money_tip {
        display: inline-block;
        vertical-align: text-top;
        font-size: 8px;
        line-height: 1;
    }

    .price {
    	display: inline-block;
    	vertical-align: text-top;
    	line-height: 1;
    }

    .user_price {
    	font-size: 16px;
    	font-weight: bolder;
    }

	.market_price_box {
		color: #7f7f7f;
	}

	.market_price {
		text-decoration: line-through;
	}

	.handle_box {
		position: absolute;
		right: 0.24rem;
		top: 50%;
		transform: translateY(-50%);
		font-size: 0;
	}

	.code_list {
		position: fixed;
		bottom: 1.48rem;
		left: 0;
		right: 0;
		background: rgba(255, 255, 255, .9);
		border-bottom: 1px solid #ddd;
		max-height: 320px;
		overflow-y: auto;
	}

	.code_item {
		position: relative;
		padding: 0.241546rem;
	}

	.code_item + .code_item {
		border-top: 1px solid #ddd;
	}

	.code_list .code {
		line-height: 1rem;
	}

	.out_of_store {
		display: inline-block;
		vertical-align: middle;
		line-height: 1rem;
	}

	.add_box,
	.out_of_store {
		position: absolute;
		right: 0.241546rem;
		top: 50%;
		transform: translateY(-50%);
	}

	.edit_num_box,
	.add_to_shopping_bag {
		display: inline-block;
		vertical-align: middle;
	}

	.add_to_shopping_bag {
		margin-left: 10px;
	}

	.add_to_shopping_bag:before {
		content: '';
		display: inline-block;
		vertical-align: middle;
		width: 20px;
		height: 1rem;
		background: url('../../images/goods_detail/add_to_shopping_bag_icon.png') center no-repeat;
		background-size: 18px auto;
		margin-right: 5px;
	}

	.add_to_shopping_bag_text {
		display: inline-block;
		vertical-align: middle;
		color: #7f7f7f;
	}

	.add_goods_btn,
	.collection_btn,
	.store_search_btn {
		display: inline-block;
		vertical-align: middle;
	}

	.add_goods_btn {
		width: 2.485rem;
		height: 1rem;
		background: url('../../images/goods_detail/add_goods_icon.png') center no-repeat;
		background-size: auto 100%;
	}

	.collection_btn,
	.store_search_btn {
		width: 1rem;
		height: 1rem;
		background: url('../../images/goods_detail/collection_icon.png') center no-repeat;
		background-size: 100% auto;
		margin-left: 0.241546rem;
	}

	.store_search_btn {
		background-image: url('../../images/goods_detail/store_search_icon.png');
	}

	.edit_num_box {
        font-size: 0;
    }

    .num_edit_btn {
        width: 32px;
        height: 32px;
        display: inline-block;
        vertical-align: middle;
        border: 1px solid #ccc;
        background: url('../../images/common/add_icon.png') center no-repeat;
        background-size: 14px auto;
    }

    .subtract {
        background-image: url('../../images/common/subtract_icon.png');
    }

    .subtract.disable {
        background-image: url('../../images/common/subtract_disable_icon.png');
    }

    .add.disable {
        background-image: url('../../images/common/add_disable_icon.png');
    }

    .goods_num_result {
        display: inline-block;
        vertical-align: middle;
        width: 70px;
        height: 32px;
        line-height: 32px;
        border-top: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
        font-size: 12px;
        text-align: center;
    }
</style>
