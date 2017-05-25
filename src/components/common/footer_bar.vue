<template>
	<ul class="footer_menu_lists">
    	<li class="footer_menu_item" url="./" v-for="item in footerBarList">
            <router-link v-if="item.isLink" :to="item.to" class="fn_item" :style="'background-image: url(' + item.url + ');'">{{item.text}}</router-link>   
        </li>
        
        
    </ul>
</template>

<script>
export default {
	name: 'footer_bar',
	data() {
		return {
			footerBarList: [
				{
					'text': '首页'
				}
			]
		}
	}
}
</script>

<style scoped>

	.footer_menu_lists {
		display: flex;
	}

	.footer_menu_item {
		flex: 1;
		text-align: center;
	}
</style>