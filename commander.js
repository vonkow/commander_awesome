var commander = function() {
	this.base = new rw.ent('commander', 'commander', 'd1l', 'png', 32, 32);
	this.stats = {
		walk:1
	};
	this.dir = 'd';
	this.ani = 1;
	this.wep = 'l';
	this.count = 10;
	this.lasTimer=0;
	this.misTimer=0;
	this.swapTimer=0;
	this.move=false;
	this.beenHit=false;
	this.hit=false;
	this.update = function() {
		this.move=false;
		this.beenHit=false;
		// Movement
		if (rw.key('ua')) {
			rw.rules['map'].pos(0,this.stats.walk);
			this.move=true;
		} else if (rw.key('da')) {
			rw.rules['map'].pos(0,-this.stats.walk);
			this.move=true;
		}
		if (rw.key('la')) {
			rw.rules['map'].pos(this.stats.walk,0);
			this.move=true;
		} else if (rw.key('ra')) {
			rw.rules['map'].pos(-this.stats.walk,0);
			this.move=true;
		} 
		// Weapon Swapping
		if (this.swapTimer>0) this.swapTimer--;
		if(rw.key('s')) {
			if (this.swapTimer==0) {
				this.swapTimer=20;
				switch (this.wep) {
					case 'l':
						if (gameStats.weps.fire[0]) {
							this.wep='f';
						} else if (gameStats.weps.mis[0]) {
							this.wep='m';
						};
						break;
					case 'f':
						if (gameStats.weps.mis[0]) {
							this.wep='m';
						} else {
							this.wep='l';
						};
						rw.rules['fireRule'].fire=false;
						break;
					case 'm':
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
				var las=['dlur',[-5,5],-21,21];
			} else if (this.dir=='dr') {
				var las=['uldr',[5,5],21,21];
			} else if (this.dir=='ul') {
				var las=['uldr',[-5,-5],-21,-21];
			} else if (this.dir=='ur') {
				var las=['dlur',[5,-5],21,-21];
			}
			if (this.wep=='l') {
				if ((gameStats.weps.las[0])&&(gameStats.weps.las[1]>0)) {
					if (this.lasTimer<1) {
						this.lasTimer=10;
						gameStats.weps.las[1]--;
						rw.newEnt(new laser(las[0],las[1]))
							.base.display(las[0],this.base.posX1()+las[2],this.base.posY1()+las[3],this.base.posY1()+las[3]);
					};
				};
			} else if (this.wep=='f') {
				if ((gameStats.weps.fire[0])&&(gameStats.weps.fire[1]>0)) {
					gameStats.weps.fire[1]--;
					if (rw.rules['fireRule'].fire==false) {
						rw.rules['fireRule'].fire=true;
						rw.newEnt(new fire(this.dir))
							.base.display(this.dir,this.base.posX1()+las[2],this.base.posY1()+las[3],this.base.posY1()+las[3]);
					};
				} else {
					rw.rules['fireRule'].fire=false;
				};
			} else if (this.wep=='m') {
				if ((gameStats.weps.mis[0])&&(gameStats.weps.mis[1]>0)) {
					if (this.misTimer<1) {
						this.misTimer=25;
						gameStats.weps.mis[1]--;
						rw.newEnt(new missle(this.dir,las[1]))
							.base.display(this.dir,this.base.posX1()+las[2],this.base.posY1()+las[3],this.base.posY1()+las[3]);
					};
				};
			};
		} else {
			rw.rules['fireRule'].fire=false;
		};
		if (this.move) {
			if (this.count>0) {
				this.count--;
			} else {
				this.count=10;
				(this.ani==1) ? this.ani=2 : this.ani=1;
			};
		};
		this.lasTimer--;
		this.misTimer--;
		this.hit--;
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
		['com',[
			'baldo','shades','blob','sting',
			'shot',
			'store','loot'
		],1,1,31,31],
		['comT',['wallB'],1,1,31,2],
		['comB',['wallT'],1,30,31,31],
		['comL',['wallR'],1,1,2,31],
		['comR',['wallL'],30,1,31,31]
	];
	this.gotHit = function(by,at) {
		if ((at=='comT')&&(by=='wallB')) {
			rw.rules['map'].pos(0,-1);
		} else if ((at=='comB')&&(by=='wallT')) {
			rw.rules['map'].pos(0,1);
		} else if ((at=='comL')&&(by=='wallR')) {
			rw.rules['map'].pos(-1,0);
		} else if ((at=='comR')&&(by=='wallL')) {
			rw.rules['map'].pos(1,0);
		} else {
			if (this.hit<1) {
				switch(by){
					case 'shot':
						gameStats.hp-=10;
						this.hit=30;
						break;
					case 'blob':
					case 'baldo':
					case 'shades':
						gameStats.hp-=10;
						this.hit=30;
						break;
					case 'sting':
						gameStats.hp-=20;
						this.hit=30;
						break;
				};
				if (gameStats.hp<=0) {
					this.base.hide();
					return false;
				};
			};
		};
	};
};

