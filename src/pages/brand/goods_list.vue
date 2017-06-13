<template>
	<div class="goods_list_main">
		<div class="filter_bar">
			<div class="category_filter_box">
				<ul class="category_list">
					<li v-for="(item, index) in categoryList" :key="item.cat_id" class="categoey_item" :class="{active: item.isSelected}" @click="selectCategory(index)">
						<span class="categoey_item_text">{{item.cat_name}}</span>
					</li>
					<li v-if="restCategoryList.length > 0" class="categoey_item rest_items" @click="handleRestItem">
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
	</div>
</template>

<script>
	export default {
		data() {
			return {
				categoryList: [],
				restCategoryList: [],
				isRestBtnActive: false
				
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
			}
		},

		mounted() {
			this.$request.get(this.$interface.GET_BRAND_WITH_CATEGORY_PLUS_LIST, {
				'brandId': this.$route.query.brandId || 0,
				'catId': this.$route.query.catId,
				'funcType': this.$route.query.funcType
			}, (response) => {
				let data = response.data[0].CategoryList;
				data.forEach((item) => {
					item.isSelected = false;
				});
				data[0].isSelected = true;
				this.categoryList = data.slice(0, 4);
				this.restCategoryList = data.slice(4);
			})
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

	.filter_bar {
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		border-bottom: 1px solid #efefef;
	}

	.category_filter_box {
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
</style>