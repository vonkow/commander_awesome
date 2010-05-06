var gameStats=new function() {
	this.loot=0;
	this.hp=100;
	this.lives=3;
	this.score=0;
	this.weps = {
		las: [true,20],
		fire: [true,100],
		mis: [true,5]
	}
}

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
		for (map in rw.maps) {
			rw.maps[map].move(this.pX,this.pY);
		}
		//rw.maps['grass'].move(this.pX,this.pY);
		this.gX+=this.pX;
		this.gY+=this.pY;
		this.tX=0;
		this.tY=0;
	};
};

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
	.using('weapons/missle','png',[
		'd1','u1','l1','r1','dl1','dr1','ul1','ur1',
		'd2','u2','l2','r2','dl2','dr2','ul2','ur2'
	])
	.using('items/loot','png',['loot','redGem','blueGem','goldGem'])
	.using('villans/blob','png',['l1','l2','r1','r2'])
	.using('villans/baldo','png',['u1','u2','d1','d2','l1','l2','r1','r2'])
	.using('villans/shades','png',['u1','u2','d1','d2','l1','l2','r1','r2'])
	.setFPS(60)
	.newEnt(new lagTimer()).base.display('blank',0,0,0).end()
	.func(world2())
	.start();
};
