import axios from 'axios';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

export default async function saveToken(userId: string) {
	if (Device.isDevice) {
		const { status } = await Notifications.requestPermissionsAsync();
		if (status !== 'granted') {
			alert('Falha ao obter permissões para notificações!');
			return;
		}
		const token = await Notifications.getExpoPushTokenAsync();
		const data = {
			userId,
			expoToken: token.data,
		};
		await axios.post('https://2a3c-201-76-113-98.ngrok-free.app/api/register-token', data);
	} else {
		alert('Este dispositivo não suporta notificações.');
	}
}
