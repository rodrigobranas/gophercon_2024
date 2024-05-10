import crypto from "crypto";
import { Item } from "./Item";
import { Coupon } from "./Coupon";
import { Product } from "./Product";
import { FreightCalculator } from "./FreightCalculator";

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
		this.freight += FreightCalculator.calculate(product) * quantity;
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
