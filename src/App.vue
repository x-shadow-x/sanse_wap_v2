<template>
    <div class="main_app">
        <transition :name="transitionName">
            <router-view></router-view>
        </transition>
        <footer-bar></footer-bar>
        <load :show="this.$store.state.isShowLoad"></load>
    </div>
</template>

<script>
    import footerBar from './components/common/footer_bar.vue';
    import load from './components/common/load.vue';

    export default {
        name: 'app',
        data() {
            return {
                transitionName: 'slide-right',
                isShowLoad: false
            }
        },
        // created() {
        //     if(window.WeixinJSBridge) {
        //         this.$store.commit('SET_LOGIN_ROUTER', '/wx_login');
        //     }
        // },
        mounted() {
            console.log(this.$store.state.loginRouter);
            
            // this.$store.commit('SET_USER_ID', '304014');
            // this.$store.commit('SET_COOKIE_ID', '23456006805d970d5438a354dc019fc295614979');
            this.$request.get(this.$interface.GETSTOREAGECOUNT, {
                'userId': localStorage.getItem('USER_ID'),
                'cookieId': this.$store.state.cookieId
            }, (response) => {
                let data = response.data;
                this.$store.commit('SET_SHOPPING_BAG_NUM', data);
            });
        },
        components: {
            footerBar,
            load
        },
        watch: {
            '$route' (to, from) {

                let routerList = this.$store.state.routerList;
                let nextPath = to.path;
                let current = from.path;

                if(routerList[nextPath] < routerList[current]) {
                    this.transitionName = 'slide-right';
                } else {
                    this.transitionName = 'slide-left';
                }
            }
        },
    }
</script>

<style>

    #app {
        height: 100%;
        overflow: auto;
    }

    .main_app {
        font-family: "Microsoft YaHei", Arial, Helvetica, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        height: 100%;
        overflow: visible;
    }

    .lazyload {
        opacity: 0;
    }

    .lazyloading {
        opacity: 1;
        background: #efefef;
        background-size: 32px auto;
    }

    .slide-right-enter-active {
        transition: all .32s;
    }
    .slide-right-leave-active {
        transition: all .32s;
    }
    .slide-right-enter, .slide-right-leave-to {
        transform: translateX(100%);
    }

    .slide-left-enter-active {
        transition: all .32s;
    }
    .slide-left-leave-active {
        transition: all .32s;
    }
    .slide-left-enter, .slide-left-leave-to {
        transform: translateX(-100%);
    }
</style>
