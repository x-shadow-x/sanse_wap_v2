<template>
	<ul class="footer_menu_lists">
        <li class="footer_menu_item">
            <router-link class="footer_menu_item_link footer_menu_home" to="/home">首页</router-link>
        </li>
        <li class="footer_menu_item">
            <router-link class="footer_menu_item_link footer_menu_brand" to="/home">品牌</router-link>
        </li>
        <li class="footer_menu_item">
            <router-link class="footer_menu_item_link footer_menu_tide" to="/home">潮文</router-link>
        </li>
        <li class="footer_menu_item">
            <router-link class="footer_menu_item_link footer_menu_carts" to="/home">购物袋</router-link>
        </li>
        <li class="footer_menu_item">
            <router-link class="footer_menu_item_link footer_menu_user" to="/user_index">个人中心</router-link>
        </li>
    </ul>
</template>

<script>

export default {
	name: 'footer_bar',
	data() {
		return {
		}
	}
}
</script>

<style scoped>

	.footer_menu_lists {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 1.562rem;
		display: flex;
        background: #191919;
        font-size: 4px;
	}

	.footer_menu_item {
		flex: 1;
		text-align: center;
	}

    .footer_menu_item_link {
        display: block;
        background: url('../../images/footer_bar/home_icon.png') center 0.219rem no-repeat;
        background-size: 0.781rem;
        padding-top: 1.094rem;
    }

    .footer_menu_home {
        background-image: url('../../images/footer_bar/home_icon.png')
    }

    .footer_menu_home.router-link-active {
        background-image: url('../../images/footer_bar/home_active_icon.png')
    }

    .footer_menu_brand {
        background-image: url('../../images/footer_bar/brand_icon.png')
    }

    .footer_menu_brand.router-link-active {
        background-image: url('../../images/footer_bar/brand_active_icon.png')
    }

    .footer_menu_tide {
        background-image: url('../../images/footer_bar/tide_icon.png')
    }

    .footer_menu_tide.router-link-active {
        background-image: url('../../images/footer_bar/tide_active_icon.png')
    }

    .footer_menu_carts {
        background-image: url('../../images/footer_bar/carts_icon.png')
    }

    .footer_menu_carts.router-link-active {
        background-image: url('../../images/footer_bar/carts_active_icon.png')
    }

    .footer_menu_user {
        background-image: url('../../images/footer_bar/user_icon.png')
    }

    .footer_menu_user.router-link-active {
        background-image: url('../../images/footer_bar/user_active_icon.png')
    }

    .router-link-active {
        color: #ef8200;
    }
</style>
