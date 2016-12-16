<?php
echo '<a href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa13312503e5d3929&redirect_uri=http%3A%2F%2Fwww.manglab.com%2Fh5%2Flogin.php&response_type=code&scope=snsapi_userinfo&state=tudoujun#wechat_redirect">yes</a><br/>'; 
echo 'success';
?>

<script type="text/javascript" src="http://cdn.bootcss.com/jquery/3.1.1/jquery.js"></script>
<script>
function Login(){
	this.startUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa13312503e5d3929&redirect_uri=http%3A%2F%2Fwww.manglab.com%2Fh5%2Flogin.php&response_type=code&scope=snsapi_userinfo&state=tudoujun#wechat_redirect';
}

Login.prototype = {
	comeIn:function(){
		var self = this;
		$.ajax({
			type:'get',
			url:self.startUrl,
			success:function(data){
				if(typeof data == 'object'){
					data = JSON.stringify(data);
				}
				alert(data);
			}
		});
	}
};

new Login().comeIn();
</script>

