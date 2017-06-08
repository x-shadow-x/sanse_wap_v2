<template>
	<transition name="fade-in">
		<span class="err_tip" v-if="isShowErrTip">{{errText}}</span>
	</transition>
</template>

<script>
	export default {
		props: ['errText', 'isShowErrTip'],

		watch: {
			isShowErrTip: function(val) {
				if(val) {
					setTimeout(() => {
						this.$emit('hideErrTip');
					}, 1000);
				}
			}
		}
	}
</script>


<style scoped>
	.err_tip {
		position: fixed;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		color: #fff;
		background: rgba(0, 0, 0, .7);
		border-radius: 6px;
		padding: 10px 10px;
	}

	.fade-in-enter-active {
        transition: all .32s;
    }
    .fade-in-leave-active {
        transition: all .32s;
    }
    .fade-in-enter, .fade-in-leave-to {
        opacity: 0;
    }
</style>