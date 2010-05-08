var enterStore=function() {
	this.base=new rw.rule(true);
	this.instore=false;
	this.atEnd=function() {
		rw.saveState('main').wipeAll();
		makeStore();
	};
	this.rule=function() {
		if (this.instore) {
			this.instore=false;
			rw.atEnd(this.atEnd);
		};
	};
};

var tryBuy=function(item) {
	switch (item) {
		case 'las':
			if ((gameStats.weps.las[1]<990)&&(gameStats.loot>=100)) {
				gameStats.loot-=100;
				gameStats.weps.las[1]+=10;
			};
			break;
		case 'fire':
			if ((gameStats.weps.fire[1]<950)&&(gameStats.loot>=50)) {
				gameStats.loot-=50;
				gameStats.weps.fire[1]+=50;
			};
			break;
		case 'mis':
			if ((gameStats.weps.mis[1]<95)&&(gameStats.loot>=200)) {
				gameStats.loot-=200;
				gameStats.weps.mis[1]+=5;
			};
			break;
		case 'health':
			if ((gameStats.hp<91)&&(gameStats.loot>=100)) {
				gameStats.loot-=100;
				gameStats.hp+=10;
			};
			break;
	};
};

var storeIn=function() {
	this.base=new rw.ent('storeIn','store','inside','png',640,640);
	this.update=function() {
	};
};

var storeArrow=function() {
	this.base=new rw.ent('storeArrow','font','raro','png',32,32);
	this.pos=0;
	this.keyDelay=0;
	this.update=function() {
		if (this.keyDelay==0) {
			if (rw.key('z')) {
				if (this.pos==0) {
					tryBuy('las');
				} else if (this.pos==1) {
					tryBuy('fire');
				} else if (this.pos==2) {
					tryBuy('mis');
				} else if (this.pos==3) {
					tryBuy('health');
				};
				this.keyDelay=10;
			} else if (rw.key('x')) {
				rw.rules['storeRule'].leaving=true;
			} else if (rw.key('da')) {
				if (this.pos<3) {
					this.pos++;
					this.keyDelay=10;
					this.base.moveTo(96,192+(this.pos*64));
				};
			} else if (rw.key('ua')) {
				if (this.pos>0) {
					this.pos--;
					this.keyDelay=10;
					this.base.moveTo(96,192+(this.pos*64));
				};
			};
		} else {
			this.keyDelay--;
		};
	};
};

var storeQtyCount=0;
var storeQty=function(type,ord) {
	this.base=new rw.ent('storeQty'+storeQtyCount++,'font','0','png',32,32);
	this.type=type;
	this.ord=ord;
	this.update=function() {
		this.base.changeSprite(rw.rules['storeRule'][this.type+'Am'][this.ord]);
	};
};

var storeRule=function() {
	this.base=new rw.rule(true);
	this.leaving=false;
	this.lootAm='0000';
	this.lasAm='000';
	this.fireAm='000';
	this.misAm='000';
	this.hpAm='000';
	this.loot=gameStats.loot;
	this.rule=function() {
		var lootA = gameStats.loot.toString();
		if (lootA.length==1) {
			this.lootAm='000'+lootA;
		} else if (lootA.length==2) {
			this.lootAm='00'+lootA;
		} else if (lootA.length==3) {
			this.lootAm='0'+lootA;
		} else {
			this.lootAm=lootA;
		};
		var lA = gameStats.weps.las[1].toString();
		if (lA.length==1) {
			this.lasAm='00'+lA;
		} else if (lA.length==2) {
			this.lasAm='0'+lA;
		} else {
			this.lasAm=lA;
		};
		var fA = gameStats.weps.fire[1].toString();
		if (fA.length==1) {
			this.fireAm='00'+fA;
		} else if (fA.length==2) {
			this.fireAm='0'+fA;
		} else {
			this.fireAm=fA;
		};
		var mA = gameStats.weps.mis[1].toString();
		if (mA.length==1) {
			this.misAm='0'+mA;
		} else {
			this.misAm=mA;
		};
		var hA = gameStats.hp.toString();
		if (hA.length==1) {
			this.hpAm='00'+hA;
		} else if (hA.length==2) {
			this.hpAm='0'+hA;
		} else {
			this.hpAm=hA;
		};
		if (this.leaving) {
			rw.wipeAll().loadState('main');
		};
	};
};

var makeStore=function() {
	rw.newRule('storeRule',new storeRule())
	.newEnt(new storeIn()).base.display('inside',0,0,0).end()
	.newEnt(new storeArrow()).base.display('raro',96,192,192).end()
	.newEnt(new storeQty('las','0')).base.display('0',256,192,192).end()
	.newEnt(new storeQty('las','1')).base.display('0',288,192,192).end()
	.newEnt(new storeQty('las','2')).base.display('0',320,192,192).end()
	.newEnt(new storeQty('fire','0')).base.display('0',256,256,256).end()
	.newEnt(new storeQty('fire','1')).base.display('0',288,256,256).end()
	.newEnt(new storeQty('fire','2')).base.display('0',320,256,256).end()
	.newEnt(new storeQty('mis','0')).base.display('0',288,320,320).end()
	.newEnt(new storeQty('mis','1')).base.display('0',320,320,320).end()
	.newEnt(new storeQty('hp','0')).base.display('0',256,384,384).end()
	.newEnt(new storeQty('hp','1')).base.display('0',288,384,384).end()
	.newEnt(new storeQty('hp','2')).base.display('0',320,384,384).end()
	.newEnt(new storeQty('loot','0')).base.display('0',256,544,544).end()
	.newEnt(new storeQty('loot','1')).base.display('0',288,544,544).end()
	.newEnt(new storeQty('loot','2')).base.display('0',320,544,544).end()
	.newEnt(new storeQty('loot','3')).base.display('0',352,544,544).end()
};

