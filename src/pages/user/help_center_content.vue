<template>
	<div class="help_center_content_main" v-html="selectedArticle.content"></div>
</template>

<script>
	export default {
		data() {
			return {
				selectedArticle: ''
			}
		},
		mounted() {
			this.$request.get(this.$interface.GET_ARTICLE_LIST, {
				'catName':'FAQ',
    			'mobileBrandId': 1
			}, (response) => {

				let data = response.data;

				let articleId = this.$route.query.articleId;
				let index = this.$route.query.index;

				if(data[index].article_id == articleId) {
					this.selectedArticle = data[index];
				} else {
					for(let key in data) {
						if(data[key].article_id == articleId) {
							this.selectedArticle = data[key];
							break;
						}
					}
				}
			});
		}
	}
</script>

<style scoped>
	.help_center_content_main {
		position: fixed;
		z-index: 12;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		background: #fff;
		overflow: auto;
		line-height: 2;
		padding: 3%;
	}
</style>