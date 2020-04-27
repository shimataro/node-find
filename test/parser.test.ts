import * as parser from "../src/parser";

{
	describe("parseArguments", testParseArguments);
}

/**
 * test parseArguments()
 */
function testParseArguments(): void
{
	it("empty arguments", () =>
	{
		expect(parser.parseArguments([])).toEqual({
			startingPoint: ".",
			name: "{*,.*}",
			exec: [],
		});
	});
	it("starting point", () =>
	{
		expect(parser.parseArguments(["abc"])).toEqual({
			startingPoint: "abc",
			name: "{*,.*}",
			exec: [],
		});
	});
	describe("name", () =>
	{
		it("specified", () =>
		{
			expect(parser.parseArguments(["-name", "*.*"])).toEqual({
				startingPoint: ".",
				name: "*.*",
				exec: [],
			});
		});
		it("omitted", () =>
		{
			expect(() =>
			{
				parser.parseArguments(["-name"]);
			}).toThrow();
		});
	});
}
