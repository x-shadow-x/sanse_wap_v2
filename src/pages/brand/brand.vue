<template>
	<div>
		<ul>
			
		</ul>
	</div>
</template>

<script>
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
			    	// console.log(item);

			    	let tempData = {};
			    	tempData.name = item.brand_name;
			    	tempData.brandLogo = item.brand_logo;

			    	if(item.CategoryList) {
			    		tempData.children = that.handleList(item.CategoryList);
			    	}

			    	this.brandList.push(tempData);
			    });
			})
			.catch(function(err){
				// console.log(err);
			});

			// var data = {
			// 	name: 'My Tree',
			// 	children: [
			// 		{ name: 'hello' },
			//     	{ name: 'wat' },
			//     	{
			//       		name: 'child folder',
			//       		children: [
			// 	        	{
			// 	          		name: 'child folder',
			// 	          		children: [
			// 	            		{ name: 'hello' },
			// 	            		{ name: 'wat' }
			// 	          		]
			// 	        	},
			// 		        { name: 'hello' },
			// 		        { name: 'wat' },
			// 		        {
			// 		        	name: 'child folder',
			// 		          	children: [
			// 		            	{ name: 'hello' },
			// 		            	{ name: 'wat' }
			// 		          	]
			// 		        }
			// 	      	]
			//     	}
			//   	]
			// }

			
		},
		methods: {
			handleList(categoryList) {

				console.log(categoryList);

				let result = {};

				for(let i = 0, len = categoryList.length; i < len; i++) {
					var item = categoryList[i];
					if(item.parent_id <= 0) {
						result[item.cat_id] = [];
					} else {
						result[item.parent_id].push(item.cat_name);
					}
					
				}
				console.log(result, '-----------');
				return result;
			}
		}
	}
</script>

<style scoped>
	div {
		height: 736px;
		background: #3ef4a2;
	}
</style>