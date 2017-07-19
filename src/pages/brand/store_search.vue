<template>
	<div class="store_search_main">
		<div class="goods_info_box">
			<div class="goods_img_box">
				<img src="../../images/test_img.jpg" alt="商品图片" class="goods_img">
			</div>
			<div class="goods_detail_info_box">
				<h2 class="goods_name">ORIGINALS TRACKTOP</h2>
				<div class="goods_attr_box">
					<span class="goods_color">白色</span>
					<span>
						货号：<span>CG5911</span>
					</span>
				</div>
			</div>
		</div>

		<div class="record_list_box" id="storeListBox">
			<div class="scroller">
				<ul class="record_list">
					<li class="record_item">
						<div class="info_box">
                        	<h2 class="store_name">望海国际广场NEO专柜</h2>
                        	<p class="address">广东省/江门市/新会区</p>
                        	<strong class="store_status">L,S,M,XL有货</strong>
                        </div>
                        <span class="distance">11566.59公里</span>
					</li>
				</ul>

				<!-- <div class="empty_records_tip_box">
                    <span class="empty_records_tip">商品暂无库存</span>
                </div> -->
				<div :class="{transparent: !isMore}">
					<div id="pullUp">
						<span class="pullUpIcon"></span><span class="pullUpLabel">上拉加载更多</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import  '../../plugins/iscroll.js';

	export default {
		data() {
			return {
				isMore: true,
				goodsId: this.$route.query.goodsId,
				colorId: this.$route.query.colorId,
				sizeId: this.$route.query.sizeId,
				lat: 0, // 经度
				lng: 0, // 纬度
				pageIndex: 1
			}
		},

		mounted() {

			var geolocation = new BMap.Geolocation(),
				that = this;
			    geolocation.getCurrentPosition(function(r){
			        if(this.getStatus() == BMAP_STATUS_SUCCESS) {
			            console.log(that);
			            // var mk = new BMap.Marker(r.point);
			            that.lng = r.point.lng;
			            that.lat = r.point.lat;

			            that.$request.get(that.$interface.GOODDETAIL_STORE_INVENTORY_QUERY, {
		                    'goodsId': that.goodsId,
		                    'colorId': that.colorId,
		                    'sizeId': that.sizeId,
		                    'lat': that.lat,
		                    'lng': that.lng,
		                    'pageIndex': that.pageIndex++,
		                    'pageSize': that.$interface.PAGE_SIZE
		                }, (response) => {
		                    let data = response.data;
		                    console.log(data);

		                    // setTimeout(() => {
		                    //     this.myScroll.refresh();
		                    // }, 320);
		                })
		                
			        } else {
			            console.log('failed:'+this.getStatus());
			        }        
			    },{enableHighAccuracy: true});


			var pullUpEl,
				pullUpOffset,
				generatedCount = 0,
				tempLoad = 0;

			function pullUpAction () {
                // this.$request.get(this.$interface.GET_MEMBERINFO_BONUSLIST, {
                //     'userId': localStorage.getItem('USER_ID'),
                //     'type': '1',
                //     'pageIndex': this.pageIndex++,
                //     'pageSize': this.$interface.PAGE_SIZE
                // }, (response) => {
                //     let data = response.data;
                //     pretreatData(data);
                //     this.couponRecord.push(...data);

                //     if(data.length == this.$interface.PAGE_SIZE) {
                //         // 因为接口返回的记录数据不是每个都有总数这一条~所以此处认为只要第一页数据的条数等于请求是声明的一页条数~就认为需要分页
                //         this.isMore = true;
                //     } else {
                //         this.isMore = false;
                //     }

                //     setTimeout(() => {
                //         this.myScroll.refresh();
                //     }, 320);
                // })
			}

			function loaded() {
				pullUpEl = document.getElementById('pullUp');
				pullUpOffset = pullUpEl.offsetHeight;
				var that = this;

				this.myScroll = new iScroll('storeListBox', {
					useTransition: true,
					vScrollbar: false,
					onRefresh: function () {
						if (pullUpEl.className.match('loading')) {
							pullUpEl.className = '';
							pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多';
						}
					},
					onScrollMove: function () {
						if (this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip')) {
							pullUpEl.className = 'flip';
							pullUpEl.querySelector('.pullUpLabel').innerHTML = '释放加载';
							this.maxScrollY = this.maxScrollY;
						} else if (this.y > (this.maxScrollY + 5) && pullUpEl.className.match('flip')) {
							pullUpEl.className = '';
							pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多';
							this.maxScrollY = pullUpOffset;
						}
					},
					onScrollEnd: function () {
						if (pullUpEl.className.match('flip')) {
							pullUpEl.className = 'loading';
							pullUpEl.querySelector('.pullUpLabel').innerHTML = '加载...';
							pullUpAction.bind(that)();	// Execute custom function (ajax call?)
						}
					}
				});
			}

            loaded.bind(this)();
		}
	}
</script>

<style scoped>

	.store_search_main {
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background: #fff;
		z-index: 3;
	}

	.goods_info_box {
		background: #000;
		color: #fff;
		padding: 0.36rem 0;
		text-align: center;
	}

	.goods_img_box,
	.goods_detail_info_box {
		display: inline-block;
		vertical-align: middle;
	}

	.goods_img_box {
		width: 1.2rem;
		height: 1.2rem;
		overflow: hidden;
		border-radius: 1000px;
		position: relative;
	}

	.goods_img {
		width: 100%;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}

	.goods_detail_info_box {
		text-align: left;
	}
	
	.goods_name {
	    overflow: hidden;
	    white-space: nowrap;
	    text-overflow: ellipsis;
	    margin-bottom: 0.32rem;
	}

	.record_list_box {
		position: relative;
		width: 100%;
		height: 100%;
		margin: 0 auto;
		overflow: hidden;
	}

	.scroller {
        position: absolute;
        z-index: 1;
        width: 100%;
        padding: 0;
        min-height: 100%;
    }

	#pullUp {
		line-height: 40px;
		text-align: center;
	}

	.pullUpIcon {
		display: inline-block;
		vertical-align: middle;
		width: 0.386473rem;
		height: 0.386473rem;
		background: url('../../images/common/load_more.gif') center no-repeat;
		background-size: 100% auto;
		margin-right: 0.193237rem;
	}

	.pullUpLabel {
		display: inline-block;
		vertical-align: middle;
	}

	.record_item {
		position: relative;
		border-bottom: 1px solid #efefef;
		padding: 0.32rem;
		line-height: 1.6;
	}

	.info_box {
		display: inline-block;
		vertical-align: middle;
		max-width: 70%;
	}

	.store_name,
	.store_status {
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		font-weight: bolder;
	}

	.address {
		color: #7f7f7f;
	}

	.distance {
		position: absolute;
		right: .32rem;
		top: 50%;
		transform: translateY(-50%);
		color: #7f7f7f;
	}

	.transparent {
		visibility: hidden;
        display: none;
	}

	.empty_records_tip_box {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }

    .empty_records_tip {
        position: absolute;
        top: 36%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: url('../../images/store_search/empty_store_icon.png') center top no-repeat;
        background-size: 60px auto;
        padding-top: 70px;
        color: #939393;
        text-align: center;
        padding-top: 70px;
    }
</style>