export class Item {

	constructor (readonly productId: number, readonly price: number, readonly quantity: number) {
		if (quantity <= 0) throw new Error("Quantity must be positive");
	}

	getTotal () {
		return this.price * this.quantity;
	}
}
