function jsApiCall (data) {
	if(!WeixinJSBridge) {
		alert('请用微信浏览器打开');
		return;
	}
	WeixinJSBridge.invoke(
		'getBrandWCPayRequest',
		data,
		function(res){
			WeixinJSBridge.log(res.err_msg);
			if(res.err_msg=="get_brand_wcpay_request:cancel"){
				//取消结算后的动作
				alert('取消支付');
            }
          	if(res.err_msg=="get_brand_wcpay_request:ok"){
          		//支付成功后的动作
          		alert('支付成功');
           	}
		   	if(res.err_msg=="get_brand_wcpay_request:fail"){
		   		//支付失败后的动作
		   		alert('支付失败');
            }
		}
	);
}

export default {
	callpay: function(data) {
		if (typeof WeixinJSBridge == "undefined"){
		    if( document.addEventListener ){
		        document.addEventListener('WeixinJSBridgeReady', jsApiCall, false);
		    }else if (document.attachEvent){
		        document.attachEvent('WeixinJSBridgeReady', jsApiCall); 
		        document.attachEvent('onWeixinJSBridgeReady', jsApiCall);
		    }
		}else{
		    jsApiCall(data);
		}
	}
}