import * as parser from "@root/parser";

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
			concurrency: 1,
			startingPoint: ".",
			name: "{*,.*}",
			exec: [],
		});
	});
	it("starting point", () =>
	{
		expect(parser.parseArguments(["abc"])).toEqual({
			concurrency: 1,
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
				concurrency: 1,
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
	describe("exec", () =>
	{
		it("specified", () =>
		{
			expect(parser.parseArguments(["-exec", "ls", "{}", ";"])).toEqual({
				concurrency: 1,
				startingPoint: ".",
				name: "{*,.*}",
				exec: [["ls", "{}"]],
			});
		});
		it("specified 2", () =>
		{
			expect(parser.parseArguments(["-exec", "ls", "{}", ";", "-exec", "cat", "{}", ";"])).toEqual({
				concurrency: 1,
				startingPoint: ".",
				name: "{*,.*}",
				exec: [
					["ls", "{}"],
					["cat", "{}"],
				],
			});
		});
		it("omitted semicolon", () =>
		{
			expect(() =>
			{
				parser.parseArguments(["-exec", "ls", "{}"]);
			}).toThrow();
		});
	});
}
