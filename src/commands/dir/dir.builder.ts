import {IDirInput} from "./dir.types.js";

export class DirBuilder {
	private options: Map<string, string> = new Map();


	detailedOption(): DirBuilder {
		this.options.set('-l', ``)
		return this;
	}

	output(path: IDirInput["path"]): string[] {
		const args: string[] = [];

		for (const [key, value] of this.options) {
			args.push(key, value);
		}
		args.push(path);
		return args.filter(item=>item.length>0);
	}

}
