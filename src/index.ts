import "core-js/modules/es.symbol.async-iterator";

import {parseArguments} from "./parser";
import {findEntries} from "./finder";
import {execCommand} from "./executer";
import {Runner} from "./libs/concurrency";

/**
 * main function
 * @param argv arguments
 */
async function main(argv: string[]): Promise<void>
{
	const options = parseArguments(argv);
	const stream = findEntries(options);
	const runner = Runner.factory(options.concurrency);
	for await(const entry of stream)
	{
		for(const exec of options.exec)
		{
			const task = execCommand(exec, entry.toString(), options.startingPoint);
			await runner.add(task);
		}
	}

	await runner.flush();
}

main(process.argv.slice(2))
	.catch((err: Error) =>
	{
		console.error(`${process.argv[1]}: ${err.message}`);
		process.exit(1);
	});
