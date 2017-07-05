<template>
	<div class="goods_detail_main" @touchstart="reset">
		<div class="head_bar">
			<img :src="selectColorGoodsDetail.goods_detail_brand_logo || selectColorGoodsDetail.brand_logo" alt="品牌logo" class="brand_logo">
            <div class="link_box">
                <router-link class="user_index" to="/user_index"></router-link>
                <router-link class="shopping_bag" to="/shopping_bag">
                	<num-tip :num="shoppingBagNum"></num-tip>
                </router-link>
            </div>
		</div>
        <div class="goods_title_box">
            <h2 class="goods_name">{{selectColorGoodsDetail.goods_name}}</h2>
            <div class="alias_goods_sn_box">
            	<h3 class="alias_goods_sn">{{selectColorGoodsDetail.alias_goods_sn}}</h3>
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

		<div class="goods_different_color_bar_box" v-if="goodsColorList.length > 1">
			<ul class="goods_different_color_bar">
				<li class="goods_color_item" :class="{active: item.isSelect}" v-for="(item, index) in goodsColorList" :key="item.goods_id" @click="toggleColor(index)">
					<div class="img_box">
						<img :src="item.smallpic" alt="item.goods_name" class="different_color_preview">
					</div>
				</li>
			</ul>
		</div>

	    <div class="buy_bar">
	    	<div class="price_box">
	    		<div class="user_price_box">
	    			<span class="money_tip">¥</span>
	    			<span class="price user_price sansefont_bold">{{selectColorGoodsDetail.user_price}}</span>
	    			<span>您的专属价</span>
	    		</div>
	    		<div class="market_price_box">
	    			<span class="money_tip">¥</span>
	    			<span class="price market_price sansefont_light">{{selectColorGoodsDetail.price}}</span>
	    		</div>
	    	</div>

	    	<div class="handle_box" @touchstart.stop="">
	    		<span class="add_goods_btn" :class="{spread: toggleMap.showSizeList}" @touchend="toggleGoodsList"></span>
	    		<span class="collection_btn" :class="{active: isCollected}" @click="toggleCategory"></span>
	    		<span class="store_search_btn" @touchend="showStoreSearchList"></span>
	    	</div>
	    </div>
	    <span class="add_to_shopping_bag_tip" id="addToShoppingBagTip"></span>
	    <ul class="code_list" :class="{show: toggleMap.showSizeList}" @touchstart.stop="">
			<li class="code_item" v-for="(item, index) in sizeList">
				<span class="code">{{item.attr_value}}</span>
				<div class="add_box" v-if="item.product_number > 0">
					<div class="edit_num_box">
                        <span class="subtract num_edit_btn" :class="{disable: item.number <= 1}" @touchend="subtractGoods(index)"></span>
                        <span class="goods_num_result">{{item.number}}</span>
                        <span class="add num_edit_btn" :class="{disable: item.number >= item.product_number}" @touchend="addGoods(index)"></span>
                    </div>
                    <div class="add_to_shopping_bag" @click.self="addToShoppingBag($event, index)">
                    	<span class="add_to_shopping_bag_text">添加</span>
                    	<i class="add_tip"></i>
                    </div>
				</div>
				<span class="out_of_store" v-else>缺货</span>
			</li>
		</ul>
        <div class="store_search_box" :class="{show: toggleMap.showStoreSearch}" @touchstart.stop="">
            <h2>请问你想要的尺码是？</h2>
            <ul class="search_code_list">
                <li class="search_code_item" v-for="(item, index) in sizeList">
                    <span class="code">{{item.attr_value}}</span>
                    <span class="select_btn" :class="{active: item.isSelect == true}" @click="selectSize(index)"></span>
                </li>
            </ul>
            <div class="store_search_btn_box">
            	<router-link to="/store_search" class="store_search" v-if="isSelectSize">马上查询</router-link>
            	<span class="select_size_tip" v-else>请选择所需尺码</span>
            	
            </div>
        </div>

        <span class="handle_result_tip" :class="{show: showHandleResultTip}">{{handleResultTip}}</span>
	</div>
