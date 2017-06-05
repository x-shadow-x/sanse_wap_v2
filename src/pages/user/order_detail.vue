<template>
	<div>
		Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore in facere impedit fugit explicabo, officia magnam totam eum laborum repellat quae, sit libero iure. Molestiae cupiditate obcaecati itaque odio et.
	</div>
</template>

<script>
	export default {
		mounted() {

			this.$request.get(this.$interface.GET_ALL_ORDER_ENTITY, {
                'header': {
                    'platform_src': 'WAP',
                    'cookie_id': '23456006805d970d5438a354dc019fc295614979',
                    'systype': 'wap'
                },
                'orderId': this.$route.params.order_id
            }, (response) => {
                let data = response.data;

                console.log(data);
            });
		}
	}
</script>