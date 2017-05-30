<template>
    <div class="main_app">
        <transition :name="transitionName">
            <router-view></router-view>
        </transition>
        <footer-bar></footer-bar>
    </div>
</template>

<script>
    import footerBar from './components/common/footer_bar.vue';
    export default {
        name: 'app',
        data() {
            return {
                transitionName: 'slide-right'
            }
        },
        components: {
            footerBar
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
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        height: 100%;
        overflow: visible;
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
