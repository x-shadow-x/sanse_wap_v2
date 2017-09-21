<template>
	<div class="coupon_main">
		<ul class="coupon_tab">
			<li class="tab">
				<router-link to="/coupon/no_use" class="tab">未使用</router-link>
			</li>
			<li class="tab">
				<router-link to="/coupon/overdue" class="tab">已过期</router-link>
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
	}
</script>

<style scoped>
	.coupon_main {
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		overflow: hidden;
		background: #efefef;
		padding-top: 1rem;
		z-index: 2;
	}

	.coupon_tab {
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		display: flex;
		line-height: 1rem;
		background: #fff;
	}

	.tab {
		display: inline-block;
		flex: 1;
	    text-align: center;
	}

	.router-link-active {
		box-shadow: 0 -2px 0 0 #ef8200 inset;
	}
</style>
