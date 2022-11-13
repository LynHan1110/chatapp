Kakao.init('3db8eca387a3f5ef1a094040401606f0'); //API 키
console.log(Kakao.isInitialized());

Kakao.Auth.createLoginButton({
container: '#kakao-login-btn',
success: function(authObj) {
  Kakao.API.request({
	url: '/v2/user/me',  
	success: function(result) {
		console.log(result);
		$('#result').append(result);
		id = result.id
		connected_at = result.connected_at
		kakao_account = result.kakao_account
		$('#result').append(kakao_account);
		resultdiv="<h2>로그인 성공 !!"
		resultdiv += '<h4>id: '+id+'<h4>'
		resultdiv += '<h4>connected_at: '+connected_at+'<h4>'
		nickname="";
		if(typeof kakao_account != 'undefined'){
		  nickname= result.properties.nickname;
		}

		resultdiv += '<h4>nickname: '+nickname +' 님 안녕하세요<h4>'
		$('#result').append(resultdiv);
		
		document.getElementById('userid').value = id;
		document.getElementById('username').value = nickname;
	},
	fail: function(error) {
	  alert(
		'login success, but failed to request user information: ' +
		  JSON.stringify(error)
	  )
	},
  })
},
fail: function(err) {
  alert('failed to login: ' + JSON.stringify(err))
},
})
