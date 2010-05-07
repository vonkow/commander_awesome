var lagTimer = function() {
	this.base = new rw.ent('lag', '','','',150,20);
	this.update = function() {
		this.base.detach();
		this.base.attach(document.createTextNode('Lag: '+rw.getLag()+'(ms)'));
	}
}

var statBar=function() {
	this.base=new rw.ent('statbar','bar','bar','png',640,64);
	this.update=function(){};
}

var statNumCount=0;
var statNum=function(stat,pos) {
	this.base=new rw.ent('statNum'+statNumCount++,'font','0','png',32,32);
	this.stat=stat;
	this.pos=pos;
	this.update=function() {
		this.base.changeSprite(rw.rules['statRule'][this.stat][this.pos]);
	}
}

var statRule=function() {
	this.base=new rw.rule(true);
	this.hp='000';
	this.las='000';
	this.fire='000';
	this.mis='00';
	this.loot='0000';
	this.rule=function() {
		var hpA=gameStats.hp.toString();
		if (gameStats.hp<0) hpA='0';
		if (hpA.length==1) {
			this.hp='00'+hpA;
		} else if (hpA.length==2) {
			this.hp='0'+hpA;
		} else {
			this.hp=hpA;
		}
		var lootA=gameStats.loot.toString();
		if (lootA.length==1) {
			this.loot='000'+lootA;
		} else if (lootA.length==2) {
			this.loot='00'+lootA;
		} else if (lootA.length==3) {
			this.loot='0'+lootA;
		} else {
			this.loot=lootA;
		}
		var lA=gameStats.weps.las[1].toString();
		if (lA.length==1) {
			this.las='00'+lA;
		} else if (lA.length==2) {
			this.las='0'+lA;
		} else {
			this.las=lA;
		}
		var fA=gameStats.weps.fire[1].toString();
		if (fA.length==1) {
			this.fire='00'+fA;
		} else if (fA.length==2) {
			this.fire='0'+fA;
		} else {
			this.fire=fA;
		}
		var mA=gameStats.weps.mis[1].toString();
		if (mA.length==1) {
			this.mis='0'+mA;
		} else {
			this.mis=mA;
		}
	}
}

var makeStatBar=function() {
	rw.newEnt(new function() {
		this.base=new rw.ent('statbar','','','',640,25);
		this.markUp=function() {
			var div=document.createElement('div');
			div.style.width='100%';
			div.style.height='100%';
			div.style.backgroundColor='white';
			div.appendChild(document.createTextNode('Hp: '+gameStats.hp+' Laser: '+gameStats.weps.las[1]+' Fire: '+gameStats.weps.fire[1]+' Missles: '+gameStats.weps.mis[1]+' Loot: '+gameStats.loot));
			return div;
		};
		this.update=function() {
			this.base.detach().attach(this.markUp());
		}
	}).base.display('',0,615).end();
}

/*
var makeStatBar=function() {
	rw.newEnt(new statBar()).base.display('bar',0,576,640).end()
	.newEnt(new statNum('hp',0)).base.display('0',32,608,641).end()
	.newEnt(new statNum('hp',1)).base.display('0',64,608,641).end()
	.newEnt(new statNum('hp',2)).base.display('0',96,608,641).end()
	.newEnt(new statNum('las',0)).base.display('0',160,608,641).end()
	.newEnt(new statNum('las',1)).base.display('0',192,608,641).end()
	.newEnt(new statNum('las',2)).base.display('0',224,608,641).end()
	.newEnt(new statNum('fire',0)).base.display('0',288,608,641).end()
	.newEnt(new statNum('fire',1)).base.display('0',320,608,641).end()
	.newEnt(new statNum('fire',2)).base.display('0',352,608,641).end()
	.newEnt(new statNum('mis',0)).base.display('0',416,608,641).end()
	.newEnt(new statNum('mis',1)).base.display('0',448,608,641).end()
	.newEnt(new statNum('loot',0)).base.display('0',512,608,641).end()
	.newEnt(new statNum('loot',1)).base.display('0',544,608,641).end()
	.newEnt(new statNum('loot',2)).base.display('0',576,608,641).end()
	.newEnt(new statNum('loot',3)).base.display('0',608,608,641).end()
}
*/

