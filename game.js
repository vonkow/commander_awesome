var lagTimer = function() {
	this.base = new rw.ent('lag', '','','',150,20);
	this.update = function() {
		this.base.detach();
		this.base.attach(document.createTextNode('Lag: '+rw.getLag()+'(ms)'));
	}
}

var gameStats=new function() {
	this.loot=0;
	this.lives=3;
	this.score=0;
	this.weapons = {
		laser: [true],
		fire: [false]
	}
}

var commander = function() {
	this.base = new rw.ent('commander', 'commander', 'd1l', 'png', 32, 32);
	this.stats = {
		walk:1,
		run:1.5,
	};
	this.dir = 'd';
	this.ani = 1;
	this.wep = 'l';
	this.count = 10;
	this.lasTimer=0;
	this.swapTimer=0;
	this.move=false;
	this.update = function() {
		this.move=false;
		// Movement
		if (rw.key('ua')) {
			(rw.key('ctr')) ? rw.rules['map'].pos(0,this.stats.run) : rw.rules['map'].pos(0,this.stats.walk);
			this.move=true;
		} else if (rw.key('da')) {
			(rw.key('ctr')) ? rw.rules['map'].pos(0,-this.stats.run) : rw.rules['map'].pos(0,-this.stats.walk);
			this.move=true;
		}
		if (rw.key('la')) {
			(rw.key('ctr')) ? rw.rules['map'].pos(this.stats.run,0) : rw.rules['map'].pos(this.stats.walk,0);
			this.move=true;
		} else if (rw.key('ra')) {
			(rw.key('ctr')) ? rw.rules['map'].pos(-this.stats.run,0) : rw.rules['map'].pos(-this.stats.walk,0);
			this.move=true;
		} 
		// Weapon Swapping
		if (this.swapTimer>0) this.swapTimer--;
		if(rw.key('s')) {
			if (this.swapTimer==0) {
				this.swapTimer=20;
				switch (this.wep) {
					case 'l':
						this.wep='f';
						break;
					case 'f':
						this.wep='m';
						break;
					case 'm':
						this.wep='g';
						break;
					case 'g':
						this.wep='l';
						break;
				}
			}
		}
		// Weapon Fire
		if (rw.key('z')) {
			if (this.dir=='d') {
				var las=['v',[0,5],0,32];
			} else if (this.dir=='u') {
				var las=['v',[0,-5],0,-32];
			} else if (this.dir=='l') {
				var las=['h',[-5,0],-32,0];
			} else if (this.dir=='r') {
				var las=['h',[5,0],32,0];
			} else if (this.dir=='dl') {
				var las=['dlur',[-5,5],-20.6862915,20.6862915];
			} else if (this.dir=='dr') {
				var las=['uldr',[5,5],20.6862915,20.6862915];
			} else if (this.dir=='ul') {
				var las=['uldr',[-5,-5],-20.6862915,-20.6862915];
			} else if (this.dir=='ur') {
				var las=['dlur',[5,-5],20.6862915,-20.6862915];
			}
			if (this.wep=='l') {
				if (this.lasTimer==0) {
					this.lasTimer=10;
					rw.newEnt(new laser(las[0],las[1]))
						.base.display(las[0],this.base.posX1()+las[2],this.base.posY1()+las[3],this.base.posY1()+las[3]);
				} else {
					this.lasTimer--;
				};
			} else if (this.wep=='f') {
				if (rw.rules['stat'].fire==false) {
					rw.rules['stat'].fire=true;
					rw.newEnt(new fire(this.dir))
						.base.display(this.dir,this.base.posX1()+las[2],this.base.posY1()+las[3],this.base.posY1()+las[3]);
				} else {
				}
			}
		} else {
			rw.rules['stat'].fire=false;
		};
		if (this.move) {
			if (this.count>0) {
				this.count--;
			} else {
				this.count=10;
				(this.ani==1) ? this.ani=2 : this.ani=1;
			};
		};
		this.base.changeSprite(this.dir+this.ani+this.wep);
	};
	this.keyChange= function() {
		rw.key('la') ? 
		rw.key('da') ? this.dir='dl' : 
		rw.key('ua') ? this.dir='ul' : 
		this.dir='l' :
		rw.key('ra') ?
		rw.key('da') ? this.dir='dr' : 
		rw.key('ua') ? this.dir='ur' : 
		this.dir='r' :
		rw.key('da') ? this.dir='d' : 
		rw.key('ua') ? this.dir='u' : this.dir=this.dir;
	};
	this.hitMap = [
		['commander',1,1,31,31],
		['comT',0,0,32,1],
		['comB',0,31,32,32],
		['comL',0,0,1,32],
		['comR',31,0,32,32]
	];
	this.gotHit = function(by,at) {
		if (by=='blob') {
			this.base.hide();
			return false;
		}
		if ((at=='comT')&&(by=='wallB')) {
			rw.rules['map'].pos(0,-1);
		} else if ((at=='comB')&&(by=='wallT')) {
			rw.rules['map'].pos(0,1);
		} else if ((at=='comL')&&(by=='wallR')) {
			rw.rules['map'].pos(-1,0);
		} else if ((at=='comR')&&(by=='wallL')) {
			rw.rules['map'].pos(1,0);
		}
	};
};

