<template>
	<div class="goods_search_main">
		<div class="search_box">
            <input type="text" v-model="keyWord" placeholder="请输入商品名/款号/品牌/品类" class="search_input" @keydown="submitKeyWord($event)">
            <router-link :to="{ path: '/goods_list', query: {keyWord: keyWord, funcType: 'SE'} }" class="search_goods_btn"></router-link>
        </div>
        <div class="hot_search_box">
            <h3 class="hot_title">热门搜搜</h3>
            <ul class="hot_search_list" @click="selectHotKeyWord($event)">
                <li v-for="item in hotWordList">
                    <router-link :to="{path: '/goods_list', query: {keyWord: item._search_key, funcType: 'SE'} }">{{item._search_key}}</router-link>
                </li>
            </ul>
        </div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
                keyWord: '',
                hotWordList: [],
                pageIndex: 1
            }
		},
        methods: {
            submitKeyWord(e) {
                if(e.keyCode==13) {
                    console.log(this.keyWord);
                }
            },
            selectHotKeyWord(e) {
                let target = e.target;
                if(target.nodeName == 'LI') {
                    this.keyWord = e.target.innerHTML;
                }
            }
        },
        mounted() {
            this.$request.get(this.$interface.GET_SEARCH_LOG_LIST, {
                    'pageIndex': this.pageIndex++,
                    'pageSize': this.$interface.PAGE_SIZE
                }, (response) => {
                    let data = response.data;
                    this.hotWordList = data;
                });
        }
	}
</script>

<style scoped>
    .goods_search_main {
        position: fixed;
        z-index: 2;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: #fff;
    }

    .search_box {
        width: 90%;
        position: relative;
        border: 4px solid #ddd;
        margin: 4% auto;
        background: #fff;
    }

    .search_input {
        height: 32px;
        border: none;
        outline: none;
        width: 85%;
        padding: 0 10px;
        box-sizing: border-box;
    }

    .search_goods_btn {
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
        width: 15%;
        background: url('../../images/goods_list/search_goods_icon.png') 80% center no-repeat;
        background-size: auto 60%;
    }

    .hot_search_box {
        text-align: center;
        line-height: 0.773rem;
    }

    .hot_title {
        position: relative;
        padding-bottom: 6px;
        margin-bottom: 20px;
    }

    .hot_title:after {
        content: '';
        width: 20px;
        height: 3px;
        background: #333;
        position: absolute;
        left: 50%;
        bottom: 0;
        transform: translateX(-50%);
    }
</style>
