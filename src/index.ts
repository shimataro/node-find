import "core-js/modules/es7.symbol.async-iterator";

import {parseArguments} from "./parser";
import {findEntries} from "./finder";
import {execCommand} from "./executer";

/**
 * main function
 * @param argv arguments
 */
async function main(argv: string[]): Promise<void>
{
	const options = parseArguments(argv);
	const stream = findEntries(options);
	for await(const entry of stream)
	{
		for(const exec of options.exec)
		{
			execCommand(exec, entry.toString());
		}
	}
}

main(process.argv.slice(2))
	.catch((err: Error) =>
	{
		console.error(`${process.argv[1]}: ${err.message}`);
		process.exit(1);
	});
