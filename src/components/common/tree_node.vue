<template>
	<li :class="{first_sub_child: nodeData.level == 1}" :style="{marginLeft: (nodeData.level - 1) + 'em'}">
        <div
          :class="{bold: isFolder}"
          @click="toggle">
          <img :src="nodeData.brandLogo" alt="" v-if="nodeData.brandLogo" class="brand_logo">
          <span class="brand_cat_text" :class="{bold: nodeData.level == 0}">{{nodeData.name}}</span>
        </div>
        <transition name="list-toggle">
          <ul v-show="open" v-if="isFolder">
            <tree-node
              class="sub_item"
              v-for="item in nodeData.children"
              :nodeData="item">
            </tree-node>
          </ul>
        </transition>
      </li>
</template>

<script>

	// import treeNode from './tree_node.vue';
	export default {
    name: 'tree-node',
		props: ['nodeData'],

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
			toggle: function () {
				if (this.isFolder) {
					this.open = !this.open
				}
			}
		}
	}
</script>

<style scoped>

  .brand_logo {
    width: 32px;
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

  .first_sub_child {
    padding-left: 1.014493rem;
  }

  .sub_item {
      line-height: 1.207729rem;
  }

  .list-toggle-enter-active {
        transition: all 1s linear;
    }
    .list-toggle-leave-active {
        transition: all 1s linear;
    }
    .list-toggle-enter, .list-toggle-leave-to {
        height: 0;
    }
</style>