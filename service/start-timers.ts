import axios from 'axios';

export default async function execute() {
	try {
		return await axios.get('http://localhost:3000/api/start-timers');
	} catch (error) {
		console.log('Error:', error);
	}
}
