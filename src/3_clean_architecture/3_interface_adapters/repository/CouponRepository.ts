import pgp from "pg-promise";
import { Coupon } from "../../1_entities/Coupon";
import DatabaseConnection from "../../4_frameworks_and_drivers/DatabaseConnection";

export default interface CouponRepository {
	get (code: string): Promise<Coupon | undefined>;
}

export class CouponRepositoryDatabase implements CouponRepository {

	constructor (readonly connection: DatabaseConnection) {
	}

	async get(code: string): Promise<Coupon | undefined> {
		const [coupon] = await this.connection.query("select * from branas.coupon where code = $1", [code]);
		if (!coupon) return;
		return new Coupon(coupon.code, parseFloat(coupon.percentage), coupon.expire_date);
	}
}
