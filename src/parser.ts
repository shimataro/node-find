export interface Options
{
    startingPoint: string;
    name: string;
    exec: Command[];
}

type Command = string[];

/**
 * parse command-line arguments
 * @param argv command-line arguments
 * @returns parsing result
 */
export function parseArguments(argv: string[]): Options
{
	return {
		startingPoint: getStartingPoint(argv),
		name: getName(argv),
		exec: getExec(argv),
	};
}

/**
 * get starting-point
 * @param argv command-line arguments
 * @returns starting-point
 */
function getStartingPoint(argv: string[]): string
{
	if(argv.length === 0)
	{
		// No arguments
		return ".";
	}

	if(!argv[0].startsWith("-"))
	{
		return argv[0];
	}

	return ".";
}

/**
 * get pattern name
 * @param argv command-line arguments
 * @returns pattern name
 */
function getName(argv: string[]): string
{
	let found = false;
	for(const arg of argv)
	{
		if(found)
		{
			return arg;
		}

		if(arg !== "-name")
		{
			continue;
		}
		found = true;
	}
	if(!found)
	{
		// matches all file
		return "{*,.*}";
	}

	throw Error("missing argument to `-name'");
}

/**
 * get exec commands
 * @param argv command-line arguments
 * @returns exec commands
 */
function getExec(argv: string[]): Command[]
{
	const exec: Command[] = [];
	let found = false;
	let command: Command = [];
	for(const arg of argv)
	{
		if(found)
		{
			if(arg === ";")
			{
				// push command
				exec.push(command);
				command = [];
				found = false;
				continue;
			}
			command.push(arg);
			continue;
		}
		if(arg === "-exec")
		{
			found = true;
			continue;
		}
	}

	if(!found)
	{
		return exec;
	}

	throw Error("missing argument to `-exec'");
}
