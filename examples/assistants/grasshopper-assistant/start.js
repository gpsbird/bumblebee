const BumblebeeAPI = require('bumblebee-api');

class GrasshopperAssistant extends BumblebeeAPI.Assistant {
	constructor() {
		// every time the socket is started or stopped, a new instance of the assistant will be created
		super(...arguments);
	}
	
	// onStart is called once when the assistant called upon using a hotword or activated automatically
	async onStart() {
		await this.bumblebee.say('Grasshopper Ready');
	}
	
	// onHotword is called immediately when the hotword is detected
	async onHotword(hotword) {
		this.bumblebee.console('hotword detected: ' + hotword);
	}
	
	// onCommand is called when speech-to-text was processed at the same time hotword was detected
	async onCommand(recognition) {
		this.bumblebee.console('command detected: ' + recognition.text);
	}
	
	// loop() is called repeatedly and waits for speech-to-text recognition events
	async loop() {
		let recognition = await this.bumblebee.recognize();
		// received a speech-to-text recognition
		console.log('recognition:', recognition.text);
		this.bumblebee.console(recognition);
		
		// say "exit" to shut down the assistant
		if (recognition.text === 'exit') {
			return true; // return out of the loop to shut down the assistant
		}
		
		// respond with a text-to-speech instruction
		await this.bumblebee.say('You said: ' + recognition.text);
	}
	
	// onStop is called after this.loop() returns, or if this.abort() was called
	async onStop() {
		await this.bumblebee.say('Exiting...');
	}
}

BumblebeeAPI.connectAssistant('grasshopper', GrasshopperAssistant, {
	autoStart: true
});