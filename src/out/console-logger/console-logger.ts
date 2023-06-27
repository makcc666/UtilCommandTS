import {ISteamLogger} from "../../core/handlers/steam-logger-interface.js";

class ConsoleLogger implements ISteamLogger {
	private static logger: ConsoleLogger;

	public static getInstance() {
		if (!ConsoleLogger.logger) {
			ConsoleLogger.logger = new ConsoleLogger();
		}
		return ConsoleLogger.logger;
	}

	end(): void {
		console.log("ConsoleLogger::finish");
	}

	error(...args: any[]): void {
		console.error("ConsoleLogger::error", args);

	}

	log(...args: any[]): void {
		console.log("ConsoleLogger::log", args);

	}


}
