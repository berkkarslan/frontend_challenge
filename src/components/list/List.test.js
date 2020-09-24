import React from 'react';
import { render } from '@testing-library/react';
import List from './List';

expect.extend({
	toBeType(received, argument) {
		const initialType = typeof received;
		const type = initialType === "object" ? Array.isArray(received) ? "array" : initialType : initialType;
		return type === argument ? {
			message: () => `expected ${received} to be type ${argument}`,
			pass: true
		} : {
			message: () => `expected ${received} to be type ${argument}`,
			pass: false
		};
	}
});

describe("testing extended expect", () => {
	it("tests normal types correctly", () => {
		expect("").toBeType("string");
		expect({}).toBeType("object");
		expect(1).toBeType("number");
	});
	it("tests array types correctly", () => {
		expect([]).toBeType("array");
	});
	it("works with promises", () => {
		expect(Promise.resolve([])).resolves.toBeType("array");
	});
});