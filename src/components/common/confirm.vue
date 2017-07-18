<template>
    <transition name="scale-in">
        <div class="confirm_hover" v-if="isShowConfirm">
            <div class="user_confirm_box">
                <div class="user_confirm_main">
                    <h2 class="tip_title">{{tipTitle}}</h2>
                    <p>{{tipContent}}</p>
                </div>
                <div class="user_confirm_btn_box">
                    <span class="confirm_btn" @click="handleConfirm">确认</span>
                    <span class="cancel_btn" @click="handleCancel">取消</span>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        props: ['isShowConfirm', 'tipTitleF', 'tipContentF', 'cbName'],
        

        computed: {
            tipTitle: function() {
                return this.tipTitleF || '提示';
            },
            tipContent:function() {
                return this.tipContentF || '';
            }
        },
        methods: {
            handleConfirm() {
                this.$emit('confirmEvent', this.cbName);
            },

            handleCancel() {
                this.$emit('cancelEvent');
            }
        }
    }
</script>

<style scoped>

    .confirm_hover {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, .7);
        z-index: 10000;
    }

    .user_confirm_box {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -80%);
        background: #fff;
        border-radius: 4px;
        width: 90%;
        padding-top: 32px;
        text-align: center;
    }

    .user_confirm_main {
        margin: 0 auto 26px auto;
    }

    .tip_title {
        line-height: 50px;
        font-weight: bold;
        letter-spacing: 1px;
    }

    .user_confirm_btn_box {
        line-height: 1.4rem;
        background: none;
        color: #ef8200;
        border-top: 1px solid #efefef;
        letter-spacing: 0;
        display: flex;
    }

    .confirm_btn,
    .cancel_btn {
        flex: 1;
    }

    .cancel_btn {
        color: #333;
        position: relative;
    }

    .cancel_btn:before {
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        width: 1px;
        background: #efefef;
        height: 40%;
        transform: translateY(-50%);
    }


    .scale-in-enter-active {
        transition: all .32s;
    }
    .scale-in-leave-active {
        transition: all .32s;
    }
    .scale-in-enter, .scale-in-leave-to {
        opacity: 0;
    }
</style>
