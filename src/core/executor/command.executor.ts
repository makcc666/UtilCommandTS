import {ISteamLogger} from "../handlers/steam-logger-interface.js";
import {ChildProcessWithoutNullStreams} from "child_process";
import {ICommandExec} from "./command.types.js";

export abstract class CommandExecutor<Input> {
	constructor(private logger: ISteamLogger) {
	}

	public async execute() {
		const input = await this.prompt()
		const command = this.build(input);
		const steam = this.spawn(command);
		this.processStream(steam, this.logger);
	}

	protected abstract prompt(): Promise<Input>;

	protected abstract build(input: Input): ICommandExec;

	protected abstract spawn(command: ICommandExec): ChildProcessWithoutNullStreams;

	protected abstract processStream(steam: ChildProcessWithoutNullStreams, logger: ISteamLogger): void;

}