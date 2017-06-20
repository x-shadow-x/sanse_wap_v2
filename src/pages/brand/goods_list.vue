<template>
	<div class="goods_list_main" @click="reset" :class="{top: !showCategoryBar}">
		<div class="category_bar" v-if="showCategoryBar">
			<div class="category_box">
				<ul class="category_list">
					<li v-for="(item, index) in categoryList" :key="item.cat_id" class="categoey_item" :class="{active: item.isSelected}" @click.stop="selectCategory(index)">
						<span class="categoey_item_text">{{item.cat_name}}</span>
					</li>
					<li v-if="restCategoryList.length > 0" class="categoey_item rest_items" @click.stop="handleRestItem">
						<span class="rest_btn" :class="{active: toggleMap.isRestBtnActive}"></span>
						<ul class="rest_item_list" v-if="toggleMap.isRestBtnActive">
							<li v-for="(restItem, index) in restCategoryList" :key="restItem.cat_id" class="rest_item" @click.stop="selectRestItem(index)">
								{{restItem.cat_name}}
							</li>
						</ul>
					</li>
				</ul>
			</div>
			<router-link to="/goods_search" class="search_btn"></router-link>
		</div>
		<div class="filter_bar" :class="{hide: hideFilterBar}">
            <div class="filter_bar_box">
                <span class="new_good_icon"></span>
    			<div class="sort_box">
    				<div class="sort_result_box" @click.stop="toggleSortList">
    					<span class="sort_result">{{sortResult}}</span>
    					<i class="arr_icon" :class="{active: toggleMap.isShowSortList}"></i>
    				</div>
    				<ul class="sort_list" v-if="toggleMap.isShowSortList">
    					<li v-for="(item, index) in sortList" class="sort_item" :class="{active: item.isSelected}" @click.stop="selectSortItem(index)">{{item.text}}</li>
    				</ul>
    			</div>
    			<div class="filter_box">
    				<div class="filter_btn_box" @click.stop="toggleFilterList">
    					<span class="filter_btn">筛选</span>
    					<i class="arr_icon" :class="{active: toggleMap.isShowFilterList}"></i>
    				</div>
    			</div>
            </div>
		</div>
		<div class="filter_list_out_box" :class="{show: toggleMap.isShowFilterList}">
			<div class="filter_list_box" @click.stop="">
				<template v-if="colorPropertyListArray.length > 0 && goodPropertyListArray.length > 0">
					<div class="filter_list">
						<div class="prototype_box goods_pro" v-for="(goodPropertyItem, goodPropertyIndex) in goodPropertyListArray" @click="handleSelectProp($event)">
							<h2 class="prototype_title">{{goodPropertyItem.PropertyName}}</h2>
							<ul class="prototype_list">
								<li class="prototype_item" v-for="(item, index) in goodPropertyItem.GoodPropertyArray" :data-attr-id="item.attr_id" :data-property-index="goodPropertyIndex" :data-index="index" :data-attr-value="item.attr_value">{{item.attr_value}}</li>
							</ul>
						</div>
						<div class="prototype_box goods_color" v-if="colorPropertyListArray.length > 0" @click="handleSelectProp($event, 'color')">
							<h2 class="prototype_title">颜色</h2>
							<ul class="prototype_list">
								<li class="prototype_item" v-for="item in colorPropertyListArray" :data-colorcat-id="item.ColorPropertyArray[0].colorcat_id">{{item.PropertyName}}</li>
							</ul>
						</div>
					</div>
					<div class="handle_btn_box">
						<span class="btn" @click="resetFilter">重新筛选</span>
						<span class="btn confirm_btn" @click="confirmFilter">确认</span>
					</div>
				</template>
				<template v-else>
					<i class="empty_filter_icon"></i>
					<span class="empty_filter_tip">暂无筛选条件！</span>
				</template>
			</div>
		</div>

        <div class="goods_list_box" id="goodsListBox">
            <div class="scroller">
        		<ul class="goods_list" v-if="!isGoodsListEmpty">
                    <li class="goods_item" v-for="(item, index) in goodsList">
                        <router-link :to="{path: 'goods_detail/', query: {goodsId: item.goods_id, colorId: item.img_color}}" class="goods_detail_link">
                        	<div class="img_box">
	                            <img :src="item.goods_img" :alt="item.goods_name" class="goods_img">
	                        </div>
	                        <div class="goods_info_box">
	                            <h2 class="goods_name">{{item.goods_name}}</h2>
	                            <div class="price_box">
	                                <img src="../../images/goods_list/special_price_icon.png" alt="特价icon" class="special_price_tip" v-if="item.sale_type == 4">
	                                <div class="current_price_box">
	                                    <span class="money_tip">¥</span><span class="price">{{item.price}}</span>
	                                </div>
	                                <div class="old_price_box">
	                                    <span class="money_tip">¥</span><span class="price">{{item.market_price}}</span>
	                                </div>
	                            </div>
	                            <div class="date_box">
	                                <i class="date_icon"></i><span class="date">{{item.onsale_time.split(' ')[0]}}</span>
	                            </div>
	                        </div>
                        </router-link>
                    </li>
                </ul>
                <div class="empty_goods_list_box" v-else>
		        	<div class="empty_goods_list_tip">
		        		<i class="empty_goods_list_icon"></i>
		        		<p class="empty_goods_list_text">暂无商品</p>
		        	</div>
		        </div>
                <div :class="{transparent: !isMore || isGoodsListEmpty}">
                    <div id="pullUp">
                        <span class="pullUpIcon"></span><span class="pullUpLabel">上拉加载更多</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="page_tip_box" v-if="showPageTip">
        	<span class="current_page">{{currentPage}}</span>
        	<span class="total_page">{{totalPage}}</span>
        </div>
        <span class="scroll_to_top" v-if="showScrollToTop" @click="scrollToTop"></span>
	</div>
