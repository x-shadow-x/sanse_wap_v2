<template>
	<div class="footer_bar">
        <ul class="footer_menu_lists" id="footerMenuList">
            <li class="footer_menu_item">
                <router-link class="footer_menu_item_link footer_menu_home" to="/home">首页</router-link>
            </li>
            <li class="footer_menu_item">
                <router-link class="footer_menu_item_link footer_menu_brand" to="/brand">品牌</router-link>
            </li>
            <!-- <li class="footer_menu_item">
                <router-link class="footer_menu_item_link footer_menu_tide" to="/home">潮文</router-link>
            </li> -->
            <li class="footer_menu_item">
                <router-link class="footer_menu_item_link footer_menu_carts" to="/shopping_bag">
                    购物袋
                    <num-tip :num="shoppingBagNum" :style="numTipStyle"></num-tip>
                </router-link>
            </li>
            <li class="footer_menu_item">
                <router-link class="footer_menu_item_link footer_menu_store_pay" to="/store_pay">店铺支付</router-link>
            </li>
            <li class="footer_menu_item">
                <router-link class="footer_menu_item_link footer_menu_user" to="/user_index">个人中心</router-link>
            </li>
        </ul>
        <div class="footer_blank"></div>
    </div>
</template>

<script>

import numTip from './num_tip.vue';

export default {
	name: 'footer_bar',
	data() {
		return {
            numTipStyle: {
                right: '14px',
                top: '3px'
            }
		}
	},
    computed: {
        shoppingBagNum: function() {
            return this.$store.state.shoppingBagNum;
        }
    },
    components: {
        numTip
    }
}
</script>

<style scoped>

    .footer_blank {
        height: 1.4rem;
    }

	.footer_menu_lists {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 1.4rem;
		display: flex;
        background: #191919;
        color: #fff;
	}

    [data-dpr="2"] .footer_menu_lists {
        font-size: 18px;
    }

    [data-dpr="3"] .footer_menu_lists {
        font-size: 27px;
    }

	.footer_menu_item {
		flex: 1;
		text-align: center;
        font-size:8px;
	}

    .footer_menu_item_link {
        display: block;
        position: relative;
        background: url('../../images/footer_bar/home_icon.png') center 0.2rem no-repeat;
        background-size: 0.75rem;
        padding-top: 1rem;
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

    .footer_menu_store_pay {
        background-image: url('../../images/footer_bar/store_pay_icon.png');
    }

    .footer_menu_store_pay.router-link-active {
        background-image: url('../../images/footer_bar/store_pay_active_icon.png');
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
