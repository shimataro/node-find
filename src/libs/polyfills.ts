// polyfill

// async iterator
if(Symbol.asyncIterator === undefined)
{
	// @ts-ignore
	Symbol.asyncIterator = Symbol.for("Symbol.asyncIterator");
}
