// 配置API接口地址
var root = process.env.API_ROOT

// 引用axios
var axios = require('axios')

/**
 * 判断中文字符
 * 根据后台要求~请求参数若是中文字符~在进行base64编码前要经过urlencode转码
 */
function isChineseChar(str) {
	var reg = /[\u4E00-\u9FA5\uF900-\uFA2D]/;
	return reg.test(str);
}

/**
 * 判断全角符号~待用
 */
function isFullwidthChar(str) {
	var reg = /[\uFF00-\uFFEF]/;
	return reg.test(str);
}

function base64Encode(str) {
	var result;
    result = encodeURIComponent(str);
    result = unescape(result);
    result = window.btoa(result);
    return result;
}

/**
 * 由于此项目对应后台对请求参数要求需要转为base64~故有此函数
 * @params  json格式请求参数
 * @return 返回base64编码的字符转~依据后台要求去除了key~只将value进行base64编码并通过&连接
 */
function queryEncoded(params) {
	var resultStr = '';
	for(let item in params) {
		let value = params[item];
		value = isChineseChar(value) ? encodeURI(value).toLowerCase() : value;
		resultStr = resultStr + '&' + base64Encode(value);
	}
	return resultStr.substr(1);
}

/*
  接口处理函数
*/
function apiAxios (method, url, params, success, failure) {
	method = method.toUpperCase();

	if(method == 'GET' && params) {
		url = url + queryEncoded(params);
	}

	axios({
		method: method,
		url: url,
		data: method === 'POST' || method === 'PUT' ? params : null,
	    // params: method === 'GET' || method === 'DELETE' ? params : null,
	    baseURL: root,
	    withCredentials: false
	})
	.then(function (res) {

		if (res.data.code != '-1') {
			if (success) {
				success(res.data);
			}
		} else {
			if (failure) {
				failure(res.data)
			} else {
				window.alert('error: ' + JSON.stringify(res.data))
			}
		}
	})
	.catch(function (err) {
		let res = err.response;

		if (err) {
			window.alert('api error, HTTP CODE: ' + err)
			return
		}
	})
}

// 返回在vue模板中的调用接口
export default {
	get: function (url, params, success, failure) {
		return apiAxios('GET', url, params, success, failure)
	},

	post: function (url, params, success, failure) {
		return apiAxios('POST', url, params, success, failure)
	},

	put: function (url, params, success, failure) {
		return apiAxios('PUT', url, params, success, failure)
	},

	delete: function (url, params, success, failure) {
		return apiAxios('DELETE', url, params, success, failure)
	}
}