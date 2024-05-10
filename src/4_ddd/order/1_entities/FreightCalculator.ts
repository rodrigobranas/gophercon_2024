export class FreightCalculator {

	static calculate (product: any) {
		const itemFreight = 1000 * product.volume * (product.density/100);
		return (itemFreight >= 10) ? itemFreight : 10;
	}
}