var fireCount=0;
var fire=function(dir) {
	this.base=new rw.ent('fire'+fireCount++,'weapons/fire',dir,'png',32,32);
	this.update=function() {
		if (rw.key('da')) {
			if (rw.key('la')) {
				this.base.changeSprite('dl');
				this.base.moveTo(283.313709,324.686291);
			} else if (rw.key('ra')) {
				this.base.changeSprite('dr');
				this.base.moveTo(324.686291,324.686291);
			} else {
				this.base.changeSprite('d');
				this.base.moveTo(304,336);
			}
		} else if (rw.key('ua')) {
			if (rw.key('la')) {
				this.base.changeSprite('ul');
				this.base.moveTo(283.313709,283.313709);
			} else if (rw.key('ra')) {
				this.base.changeSprite('ur');
				this.base.moveTo(324.686291,283.313709);
			} else {
				this.base.changeSprite('u');
				this.base.moveTo(304,272);
			}
		} else if (rw.key('la')) {
			this.base.changeSprite('l');
			this.base.moveTo(272,304);
		} else if (rw.key('ra')) {
			this.base.changeSprite('r');
			this.base.moveTo(336,304);
		}
		if (rw.rules['stat'].fire==false) {
			this.base.hide();
			return false;
		}
		this.hitMap=[['fire',0,0,32,32]];
	}
}

var lasCount=0;
var laser=function(img,move) {
	this.base=new rw.ent('laser'+lasCount++,'weapons/laser',img,'png',32,32);
	this.move=move;
	this.countDown = 50;
	this.update=function() {
		if (this.countDown>0) {
			this.countDown--;
			this.base.move(this.move[0],this.move[1]);
			this.base.move(rw.rules['map'].pX,rw.rules['map'].pY);
		} else {
			this.base.hide();
			return false;
		};
	};
	this.hitMap=[['laser',11,11,21,21]];
	this.gotHit=function(by) {
		if ((by=='blob')||(by=='baldo')||(by=='wallT')||(by=='wallB')||(by=='wallL')||(by=='wallR')) {
			this.base.hide();
			return false;
		}
	};
};

var wallCount=0;
var wall=function(x,y) {
	this.base=new rw.ent('wall'+wallCount++,'','','',x,y);
	this.update=function(){
		this.base.move(rw.rules['map'].pX,rw.rules['map'].pY);
	};
	this.hitMap=[
		['wallT',1,0,x-1,1,x/2,y/2],
		['wallB',1,y-1,x-1,y,x/2,y/2],
		['wallL',0,1,1,y-1,x/2,y/2],
		['wallR',x-1,1,x,y-1,x/2,y/2]
	];
}

var baldoCount=0;
var baldo=function(dir) {
	this.base=new rw.ent('baldo'+baldoCount++,'villans/baldo',dir+'1','png',32,32);
	this.dir=dir;
	this.aniCount=10;
	this.ani=1;
	this.update=function() {
		if (this.aniCount>0) {
			this.aniCount--;
		} else {
			this.aniCount=10;
			(this.ani==1) ? this.ani++ : this.ani--;
			this.base.changeSprite(this.dir+this.ani);
		}
		this.base.move(rw.rules['map'].pX,rw.rules['map'].pY);
	}
	this.hitMap=[['baldo',0,0,32,32]];
	this.gotHit=function(by) {
		if ((by=='laser')||(by=='fire')) {
			this.base.hide();
			return false;
		}
	}
}

