'use strict';
exports.main = async (event, context) => {
	
  let js_code = event.code
  let appid = 'wxe8d6e42646af2eb1'
  let secret = '5b578663bd66ff6b1cb9acb7db47178a'
  let url = 'https://api.weixin.qq.com/sns/jscode2session'
  
  let res = await uniCloud.httpclient.request(url, {  
    data: {  
      appid: appid,  
      secret: secret,  
      js_code: js_code,  
      grant_type: 'authorization_code'  
    },  
    dataType: 'json'  
    })

	return res
};
