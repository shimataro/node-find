import * as glob from "fast-glob";

import {Options} from "./parser";

/**
 * find entries from command-line options
 * @param options command-line options
 * @returns stream of entries
 */
export function findEntries(options: Options): NodeJS.ReadableStream
{
	const source = `${options.startingPoint}/**/${options.name}`;
	return glob.stream(source);
}
