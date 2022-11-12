function unlinkApp() {
Kakao.API.request({
  url: '/v1/user/unlink',
  success: function(res) {
	alert('success: ' + JSON.stringify(res))
  },
  fail: function(err) {
	alert('fail: ' + JSON.stringify(err))
  },
})
}
