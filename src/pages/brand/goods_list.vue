<template>
	<div class="goods_list_main" @click="reset">
		<div class="category_bar">
			<div class="category_box">
				<ul class="category_list">
					<li v-for="(item, index) in categoryList" :key="item.cat_id" class="categoey_item" :class="{active: item.isSelected}" @click.stop="selectCategory(index)">
						<span class="categoey_item_text">{{item.cat_name}}</span>
					</li>
					<li v-if="restCategoryList.length > 0" class="categoey_item rest_items" @click.stop="handleRestItem">
						<span class="rest_btn" :class="{active: isRestBtnActive}"></span>
						<ul class="rest_item_list" v-if="isRestBtnActive">
							<li v-for="(restItem, index) in restCategoryList" :key="restItem.cat_id" class="rest_item" @click.stop="selectRestItem(index)">
								{{restItem.cat_name}}
							</li>
						</ul>
					</li>
				</ul>
			</div>
			<router-link to="/goods_search" class="search_btn"></router-link>
		</div>
		<div class="filter_bar">
			<div class="sort_box">
				<div class="sort_result_box" @click.stop="toggleSortList">
					<span class="sort_result">{{sortResult}}</span>
					<i class="arr_icon" :class="{active: isShowSortList}"></i>
				</div>
				<ul class="sort_list" v-if="isShowSortList">
					<li v-for="(item, index) in sortList" class="sort_item" :class="{active: item.isSelected}" @click.stop="selectSortItem(index)">{{item.text}}</li>
				</ul>
			</div>
			<div class="filter_box">
				<div class="filter_btn_box">
					<span class="filter_btn">筛选</span>
					<i class="arr_icon" :class="{active: isShowFilterList}"></i>
				</div>

				<div class="filter_list_hover">
					<div class="filter_list">
						
					</div>
				</div>
				
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				categoryList: [],
				restCategoryList: [],
				sortList: [
					{
						text: '精选推荐',
						isSelected: true,
						sortType: 0
					}, 
					{
						text: '上架时间',
						isSelected: false,
						sortType: 1
					}, 
					{
						text: '销量',
						isSelected: false,
						sortType: 2
					}, 
					{
						text: '价格升序',
						isSelected: false,
						sortType: 3
					}, 
					{
						text: '价格降序',
						isSelected: false,
						sortType: 4
					}
				],
				isRestBtnActive: false,
				isShowSortList: false,
				isShowFilterList: false
				
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
				this.isRestBtnActive = false;

				this.categoryList.forEach((item) => {
					item.isSelected = false;
				});

				this.categoryList[index].isSelected = true;
			},

			handleRestItem() {
				this.categoryList.forEach((item) => {
					item.isSelected = false;
				});

				this.isRestBtnActive = !this.isRestBtnActive;
			},

			selectRestItem(index) {
				this.isRestBtnActive = false;
				this.categoryList.splice(1, 0, this.restCategoryList.splice(index, 1)[0]);
				this.categoryList[1].isSelected = true;
				this.restCategoryList.push(this.categoryList.pop())
			},

			toggleSortList() {
				this.isShowSortList = !this.isShowSortList;
			},

			selectSortItem(index) {
				let currentItem = this.sortList[index];
				if(currentItem.isSelected) {
					return;
				}
				this.sortList.forEach((item) => {
					item.isSelected = false;
				});

				currentItem.isSelected = true;

				this.isShowSortList = false;
			},

			reset() {
				this.isRestBtnActive = false;
				this.isShowSortList = false;
			}
		},

		mounted() {
			// funcType: SE  CA
			this.$request.get(this.$interface.GET_BRAND_WITH_CATEGORY_PLUS_LIST, {
				'brandId': this.$route.query.brandId || 0,
				'catId': this.$route.query.catId || 0,
				'funcType': this.$route.query.funcType
			}, (response) => {
				let data = response.data[0].CategoryList;
				data.forEach((item) => {
					item.isSelected = false;
				});
				data[0].isSelected = true;
				this.categoryList = data.slice(0, 4);
				this.restCategoryList = data.slice(4);
			});



			this.$request.get(this.$interface.GET_APP_PROPERTY_LIST, {
				'funcType': this.$route.query.funcType,
				'catId': this.$route.query.catId || 0,
				'keyWord': encodeURI(this.$route.query.searchKey || ' '),
				'currentBrandId': 2 //临时值
				
			}, (response) => {
				let data = response.data[0].CategoryList;
				console.log(data);
			});
		}
	}
</script>

<style scoped>
	.goods_list_main {
		position: fixed;
	    z-index: 12;
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
		z-index: 2;
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
		background: url('../../images/goods_list/search_goods_icon.png') center no-repeat;
		background-size: 16px auto;
	}

	.filter_bar {
		position: fixed;
		top: 1.4rem;
		width: 96%;
		line-height: 1rem;
		left: 50%;
		transform: translateX(-50%);
		border: 1px solid #efefef;
		text-align: right;
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
</style>