var blobCount=0;
var blob=function(dir) {
	this.base=new rw.ent('blob'+blobCount++,'villans/blob',dir+'1','png',32,32);
	this.dir=dir;
	this.counter=0;
	this.ani=1;
	this.aniCount=0;
	this.update=function() {
		if (this.counter<100) {
			this.counter++;
		} else {
			this.counter=0;
			(this.dir=='l') ? this.dir='r' : this.dir='l';
			this.base.changeSprite(this.dir+this.ani);
		};
		if (this.aniCount<5) {
			this.aniCount++;
		} else {
			this.aniCount=0;
			(this.ani==1) ? this.ani=2 : this.ani=1;
			this.base.changeSprite(this.dir+this.ani);
		};
		(this.dir=='r') ? this.base.move(1,0) : this.base.move(-1,0);
		this.base.move(rw.rules['map'].pX,rw.rules['map'].pY);
	};
	this.hitMap=[['blob',0,6,31,26]];
	this.gotHit=function(by) {
		if ((by=='laser')||(by=='fire')) {
			gameStats.score++;
			rw.newEnt(new loot())
				.base.display('loot',this.base.posX1(),this.base.posY1(),this.base.posY1());
			this.base.hide();
			return false;
		};
	};
};

var lootCounter=0;
var loot=function() {
	this.base=new rw.ent('loot'+lootCounter++,'items/loot','loot','png',32,32);
	this.counter=0;
	this.update=function() {
		if (this.counter<200) {
			this.counter++;
		} else {
			this.base.hide();
			return false;
		};
		this.base.move(rw.rules['map'].pX,rw.rules['map'].pY);
	};
	this.hitMap=[['loot',8,8,16,16]];
	this.gotHit=function(by) {
		if (by=='commander') {
			gameStats.loot+=100;
			this.base.hide();
			return false;
		}
	};
};

var mapScroll=function() {
	this.base=new rw.rule(true);
	this.tX=0;
	this.tY=0;
	this.pX=0;
	this.pY=0;
	this.gX=0;
	this.gY=0;
	this.wipeX=function() {
		this.tX=0;
	}
	this.wipeY=function() {
		this.tY=0;
	}
	this.pos=function(x,y) {
		this.tX+=x;
		this.tY+=y;
	}
	this.rule=function() {
		this.pX=this.tX;
		this.pY=this.tY;
		rw.maps['grass'].move(this.pX,this.pY);
		this.gX+=this.pX;
		this.gY+=this.pY;
		this.tX=0;
		this.tY=0;
	};
};

var stat=function() {
	this.base=new rw.rule(true);
	this.fire=false;
	this.rule=function() {
	};
};

var world1=function() {
	rw.newMap('grass','grass','png',640,640).display().end()
	.newRule('map', new mapScroll())
	.newRule('stat', new stat())
	.newEnt(new commander())
		.base.display('d1l',304,304,304).end()
	.newEnt(new blob('r'))
		.base.display('r1',100,100,100).end()
	.newEnt(new blob('l'))
		.base.display('l1',500,100,100).end()
	.newEnt(new blob('r'))
		.base.display('r1',100,500,500).end()
	.newEnt(new blob('l'))
		.base.display('l1',500,500,500).end()
	.newEnt(new wall(64,64))
		.base.display('',384,384,384).end()
	.newEnt(new wall(64,64))
		.base.display('',448,320,320).end()
	.newEnt(new baldo('l'))
		.base.display('l1',150,150,150).end()
}

var startGame=function() {
	rw.init(640,640)
	.using('maps','png',['grass'])
	.using('commander','png',[
		'd1l','d2l','u1l','u2l','l1l','l2l','r1l','r2l',
		'dl1l','dl2l','ul1l','ul2l','dr1l','dr2l','ur1l','ur2l',
		'd1f','d2f','u1f','u2f','l1f','l2f','r1f','r2f',
		'dl1f','dl2f','ul1f','ul2f','dr1f','dr2f','ur1f','ur2f',
		'd1m','d2m','u1m','u2m','l1m','l2m','r1m','r2m',
		'dl1m','dl2m','ul1m','ul2m','dr1m','dr2m','ur1m','ur2m',
		'd1g','d2g','u1g','u2g','l1g','l2g','r1g','r2g',
		'dl1g','dl2g','ul1g','ul2g','dr1g','dr2g','ur1g','ur2g'
	])
	.using('weapons/laser','png',['v','h','dlur','uldr'])
	.using('weapons/fire','png',['d','u','l','r','dl','dr','ul','ur'])
	.using('items/loot','png',['loot','redGem','blueGem','goldGem'])
	.using('villans/blob','png',['l1','l2','r1','r2'])
	.using('villans/baldo','png',['u1','u2','d1','d2','l1','l2','r1','r2'])
	.setFPS(40)
	.newEnt(new lagTimer()).base.display('blank',0,0,0).end()
	.newMap('grass','grass','png',640,640).display().end()
	.func(world1())
	.start();
};
