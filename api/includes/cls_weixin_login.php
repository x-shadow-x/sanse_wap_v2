<?php

/**
 * MO2O 前段微信登陆处理类
*/
class cls_weixin_login{
	private $db = '';
	private $ecs = '';
	public $user_id = 0;
	public $user_obj = '';
	public $openid = '';
	function __construct($user='',$user_id=0){
		global $db,$ecs;
		$this->db = $db;
		$this->ecs = $ecs;
		$this->user_id = $user_id;
		$this->user_obj = $user;
		$openid = $_COOKIE['OS']['openid'];
		if(!$openid){
			$openid  = $_COOKIE['WeChat']['openid'];
		}
		if($openid){
			$this->openid = $openid;
		}
		
	}
	function getOpenInfo(){
		 $user_agent = $_SERVER['HTTP_USER_AGENT'];
		 $agent = strtolower($user_agent);
		 if (!strpos($user_agent, 'MicroMessenger')) {
		 	return false;
		 }
		 if(!$this->openid){
		 	if( ($_GET['code'] && !$_GET['weixin_no']) or (!$_GET['code'] && $_GET['weixin_no'])){
				return false;
			}
			if($_GET['code'] && $_GET['weixin_no']){
			
				$open_info = getOpenInfo();
				$this->openid =  $open_info['openid'];
				setcookie('OS[openid]',$open_info['openid']);
				setcookie('WeChat[openid]',$open_info['openid']);
			}else{
				weixin_authorize(false);exit;	
			}
		}
	}
	function login(){
		global $is_wechat_login;
		if($_GET['is_ajax']){
			return false;
		}
		
		$php_self = isset($_SERVER['URL'])?$_SERVER['URL']:$_SERVER['PHP_SELF'];
		$php_self = basename($php_self,'.php');
		if($php_self == 'outer_source' || $php_self == 'bind_user_code' || $php_self == 'applogin'){
			$this->getOpenInfo();return ;
		}
	
		if($this->user_id){
			return $this->user_id;
		 }
		 if($this->openid){
		 	 $wx_user_info = getWxExistUser($this->openid);
			 if($wx_user_info && $this->user_id){
			 	if($wx_user_info['user_id'] != $this->user_id){
					$user_id = $this->wx_authorize_login($wx_user_info);
					if($user_id){
						 echo "<script language=JavaScript> document.location.reload();</script>";exit;
					}
				}
			 }
			 
			 
		 }
		 
		 if($_GET['is_authorize']){ // 手动授权判断，防止被自动登陆拦截 授权逻辑
		 	return false;
		 }
		 $user_agent = $_SERVER['HTTP_USER_AGENT'];
		 $agent = strtolower($user_agent);
		 if (!strpos($user_agent, 'MicroMessenger')) {
		 	return false;
		 }
		$http_referer = $_SERVER['HTTP_REFERER'];
		if($http_referer && !$_GET['code'] && !$_GET['weixin_no']){
			return false;
		}
		
		if( ($_GET['code'] && !$_GET['weixin_no']) or (!$_GET['code'] && $_GET['weixin_no'])){
			return false;
		}
		if($_GET['code'] && $_GET['weixin_no']){
			$open_info = getOpenInfo();
			$this->openid =  $open_info['openid'];
			setcookie('OS[openid]',$open_info['openid']);
			setcookie('WeChat[openid]',$open_info['openid']);
			$wx_user_info = getWxExistUser($open_info['openid']);
			if($wx_user_info){
					$user_id = $this->wx_authorize_login($wx_user_info);
					return $user_id;
					// if($user_id){
					// 	 echo "<script language=JavaScript> document.location.reload();</script>";exit;
					// }
			}else{
					return false;
			}
		}else{
			weixin_authorize(false);exit;
			
				
		}
		return false;
	}
	function wx_authorize_login($wx_user_info){
		$weixin_src = "AUTH";
		$user_id = createWxUser($wx_user_info,$weixin_src,true);//授权 AUTH   关注 SUBS 
		
		if(!$user_id){
			return false;
		}
		// $this->user_obj->set_session($user_id);
        	// $this->user_obj->set_cookie($user_id, $remember);
		update_user_info();
		return $user_id;
	}
}
?>