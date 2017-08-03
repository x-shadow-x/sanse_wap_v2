<template>
	<div class="home_main">
        <a :href="url" class="down_load_link">
            <img src="../../images/home/home_bg.jpg" alt="sanse app 下载链接" class="home_bg">
        </a>
    </div>
</template>

<script>

	export default {
		data() {
            return {
                url: document.location.origin + '/scan.php'
            }
        },
		methods: {
            handleData(list) {
                let rowWidth = 0; // 累加当前行元素宽度~以便在每行最后一个元素转换宽度时候使用减法
                let clientWidth = $(window).width();
                for(let index = 0, len = list.length - 1; index < len; index++) {
                    let adPositionList = list[index].Ad_PositionList;
                    let nextAdPositionList = list[index + 1].Ad_PositionList;
                    let adList = list[index].Ad_List;
                    let positionDesc = [];
                    let nextPositionDesc = [];

                    adPositionList._position_desc.replace(/[^0-9]+([0-9]+)[^0-9]+([0-9]+)[^0-9]+/ig, function(rs, $1, $2) {
                        positionDesc.push($1);
                        positionDesc.push($2);
                        return rs;
                    });

                    nextAdPositionList._position_desc.replace(/[^0-9]+([0-9]+)[^0-9]+([0-9]+)[^0-9]+/ig, function(rs, $1, $2) {
                        nextPositionDesc.push($1);
                        nextPositionDesc.push($2);
                        return rs;
                    });

                    if(positionDesc[0] < nextPositionDesc[0]) {
                        // 当前元素是当前行的最后一个~转换宽度时用减法
                        adPositionList._ad_width = clientWidth - rowWidth;
                        rowWidth = 0; // 重置累加宽度~以便下一行重新计算
                    }
                }
            }
        },
        mounted() {
            // {layoutStyle} 首页广告布局对应的布局名
            // this.$request.get(this.$interface.GET_AD_LIST, {
            //     'layoutStyle': this.$store.state.layoutStyle
            // }, (response) => {
            //     let data = response.data;
            //     this.handleData(data);
            // });
        }
	}
</script>

<style scoped>
    .home_main {
        background: #fff;
    }

    .down_load_link {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 1.4rem;
        z-index: 0;
        background: #323232;
    }

    .home_bg {
        max-width: 100%;
        max-height: 100%;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
</style>
