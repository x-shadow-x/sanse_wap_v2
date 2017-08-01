function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}

function delCookie(name) {  
    var exp = new Date();  
    exp.setTime(exp.getTime() - 1);  
    var cval = getCookie(name); 
    console.log(cval, '-----------------'); 
    if(cval!=null)  
        document.cookie= name + "="+cval+";expires="+exp.toGMTString();  
}  


export default {
    isLogin: function(url, params, success, failure) {
        let userId = localStorage.getItem('USER_ID');
        if (!userId) {
            let wxUserId = getCookie('WX_USER_ID');
            if (!wxUserId) {
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

    delCookie: delCookie
}
