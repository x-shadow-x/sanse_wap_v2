<template>
	<div class="brand_main">
        <div class="wrapper" id="wrapper">
            <div class="scroller">
                <ul class="brand_list">
                    <tree-node v-for="item in brandList" :nodeData="item" :myScroll="myScroll" :isLink="isLink"></tree-node>
                </ul>
            </div>
        </div>

	</div>
</template>

<script>

	import treeNode from '../../components/common/tree_node.vue';
    import  '../../plugins/iscroll.js';

	export default {
		data() {
			return {
				brandList: [],
                isLink: true, // 用以指示tree-node到达叶子节点后是否需要跳转
                myScroll: null
			}
		},

		mounted() {

			var that = this;
            this.$request.get(this.$interface.GET_BRAND_WITH_CATEGORYLIST, {
                'brand_id': '0'
            }, (response) => {
                let listData = response.data;

                listData.forEach((item) => {

                    let tempData = {};
                    let tempChildren;

                    tempData.name = item.brand_name;
                    tempData.brandLogo = item.brand_logo;
                    tempData.id = item.brand_id;
                    tempData.catId = item.cat_id;
                    tempData.level = 0;


                    if(item.CategoryList) {
                        tempData.children = [];
                        tempChildren = that.handleList(item.CategoryList);
                    }

                    let tempArr = [];

                    for(var item in tempChildren) {
                        tempData.children.push(tempChildren[item]);
                    }

                    this.brandList.push(tempData);
                });

                setTimeout(() => {
                    loaded.bind(this)();
                }, 320);
            })

            function loaded() {
                this.myScroll = new iScroll('wrapper', {
                    useTransition: true,
                    vScrollbar: false
                });
            }
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
                            id: item.cat_id,
							children: []
						};
					} else {
						result[item.parent_id].children.push({name: item.cat_name, level: item.level, to: '/goods_list', query: {catId: item.cat_id, funcType: 'CA', brandId: item.brand_id}});
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
		

        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background: #191919;
        overflow: hidden;
	}

	.brand_list {
		color: #fff;
		line-height: 1.690821rem;
		padding-left: 0.241546rem;
		margin-left: 1em;
	}


    /*------------------------------------------------*/
    .wrapper {
        position: absolute;
        z-index: 1;
        top: 0;
        bottom: 1.4rem;
        width: 100%;
        background: #191919;
        overflow: hidden;
    }

    .scroller {
        position: absolute;
        z-index: 1;
        width: 100%;
        padding: 0;
    }

</style>
