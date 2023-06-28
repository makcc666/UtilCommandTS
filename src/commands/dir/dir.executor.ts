import {CommandExecutor} from "../../core/executor/command.executor.js";
import {ChildProcessWithoutNullStreams, spawn} from "child_process";
import {ISteamLogger} from "../../core/handlers/steam-logger-interface.js";
import {PromptService} from "../../core/prompt/prompt.service.js";
import {SteamHandler} from "../../core/handlers/steam.handler.js";
import {IDirInput} from "./dir.types.js";
import {DirBuilder} from "./dir.builder.js";
import {ICommandExec} from "../../core/executor/command.types.js";

export class DirExecutor extends CommandExecutor<IDirInput> {
	private promptService: PromptService = new PromptService();

	constructor(logger: ISteamLogger) {
		super(logger);
	}

	protected async prompt(): Promise<IDirInput> {
		const path = await this.promptService.input<IDirInput["path"]>('Путь', 'input');
		return {path};
	}

	protected build({path}: IDirInput):ICommandExec {
		const args = (new DirBuilder()).detailedOption().output(path);
		return {command: 'ls', args,};
	}

	// По-хорошему, метод должен быть ASYNC.
	// fileService.deleteFileIfExist, нужно дождаться, что файл был успешно проверен и удалён
	protected spawn({
		command, args
	}: ICommandExec): ChildProcessWithoutNullStreams {
		return spawn(command, args);
	}

	protected processStream(steam: ChildProcessWithoutNullStreams, logger: ISteamLogger): void {
		const handler = new SteamHandler(logger);
		handler.processOutput(steam);
	}

}