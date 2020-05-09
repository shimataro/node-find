import * as childProcess from "child_process";
import * as path from "path";

/**
 * execute a command
 * @param exec command to execute ("{}" will be replaced with entry)
 * @param entry entry to replace
 * @returns status code
 */
export function execCommand(exec: string[], entry: string): Promise<number>
{
	return new Promise((resolve, reject) =>
	{
		const [command, ...args] = buildExecCommand(exec, entry);
		const options: childProcess.SpawnOptions = {
			stdio: "inherit",
		};

		childProcess.spawn(command, args, options)
			.on("exit", (code) =>
			{
				if(code === null)
				{
					resolve(0);
				}
				else
				{
					resolve(code);
				}
			})
			.on("error", (err) =>
			{
				reject(err);
			});
	});
}

/**
 * build command; replace "{}" with entry
 * @param exec command to execute
 * @param entry found entry
 * @returns command to exec
 */
function buildExecCommand(exec: string[], entry: string): string[]
{
	return exec.map((part) =>
	{
		return part.replace(/{([^}]*)}/g, (match, p1) =>
		{
			return replacePlaceholders(p1, entry);
		});
	});
}

/**
 * replace placeholders with entry
 * @param placeholders placeholders, separated by ":"
 * @param entry found entry
 * @returns replaced value
 */
function replacePlaceholders(placeholders: string, entry: string): string
{
	let result = entry;
	for(const replacer of placeholders.split(":"))
	{
		result = replacePlaceholder(replacer, result);
	}
	return result;
}

/**
 * replace placeholder with entry
 * @param placeholder placeholder
 * @param entry found entry
 * @returns replaced value
 */
function replacePlaceholder(placeholder: string, entry: string): string
{
	if(placeholder === "" || placeholder === "a")
	{
		return path.resolve(entry);
	}
	if(placeholder === "d")
	{
		return path.dirname(entry);
	}
	if(placeholder === "e")
	{
		return path.extname(entry);
	}
	if(placeholder.startsWith("e="))
	{
		// replace extension
		return entry.substr(0, entry.length - path.extname(entry).length) + placeholder.substr(2);
	}
	if(placeholder === "E")
	{
		// without extension
		return entry.substr(0, entry.length - path.extname(entry).length);
	}
	if(placeholder === "b")
	{
		return path.basename(entry);
	}
	if(placeholder === "B")
	{
		// basename without extension
		return path.basename(entry, path.extname(entry));
	}
	if(placeholder === "r")
	{
		// relative path from working directory
		return entry;
	}
	if(placeholder.startsWith("r="))
	{
		// relative path
		return path.relative(placeholder.substr(2), entry);
	}

	return entry;
}
