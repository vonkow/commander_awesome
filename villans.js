// Villan Update Functions

var hideMe=function(me) {
	var hide=false;
	if (me.base.posX1()>640) {
		hide=true;
	} else if (me.base.posX2()<0) {
		hide=true;
	} else if (me.base.posY1()>640) {
		hide=true;
	} else if (me.base.posY2()<0) {
		hide=true;
	};
	if (hide) me.base.hide();
}

var showMe=function(me) {
	if ((me.base.posX1()<640)&&(me.base.posX1()>0)) {
		if ((me.base.posY1()<640)&&(me.base.posY1()>0)) {
			me.base.display(me.base.baseSprite,me.base.posX1(),me.base.posY1(),me.base.posY1());
		} else if ((me.base.posY2()<640)&&(me.base.posY2()>0)) {
			me.base.display(me.base.baseSprite,me.base.posX1(),me.base.posY1(),me.base.posY1());
		}
	} else if ((me.base.posX2()<640)&&(me.base.posX2()>0)) {
		if ((me.base.posY1()<640)&&(me.base.posY1()>0)) {
			me.base.display(me.base.baseSprite,me.base.posX1(),me.base.posY1(),me.base.posY1());
		} else if ((me.base.posY2()<640)&&(me.base.posY2()>0)) {
			me.base.display(me.base.baseSprite,me.base.posX1(),me.base.posY1(),me.base.posY1());
		}
	}
}

var scrollEnt=function(me) {
	me.base.move(rw.rules['map'].pX,rw.rules['map'].pY);
};

var swapAni=function(me, rate) {
	if (me.aniCount>0) {
		me.aniCount--;
	} else {
		me.aniCount=rate;
		(me.ani==1) ? me.ani++ : me.ani--;
	}
};

var followCommander=function(me,speed) {
	// Movement
	switch (me.dir) {
		case 'l':
			if (me.base.posX1()>304) {
				me.base.move(-speed,0);
			} else if (me.base.posY1()>304) {
				me.dir='u';
			} else {
				me.dir='d';
			}
			break;
		case 'r':
			if (me.base.posX1()<304) {
				me.base.move(speed,0);
			} else if (me.base.posY1()>304) {
				me.dir='u';
			} else {
				me.dir='d';
			}
			break;
		case 'd':
			if (me.base.posY1()<304) {
				me.base.move(0,speed);
			} else if (me.base.posX1()<304) {
				me.dir='r';
			} else {
				me.dir='l';
			}
			break;
		case 'u':
			if (me.base.posY1()>304) {
				me.base.move(0,-speed);
			} else if (me.base.posX1()<304) {
				me.dir='r';
			} else {
				me.dir='l';
			}
			break;
	}
};

var shootCommander=function(me,type,speed,decay) {
	if (me.wepCount==0) {
		if (me.dir=='d') {
			if ((me.base.posX2()>288)&&(me.base.posX1()<336)) {
				var wep=[[0,33],[0,speed]];
			};
		} else if (me.dir=='u') {
			if ((me.base.posX2()>288)&&(me.base.posX1()<336)) {
				var wep=[[0,-33],[0,-speed]];
			};
		} else if (me.dir=='l') {
			if ((me.base.posY2()>288)&&(me.base.posY1()<336)) {
				var wep=[[-33,0],[-speed,0]];
			};
		} else if (me.dir=='r') {
			if ((me.base.posY2()>288)&&(me.base.posY1()<336)) {
				var wep=[[33,0],[speed,0]];
			};
		};
		if (wep) {
			me.wepCount=40;
			rw.newEnt(new shot(type,wep[1],decay))
				.base.display(type,me.base.posX1()+wep[0][0],me.base.posY1()+wep[0][1],me.base.posY1()+wep[0][1]).end();
		};
	} else {
		me.wepCount--;
	};
};

var hurtMe=function(me,by) {
	switch (by) {
		case 'laser':
			me.hp--;
			me.hit=true;
			break;
		case 'fire':
			me.hp-=0.2;
			me.hit=true;
			break;
		case 'missle':
			me.hp-=3;
			me.hit=true;
			break;
	};
	if (me.hp<=0) {
		me.base.hide();
		return false;
	};
};

var checkCol=function(me,by) {
	if (by=='wall') {
		me.base.wipeMove();
		if ((me.dir=='d')||(me.dir=='u')) {
			(me.base.posX1()<304) ? me.dir='r' : me.dir='l';
		} else {
			(me.base.posY1()<304) ? me.dir='d' : me.dir='u';
		};
	} else {
		if (me.hit==false) {
			return hurtMe(me,by);
		};
	};
};

var villanHit=function(me,by,at,chance) {
	if (me.alive!=false) {
		me.alive=checkCol(me,by);
		if (me.alive==false) {
			dropRandom(me,chance);
			return false;
		};
	};
	return true;
};

