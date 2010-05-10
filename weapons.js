var fireRule=function() {
	this.base=new rw.rule(true);
	this.fire=false;
	this.rule=function() {
	};
};

var fireCount=0;
var fire=function(dir) {
	this.base=rw.ent('fire'+fireCount++,'weapons/fire',dir,'png',32,32);
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
		if (rw.rules['fireRule'].fire==false) {
			this.base.hide();
			return false;
		}
	};
	this.hitMap=[['fire',['baldo','shades','blob','sting'],0,0,32,32]];
}


var lasCount=0;
var laser=function(img,move) {
	this.base=rw.ent('laser'+lasCount++,'weapons/laser',img,'png',32,32);
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
	this.hitMap=[['laser',[
		'wall',
		'baldo','shades','blob','sting'
	],11,11,21,21]];
	this.gotHit=function(by) {
		switch (by) {
			case 'blob':
			case 'baldo':
			case 'shades':
            case 'sting':
			case 'wallB':
			case 'wallT':
			case 'wallR':
			case 'wallL':
				this.base.hide();
				return false;
				break;
		};
	};
};

var missleCount=0;
var missle=function(dir,move) {
	this.base=rw.ent('missle'+missleCount++,'weapons/missle',dir+'1','png',32,32);
	this.dir=dir;
	this.move=[move[0]*0.5,move[1]*0.5];
	this.countDown=150;
	var aniCount=5;
	this.ani=1;
	this.update=function() {
		if (this.aniCount>0) {
		   this.aniCount--;
		} else {
			if (this.ani>1) {
				this.base.changeSprite(this.dir+this.ani--);
			} else {
				this.base.changeSprite(this.dir+this.ani++);
			}
			this.aniCount=5;
		}
		if (this.countDown>0) {
			this.countDown--;
			this.base.move(this.move[0],this.move[1]);
			this.base.move(rw.rules['map'].pX,rw.rules['map'].pY);
		} else {
			this.base.hide();
			return false;
		};
	};
	this.hitMap=[['missle',[
		'wall',
		'baldo','shades','blob','sting'
	],8,8,16,16]];
	this.gotHit=function(by) {
		switch (by) {
			case 'baldo':
			case 'blob':
			case 'shades':
            case 'sting':
			case 'wallB':
			case 'wallT':
			case 'wallR':
			case 'wallL':
				this.base.hide();
				return false;
				break;
		}
	}
};
