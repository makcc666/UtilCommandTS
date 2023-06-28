import {FfmpegBuilder} from "./ffmpeg.builder.js";
import {CommandExecutor} from "../../core/executor/command.executor.js";
import {ICommandExecFfmpeg, IFfmpegInput} from "./ffmpeg.types.js";
import {ChildProcessWithoutNullStreams, spawn} from "child_process";
import {ISteamLogger} from "../../core/handlers/steam-logger-interface.js";
import {FileService} from "../../core/files/file.service.js";
import {PromptService} from "../../core/prompt/prompt.service.js";
import {SteamHandler} from "../../core/handlers/steam.handler.js";

export class FfmpegExecutor extends CommandExecutor<IFfmpegInput> {
	private fileService: FileService = new FileService();
	private promptService: PromptService = new PromptService();

	constructor(logger: ISteamLogger) {
		super(logger);
	}

	protected async prompt(): Promise<IFfmpegInput> {
		const width = await this.promptService.input<IFfmpegInput["width"]>('Ширина', 'number');
		const height = await this.promptService.input<IFfmpegInput["height"]>('Высота', 'number');
		const path = await this.promptService.input<IFfmpegInput["path"]>('Путь до файла', 'input');
		const name = await this.promptService.input<IFfmpegInput["name"]>('Имя файла', 'input');
		return {
			width, height, path, name
		};
	}

	protected build({
		width, height, name, path
	}: IFfmpegInput): ICommandExecFfmpeg {
		const outPut = this.fileService.getFilePath(path, name, 'mp4');
		const args = (new FfmpegBuilder()).input(path).setVideoSize({
			width, height
		}).output(outPut);

		return {
			command: 'ffmpeg', args, output: outPut,
		};
	}

	// По-хорошему, метод должен быть ASYNC.
	// fileService.deleteFileIfExist, нужно дождаться, что файл был успешно проверен и удалён
	protected spawn({
		command, args, output
	}: ICommandExecFfmpeg): ChildProcessWithoutNullStreams {
		this.fileService.deleteFileIfExist(output)
		return spawn(command, args);
	}

	protected processStream(steam: ChildProcessWithoutNullStreams, logger: ISteamLogger): void {
		const handler = new SteamHandler(logger);
		handler.processOutput(steam);
	}

}