</template>

<script>

    import  '../../plugins/iscroll-probe.js';

	export default {
		data() {
			return {
				categoryList: [],
				restCategoryList: [],
				sortList: [
					{
						text: '精选推荐',
						isSelected: true,
						sortField: 0,
						sortBy: 'asc'
					},
					{
						text: '上架时间',
						isSelected: false,
						sortField: 'on_sale_time',
						sortBy: 'asc'
					},
					{
						text: '销量',
						isSelected: false,
						sortField: 'salesVolume',
						sortBy: 'asc'
					},
					{
						text: '价格升序',
						isSelected: false,
						sortField: 'shop_price',
						sortBy: 'asc'
					},
					{
						text: '价格降序',
						isSelected: false,
						sortField: 'shop_price',
						sortBy: 'desc'
					}
				],
				colorPropertyListArray: [],
				goodPropertyListArray: [],
				toggleMap: {
					isRestBtnActive: false,
					isShowSortList: false,
					isShowFilterList: false
				},
                funcType: this.$route.query.funcType || 'AC',
                catId: this.$route.query.catId || 0,
				sortField: ' ',
				sortBy: 'asc',
				propsFilterIdStr: 0,
				propsFilterStr: ' ',
				colorCatIdStr: 0,
				totalPage: 0,
				currentPage: 1,
				goodsItemStep: 0,
				showPageTip: false,
				showScrollToTop: false,
                isMore: true,
                showCategoryBar: true,
                myScroll: null,
                currentY: 0, // 记录开始滑动时候iscroll~以便在有商品的时候做上拉则筛选框消失的效果
                isGoodsListEmpty: false,
                hideFilterBar: false,
                goodsList: [],
                pageIndex: 1
			}
		},

		computed: {
			sortResult: function() {
				return this.sortList.filter((item) => {
					return item.isSelected;
				})[0].text
			}
		},

		methods: {
			selectCategory(index) {
				this.reset();
				this.toggleMap.isRestBtnActive = false;

				this.categoryList.forEach((item) => {
					item.isSelected = false;
				});

				this.categoryList[index].isSelected = true;
				this.catId = this.categoryList[index].cat_id;
				this.$store.commit('SHOW_LOAD');
				this.resetFilter();
				this.pageIndex = 1;
				this.getDefaultData();
			},

			handleRestItem() {
				this.reset();
				this.categoryList.forEach((item) => {
					item.isSelected = false;
				});

				this.toggleMap.isRestBtnActive = !this.toggleMap.isRestBtnActive;
			},

			selectRestItem(index) {
				this.reset();
				this.toggleMap.isRestBtnActive = false;
				this.categoryList.splice(1, 0, this.restCategoryList.splice(index, 1)[0]);
				this.categoryList[1].isSelected = true;
				this.restCategoryList.push(this.categoryList.pop())
			},

			toggleSortList() {
				this.reset('isShowSortList');
				this.toggleMap.isShowSortList = !this.toggleMap.isShowSortList;
			},

			toggleFilterList() {
				this.reset('isShowFilterList');
				this.toggleMap.isShowFilterList = !this.toggleMap.isShowFilterList;
			},

			selectSortItem(index) {
				this.reset();
				let currentItem = this.sortList[index];
				if(currentItem.isSelected) {
					return;
				}
				this.sortList.forEach((item) => {
					item.isSelected = false;
				});

				currentItem.isSelected = true;

				this.toggleMap.isShowSortList = false;

				this.sortField = currentItem.sortField;
				this.sortBy = currentItem.sortBy;
                this.pageIndex = 1;
                if(this.colorCatIdStr == 0 && this.propsFilterIdStr == 0) {
                    this.getDefaultData();
                } else {
                    this.getFilterData();
                }
			},

			/**
			 * 还要自己实现事件代理~嗷呜
			 * @param  {[type]} e [description]
			 * @return {[type]}   [description]
			 */
			handleSelectProp(e, type) {
				let target = e.target;
				if(target.nodeName == 'LI') {
					$(target).toggleClass('active').siblings('li').removeClass('active');
				}
			},

			resetFilter() {
				$('.prototype_item').removeClass('active');
				this.propsFilterIdStr = 0;
				this.propsFilterStr = ' '
			},

			confirmFilter() {

				this.propsFilterIdStr = 0;
				this.propsFilterStr = ' ';
				this.colorCatIdStr = 0;

				$('.goods_pro').find('.prototype_item.active').each((index, item) => {
					this.propsFilterIdStr = this.propsFilterIdStr == '' ? $(item).attr('data-attr-id') : this.propsFilterIdStr + ',' + $(item).attr('data-attr-id');
					this.propsFilterStr = this.propsFilterStr == ' ' ? $(item).html() : this.propsFilterStr + '$#_!' + $(item).html();
				});

				$('.goods_color').find('.prototype_item.active').each((index, item) => {
					this.colorCatIdStr = $(item).attr('data-colorcat-id');
				});

				this.$store.commit('SHOW_LOAD');
				this.toggleMap.isShowFilterList = false;
				this.pageIndex = 1;
				if(this.colorCatIdStr == 0 && this.propsFilterIdStr == 0) {
                    this.getDefaultData();
                } else {
                    this.getFilterData()
                }
			},

			reset(expectKey) {

				for(let key in this.toggleMap) {
					if(key == expectKey) {
						continue;
					}
					this.toggleMap[key] = false;
				}
			},

			scrollToTop() {
				this.myScroll.scrollTo(0, 0, 500);
			},

			getDefaultData(cb) {

				this.$request.get(this.$interface.GET_ALL_GOODS_DETAIL_LIST, {
                    'userId': '304014',
                    'funcType': this.funcType,
                    'catId': this.catId,
                    'keyWord': encodeURI(this.$route.query.keyWord || ' '),
                    'sortField': this.sortField,
                    'sortBy': this.sortBy,
                    'cookieId': '23456006805d970d5438a354dc019fc295614979',
                    'pageIndex': this.pageIndex++,
                    'pageSize': this.$interface.PAGE_SIZE
                }, (response) => {
					let data = response.data;
					if(data.dataList.length == 0 || data.dataList.length < this.$interface.PAGE_SIZE) {
						this.isMore = false;
					} else {
						this.isMore = true;
					}
					if(this.pageIndex == 2) {
						// 目前是第一页的数据~直接将data.dataList赋值给this.goodsList
						this.goodsList = data.dataList;
						this.scrollToTop();
						this.$store.commit('SET_GOODS_LIST_RECORD', data.dataDetailList);
					} else {
						// 已经是翻页的数据了~故需追加而不是直接赋值
						this.goodsList.push(...data.dataList);
						this.$store.commit('PUSH_GOODS_LIST_RECORD', data.dataDetailList);
					}


					if(this.goodsList.length > 0) {
						this.isGoodsListEmpty = false;
					} else {
						this.isGoodsListEmpty = true;
					}

					this.totalPage = Math.ceil(data.recordsNumber / this.$interface.PAGE_SIZE);

					setTimeout(() => {
						this.myScroll.refresh();
						if(typeof cb == 'function') {
							cb.bind(this)(data);
						}
					}, 320);

					this.$store.commit('HIDE_LOAD');
				});
			},

			getFilterData() {
				this.$request.get(this.$interface.GET_APP_SEARCH_GOOD_DETAIL_LIST_FORPRO, {
					'funcType': this.funcType,
					'catId': this.catId,
					'propsFilterIdStr': this.propsFilterIdStr,
					'propsFilterStr': encodeURI(this.propsFilterStr),
					'colorCatId': this.colorCatIdStr,
					'startPrice': 0, // 已经弃用的参数~故传个0~只是占位
					'endPrice': 0, // 已经弃用的参数~故传个0~只是占位
					'keyWord': encodeURI(this.$route.query.keyWord || ' '),
					'userId': '304014',
					'cookieId': '23456006805d970d5438a354dc019fc295614979',
					'sortField': this.sortField,
					'sortBy': this.sortBy,
					'pageIndex': this.pageIndex++,
					'pageSize': this.$interface.PAGE_SIZE
				}, (response) => {
					let data = response.data;

					if(data.dataList.length == 0 || data.dataList.length < this.$interface.PAGE_SIZE) {
						this.isMore = false;
					} else {
						this.isMore = true;
					}

					if(this.pageIndex == 2) {
						// 目前是第一页的数据~直接将data.dataList赋值给this.goodsList
						this.goodsList = data.dataList;
						this.scrollToTop();
						this.$store.commit('PUSH_GOODS_LIST_RECORD', data.dataDetailList);
					} else {
						// 已经是翻页的数据了~故需追加而不是直接赋值
						this.goodsList.push(...data.dataList);
						this.$store.commit('SET_GOODS_LIST_RECORD', data.dataDetailList);
					}

					if(this.goodsList.length > 0) {
						this.isGoodsListEmpty = false;
					} else {
						this.isGoodsListEmpty = true;
					}

					this.totalPage = Math.ceil(data.recordsNumber / this.$interface.PAGE_SIZE);

					setTimeout(() => {
						this.myScroll.refresh();
					}, 320);

					this.$store.commit('HIDE_LOAD');
				});
			}
		},

		mounted() {

			if(this.$route.query.funcType == 'SE') {
				this.showCategoryBar = false;
				document.title = '搜索结果' + decodeURI(this.$route.query.keyWord);
			} else {
				// funcType: SE  CA
				// 获取顶部分类列表~如果当前页面是由搜索页通过搜索关键词跳转过来~则不显示顶部的分类列表~
				// 所以上面if条件块内无需发送过去分类列表的请求
				this.$request.get(this.$interface.GET_BRAND_WITH_CATEGORY_PLUS_LIST, {
					'brandId': this.$route.query.brandId || 0,
					'catId': this.catId,
					'funcType': this.funcType
				}, (response) => {
					let data = response.data[0].CategoryList;
					data.forEach((item) => {
						item.isSelected = false;
					});
					data[0].isSelected = true;
					this.categoryList = data.slice(0, 4);
					this.restCategoryList = data.slice(4);
				});
			}
			
			this.$request.get(this.$interface.GET_APP_PROPERTY_LIST, {
				'funcType': this.funcType,
				'catId': this.catId,
				'keyWord': encodeURI(this.$route.query.keyWord || ' '),
				'currentBrandId': this.$route.query.brandId
			}, (response) => {
				let data = response.data;
				this.colorPropertyListArray = data.ColorPropertyListArray;
				this.goodPropertyListArray = data.GoodPropertyListArray;
			});

			this.getDefaultData(function(data) {
				this.totalPage = Math.ceil(data.recordsNumber / this.$interface.PAGE_SIZE);
				this.goodsItemStep = -2 / (this.$interface.PAGE_SIZE * $('.goods_item').outerHeight(true));
			});


			var pullUpEl,
                pullUpOffset;


			function pullUpAction () {
            	if(this.colorCatIdStr == 0 && this.propsFilterIdStr == 0) {
                    this.getDefaultData();
                } else {
                    this.getFilterData()
                }
            }

			function loaded () {
				pullUpEl = document.getElementById('pullUp');
                pullUpOffset = pullUpEl.offsetHeight;
                var that = this;

				this.myScroll = new IScroll('#goodsListBox', { probeType: 3, preventDefaultException: { tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT|A)$/ }});

				this.myScroll.on('scroll', () => {
					// this.currentPage = Math.ceil((2 * (this.myScroll.y * this.goodsItemStep)) / this.$interface.PAGE_SIZE);
					// 此处计算公式是经过化简的~将能事先计算的固定值先计算出来直接用~减小性能开销
					this.currentPage = Math.ceil(this.myScroll.y * this.goodsItemStep);
					if(this.showPageTip > 1) {
						this.showPageTip = true;
					}
					this.showScrollToTop = false;

	            	if(this.myScroll.y < this.currentY - 30) {
	            		if(!this.isGoodsListEmpty) {
	            			this.hideFilterBar = true;
	            		}

	            	} else if(this.myScroll.y > this.currentY + 30) {
	            		if(!this.isGoodsListEmpty) {
	            			this.hideFilterBar = false;
	            		}
	            	}

	                if (this.myScroll.y < (this.myScroll.maxScrollY - 5) && !pullUpEl.className.match('flip')) {
	                    pullUpEl.className = 'flip';
	                    pullUpEl.querySelector('.pullUpLabel').innerHTML = '释放加载';
	                } else if (this.myScroll.y > (this.myScroll.maxScrollY + 5) && pullUpEl.className.match('flip')) {
	                    pullUpEl.className = '';
	                    pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多';
	                }
	            });
					
				this.myScroll.on('scrollEnd', () => {
					this.currentY = this.myScroll.y;
					this.showPageTip = false;
					if(this.myScroll.y < 0) {
						this.showScrollToTop = true;
					}

                    if (pullUpEl.className.match('flip')) {
                        pullUpEl.className = 'loading';
                        pullUpEl.querySelector('.pullUpLabel').innerHTML = '加载...';
                        pullUpAction.bind(this)();
                    }
				});
			}

            loaded.bind(this)();
		}
	}
