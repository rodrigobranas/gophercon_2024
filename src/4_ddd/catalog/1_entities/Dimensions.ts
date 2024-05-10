export default class Dimensions {

	constructor (readonly width: number, readonly height: number, readonly length: number, readonly weight: number) {
	}

	getVolume () {
		return (this.width/100) * (this.height/100) * (this.length/100);
		
	}

	getDensity () {
		return this.weight/this.getVolume();
	}
}
