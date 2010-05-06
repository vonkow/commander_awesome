var world2=function() {
	rw.newRule('map', new mapScroll())
	.newRule('fireRule', new fireRule())
	.newRule('statRule',new statRule())
	.newRule('enterStore', new enterStore())
	.newMap('01-00','01-01-00','png',640,640).moveTo(304,-336).display().end()
	.newMap('01-01','01-01-01','png',640,640).moveTo(304,304).display().end()
	.newMap('02-01','01-02-01','png',640,640).moveTo(944,304).display().end()
	.func(makeStatBar())
	.newEnt(new wall(96,32)).base.display('',400,304).end()
	.newEnt(new wall(196,32)).base.display('',304,368).end()
	.newEnt(new commander())
		.base.display('d1l',304,304,304).end()
}
