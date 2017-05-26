<template>
	<div>
         <div>
            <img src="../../images/common/default_user_icon.png" alt="">
        </div>
        <footer-bar></footer-bar>
    </div>
</template>

<script>
    import footerBar from '../../components/common/footer_bar.vue';

	export default {
		name: 'home',
        components: {
            footerBar
        },
		methods: {},
	}
</script>

<style scoped>
    html, body {
        height: 100%;
    }
    img {
        height: 380px;
    }
</style>
