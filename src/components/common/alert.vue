<template>
    <transition name="scale-in">
        <div class="alert_box" v-if="isShowAlert">
            <i class="alert_icon"></i>
            <div class="alert_main">
                <h2 class="tip_title">{{tipTitle}}</h2>
                <p>{{tipContent}}</p>
            </div>
            <div class="confirm_btn_box">
                <span class="confirm_btn" @click="handleConfirm">知道了</span>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        data() {
            return {
                tipTitle: '提示',
                tipContent: '123123123'
            }
        },
        props: ['isShowAlert', 'tipTitleF', 'tipContentF'],
        mounted() {
            this.tipTitle = this.tipTitleF || '提示';
            this.tipContent = this.tipContentF || '系统未指定提示内容';
        },
        methods: {
            handleConfirm() {
                this.$emit('hideAlert');
            }
        }
    }
</script>

<style scoped>
    .alert_box {
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -80%);
        background: #fff;
        border-radius: 4px;
        width: 90%;
        padding-top: 32px;
        text-align: center;
        z-index: 10000;
    }

    .alert_icon {
        display: inline-block;
        width: 40px;
        height: 40px;
        background: url('../../images/common/active_alert_tip_icon.png') center no-repeat;
        background-size: 100% auto;
    }

    .alert_main {
        margin: 0 auto 26px auto;
    }

    .tip_title {
        font-size: 16px;
        font-weight: bold;
        line-height: 50px;
    }

    .confirm_btn_box {
        background: none;
        color: #ef8200;
        border-top: 1px solid #efefef;
        letter-spacing: 0;
    }

    .scale-in-enter-active {
        transition: all .32s;
    }
    .scale-in-leave-active {
        transition: all .32s;
    }
    .scale-in-enter, .scale-in-leave-to {
        transform: scale(0, 0);
    }
</style>
