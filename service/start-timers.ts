import axios from 'axios';

export default async function execute() {
	try {
		return await axios.get('https://2a3c-201-76-113-98.ngrok-free.app/api/start-timers');
	} catch (error) {
		console.log('Error:', error);
	}
}
