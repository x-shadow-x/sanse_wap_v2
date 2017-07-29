<template>
	<div class="delievry_time_main">
		<ul class="delievry_time_list">
			<li class="delievry_time_item" v-for="(item, index) in delievryTimeList" :key="item.id" @click="selectdelievryTime(index)">
				<span class="delievry_time_name">{{item.rectime}}</span>
				<span class="check_btn" :class="{active: item.isSelect}"></span>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				delievryTimeid: this.$route.query.delievryTimeId,
				delievryTimeList: []
			}
		},

		methods: {
			handleData(data) {
				data.forEach((item) => {
					if(item.id == this.delievryTimeid) {
						item.isSelect = true;
					} else {
						item.isSelect = false;
					}
					
				});
			},
			selectdelievryTime: function(index) {
				let selectedDelievryTime = this.delievryTimeList[index];
				if(!selectedDelievryTime.isSelect) {
					this.delievryTimeList.forEach((item) => {
						item.isSelect = false;
					});

					selectedDelievryTime.isSelect = true;
				}
				
				localStorage.setItem('DELIEVRY_TIME', JSON.stringify(selectedDelievryTime));
				setTimeout(() => {
					this.$emit('childEmitUpdate', {'propName': this.$route.query.propName, 'updatePropName': selectedDelievryTime});
					this.$router.go(-1);
				}, 320);
			}
		},

		mounted() {
			this.$request.get(this.$interface.GET_RECETIME_LIST, {}, (response) => {
				let data = response.data;
				this.handleData(data);
				this.delievryTimeList = data;
			});
		}
	}
</script>


<style scoped>
	.delievry_time_main {
		position: fixed;
		z-index: 13;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		background: #fff;
		padding: 2% 3%;
		overflow: auto;
	}

	.delievry_time_list {
		border: 1px solid #efefef;
		border-radius: 4px;
	}

	.delievry_time_item {
		position: relative;
		box-sizing: border-box;
		padding: 0 2%;
		line-height: 1.2rem;
	}

	.delievry_time_item + .delievry_time_item {
		border-top: 1px solid #efefef;
	}

	.delievry_time_name {
		display: inline-block;
		vertical-align: middle;
	}

	.check_btn {
		position: absolute;
		width: 14px;
		height: 14px;
		right: 2%;
		top: 50%;
		transform: translateY(-50%);
		background: url('../../images/common/checkbox_icon.png') center no-repeat;
		background-size: 100% auto;
	}

	.check_btn.active {
		background-image: url('../../images/common/checkbox_icon_active.png');
	}
</style>