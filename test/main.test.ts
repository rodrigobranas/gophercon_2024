import axios from "axios";

axios.defaults.validateStatus = function () {
	return true;
}

test("Deve fazer uma compra", async function () {
	const input = {
		email: "rodrigo@branas.io",
		items: [
			{ productId: 1, quantity: 1 },
			{ productId: 2, quantity: 2 },
			{ productId: 3, quantity: 3 }
		]
	}
	const response = await axios.post("http://localhost:3000/checkout", input);
	const output = response.data;
	expect(output.total).toBe(11090);
	expect(output.freight).toBe(500);
});

test("Não deve fazer uma compra com email inválido", async function () {
	const input = {
		email: "rodrigo",
		items: [
			{ productId: 1, quantity: 1 },
			{ productId: 2, quantity: 2 },
			{ productId: 3, quantity: 3 }
		]
	}
	const response = await axios.post("http://localhost:3000/checkout", input);
	const output = response.data;
	expect(response.status).toBe(422);
	expect(output.message).toBe("Invalid email");
});

test("Não deve fazer uma compra com email inválido", async function () {
	const input = {
		email: "rodrigo@branas.io",
		items: [
			{ productId: 1, quantity: 0 },
			{ productId: 2, quantity: 2 },
			{ productId: 3, quantity: 3 }
		]
	}
	const response = await axios.post("http://localhost:3000/checkout", input);
	const output = response.data;
	expect(response.status).toBe(422);
	expect(output.message).toBe("Quantity must be positive");
});