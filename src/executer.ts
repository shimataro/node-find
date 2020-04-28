import * as childProcess from "child_process";
import * as path from "path";

/**
 * execute a command
 * @param exec command to execute ("{}" will be replaced with entry)
 * @param entry entry to replace
 */
export function execCommand(exec: string[], entry: string): void
{
	const command = buildExecCommand(exec, entry);
	childProcess.spawnSync(command[0], command.slice(1), {
		stdio: "inherit",
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
	if(placeholder.startsWith("r="))
	{
		// relative path
		return path.relative(placeholder.substr(2), entry);
	}

	return entry;
}
