
import { createSkeleton, randomNum } from "../utils/util";
import { pubsub } from "./Tools";

const { Event, Handler, Tween } = Laya;

let fishes = [];
let shock = [];
let naval;

export default class SwimPool extends Laya.Sprite {

	constructor() {
		super();
		this.init();
	}

	init() {
		pubsub.on("KILL_5", this, (num)=> {
			for (let i=0; i< num; i++) {
				let fish = new Fish();
				fish.speed = 30;
				fish.pos(randomNum(1304, 30),randomNum(730,20));
				this.addChild(fish);
			}
		});
		Laya.stage.on(Event.CLICK, this, (event)=> {
			naval = [event.stageX, event.stageY];
			this.timer.once(1000, this, ()=> naval=null);
		});
	}

}

class Fish extends Laya.Sprite {

	constructor() {
		super();
		this.speed = 1;
		this.init();
	}

	init() {
		let skeleton = this.skeleton = createSkeleton(`res/fish${['5','8'][randomNum(2)]}`);
		skeleton.rotation = 90;
		this.addChild(skeleton);
		skeleton.play(0, true);
		this.rotation = randomNum(360);
		this.swim();
	}

	swim() {
		this.timer.frameLoop(1, this, ()=> {
			let x = this.x;
			let y = this.y;
			if (x<=30) {
				this.rotation  = randomNum(270+30,450-30)%360;
			} else if (x>=1304) {
				this.rotation = randomNum(90+30,270-30);
			} else if (y<=20) {
				this.rotation = randomNum(0+30,180-30);
			} else if (y>=730) {
				this.rotation = randomNum(180+30,360-30);
			}
			if (naval && (Math.abs(this.x-naval[0])<=5||Math.abs(this.y-naval[1])<=5) ) {
				return this.destroy();
			}
			if (this.speed>1) this.speed--;
			this.x +=  this.speed * Math.cos(this.rotation*Math.PI/180);
			this.y += this.speed * Math.sin(this.rotation*Math.PI/180);
		});
	}

}