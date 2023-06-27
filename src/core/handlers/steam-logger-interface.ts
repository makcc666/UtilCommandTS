export interface ISteamLogger {
	log(...args:any[]):void;
	error(...args:any[]):void;
	end():void;
}