<template>
	<div class="address_add_main">
		<div class="info_input_box">
			<span class="info_name">收&nbsp;&nbsp;件&nbsp;&nbsp;人：</span>
			<input type="text" placeholder="请输入您的收件人名字" v-model="consignee" class="info_input">
		</div>

		<div class="info_input_box">
			<span class="info_name">手机号码：</span>
			<input type="text" placeholder="请输入您的联系方式" v-model="mobile" class="info_input">
		</div>

		<div class="info_input_box">
			<span class="info_name">所在地区：</span>
			<scroller-selector
			:placeholderText="'省-市-区'"
            :scrollerTitle="'选择地址'"
			:scrollValue="distinctAddress"
			:primaryScrollerData="primaryScrollerData"
			:secondryScrollerData="secondryScrollerData"
			:tertiaryScrollerData="tertiaryScrollerData"
            @primaryScrollerEnd="primaryScrollerEnd"
            @secondryScrollerEnd="secondryScrollerEnd"
            @getValue="getValue"></scroller-selector>
		</div>

		<div class="info_input_box">
			<span class="info_name">详细地址：</span>
			<input type="text" placeholder="请输入您的详细地址" v-model="address" class="info_input">
		</div>

		<div class="confirm_btn_box">
            <span class="confirm_btn">完成</span>
        </div>
	</div>
</template>

<script>
	import scrollerSelector from '../../components/common/scroll_selector.vue';

	export default {
		data() {
			return {
				consignee: '',
				mobile: '',
				distinctAddress: '',
				address: '',
				primaryIndex: '',
				secondryIndex: '',
				primaryScrollerData: [],
				primaryMap: {}, // 市区列表数据是根据当前选中的省来对应给出的，此处做一个省级map~将隶属于不同省的市按省的id归类
				secondryScrollerData: [],
				secondryMap: {}, // 市级map~将隶属于不同市的区按省的id归类
				tertiaryScrollerData: []
			}
		},
        methods: {

            filling(data) {
                data.unshift({'text': '', 'regionId': ''}, {'text': '', 'regionId': ''});
                data.push(...[{'text': '', 'regionId': ''}, {'text': '', 'regionId': ''}]);
            },

            primaryScrollerEnd(index) {
                index = Math.ceil(index);
                let regionId = this.primaryScrollerData[index].regionId;
                this.secondryScrollerData = this.primaryMap[regionId];
                this.tertiaryScrollerData = this.secondryMap[this.secondryScrollerData[2].regionId];
            },

            secondryScrollerEnd(index) {
                index = Math.ceil(index);
                let regionId = this.secondryScrollerData[index].regionId;
                this.tertiaryScrollerData = this.secondryMap[regionId];
            },

            getValue(value) {
                this.distinctAddress = value;
            }
        },
		mounted() {
            this.$store.commit('SHOW_LOAD');
			function handleData(data) {
				data.forEach((item) => {
					let parentId = item.parentId;
					let regionId = item.region_id;
					let regionGrade = item.region_grade;

					if(parentId == 1) {
						// 省
						this.primaryScrollerData.push({'text': item.local_name, 'regionId': regionId});
						if(!this.primaryMap[regionId]) {
							this.primaryMap[regionId] = [];
						}
					} else if(regionGrade == 2 && this.primaryMap[parentId]) {
						// 市 上面加多一个过滤条件是为了去掉找不到对应省的错误的市的数据
						this.primaryMap[parentId].push({'text': item.local_name, 'regionId': regionId});
						if(!this.secondryMap[regionId]) {
							this.secondryMap[regionId] = [];
						}
					} else {
						// 区
						if(this.secondryMap[parentId]) {
							this.secondryMap[parentId].push({'text': item.local_name, 'regionId': regionId});
						}
					}
				});

				// 对滚动数据列表首尾各添加两个填充的数据
				this.filling(this.primaryScrollerData);

                let tempPrimaryMap = this.primaryMap;

                for(let key in tempPrimaryMap) {
                    this.filling(tempPrimaryMap[key]);
                }

                let tempSecondryMap = this.secondryMap;

                for(let key in tempSecondryMap) {
                    this.filling(tempSecondryMap[key]);
                }

				this.primaryIndex = this.primaryScrollerData[2].regionId;

				this.secondryScrollerData.push(...(this.primaryMap[this.primaryIndex]));
				// this.filling(this.secondryScrollerData);

				this.secondryIndex = this.secondryScrollerData[2].regionId;

				this.tertiaryScrollerData.push(...(this.secondryMap[this.secondryIndex]));
				// this.filling(this.tertiaryScrollerData);
			}

			this.$request.get(this.$interface.GET_ADDRESS_LIST, null, (response) => {

				handleData.bind(this)(response.data);
                this.$store.commit('HIDE_LOAD');

			})
		},
		components: {
			scrollerSelector
		}
	}
</script>

<style scoped>
	.address_add_main {
		position: fixed;
		z-index: 12;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		background: #fff;
		padding: 0 3%;
		overflow: auto;
	}

	.info_input_box {
		border: 1px solid #efefef;
		border-radius: 4px;
		margin-top: 4%;
		padding: .1rem 2%;
	}

	.info_name {
		display: inline-block;
		vertical-align: middle;
		line-height: 1rem;
	}

	.info_input {
		border: none;
		outline: none;
		height: 1rem;
		width: 70%;
		vertical-align: middle;
	}

	.confirm_btn_box {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
    }
</style>

<style>
	.scroll_selector_input {
		border: none;
		outline: none;
		height: 1rem;
		width: 70%;
	}

	.scroll_selector_main {
		display: inline-block;
		vertical-align: middle;
	}
</style>
