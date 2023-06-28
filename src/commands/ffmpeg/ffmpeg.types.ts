import {ICommandExec} from "../../core/executor/command.types.js";

export interface IFfmpegInput {
	width: number;
	height: number;
	path: string;
	name: string;
}

export interface IFfmpegVideoSize {
	width: number;
	height: number;
}

export interface ICommandExecFfmpeg extends ICommandExec {
	output: string;
}