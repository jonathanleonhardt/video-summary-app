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
		await axios.post('http://localhost:3000/api/register-token', data);
	} else {
		alert('Este dispositivo não suporta notificações.');
	}
}
