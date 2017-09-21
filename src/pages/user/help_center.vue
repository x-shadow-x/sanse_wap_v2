<template>
	<div class="help_center_main">
		<ul class="help_list">
			<li class="help_item" v-for="(item, index) in helpList" :key="item.article_id">
				<router-link :to="{ path:'/help_center/help_center_content', query: {articleId:item.article_id, index: index} }" class="help_link">{{item.title}}</router-link>
			</li>
		</ul>
		<transition :name="transitionName">
            <router-view class="transition_container"></router-view>
        </transition>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				helpList: [],
				transitionName: 'slide-right'
			}
		},

		watch: {
            '$route' (to, from) {
                let routerList = this.$store.state.routerList;
                let nextPath = to.path;
                let current = from.path;

                if(routerList[nextPath] < routerList[current]) {
                    this.transitionName = 'slide-right';
                } else {
                    this.transitionName = 'slide-left';
                }
            }
        },

		mounted() {
			this.$request.get(this.$interface.GET_ARTICLE_LIST, {
    			'catName':'FAQ',
    			'mobileBrandId': 1
    		}, (response) => {
    			this.helpList = response.data;
			})
		}
	}
</script>

<style scoped>
	.help_center_main {
		position: fixed;
		z-index: 12;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		background: #fff;
		overflow: auto;
	}

	.help_list {
		color: #7f7f7f;
	}

	.help_item {
		border-bottom: 1px solid #efefef;
		padding: 0 3%;
	}

	.help_link {
		display: block;
		line-height: 1.4rem;
		background: url('../../images/help_center/link_right_arrow.png') right center no-repeat;
		background-size: 0.148148rem auto;
	}
</style>