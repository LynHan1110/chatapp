const drone = new Scaledrone('EysghIgjliEb1VAN')

drone.on('open', error => {
  if (error) {
    return console.error(error);
  }})

const room = drone.subscribe('my-room', {
  historyCount: 100 //메시지 100개 불러오기
});
room.on('history_message', message => 
	printmsg(message)
);
room.on('open', error => {
  if (error) {
    console.error(error);
  } else {
    console.log('Connected to room');
  }
});

room.on('message', message => {
	printmsg(message);
});

drone.on('error', error => console.error(error));

//전송버튼이 눌렸을 때 텍스트박스 안에 있는 텍스트를 메시지로 보낸다. 또한 텍스트박스의 내용을 비운다.
function sendmsg()  {
	const msginput = document.getElementById('msginput');
	drone.publish({
		room: 'my-room',
		message: msginput.value
	})
	
	msginput.value = '';
}

function enterkey(){ //엔터키 누를때 메시지 보내게하기
    if (window.event.keyCode == 13) {
		sendmsg();
    }
}

const msgs = document.getElementById('messages');
function printmsg(message){
	const msgdiv = document.createElement('div'); //message를 담을 div생성
	const msgspan = document.createElement('span'); //message를 담을 span생성
	const timespan = document.createElement('span'); //시간을 담을 span생성
	
	msgdiv.setAttribute('class','msgbox'); //msgdiv	의 class설정
	if (drone.clientId != message.clientId){
		msgdiv.setAttribute('class','msgbox notme');
	}
	
	msgspan.setAttribute('class', 'msg'); //msgspan의 class설정
	timespan.setAttribute('class', 'time'); //msgspan의 class설정
	
	const msg = document.createTextNode(message.data);
	const msgtime = new Date(message.timestamp * 1000); //msg작성한 시간 변수에 저장
	const msgtimetext = document.createTextNode(" "+msgtime.getHours()+":"+(msgtime.getMinutes() >= 10 ? msgtime.getMinutes() : "0" + msgtime.getMinutes())); //10시 9분 -> 10:09
	
	msgspan.appendChild(msg);
	timespan.append(msgtimetext);
	
	msgdiv.appendChild(msgspan); //만든 div에 message넣기
	msgdiv.appendChild(timespan);
	msgs.appendChild(msgdiv); // #messages div에 저장하기
	
	msgs.scrollTop = msgs.scrollHeight; //스크롤 맨 아래로 내리기
}