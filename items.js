var wallCount=0;
var wall=function(x,y) {
	this.base=new rw.ent('wall'+wallCount++,'','','',x,y);
	this.update=function(){
		scrollEnt(this);
		hideMe(this);
	};
	this.inactive=function() {
		scrollEnt(this);
		showMe(this);
	};
	this.hitMap=[
		['wallT',1,0,x-1,1,x/2,y/2],
		['wallB',1,y-1,x-1,y,x/2,y/2],
		['wallL',0,1,1,y-1,x/2,y/2],
		['wallR',x-1,1,x,y-1,x/2,y/2]
	];
}

var dropRandom=function(me,chance) {
	if (Math.random()<=chance) {
		if (Math.random()>0.25) {
			rw.newEnt(new loot('loot'))
				.base.display('loot',me.base.posX1(),me.base.posY1(),me.base.posY1());
		} else {
			rw.newEnt(new loot('redGem'))
				.base.display('redGem',me.base.posX1(),me.base.posY1(),me.base.posY1());
		};
	};
};

// Loot
var lootCounter=0;
var loot=function(type) {
	switch (type) {
		case 'loot':
			var lootType='loot';
			var value=100;
			break;
		case 'redGem':
			var lootType='redGem';
			var value=250;
			break;
	};
	this.base=new rw.ent('loot'+lootCounter++,'items/loot',lootType,'png',32,32);
	this.counter=0;
	this.loot=value;
	this.update=function() {
		if (this.counter<200) {
			this.counter++;
		} else {
			this.base.hide();
			return false;
		};
		scrollEnt(this);
		hideMe(this);
	};
	this.inactive=function() {
		scrollEnt(this);
		showMe(this);
	}
	this.hitMap=[['loot',8,8,16,16]];
	this.gotHit=function(by) {
		if (by.slice(0,by.length-1)=='com') {
			gameStats.loot+=this.loot;
			this.loot=0;
			this.base.hide();
			return false;
		};
	};
};

var storeCounter=0;
var store=function() {
	this.base=new rw.ent('store'+storeCounter++,'store','d','png',32,32);
	this.update=function() {
		scrollEnt(this);
		hideMe(this);
	};
	this.inactive=function() {
		scrollEnt(this);
		showMe(this);
	};
	this.hitMap=[['store',-32,-32,64,64]];
	this.gotHit=function(by) {
		if ((by.slice(0,by.length-1)=='com')&&(rw.key('a'))) {
			rw.rules['enterStore'].instore=true;
		};
	};
};

