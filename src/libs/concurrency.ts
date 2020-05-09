/**
 * concurrency task runner
 */
export class Runner
{
	/**
	 * runner factory
	 * @param concurrencyNumber concurrency number
	 * @returns runner instance
	 */
	static factory(concurrencyNumber: number): Runner
	{
		return new Runner(concurrencyNumber);
	}

	private readonly concurrencyNumber: number;
	private tasks: Promise<unknown>[];

	private constructor(concurrencyNumber: number)
	{
		this.concurrencyNumber = concurrencyNumber;
		this.tasks = [];
	}

	/**
	 * add task
	 * @param task async task to execute
	 */
	async add(task: Promise<unknown>): Promise<void>
	{
		this.tasks.push(task);
		if(this.tasks.length < this.concurrencyNumber)
		{
			return;
		}

		await this.flush();
	}

	/**
	 * flush all tasks
	 */
	async flush(): Promise<void>
	{
		if(this.tasks.length === 0)
		{
			return;
		}

		await Promise.all(this.tasks);
		this.tasks = [];
	}
}
