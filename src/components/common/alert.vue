<template>
    <transition name="scale-in">
        <div class="alert_hover" v-if="isShowAlert" :class="{black: isBlack}">
            <div class="alert_box">
                <i class="alert_icon"></i>
                <div class="alert_main">
                    <h2 class="tip_title">{{tipTitle}}</h2>
                    <p>{{tipContent}}</p>
                </div>
                <div class="confirm_btn_box">
                    <span class="confirm_btn" @click="handleConfirm">知道了</span>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        props: ['isShowAlert', 'tipTitleF', 'tipContentF', 'isBlackF', 'cbName'],
        data() {
            return {}
        },
        computed: {
            tipTitle: function() {
                return this.tipTitleF || '提示';
            },
            tipContent: function() {
                return this.tipContentF || '系统未指定提示内容';
            },
            isBlack: function() {
                return this.isBlackF;
            }
        },
        methods: {
            handleConfirm() {
                this.$emit('hideAlert', this.cbName);
            }
        }
    }
</script>

<style scoped>

    .alert_hover {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        z-index: 10000;
    }

    .alert_hover.black {
        background: rgba(0, 0, 0, .6);
    }

    .alert_box {
        position: absolute;
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
        /*transform: scale(0, 0);*/
        opacity: 0;
    }
</style>
