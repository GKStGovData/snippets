function startSound() {
  var elem = document.getElementsByClassName('birthday-song');
  if (elem.length < 1) {
	return;
  }
  var body = elem[0];
  body.style.background = 'radial-gradient(#bff6ff, #83d9e7)';

  var portlet = body.getElementsByClassName('portlet-body')[0];
  portlet.innerHTML = '<div id="playSound" class="button-search">♫ Mitsingen</div><div id="birthdayText"><p id="p1"></p><p id="p2"></p><p id="p3"></p><p id="p4"></p></div><div class="button-search" id="birthdayBlog"><a href="https://www.govdata.de/web/guest/neues/-/blogs/wir-feiern-10-jahre-govdata">Mehr erfahren</a></div>';
  portlet.style.textAlign = 'center';

  var style = document.createElement('style');
  style.textContent =
    '#playSound, #birthdayBlog {' +
    '  display: inline-block;' +
    '  vertical-align: middle;' +
    '  padding: 1rem;' +
    '  border-radius: 0.5rem;' +
    '  margin: 0 1rem;' +
    '  cursor: pointer;' +
    '}' +
	'#birthdayBlog a {' +
    '  background-color: inherit;' +
    '  color: inherit;' +
    '}' +
    '#birthdayText {' +
    '  font-family: "Source Sans Pro";' +
    '  display: inline-block;' +
    '  text-align: left;' +
    '  vertical-align: middle;' +
    '}' +
    '#birthdayText p {' +
    '  margin-bottom: 0;' +
    '}' +
    '#birthdayText span {' +
    '  display: inline-block;' +
    '  transition: transform .2s;' +
    '}' +
    '#birthdayText span.jump {' +
    '  transform: translateY(-0.5em);' +
    '}';
  document.head.append(style);

  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  let speed = .45;

  const notes = [
	{f:262,d:.5,t:'Hap',p:p1},
	{f:262,d:.5,t:'py&nbsp;',p:p1},
	{f:294,d:1,t:'birth',p:p1},
	{f:262,d:1,t:'day&nbsp;',p:p1},
	{f:349,d:1,t:'to&nbsp;',p:p1},
	{f:330,d:2,t:'you',p:p1},
	
	{f:262,d:.5,t:'Hap',p:p2},
	{f:262,d:.5,t:'py&nbsp;',p:p2},
	{f:294,d:1,t:'birth',p:p2},
	{f:262,d:1,t:'day&nbsp;',p:p2},
	{f:392,d:1,t:'to&nbsp;',p:p2},
	{f:349,d:2,t:'you',p:p2},
	
	{f:262,d:.5,t:'Hap',p:p3},
	{f:262,d:.5,t:'py&nbsp;',p:p3},
	{f:523,d:1,t:'birth',p:p3},
	{f:440,d:1,t:'day&nbsp;',p:p3},
	{f:349,d:1,t:'Gov',p:p3},
	{f:330,d:1,t:'Da',p:p3},
	{f:294,d:3,t:'ta',p:p3},
	
	{f:466,d:.5,t:'Hap',p:p4},
	{f:466,d:.5,t:'py&nbsp;',p:p4},
	{f:440,d:1,t:'birth',p:p4},
	{f:349,d:1,t:'day&nbsp;',p:p4},
	{f:392,d:1,t:'to&nbsp;',p:p4},
	{f:349,d:2,t:'you',p:p4},
  ];

  function createSpan(n){
	n.sp = document.createElement('span');
	n.sp.innerHTML = n.t;
	n.p.appendChild(n.sp);
  }
  notes.map((n) => createSpan(n));

  let isPlaying = false;
  let sounds = [];

  class Sound{
	constructor(freq,dur,i){
		this.frequency = freq;
		this.waveform = 'triangle';
		this.dur = dur;
		this.speed = this.dur*speed;
		this.initialGain = .15;
		this.index = i;
		this.sp = notes[i].sp
	}

	cease(){
		this.sp.classList.remove('jump');
		if(this.index < sounds.length-1){
			sounds[this.index+1].play();
		}
		if(this.index == sounds.length-1){
			isPlaying = false;
		}
	}

	play(){
		this.gain = audioCtx.createGain();
		this.gain.gain.value = this.initialGain;
		this.gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + this.speed);
		this.gain.connect(audioCtx.destination);

		this.oscillator = audioCtx.createOscillator();
		this.oscillator.type = this.waveform;
		this.oscillator.frequency.value = this.frequency;
		this.oscillator.connect(this.gain);

		this.sp.setAttribute('class', 'jump');

		this.oscillator.start(audioCtx.currentTime);
		this.oscillator.stop(audioCtx.currentTime + this.speed); 
		this.oscillator.onended = ()=> {
			this.cease();
		}
	}  
  }

  for(let i=0; i < notes.length; i++){
    let sound = new Sound(notes[i].f, notes[i].d,i);
    sounds.push(sound);
  }

  document.getElementById('playSound').addEventListener('click',function(e){
	if(!isPlaying){
		sounds[0].play();
		isPlaying = true;
	}
  },false);
}

startSound();
