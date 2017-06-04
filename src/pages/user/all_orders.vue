<template>
    <div class="all_orders_main">
        <filter-tab :tabData="tabData" class="filter_tab"></filter-tab>

    </div>
</template>


<script>
    import filterTab from '../../components/common/filter_tab.vue';

    export default {
        data() {
            return {
                tabData: [
                    {
                        'text': '手机订单',
                        'children': [
                            {
                                'text': '未完成'
                            },
                            {
                                'text': '已完成'
                            },
                            {
                                'text': '退货'
                            }
                        ]
                    },
                    {
                        'text': '店铺订单',
                        'children': [
                            {
                                'text': '未完成'
                            },
                            {
                                'text': '已完成'
                            },
                            {
                                'text': '退货'
                            }
                        ]
                    }
                ]
            }
        },
        components: {
            filterTab
        }
    }
</script>

<style scoped>
    .all_orders_main {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        z-index: 2;
        height: 100%;
        overflow: visible;
        background: #efefef;
        box-sizing: border-box;
        padding-top: 0.29rem;
    }

    .filter_tab {
        display: flex;
    }

    /*.filter_tab_item {
        flex: 1;
        text-align: center;
        position: relative;
    }*/
</style>
