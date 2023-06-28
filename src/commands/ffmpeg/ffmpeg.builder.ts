enum EImageFormat {
	Png = 'png',
	Jpeg = 'jpeg'
}

interface IResolution {
	width: number;
	height: number;
}

interface IImageConversion extends IResolution {
	format: EImageFormat;
}

export class FfmpegGBuilder {
	private inputPath: string;
	private options: Map<string, string> = new Map();

	constructor() {
		this.options.set('-c:v', 'libx264');
	}

	input(inputPath: string): FfmpegGBuilder {
		this.inputPath = inputPath;
		return this;
	}

	setVideoSize(resolution: IResolution): FfmpegGBuilder {
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
