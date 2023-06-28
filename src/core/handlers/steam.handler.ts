import {ISteamLogger} from "./steam-logger-interface.js";
import {ChildProcessWithoutNullStreams} from "child_process";

// Steam Proxy
export class SteamHandler {
	constructor(private logger: ISteamLogger) {

	}

	processOutput(steam: ChildProcessWithoutNullStreams) {
		steam.stdout.on('data', (data: any) => {
			this.logger.log(data.toString());
		})

		steam.stderr.on('error', (data: any) => {
			this.logger.error(data.toString());
		})
		steam.on('close', () => {
			this.logger.end();
		})

	}
}