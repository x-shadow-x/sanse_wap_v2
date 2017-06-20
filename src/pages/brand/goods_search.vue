<template>
	<div class="goods_search_main">
		<div class="search_box">
            <input type="text" v-model="keyWord" placeholder="请输入商品名/款号/品牌/品类" class="search_input" 
            @keydown="submitKeyWord($event)" 
            @focus="focusInput" @blur="showSearchHistory = false;">
            <a @click="routerToGoodsList(-1)" class="search_goods_btn"></a>
            <div class="history_list_box" v-if="searchHistory.length > 0 && showSearchHistory">
                <ul class="history_list">
                    <li v-for="(item, index) in searchHistory" class="history_list_item" @touchstart="selectHistoryItem(index)">{{item}}</li>
                </ul>
                <div class="clear_list_btn" @touchstart="clearSearchHistory">
                    <span class="clear_text">清空</span>
                </div>
            </div>
        </div>
        <div class="hot_search_box">
            <h3 class="hot_title">热门搜搜</h3>
            <ul class="hot_search_list">
                <li v-for="(item, index) in hotWordList" data-key-word="item._search_key">
                    <a @click="routerToGoodsList(index)">{{item._search_key}}</a>
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
                showSearchHistory: false,
                searchHistory: [],
                pageIndex: 1
            }
		},

        methods: {
            recordToLocalStorage() {
                let historyList = window.localStorage.historyKeyWordList || '';
                let tempArr = historyList.split(',');

                if(historyList == '') {
                    tempArr = [this.keyWord];
                } else if(tempArr.length > 10) {
                    tempArr.pop();
                    tempArr.unshift(this.keyWord);
                } else {
                    tempArr.unshift(this.keyWord);
                }

                tempArr = [...new Set(tempArr)];

                window.localStorage.historyKeyWordList = tempArr.join(',');
            },

            submitKeyWord(e) {
                if(e.keyCode==13) {
                    if(this.keyWord != '') {
                        this.$store.commit('SET_KEY_WORD', {value: this.keyWord});
                        this.recordToLocalStorage();
                        this.$router.push(`/goods_list?keyWord=${this.keyWord}&funcType=SE`);
                    }
                }
            },

            routerToGoodsList(index) {
                this.keyWord = index < 0 ? this.keyWord : this.hotWordList[index]._search_key;
                if(this.keyWord == '') {
                    return;
                }
                this.$store.commit('SET_KEY_WORD', {value: this.keyWord});
                this.recordToLocalStorage();
                this.$router.push(`/goods_list?keyWord=${this.keyWord}&funcType=SE`);
            },

            focusInput() {
                if(this.keyWord == '') {
                    this.showSearchHistory = true;
                }
            },

            selectHistoryItem(index) {
                this.keyWord = this.searchHistory[index];
            },

            clearSearchHistory() {
                window.localStorage.historyKeyWordList = '';
                this.searchHistory = [];
            }
        },

        mounted() {
            this.keyWord = this.$store.state.keyWord;
            this.searchHistory = window.localStorage.historyKeyWordList != '' ? window.localStorage.historyKeyWordList.split(',') : [];

            this.$request.get(this.$interface.GET_SEARCH_LOG_LIST, {
                'pageIndex': this.pageIndex++,
                'pageSize': this.$interface.PAGE_SIZE
            }, (response) => {
                let data = response.data;
                this.hotWordList = data;
            });
        },

        watch: {
            'keyWord'(to, from) {
                if(to == '') {
                    this.showSearchHistory = true;
                } else {
                    this.showSearchHistory = false;
                }
            }
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
        box-shadow: 0 0 0 4px #ddd inset;
        margin: 4% auto;
        padding: 4px;
        background: #fff;
    }

    .search_input {
        height: 40px;
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
        background: url('../../images/goods_list/search_goods_icon.png') 75% center no-repeat;
        background-size: auto 45%;
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

    .history_list_box {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: #fff;
        border: 1px solid #efefef;
        z-index: 2;
        
    }

    .history_list_item {
        padding-left: 14px;
        color: #7f7f7f;
        line-height: 3;
    }

    .history_list_item + .history_list_item {
        border-top: 1px solid #efefef;
    }

    .clear_list_btn {
        text-align: center;
        color: #7f7f7f;
        background: #efefef;
        line-height: 2.6;
    }

    .clear_list_btn:before {
        content: '';
        display: inline-block;
        vertical-align: middle;
        width: 14px;
        height: 14px;
        background: url('../../images/goods_search/clear_history_icon.png') center no-repeat;
        background-size: auto 100%;
        margin-right: 5px;
    }

    .clear_text {
        display: inline-block;
        vertical-align: middle;
    }
</style>
