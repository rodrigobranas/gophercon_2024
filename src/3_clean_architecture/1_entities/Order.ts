import crypto from "crypto";
import { Item } from "./Item";
import { Coupon } from "./Coupon";
import { Product } from "./Product";

export default class Order {
	items: Item[];
	coupon?: Coupon;
	freight = 0;

	constructor (readonly orderId: string, readonly email: string) {
		if (!email.match(/^(.+)@(.+)$/)) throw new Error("Invalid email");
		this.items = [];
	}

	static create (email: string) {
		const orderId = crypto.randomUUID();
		return new Order(orderId, email);
	}

	addItem (product: Product, quantity: number) {
		if (quantity < 1) throw new Error("Quantity must be positive");
		this.items.push(new Item(product.idProduct, product.price, quantity));
		const volume = (product.width/100) * (product.height/100) * (product.length/100);
		const density = product.weight/volume;
		const itemFreight = 1000 * volume * (density/100);
		this.freight += ((itemFreight >= 10) ? itemFreight : 10) * quantity;
	}

	applyCoupon (coupon: Coupon) {
		if (!coupon.isExpired()) {
			this.coupon = coupon;
		}
	}

	getTotal () {
		let total = 0;
		for (const item of this.items) {
			total += item.getTotal();
		}
		if (this.coupon) {
			total -= this.coupon.getDiscount(total);
		}
		return total;
	}
}
