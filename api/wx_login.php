<?php


define('IN_ECS', true);
require(dirname(__FILE__) . '/includes/init.php');
$act = $_REQUEST['act'] ? $_REQUEST['act'] : 'weixin_authorize' ;
$redirect_url = $_REQUEST['original'] ? $_REQUEST['original'].'#'.$_REQUEST['hash'] : $_COOKIE['original'];
// echo($redirect_url);exit(0);
setcookie('original',$redirect_url, 0, '/sanse_wap_v2/');
if($act == 'weixin_authorize'){
	$wx_login_openid = $_COOKIE['WeChat']['openid'];
	if($wx_login_openid){
		$wx_user_info = getWxExistUser($wx_login_openid);
		if(!$wx_user_info['openid']){
			$req = "act=weixin_authorize_done&is_authorize=1";
			weixin_authorize(true,$req);
		}else{
			$weixin_src = "AUTH";
			$user_id = createWxUser($wx_user_info,$weixin_src,true);
			//echo 'location:'.$redirect_url.'?user_id='.$user_id;exit;
			setcookie('WX_USER_ID',$user_id,0,'/sanse_wap_v2/dist');
			setcookie('WX_USER_OPENID',$wx_user_info['openid'],0,'/sanse_wap_v2/dist');
			setcookie('WX_UNIONID',$wx_user_info['unionid'],0,'/sanse_wap_v2/dist');
			header('location:'.$redirect_url);exit();
			// echo $user_id;
		}
	}else{
		$req = "act=weixin_authorize_get_openid&is_authorize=1";
		weixin_authorize(false,$req);
	}
	exit;
}elseif($act == 'weixin_authorize_get_openid'){
	
	$open_info = getOpenInfo();
	$wx_user_info = getWxAuthorizeUser($open_info);
	if(!$wx_user_info['openid']){
		$req = "act=weixin_authorize_done&is_authorize=1";
		weixin_authorize(true,$req);
	}
	$weixin_src = "AUTH";
	$user_id = createWxUser($wx_user_info,$weixin_src,true);
	//echo 'location:'.$redirect_url.'?user_id='.$user_id;exit;
	setcookie('WX_USER_ID',$user_id,0,'/sanse_wap_v2/dist');
	setcookie('WX_USER_OPENID',$wx_user_info['openid'],0,'/sanse_wap_v2/dist');
	setcookie('WX_UNIONID',$wx_user_info['unionid'],0,'/sanse_wap_v2/dist');
	header('location:'.$redirect_url);exit();
	// echo $user_id;
}elseif($act == 'weixin_authorize_done'){
	$open_info = getOpenInfo();
	$wx_user_info = getWxAuthorizeUser($open_info);
	$weixin_src = "AUTH";
	$user_id = createWxUser($wx_user_info,$weixin_src,true);
	//echo 'location:'.$redirect_url.'?user_id='.$user_id;exit;
	setcookie('WX_USER_ID',$user_id,0,'/sanse_wap_v2/dist');
	setcookie('WX_USER_OPENID',$wx_user_info['openid'],0,'/sanse_wap_v2/dist');
	setcookie('WX_UNIONID',$wx_user_info['unionid'],0,'/sanse_wap_v2/dist');
	header('location:'.$redirect_url);exit();
	// echo $user_id;
}elseif($act == 'auto_weixin_login'){
	include_once('./includes/cls_weixin_login.php');//微信登录盘dua
	$cls_weixin_login = new cls_weixin_login();
	$res = $cls_weixin_login->login();
	if($res > 0){
		echo $res;
	}else{
		echo '异常';
	}
}elseif($act == 'bind_weixin_authorize'){
	weixin_authorize(true,'act=get_wechat_msg&is_authorize=1');
}elseif($act == 'get_wechat_msg'){
	$open_info = getOpenInfo();
	$wx_user_info = getWxAuthorizeUser($open_info);

	if(!$wx_user_info['openid']){
		echo "<script>alert('绑定失败');";exit();
	}
	$unionid = $wx_user_info['unionid'] ? $wx_user_info['unionid'] : ' ';
	setcookie('WX_USER_OPENID',$wx_user_info['openid'],0,'/sanse_wap_v2/dist');
	setcookie('WX_UNIONID',$unionid,0,'/sanse_wap_v2/dist');
}