// Villans
var baldoCount=0;
var baldo=function(dir) {
	this.base=new rw.ent('baldo'+baldoCount++,'villans/baldo',dir+'1','png',32,32);
	this.dir=dir;
	this.aniCount=10;
	this.ani=1;
	this.hp=5;
	this.wepCount=0;
	this.hit=false;
	this.update=function() {
		this.hit=false;
		if ((this.base.posX2()<560)&&(this.base.posX1()>80)) {
			if ((this.base.posY2()<560)&&(this.base.posY1()>80)) {
				followCommander(this,0.5);
				shootCommander(this,'shot',2.5,50);
				swapAni(this, 10);
			};
		};
		scrollEnt(this);
		this.base.changeSprite(this.dir+this.ani);
		hideMe(this);
	};
	this.inactive=function() {
		scrollEnt(this);
		showMe(this);
	};
	this.hitMap=[['baldo',[
		'wall','com',
		'laser','fire','missle'
	],1,1,31,31]];
	this.gotHit=function(by,at) {
		if (villanHit(this,by,at,0.5)==false) {
			return false;
		};
	}
}

var shadesCount=0;
var shades=function(dir) {
	this.base=new rw.ent('shades'+shadesCount++,'villans/shades',dir+'1','png',32,32);
	this.dir=dir;
	this.ani=1;
	this.aniCount=10;
	this.hp=3;
	this.hit=false;
	this.alive=true;
	this.update=function(){
		this.hit=false;
		if ((this.base.posX2()<560)&&(this.base.posX1()>80)) {
			if ((this.base.posY2()<560)&&(this.base.posY1()>80)) {
				followCommander(this,0.5);
				swapAni(this, 10);
			};
		};
		scrollEnt(this);
		this.base.changeSprite(this.dir+this.ani);
		hideMe(this);
	};
	this.inactive=function() {
		scrollEnt(this);
		showMe(this);
	};
	this.hitMap=[['shades',[
		'wall','com',
		'laser','fire','missle'
	],1,1,31,31]];
	this.gotHit=function(by,at) {
		if  (villanHit(this,by,at,0.5)==false) {
			return false;
		};
	};
}

var blobCount=0;
var blob=function(dir) {
	this.base=new rw.ent('blob'+blobCount++,'villans/blob',dir+'1','png',32,32);
	this.dir=dir;
	this.counter=0;
	this.ani=1;
	this.aniCount=5;
	this.hit=false;
	this.hp=3;
	this.isAlive=true;
	this.update=function() {
		this.hit=false;
		if (this.counter<100) {
			this.counter++;
		} else {
			this.counter=0;
			(this.dir=='l') ? this.dir='r' : this.dir='l';
		};
		swapAni(this, 5);
		this.base.changeSprite(this.dir+this.ani);
		(this.dir=='r') ? this.base.move(1,0) : this.base.move(-1,0);
		scrollEnt(this);
		hideMe(this);
	};
	this.inactive=function() {
		scrollEnt(this);
		showMe(this);
	}
	this.hitMap=[['blob',[
		'wall','com',
		'laser','fire','missle'
	],1,6,31,26]];
	this.gotHit=function(by) {
		if (this.isAlive!=false) {
			this.isAlive=hurtMe(this,by);
			if (this.isAlive==false) {
				gameStats.score++;
				dropRandom(this,0.5);
				return false;
			};
		};
	};
};

var shotCount=0;
var shot=function(img,move,countDown) {
	this.base=new rw.ent('shot'+shotCount++,'weapons/shot',img,'png',32,32);
	this.move=move;
	this.countDown = countDown;
	this.update=function() {
		if (this.countDown>0) {
			this.countDown--;
			this.base.move(this.move[0],this.move[1]);
			scrollEnt(this);
		} else {
			this.base.hide();
			return false;
		};
	};
	this.hitMap=[['shot',['wall','com'],11,11,21,21]];
	this.gotHit=function(by) {
		if ((by=='com')||(by=='wall')) {
			this.base.hide();
			return false;
		};
	};
};

var stingCount=0;
var sting=function(dir) {
	this.base=new rw.ent('sting'+stingCount++,'villans/sting',dir+'1','png',32,32);
	this.dir=dir;
	this.ani=1;
	this.aniCount=10;
	this.hp=5;
	this.hit=false;
	this.alive=true;
	this.update=function(){
		this.hit=false;
		if ((this.base.posX2()<560)&&(this.base.posX1()>80)) {
			if ((this.base.posY2()<560)&&(this.base.posY1()>80)) {
				followCommander(this,1);
				swapAni(this,10);
			};
		};
		scrollEnt(this);
		this.base.changeSprite(this.dir+this.ani);
		hideMe(this);
	};
	this.inactive=function() {
		scrollEnt(this);
		showMe(this);
	};
	this.hitMap=[['sting',[
		'wall','com',
		'laser','fire','missle'
	],1,1,31,31]];
	this.gotHit=function(by,at) {
		if  (villanHit(this,by,at,0.5)==false) {
			return false;
		};
	};
};