</script>

<style scoped>
	.goods_list_main {
		position: fixed;
	    z-index: 2;
	    left: 0;
	    right: 0;
	    top: 0;
	    bottom: 0;
	    background: #fff;
	    overflow: auto;
	}

	.category_bar {
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		border-bottom: 1px solid #efefef;
		z-index: 5;
        background: #fff;
	}

	.category_box {
		display: inline-block;
		vertical-align: middle;
		width: 85%;
	}

	.category_list {
		display: flex;
	}

	.categoey_item {
		flex: 1;
		padding: 0 5px;
		box-sizing: border-box;
		line-height: 1.2rem;
		text-align: center;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		color: #7f7f7f;
	}

	.categoey_item_text {
		padding-bottom: 4px;
	}

	.categoey_item.active .categoey_item_text {
		color: #333;
		border-bottom: 1px solid #333;
	}

	.categoey_item.rest_items {
		position: relative;
		overflow: visible;
	}

	.rest_item_list {
		position: absolute;
		left: 50%;
		top: 110%;
		transform: translateX(-50%);
		white-space: nowrap;
		border: 1px solid #efefef;
		line-height: .9rem;
		min-width: 1.570048rem;
		padding: 0 14px;
		background: #fff;
		z-index: 2;
	}

	.rest_item_list:before,
	.rest_item_list:after {
		content: '';
		position: absolute;
		left: 50%;
		top: -12px;
		transform: translateX(-50%);
		width: 0;
		height: 0;
		border: 6px solid transparent;
		border-bottom-color: #efefef;
	}

	.rest_item_list:after {
		top: -11px;
		border-bottom-color: #fff;
	}

	.rest_btn {
		display: inline-block;
		vertical-align: middle;
		width: 100%;
		height: 1rem;
		background: url('../../images/goods_list/rest_btn_icon.png') center no-repeat;
		background-size: 16px auto;
	}

	.rest_btn.active {
		background-image: url('../../images/goods_list/rest_btn_active_btn.png');
	}

	.search_btn {
		position: absolute;
		right: 0;
		top: 0;
		bottom: 0;
		width: 15%;
		height: 1.2rem;
		background: url('../../images/goods_list/search_goods_btn_icon.png') center no-repeat;
		background-size: 16px auto;
	}

	.filter_bar {
		position: fixed;
		top: 1.2rem;
        padding: .2rem 0;
		width: 100%;
		left: 0;
		text-align: right;
        z-index: 4;
        background: #fff;
        transition: transform .32s;
	}

	.goods_list_main.top .filter_bar {
		top: 0;
	}

	.filter_bar.hide {
		transform: translateY(-100%);
	}

    .filter_bar_box {
    	width: 96%;
    	line-height: 1rem;
    	margin: 0 auto;
        border: 1px solid #efefef;
    }
    .new_good_icon {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 24px;
        height: 24px;
        background: url('../../images/goods_list/new_goods_empty_icon.png') center no-repeat;
        background-size: 100% auto;
    }

	.sort_box,
	.filter_box {
		display: inline-block;
		vertical-align: middle;
		text-align: center;
		padding: 0 10px;
		border-left: 1px solid #efefef;
		position: relative;
	}

	.sort_result {
		display: inline-block;
		vertical-align: middle;
		min-width: 4em;
	}

	.arr_icon {
		display: inline-block;
		vertical-align: middle;
		width: 9px;
		height: 6px;
		background: url('../../images/common/black_arr_icon.png') center no-repeat;
		background-size: 100% auto;
		transition: transform .24s;
	}

	.arr_icon.active {
		transform: rotate(180deg);
	}

	.sort_list {
		position: absolute;
		top: 94%;
		right: 0;
		border: 1px solid #efefef;
		text-align: center;
		background: #fff;
	}

	.sort_item {
		white-space: nowrap;
		color: #7f7f7f;
		line-height: 1rem;
		padding: 0 24px;
	}

	.sort_item + .sort_item {
		border-top: 1px solid #efefef;
	}

	.sort_item.active {
		color: #333;
	}

	.filter_btn {
		display: inline-block;
		vertical-align: middle;
	}

	.filter_list_out_box {
		position: fixed;
		right: -100%;
		width: 100%;
		top: 2.4rem;
		bottom: 0;
		overflow: hidden;
		background: rgba(0, 0, 0, .6);
		opacity: 0;
		transition: opacity .4s, right 0s .4s;
		z-index: 3;
	}

	.goods_list_main.top .filter_list_out_box {
		top: 1.2rem;
	}

	.filter_list_out_box.show {
		transition: opacity .32s, right 0s;
		right: 0;
		opacity: 1;
	}

	.filter_list_box {
		position: absolute;
		right: -100%;
		top: 0;
		bottom: 0;
		width: 80%;
		background: #fff;
		overflow: hidden;
		transition: right .4s;
	}

	.filter_list_out_box.show .filter_list_box {
		right: 0;
	}

	.filter_list {
		position: absolute;
		left: 0;
		width: 100%;
		top: 0;
		bottom: 1.84rem;
		overflow: auto;
	}

	.prototype_box {
		font-size: 0;
		padding: 0 0.386473rem;
		padding-bottom: 4%;
		text-align: left;
	}

	.prototype_box + .prototype_box {
		border-top: 1px solid #efefef;
	}

	.prototype_title {
		font-size: 12px;
		line-height: 1;
		margin-top: 4%;
		margin-bottom: 1%;
		text-align: left;
	}

	.prototype_list {
		margin-left: -3%;
		line-height: 1.2rem;
	}

	.prototype_item {
		display: inline-block;
		vertical-align: middle;
		font-size: 12px;
		text-align: center;
		background: #efefef;
		color: #7f7f7f;
		border-radius: 4px;
		width: 30.3%;
		margin-left: 3%;
		margin-top: 3%;
	}

	.prototype_item.active {
		background: #ef8200;
		color: #fff;
	}

	.handle_btn_box {
		position: absolute;
		left: 0;
		width: 100%;
		box-sizing: border-box;
		bottom: 0;
		padding: .32rem 0.386473rem;
		background: #fff;
		font-size: 0;
		text-align: center;
		line-height: 1.2rem;
		border-top: 1px solid #efefef;
	}

	.btn {
		display: inline-block;
		vertical-align: middle;
		font-size: 12px;
		background: #efefef;
		color: #7f7f7f;
		width: 50%;
	}

	.confirm_btn {
		background: #ef8200;
		color: #fff;
	}

	.empty_filter_icon,
	.empty_filter_tip {
		position: absolute;
		left: 50%;
		top: 45%;
		transform: translate(-50%, -50%);
	}

	.empty_filter_icon {
		width: 64px;
		height: 64px;
		background: url('../../images/goods_list/empty_filter_icon.png') center no-repeat;
		background-size: 100% auto;
	}

	.empty_filter_tip {
		top: 55%;
		color: #7f7f7f;
	}
