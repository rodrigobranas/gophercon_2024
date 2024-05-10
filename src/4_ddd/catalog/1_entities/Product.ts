import Dimensions from "./Dimensions";

export class Product {
	dimensions: Dimensions;

	constructor (readonly productId: number, readonly description: string, readonly price: number, width: number, height: number, length: number, weight: number) {
		this.dimensions = new Dimensions(width, height, length, weight);
	}

	getWidth () {
		return this.dimensions.width;
	}

	getHeight () {
		return this.dimensions.height;
	}

	getLength () {
		return this.dimensions.length;
	}

	getWeight () {
		return this.dimensions.weight;
	}

	getVolume () {
		return this.dimensions.getVolume();
	}

	getDensity () {
		return this.dimensions.getDensity();
	}
}
