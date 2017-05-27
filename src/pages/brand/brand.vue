<template>
	<div class="brand_main">
		<ul class="brand_list">
			<tree-node v-for="item in brandList" :nodeData="item"></tree-node>
		</ul>
	</div>
</template>

<script>

	import treeNode from '../../components/common/tree_node.vue';

	export default {
		data() {
			return {
				brandList: []
			}
		},

		mounted() {

			var that = this;
			this.$http.get(this.HOST + '/GetBrandWithCategory_List/MA==')
			.then(function(response){
			    let listData = response.data.data;

			    listData.forEach(function(item) {

			    	let tempData = {};
			    	let tempChildren;

			    	tempData.name = item.brand_name;
			    	tempData.brandLogo = item.brand_logo;
			    	tempData.level = 0;

			    	if(item.CategoryList) {
			    		tempData.children = [];
			    		tempChildren = that.handleList(item.CategoryList);
			    	}

			    	let tempArr = [];

			    	for(var item in tempChildren) {
			    		tempData.children.push(tempChildren[item]);
			    	}

			    	that.brandList.push(tempData);
			    });

			})
			.catch(function(err){
				console.log(err);
			});
		},

		methods: {
			handleList(categoryList) {

				let result = {};

				for(let i = 0, len = categoryList.length; i < len; i++) {
					var item = categoryList[i];
					if(item.parent_id <= 0) {
						result[item.cat_id] = {
							name: item.cat_name,
							level: item.level,
							children: []
						};
					} else {
						result[item.parent_id].children.push({name: item.cat_name, level: item.level});
					}
					
				}
				return result;
			}
		},

		components: {
			treeNode
		}
	}
</script>

<style scoped>

	.brand_main {
		min-height: 100%;
		background: #000;
	}

	.brand_list {
		color: #fff;
		line-height: 1.690821rem;
		padding-left: 0.241546rem;
		margin-left: 1em;
	}

</style>