
export interface IVideoSize {
	width: number;
	height: number;
}


export class FfmpegBuilder {
	private inputPath: string;
	private options: Map<string, string> = new Map();

	constructor() {
		this.options.set('-c:v', 'libx264');
	}

	input(inputPath: string): FfmpegBuilder {
		this.inputPath = inputPath;
		return this;
	}

	setVideoSize(resolution: IVideoSize): FfmpegBuilder {
		this.options.set('-s', `${resolution.width}x${resolution.height}`)
		return this;
	}

	output(outPut: string):string[] {
		if (!this.inputPath) throw new Error("Не задан параметр 'input'");
		const args: string[] = ['-i', this.inputPath];

		for (const [key, value] of this.options) {
			args.push(key, value);
		}
		args.push(outPut);
		return args;
	}

}
