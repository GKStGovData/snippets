var c, ctx, bc, bCtx;
var cw, cx, ch, cy;
var frames, requestId, rad, kappa;
var x, y, balloons = [];

function startParty() {
  var elem = document.getElementsByClassName('birthday');
  if (elem.length < 1) {
	return;
  }
  var body = elem[0].getElementsByClassName('portlet-body')[0];
  body.style.position = 'relative';
  body.style.overflow = 'hidden';

  var header = body.getElementsByClassName('show-big-header')[0];
  header.style.background = 'radial-gradient(#bff6ff, #72bbc7)';

  var searchBox = body.getElementsByClassName('gd-search-searchbox')[0];
  searchBox.style.zIndex = '1';
  searchBox.style.position = 'relative';

  c = document.createElement('canvas');
  c.style.position = 'absolute';
  c.style.bottom = '4px';
  ctx = c.getContext('2d');
  body.appendChild(c);

  bc = document.createElement('canvas');
  bCtx = bc.getContext('2d');
  bCtx.strokeStyle = '#46494d';
  bCtx.lineWidth = 1;

  cw = c.width = bc.width = window.innerWidth, cx = cw / 2;
  ch = c.height = bc.height = window.innerHeight + 100, cy = ch;

  frames = 0;
  requestId = null;
  rad = (Math.PI / 180);
  kappa = 0.5522847498;
  balloons = [];

  setTimeout(function() {
    init();
    window.addEventListener('resize', init, false);
  }, 15);
}

function Balloon() {
  this.r = randomIntFromInterval(20, 70);
  this.R = 1.4 * this.r;
  this.x = randomIntFromInterval(this.r, cw - this.r);
  this.y = ch + 2 * this.r;
  this.a = this.r * 4.5;
  this.pm = Math.random() < 0.5 ? -1 : 1;
  this.speed = randomIntFromInterval(1.5, 4);
  this.k = this.speed / 5;
  this.hue = Math.random() < 0.34 ? '1' : Math.random() < 0.5 ? '60' : '0';
}

function draw() {
  updateBallons(bCtx);

  ctx.clearRect(0, 0, cw, ch);
  var img = bc;
  ctx.drawImage(img, 0, 0);

  requestId = window.requestAnimationFrame(draw);
}

function init() {
  if (requestId) {
    window.cancelAnimationFrame(requestId);
    requestId = null;
  }
  cw = c.width = bc.width = window.innerWidth, cx = cw / 2;
  ch = c.height = bc.height = window.innerHeight + 100, cy = ch;
  bCtx.strokeStyle = '#46494d';
  bCtx.lineWidth = 1;
  draw();
}

function updateBallons(ctx) {
  frames += 1;
  if (frames % 37 == 0 && balloons.length < 37) {
    var balloon = new Balloon();
    balloons.push(balloon);
  }
  ctx.clearRect(0, 0, cw, ch);

  for (var i = 0; i < balloons.length; i++) {
    var b = balloons[i];
    if (b.y > -b.a) {
      b.y -= b.speed
    } else {
      b.y = parseInt(ch + b.r + b.R);
    }

    var p = thread(b, ctx);
    b.cx = p.x;
    b.cy = p.y - b.R;
    ctx.fillStyle = getGradient(p.x, p.y, b.r, b.hue)
    drawBalloon(b, ctx);
  }
}

function drawBalloon(b, ctx) {
  var or = b.r * kappa; // offset

  var p1 = {
    x: b.cx - b.r,
    y: b.cy
  }
  var pc11 = {
    x: p1.x,
    y: p1.y + or
  }
  var pc12 = {
    x: p1.x,
    y: p1.y - or
  }

  var p2 = {
    x: b.cx,
    y: b.cy - b.r
  }
  var pc21 = {
    x: b.cx - or,
    y: p2.y
  }
  var pc22 = {
    x: b.cx + or,
    y: p2.y
  }

  var p3 = {
    x: b.cx + b.r,
    y: b.cy
  }
  var pc31 = {
    x: p3.x,
    y: p3.y - or
  }
  var pc32 = {
    x: p3.x,
    y: p3.y + or
  }

  var p4 = {
    x: b.cx,
    y: b.cy + b.R
  };
  var pc41 = {
    x: p4.x + or,
    y: p4.y
  }
  var pc42 = {
    x: p4.x - or,
    y: p4.y
  }

  var t1 = {
    x: p4.x + .2 * b.r * Math.cos(70 * rad),
    y: p4.y + .2 * b.r * Math.sin(70 * rad)
  }
  var t2 = {
    x: p4.x + .2 * b.r * Math.cos(110 * rad),
    y: p4.y + .2 * b.r * Math.sin(110 * rad)
  }

  //balloon
  ctx.beginPath();
  ctx.moveTo(p4.x, p4.y);
  ctx.bezierCurveTo(pc42.x, pc42.y, pc11.x, pc11.y, p1.x, p1.y);
  ctx.bezierCurveTo(pc12.x, pc12.y, pc21.x, pc21.y, p2.x, p2.y);
  ctx.bezierCurveTo(pc22.x, pc22.y, pc31.x, pc31.y, p3.x, p3.y);
  ctx.bezierCurveTo(pc32.x, pc32.y, pc41.x, pc41.y, p4.x, p4.y);
  //knot
  ctx.lineTo(t1.x, t1.y);
  ctx.lineTo(t2.x, t2.y);
  ctx.closePath();
  ctx.fill();
}

function thread(b, ctx) {
  ctx.beginPath();

  for (var i = b.a; i > 0; i -= 1) {
    var t = i * rad;
    x = b.x + b.pm * 50 * Math.cos(b.k * t - frames * rad)
    y = b.y + b.pm * 25 * Math.sin(b.k * t - frames * rad) + 50 * t
    ctx.lineTo(x, y)
  }
  ctx.stroke();
  return p = {
    x: x,
    y: y
  }
}

function getGradient(x, y, r, hue) {
  var s = hue === '0' ? '0%' : '100%';
  grd = ctx.createRadialGradient(x - .5 * r, y - 1.7 * r, 0, x - .5 * r, y - 1.7 * r, r);
  grd.addColorStop(0, 'hsla(' + hue + ',' + s + ',' + (hue === '0' ? '40%' : '65%') + ',.95)');
  grd.addColorStop(0.4, 'hsla(' + hue + ',' + s + ',' + (hue === '0' ? '20%' : '45%') + ',.85)');
  grd.addColorStop(1, 'hsla(' + hue + ',' + s + ',' + (hue === '0' ? '0%' : '25%') + ',.80)');
  return grd;
}

function randomIntFromInterval(mn, mx) {
  return ~~(Math.random() * (mx - mn + 1) + mn);
}
