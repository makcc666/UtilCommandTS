import {PromptService} from "./core/prompt/prompt.service.js";

export class App{
	async run(){
		const req = new PromptService().input<number>('Число','number');
		const res = await req;
		console.log(res);
	}
}

const app = new App();
app.run()