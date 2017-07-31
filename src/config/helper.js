function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}
export default {
	isLogin: function(url, params, success, failure) {
        let userId = localStorage.getItem('USER_ID');
        if (!userId) {
        	let wxUserId = getCookie('WX_USER_ID');
        	if(!wxUserId) {
        		return false;
        	} else {
        		localStorage.setItem('USER_ID', wxUserId);
        		return true;
        	}
        } else {
        	return true;
        }
        // return localStorage.getItem('USER_ID');
    },
}
