<template>
    <ul>
        <li class="filter_tab_item" v-for="item in tabData">
            <span>{{item.text}}</span>
            <template v-if="item.children && item.children.length">
                <filter-tab :tabData="item.children" class="sub_filter_tab"></filter-tab>
            </template>

            <!-- <ul class="sub_filter_tab_list" v-if="hasChild">
                <filter-tab v-for="item in tabData.children" :tabData="item" class="sub_filter_tab_item"></filter-tab>
            </ul> -->
        </li>
    </ul>
</template>

<script>
    export default {
        name: 'filter-tab',
        props: ['tabData'],
        computed: {
            hasChild() {
                return this.tabData.children && this.tabData.children.length;
            }
        },
        // mounted() {
        //     this.$request.get('/Get_APP_VariousType_OrderList/', {
        //         'userId': localStorage.getItem('USER_ID') || 0,
        //         'orderType': '1',
        //         'pageIndex': '1',
        //         'pageSize': '10'
        //     }, (response) => {
        //         let data = response.data;

        //         handleDate(data);
        //         this.blanceRecord = data; // 积分记录数组

        //         if(data.length == 10) {
        //             // 因为接口返回的记录数据不是每个都有总数这一条~所以此处认为只要第一页数据的条数等于请求是声明的一页条数~就认为需要分页
        //             this.isMore = true;
        //         }
        //     })
        // }
    }
</script>

<style scoped>
    .filter_tab {
        display: flex;
    }

    .sub_filter_tab {
        width: 100vw;
        display: flex;
        position: absolute;
    }

    .filter_tab_item {
        flex: 1;
        text-align: center;
        position: relative;
    }
</style>