</template>

<script>

	import '../../plugins/swiper/swiper.min.js';
	import '../../plugins/swiper/swiper.min.css';
	import '../../../config/dev.env.js';

	import numTip from '../../components/common/num_tip.vue';

	export default {
		data() {
	        return {
	        	mySwiper: null,
	        	// 一个商品会对应不同的颜色，不同颜色的商品会独立出现在商品列表中，
	        	// 所以进到详情页的时候不仅需要获取当前选中的商品~还要获取当前商品的当前的颜色对应的商品数据
	        	goodsColorMessage: {}, // 当前商品可能存在多种颜色~此变量用以存放当前商品的所有颜色信息,以img_color作为key
	        	goodsColorList: [], // goodsColorMessage为了方便查找~将商品的颜色信息组织为key-value对~但无法在v-for中遍历~故设此变量

	        	selectColorGoodsDetail: {}, // 商品详情页显示的数据为当前商品的选中的颜色~通过索引找到当前颜色的数据信息存放在此变量

	        	allColorGoodsImageList: {}, //记录当前商品所有颜色的大图地址，以img_color作为key
	        	goodsImageList: [], //记录当前颜色商品的大图地址
	        	goodsId: this.$route.query.goodsId,
	        	colorId: this.$route.query.colorId,
	        	toggleMap: {
	        		showSizeList: false,
	        		showStoreSearch: false
	        	},
	        	isCollected: false,
	        	showHandleResultTip: false,
	        	sizeList: null,
	        	handleResultTip: '',
	        	shoppingBagNum: 0
	        }
	    },

	    computed: {
	    	isSelectSize: function() {
	    		return this.sizeList && this.sizeList.some((item) => {
		    			return item.isSelect;
		    		});
	    	}
	    },

	    methods: {

	    	getShoppingBagNum() {
	    		this.$request.get(this.$interface.GETSTOREAGECOUNT, {
					'userId': this.$store.state.userId,
	                'cookieId': this.$store.state.cookieId
	            }, (response) => {
	            	let data = response.data;
	            	this.shoppingBagNum = data;
				});
	    	},

	    	getSize(cb) {
	    		if(this.selectColorGoodsDetail.sale_type == 6) {

	    		} else if(this.selectColorGoodsDetail.sale_type == 5) {
	    			this.$request.get(this.$interface.GET_SECKILL_GOODS_SIZE, {
						'issueId': this.selectColorGoodsDetail.issue_id,
	                    'imgColor': this.selectColorGoodsDetail.img_color
	                }, (response) => {
						let data = response.data;
	                    
	                    data.forEach((item) => {
	                    	if(item.product_number > 0) {
								item.number = 1;
							}

	                    	item.isSelect = false;
	                    });

	                    this.sizeList = data;

	                    if(cb) {
	                    	cb.bind(this)();
	                    }
					});
	    		} else {
	    			this.$request.get(this.$interface.GET_GOODS_SIZE, {
						'goodsId': this.selectColorGoodsDetail.goods_id,
	                    'imgColor': this.selectColorGoodsDetail.img_color
	                }, (response) => {
						let data = response.data;

						data.forEach((item, index) => {
							if(item.product_number > 0) {
								item.number = 1;
							}
							
							item.isSelect = false;
						});

						this.sizeList = data;

						if(cb) {
	                    	cb.bind(this)();
	                    }
					});
	    		}
	    	},

	    	toggleGoodsList() {
	    		if(!this.sizeList) {
	    			this.getSize(function() {
	    				if(this.sizeList && this.sizeList.length > 0) {
			    			this.toggleMap.showSizeList = !this.toggleMap.showSizeList;
			    		} else {
			    			this.handleResultTip = '没有尺码';
			    			this.showHandleResultTip = true;
			    			setTimeout(() => {
			    				this.showHandleResultTip = false;
			    			}, 800);
			    		}
	    			});
	    		} else {
	    			if(this.sizeList && this.sizeList.length > 0) {
		    			this.toggleMap.showSizeList = !this.toggleMap.showSizeList;
		    		} else {
		    			this.handleResultTip = '没有尺码';
		    			this.showHandleResultTip = true;
		    			setTimeout(() => {
		    				this.showHandleResultTip = false;
		    			}, 800);
		    		}
	    		}
	    		
	    		this.reset('showSizeList');
	    	},

	    	reset(exceptKey='') {
	    		let toggleMap = this.toggleMap;
	    		for(let key in toggleMap) {
	    			if(key == exceptKey) {
	    				continue;
	    			} else {
	    				toggleMap[key] = false;
	    			}

	    		}
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
                if(currentItem.product_number > currentItem.number ) {
                    // 未超过库存量~可以继续添加
                    currentItem.number = +currentItem.number + 1;
                }
            },

            addToShoppingBagRequest(index, interfaceName, id, cb) {

            	let currentSizeGoods = this.sizeList[index];
            	let colorName = currentSizeGoods.color_Name;
            	let sizeVal = currentSizeGoods.attr_value;
            	let goodsAttr = '';
            	let goodsAttrId = this.selectColorGoodsDetail.img_color + ',' + currentSizeGoods.goods_attr_id;

            	if(colorName != '') {
            		goodsAttr = goodsAttr + '颜色:' + colorName + ' ';
            	}
            	if(sizeVal != '') {
            		goodsAttr = goodsAttr + '尺码:' + sizeVal;
            	}
            	goodsAttr = encodeURI(goodsAttr);

            	let postData = {
            		'userIdOrCookieId': id,
					'goodsId': this.selectColorGoodsDetail.goods_id,
                    'product_id': currentSizeGoods.product_id,
                    'addNum': currentSizeGoods.number,
                    'goodsAttr': goodsAttr,
                    'goodsAttrId': goodsAttrId,
                    'saleType': this.selectColorGoodsDetail.sale_type,
                    'issueId': this.selectColorGoodsDetail.issue_id,
                };


            	this.$request.post(interfaceName, postData, (response) => {
            		if(cb) {
            			cb();
            		}
            	});
            },

            addToShoppingBag(e, index) {
            	//  todo 添加商品到购物车动画
            	let sourceElement = $(e.target).parents('.code_item').find('.code').offset();
            	let sourceX = sourceElement.left;
            	let sourceY = sourceElement.top;
            	$('#addToShoppingBagTip').css('top', sourceY + 'px');
            	setTimeout(() => {
            		$('#addToShoppingBagTip').addClass('animate');
            	}, 100);
            	setTimeout(() => {
            		$('#addToShoppingBagTip').removeClass('animate');

            		if(this.$store.state.userId != 0) {
	            		// 已经登录了使用登录状态下添加到购物车的接口
	            		this.addToShoppingBagRequest(index, this.$interface.CREATE_BUYCAR_INSERT, this.$store.state.userId, () => {this.getShoppingBagNum()});
	            	} else {
	            		this.addToShoppingBagRequest(index, this.$interface.CREATE_INSERT_BUYCAR_UNLOGININ, this.$store.state.cookieId, () => {this.getShoppingBagNum()});
	            	}

            	}, 1300);
            },

            toggleCollectionRequest(interfaceName, cb) {
            	this.$request.get(interfaceName, {
            		'userId': this.$store.state.userId,
					'goodsId': this.selectColorGoodsDetail.goods_id,
					'cookieId': this.$store.state.cookieId,
					'colorId': this.selectColorGoodsDetail.img_color
                }, cb);
            },

            toggleCategory() {
            	if(this.isCollected) {
            		this.toggleCollectionRequest(this.$interface.DELETE_FAVORITEGOODS, (response) => {
	                    this.isCollected = false;
					});
            	} else {
            		this.toggleCollectionRequest(this.$interface.ADD_FAVORITEGOODS, (response) => {
	                    this.isCollected = true;
					});
            	}

            },

            showStoreSearchList() {
            	if(!this.sizeList) {
            		this.getSize(function() {
            			this.reset('showStoreSearch');

            			if(this.sizeList && this.sizeList.length > 0) {
		            		this.toggleMap.showStoreSearch = true;
		            	} else {
		            		this.handleResultTip = '没有尺码';
			    			this.showHandleResultTip = true;
			    			setTimeout(() => {
			    				this.showHandleResultTip = false;
			    			}, 800);
		            	}
            		});
            	} else {
            		if(this.sizeList && this.sizeList.length > 0) {
	            		this.toggleMap.showStoreSearch = true;
	            	} else {
	            		this.handleResultTip = '没有尺码';
		    			this.showHandleResultTip = true;
		    			setTimeout(() => {
		    				this.showHandleResultTip = false;
		    			}, 800);
	            	}
            	}
            	
	    		this.reset('showStoreSearch');
            },

            selectSize(index) {
            	this.sizeList[index].isSelect = !this.sizeList[index].isSelect;
            },

            toggleColor(index) {
            	let tempColorMessage = this.goodsColorList[index];
            	let goodsId = tempColorMessage.goods_id;
            	let colorId = tempColorMessage.img_color;
            	this.handleResultTip = tempColorMessage.colorname;

            	if(!tempColorMessage.isSelect) {
            		this.goodsColorList.forEach((item) => {
            			item.isSelect = false;
            		});

            		this.goodsColorList[index].isSelect = true;
            	}

            	this.showHandleResultTip = true;

            	setTimeout(() => {
            		this.showHandleResultTip = false;
            	}, 800);

            	this.selectColorGoodsDetail = this.goodsColorMessage[colorId];
            	this.goodsImageList = this.allColorGoodsImageList[colorId];

            	this.getSize();

            	setTimeout(() => {
            		this.mySwiper.update();
            		this.mySwiper.slideTo(0, 500, false);
            	}, 320);
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
                    'userId': this.$store.state.userId
                }, (response) => {
					let data = response.data;
                    let goodsImageMessage = JSON.parse(data.GoodsImageMessage);
					let goodsColorMessage = JSON.parse(data.GoodsColorMessage);
					

					this.goodsColorMessage = goodsColorMessage;

					let tempImgList = [];

					let tempAllColorGoodsImageList = {};
					let tempAllColorGoodsMessageList = {};

					// 当前页刷新请求回来的数据结构与在列表页直接记录的数据结构有所不同~此处通过注册在data上的变量对两种情况下的数据进行统一
					goodsImageMessage.forEach((item, index) => {

						if(tempAllColorGoodsImageList[item.img_color]) {
							tempAllColorGoodsImageList[item.img_color].push({'img_url': item.img_url});
						} else {
							tempAllColorGoodsImageList[item.img_color] = [{'img_url': item.img_url}];
						}
						
					});

					goodsColorMessage.forEach((item, index) => {

						if(item.img_color == this.colorId) {
							item.isSelect = true;
						} else {
							item.isSelect = false;
						}

						tempAllColorGoodsMessageList[item.img_color] = item;
					});

					this.goodsColorList = goodsColorMessage;

					this.allColorGoodsImageList = tempAllColorGoodsImageList;
					this.goodsColorMessage = tempAllColorGoodsMessageList;

					this.goodsImageList = this.allColorGoodsImageList[this.colorId];
					this.selectColorGoodsDetail = this.goodsColorMessage[this.colorId];

					this.isCollected = this.selectColorGoodsDetail.is_fav_goods;

                    setTimeout(() => {
                        this.mySwiper.update();
                    }, 500);

				});
			} else {
				let selectGoodsDetail = [];
				goodsDetailList.forEach((item, index) => {
					if(item.goodsId == this.goodsId) {
						selectGoodsDetail = item;
					}
				});

				let tempAllColorGoodsImageList = {};
				let tempAllColorGoodsMessageList = {};

				selectGoodsDetail.dataList.forEach((item, index) => {
					tempAllColorGoodsImageList[item.img_color] = item.goodsListEntity;
					tempAllColorGoodsMessageList[item.img_color] = item;

					if(item.img_color == this.colorId) {
						this.selectColorGoodsDetail = item;
						item.isSelect = true;
						this.goodsImageList = item.goodsListEntity;
					} else {
						item.isSelect = false;
					}
				});

				this.goodsColorList = selectGoodsDetail.dataList;

				this.allColorGoodsImageList = tempAllColorGoodsImageList;
				this.goodsColorMessage = tempAllColorGoodsMessageList;

				this.selectColorGoodsDetail = this.goodsColorMessage[this.colorId];
				this.goodsImageList = this.allColorGoodsImageList[this.colorId];

				this.isCollected = this.selectColorGoodsDetail.is_fav_goods;

                setTimeout(() => {
                    this.mySwiper.update();
                }, 500);
			}

			this.getShoppingBagNum();

			this.$store.commit('HIDE_LOAD');

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
		},

		components: {
			numTip
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
        background: #f8f8f8;
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

	.goods_different_color_bar_box {
		position: fixed;
		left: 0;
        right: 0;
		bottom: 1.48rem;
		background: rgba(255, 255, 255, .8);
		padding: 10px 5px;
        z-index: 2;
        overflow: hidden;
	}

	.goods_different_color_bar {
		white-space: nowrap;
        overflow-x: auto;
        overflow-y: hidden;
        text-align: center;
        padding: 5px;
	}

	.goods_color_item {
		display: inline-block;
		width: 1.4rem;
		height: 1.4rem;
	}

	.goods_color_item.active {
		transform: scale(1.1, 1.1);
		border: 1px solid #ef8200;
	}

	.goods_color_item + .goods_color_item {
		margin-left: 10px;
	}

	.goods_color_item .img_box {
		width: 100%;
		height: 100%;
		position: relative;
	}

	.different_color_preview {
		position: absolute;
		left: 0;
		top: 50%;
		width: 100%;
		transform: translateY(-50%);
	}

	.buy_bar {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		height: 1rem;
		padding: 0.24rem;
		z-index: 5;
		background: #fff;
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

    .user_price_box .money_tip {
    	font-weight: bolder;
    }

    .price {
    	display: inline-block;
    	vertical-align: text-top;
    	line-height: 1;
    }

    .user_price {
    	font-size: 16px;
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
		background: rgba(255, 255, 255, .95);
		max-height: 7.4rem;
		overflow-y: auto;
		transform: translateY(100%);
		transition: transform .32s;
		z-index: 2;
	}

	.code_list.show {
		transform: translateY(0);
	}

	.code_item {
		position: relative;
		padding: 0.24rem;
	}

	.code_item:before {
		content: "";
	    position: absolute;
	    width: 200%;
	    height: 200%;
	    left: 0;
	    top: -1px;
	    border-bottom: 1px solid #dfdfdf;
	    transform-origin: 0 0;
	    transform: scale(0.5, 0.5);
	    box-sizing: border-box;
	}

	.add_to_shopping_bag_tip {
		position: fixed;
		width: 16px;
		height: 16px;
		background: url('../../images/goods_detail/add_to_shopping_bag_tip_icon.png');
		background-size: 100% auto;
		left: 10px;
		top: 0;
		z-index: 1000;
		opacity: 0;
	}

	.add_to_shopping_bag_tip.animate {
		transition: opacity .5s, left .7s linear .5s, top .7s ease-out .5s;
		opacity: 1;
		top: 10px !important;
		left: 90% !important;
	}

	.code {
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
		position: relative;
	}

	.add_goods_btn {
		width: 2.485rem;
		height: 1rem;
		background: url('../../images/goods_detail/add_goods_icon.png') center no-repeat;
		background-size: auto 100%;
	}

	.add_goods_btn.spread {
		background-image: url('../../images/goods_detail/add_goods_hide_icon.png');
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

	.collection_btn.active {
		background-image: url('../../images/goods_detail/collection_active_icon.png');
		animation: rotate_animation 1s;
	}

	@keyframes rotate_animation {
	    0% {
	        top: 0px;
	        transform: translateZ(40px) rotateX(0);
	    }
	    50% {
	        top: -1rem;
	        transform: translateZ(40px) rotateX(720deg);
	    }
	    100% {
	        top: 0px;
	        transform: translateZ(40px) rotateX(720deg);
	    }
	}

	.edit_num_box {
        font-size: 0;
    }

    .num_edit_btn {
        width: 32px;
        height: 32px;
        display: inline-block;
        vertical-align: middle;
        background: url('../../images/common/add_icon.png') center no-repeat;
        background-size: 14px auto;
        position: relative;
    }

    .num_edit_btn:before {
    	content: "";
	    position: absolute;
	    left: 0;
	    top: 0;
	    width: 200%;
	    height: 200%;
	    border: 1px solid #dfdfdf;
	    transform-origin: 0 0;
	    transform: scale(0.5, 0.5);
	    box-sizing: border-box;
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
        font-size: 12px;
        text-align: center;
        position: relative;
    }

    .goods_num_result:before {
	    content: "";
	    position: absolute;
	    left: 0;
	    top: 0;
	    width: 200%;
	    height: 200%;
	    border-top: 1px solid #dfdfdf;
	    border-bottom: 1px solid #dfdfdf;
	    transform-origin: 0 0;
	    transform: scale(0.5, 0.5);
	    box-sizing: border-box;
	}

    .store_search_box {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(255, 255, 255, .95);
        z-index: 5;
        transform: translateY(100%);
		transition: transform .32s;
    }

    .store_search_box.show {
    	transform: translateY(0);
    }

    .store_search_box h2 {
        padding: .24rem .48rem;
        border-bottom: 1px solid #efefef;
    }

    .search_code_list {
		max-height: 7.4rem;
		overflow-y: auto;
    }

    .search_code_item {
        padding: .24rem .48rem;
        position: relative;
        border-bottom: 1px solid #efefef;
    }

    .select_btn {
        position: absolute;
        right: .48rem;
        top: 50%;
        transform: translateY(-50%);
        height: 100%;
        width: 32px;
        background: url('../../images/common/checkbox_icon.png') right center no-repeat;
        background-size: 16px auto;
    }

    .select_btn.active {
        background-image: url('../../images/common/checkbox_icon_active.png');
    }

    .store_search_btn_box {
    	text-align: center;
    	padding: 0.24rem 0;
    	color: #fff;
    }

    .select_size_tip,
    .store_search {
    	display: inline-block;
    	padding: 0.38rem 0.48rem;
    }

    .select_size_tip {
    	background: #ddd;
    }

    .store_search {
    	background: #ef8200;
    }

    .handle_result_tip {
    	position: fixed;
    	left: -1000px;
    	bottom: 4rem;
    	transform: translateX(-50%);
    	background: rgba(0, 0, 0, .8);
    	color: #fff;
    	padding: 10px 20px;
    	border-radius: 4px;
    	transition: opacity .5s, left 0s .53s;
    	opacity: 0;
    }

    .handle_result_tip.show {
    	left: 50%;
    	opacity: 1;
    	transition: left 0s, opacity .5s .1s;
    }
</style>