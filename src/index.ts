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
	let tasks: Promise<number>[] = [];
	for await(const entry of stream)
	{
		for(const exec of options.exec)
		{
			tasks.push(execCommand(exec, entry.toString(), options.startingPoint));
			if(tasks.length >= options.concurrency)
			{
				await Promise.all(tasks);
				tasks = [];
			}
		}
	}

	if(tasks.length > 0)
	{
		await Promise.all(tasks);
	}
}

main(process.argv.slice(2))
	.catch((err: Error) =>
	{
		console.error(`${process.argv[1]}: ${err.message}`);
		process.exit(1);
	});