</style>

<style scoped>
    .goods_list_box {
        position: relative;
        width: 96%;
        height: 100%;
        box-sizing: border-box;
        margin: 0 auto;
        overflow: hidden;
        box-sizing: border-box;
        background: #fff;
    }

    .scroller {
        position: absolute;
        z-index: 1;
        width: 100%;
        min-height: 100%;
        padding: 0;
        padding-top: 2.6rem;
        box-sizing: border-box;
    }

    .goods_list_main.top .scroller {
    	padding-top: 1.4rem;
    }

    .goods_list {
        margin-left: -2%;
        font-size: 0;
    }

    .goods_detail_link {
    	display: block;
    }

    .goods_item {
        margin: 0 auto 0 2%;
        padding-bottom: 30px;
        display: inline-block;
        vertical-align: middle;
        font-size: 12px;
        width: 48%;
    }

    .transparent {
        visibility: hidden;
    }

    #pullUp {
        line-height: 40px;
        text-align: center;
    }

    .pullUpIcon {
        display: inline-block;
        vertical-align: middle;
        width: 0.386473rem;
        height: 0.386473rem;
        background: url('../../images/common/load_more.gif') center no-repeat;
        background-size: 100% auto;
        margin-right: 0.193237rem;
    }

    .pullUpLabel {
        display: inline-block;
        vertical-align: middle;
    }

    .img_box {
        width: 100%;
        padding-top: 100%;
        position: relative;
        overflow: hidden;
    }

    .goods_img {
        position: absolute;
        width: 100%;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }

    .goods_info_box {
        line-height: 1.5;
    }

    .special_price_tip {
        width: 24px;
    }

    .current_price_box,
    .old_price_box {
        display: inline-block;
        vertical-align: top;
    }

    .old_price_box {
        color: #7f7f7f;
        font-weight: normal;
    }

    .money_tip {
        display: inline-block;
        vertical-align: text-top;
        font-size: 8px;
        line-height: 8px;
    }

    .price {
        display: inline-block;
        vertical-align: text-top;
    }

    .old_price_box .price {
        text-decoration: line-through;
        font-size: 13px;
        line-height: 13px;
    }

    .current_price_box .price {
        font-weight: bolder;
        font-size: 14px;
        line-height: 14px;
    }

    .date_box {
        text-align: right;
        color: #888;
    }

    .date_box:before {
        content: '';
        display: inline-block;
        vertical-align: middle;
        width: 10px;
        height: 10px;
        background: url('../../images/goods_list/clock_icon.png') center no-repeat;
        background-size: 100% auto;
        margin-right: 3px;
    }

    .date {
        display: inline-block;
        vertical-align: middle;
    }

    .empty_goods_list_box {
    	position: absolute;
    	top: 0;
    	bottom: 0;
    	left: 0;
    	right: 0;
    }

    .empty_goods_list_tip {
    	position: absolute;
    	left: 0;
    	width: 100%;
    	top: 30%;
    	transform: translateY(-50%);
    	text-align: center;
    }

    .empty_goods_list_icon {
    	display: inline-block;
    	vertical-align: middle;
    	width: 60px;
    	height: 60px;
    	background: url('../../images/goods_list/goods_list_empty_icon.png') center no-repeat;
    	background-size: 100% auto;
    }

    .empty_goods_list_text {
    	margin-top: 10px;
    }

    .page_tip_box,
    .scroll_to_top {
    	position: fixed;
    	right: 5%;
    	bottom: 10%;
    	background: rgba(0, 0, 0, .6);
    	color: #fff;
    	z-index: 10000;
    	width: 36px;
    	height: 36px;
    	border-radius: 100px;
    }

    .page_tip_box:after {
    	content: '';
    	position: absolute;
    	left: 50%;
    	top: 50%;
    	width: 80%;
    	height: 1px;
    	background: #fff;
    	transform: translate(-50%, -50%) rotate(135deg);
    }

    .current_page {
    	position: absolute;
    	width: 50%;
    	left: 0;
    	top: 12%;
    	text-align: right;
    }

    .total_page {
    	position: absolute;
    	width: 50%;
    	right: 0;
    	bottom: 12%;
    }

    .scroll_to_top {
    	background: url('../../images/goods_list/scroll_back.png') center no-repeat;
    	background-size: 100% auto;
    }
    
</style>
