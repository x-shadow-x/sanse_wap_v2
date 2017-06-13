<!-- 递归树组件,如果叶子节点需要做跳转~则需指明isLink为true并在父组件中提供to字段和query字段~
to为叶子节点对应的跳转地址~query为对应的路由参数-->

<template>
	<li :class="{first_sub_child: nodeData.level == 1}" :style="{marginLeft: (nodeData.level - 1) + 'em'}">
        <div :class="{bold: isFolder}" @click="toggle($event)" class="block">
            <img :src="nodeData.brandLogo" alt="" v-if="nodeData.brandLogo" class="brand_logo">
            <router-link v-if="!isFolder && isLink" :to="{ path:nodeData.to, query: nodeData.query }">
                <span class="brand_cat_text" :class="{bold: nodeData.level == 0}">{{nodeData.name}}</span>
            </router-link>
            <span class="brand_cat_text" :class="{bold: nodeData.level == 0}" v-else>{{nodeData.name}}</span>
        </div>

        <transition name="list-toggle">
          <ul v-show="open" v-if="isFolder" class="sub_list">
            <tree-node class="sub_item" v-for="item in nodeData.children" :nodeData="item" :myScroll="myScroll" :isLink="isLink">
            </tree-node>
          </ul>
        </transition>
      </li>
</template>

<script>

	export default {
        name: 'tree-node',
		props: ['nodeData', 'myScroll', 'isLink'],

		data() {
			return {
				open: false
			}
		},
		computed: {
			isFolder: function () {
				return this.nodeData.children && this.nodeData.children.length
			}
		},
		methods: {
			toggle: function (event) {
				if (this.isFolder) {
					this.open = !this.open;
                    setTimeout(() => {
                        this.myScroll.refresh();
                        this.myScroll.scrollToElement(event.target, 240);
                    }, 400);
				}
			}
		},

	}
</script>

<style scoped>

    .block {
        display: block;
    }

    .brand_logo {
        width: 0.773rem;
        vertical-align: middle;
        margin-right: 0.241546rem;
    }

    .brand_cat_text.bold {
        font-weight: bold;
    }

    .brand_cat_text {
        display: inline-block;
        vertical-align: middle;
    }

    .sub_list {
        max-height: 7.729rem;
        overflow: hidden;
    }

    .first_sub_child {
        padding-left: 1.014493rem;
    }

    .sub_item {
        line-height: 1.207729rem;
    }

    .list-toggle-enter .first_sub_child .sub_item:nth-child(even),
    .list-toggle-leave-to .first_sub_child .sub_item:nth-child(even){
        border: 1px solid #333;
        box-shadow: inset 0 0 2px 2px #000;
    }

    .list-toggle-enter-active {
        transition: all .6s linear;
    }

    .list-toggle-leave-active {
        transition: all .4s cubic-bezier(0.1,0.9,1,1);
    }

    .list-toggle-enter, .list-toggle-leave-to {
        max-height: 0;
    }
</style>
