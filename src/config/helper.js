export default {
	isLogin: function (url, params, success, failure) {
		return localStorage.getItem('USER_ID');
	},
}