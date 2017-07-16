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

/**
 * 接口处理函数
 * @param  {[type]} method       [description]
 * @param  {[type]} url          [description]
 * @param  {[type]} params       [数据请求参数]
 * @param  {[type]} success      [description]
 * @param  {[type]} failure      [description]
 * @param  {[type]} extendParams [额外参数用来做特殊处理~比如用验证码登录或是修改绑定的时候~如果验证码输入不对~接口返回的code为-1
 *                               但是整个请求以及返回过程是正确的~故不能当做错误处理~
 *                               此处约定如果extendParams中存在validateRequest字段并且为true~则将code为-1的情况视为正确
 *                               不过存在的问题是必须保持此处validateRequest字段名和页面发送请求的时候的字段名一致]
 * @return {[type]}              [description]
 */
function apiAxios (method, url, params, success, failure, extendParams) {
	method = method.toUpperCase();
	let headerInfo = {
        'platform_src': 'WAP',
        'cookie_id': '23456006805d970d5438a354dc019fc295614979',
        'systype': 'wap'
    };
	if((method == 'GET' && params) || (method == 'POST' && params)) {
		if(params && params.header) {
			headerInfo = params.header;
			delete params.header;
		}

		url = url + queryEncoded(params);
	}
	
	axios({
		method: method,
		url: url,
		// data: method === 'POST' || method === 'PUT' ? params : null,
		data: method === 'PUT' ? params : null,
		headers: headerInfo ? headerInfo : null,
	    // params: method === 'GET' || method === 'DELETE' ? params : null,
	    baseURL: root,
	    withCredentials: false
	})
	.then(function (res) {
		if (res.data.code != '-1' || extendParams.validateRequest && res.data.code == '-1') {
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
	get: function (url, params, success, failure, extendParams={}) {
		return apiAxios('GET', url, params, success, failure, extendParams)
	},

	post: function (url, params, success, failure, extendParams={}) {
		return apiAxios('POST', url, params, success, failure, extendParams)
	},

	put: function (url, params, success, failure, extendParams={}) {
		return apiAxios('PUT', url, params, success, failure, extendParams)
	},

	delete: function (url, params, success, failure, extendParams={}) {
		return apiAxios('DELETE', url, params, success, failure, extendParams)
	}
}