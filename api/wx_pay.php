<?php

define('IN_ECS', true);
require(dirname(__FILE__) . '/includes/init.php');
$WEB_WEIXIN_PAY = array();
$pay_code = $_REQUEST['pay_code'] ? $_REQUEST['pay_code'] : '';


wap_to_wxpay($pay_code);
function wap_to_wxpay($pay_code){
	global $WEB_WEIXIN_PAY;
	include_once ROOT_PATH."api/pay/function.php";
	$WEB_WEIXIN_PAY = getPayConfig('weixin','3.36','wap');

	if(!$WEB_WEIXIN_PAY||!is_array($WEB_WEIXIN_PAY)){
		echo json_encode(array('error'=>1,'msg'=>'支付异常，请联系客服'));exit;
	}
	$company_name = $WEB_WEIXIN_PAY['company_name'];
	include_once ROOT_PATH."api/pay/weixin3.36/config.php";
	//支付回调文件
	$WEB_WEIXIN_PAY['NOTIFY_URL'] = $location_url."api/pay/weixin3.36/wap_pay_native_call.php";
	// var_dump($WEB_WEIXIN_PAY);
	
	include_once ROOT_PATH."api/pay/weixin3.36/lib/WxPay.Api.php";

	include_once ROOT_PATH."api/pay/weixin3.36/WxPay.JsApiPay.php";
	// echo(ROOT_PATH);exit(0);

	$openid = $_COOKIE['OS']['openid'];
	// $openid = 'oXaHIvvyopxuQomMSevuFMb2o_G4';
	if(!$openid){
		$openid  = $_COOKIE['WeChat']['openid'];
	}
	if(!$openid){
		echo json_encode(array('error'=>1,'msg'=>'openid异常！'));exit;
	}

	$code_info = validateOrder($pay_code);
	// var_dump($code_info);
	if($code_info['error'] >= 1){
		echo json_encode($code_info);exit;
	}
	$order_sn = $code_info['pay_info']['order_sn'];
	$order_amount = $code_info['pay_info']['order_amount'];
	// $order_id = $code_info['pay_info']['order_id'];

	//①、获取用户openid
	$tools = new JsApiPay();

	//②、统一下单
	$input = new WxPayUnifiedOrder();

	$out_trade_no = trim("normal_".$order_sn);
	$order_amount = intval($order_amount*100);
	$body = trim($company_name."商城支付 ".$order_sn);

	$input->SetBody($body);
	$input->SetAttach('normal_'.$order_sn);
	$input->SetOut_trade_no($out_trade_no);
	$input->SetTotal_fee($order_amount);
	$input->SetTime_start(date("YmdHis"));
	//$input->SetTime_expire(date("YmdHis", time() + 600));
	$input->SetGoods_tag("");
	$input->SetNotify_url($WEB_WEIXIN_PAY["NOTIFY_URL"]);
	$input->SetTrade_type("JSAPI");
	$input->SetOpenid($openid);
	$order = WxPayApi::unifiedOrder($input);
	// var_dump($order);
	if($order['error'] == '1'){
		error_write_log(json_encode($order),'wap_req_weixin_3.36_time_out');
		$error_msg = $order['error_code']."错误，请联系管理员";
		if($order['error_code'] == '28'){
			$error_msg = '支付超时，请返回重试';
		}
		echo json_encode(array('error'=>1,'msg'=>$error_msg));exit;
		// echo "<script>alert('".$error_msg."');</script>";exit;
	}
	if($order['return_code'] == 'FAIL'){
		error_write_log(json_encode($order),'wap_req_weixin_3.36_pay_error');
		echo json_encode(array('error'=>1,'msg'=>'505 参数异常，请联系管理员 '));exit;
		// echo "<script>alert('505 参数异常，请联系管理员 ');</script>";exit;
	}
	//echo '<font color="#f00"><b>统一下单支付单信息</b></font><br/>';
	// printf_info($order);
	$jsApiParameters = $tools->GetJsApiParameters($order);
	// $jsApiParameters = json_decode($jsApiParameters,true);
	write_log($jsApiParameters,'jsApiParameters');
	echo $jsApiParameters;exit();
	// echo json_encode(array('order_id'=>$order_id ,'pay_info'=>$jsApiParameters));exit();
}


function validateOrder($pay_code){
	global $ecs,$db;
	// $pay_code = $_GET['pay_code'];
	$pay_info = explode('||',base64_decode($pay_code));
	$payment_id = $pay_info[0];
	$order_sn = $pay_info[1];
	$order_amount = $pay_info[2];
	$time = $pay_info[3];
	$sign = $pay_info[4];
	$sign_temp = get_sign_code($payment_id.$order_sn.$order_amount.$time);
	$return = array('error'=>0,'msg'=>'');
	$return['pay_info'] = array('payment_id'=>$payment_id,'order_sn'=>$order_sn,'order_amount'=>$order_amount);
	if($sign_temp != $sign){
		$return['error'] = 1 ;
		$return['msg'] = '验证失败，请返回';
		return $return;exit;
	}

	$order_info = $db->getRow("select * from ".$ecs->table('order_info')." where order_sn='".$order_sn."' ");
	if(!$order_info){
		$return['error'] = 1 ;
		$return['msg'] = '订单不存在';
		return $return;exit;
	}
	if($order_info['pay_status']==2){
		$return['error'] = 2 ;
		$return['msg'] = '订单已支付';
		// $return['order_id'] = $order_id ;
		return $return;exit;
	}
	return $return;exit;
}
?>