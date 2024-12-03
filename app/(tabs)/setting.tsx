import { Text, YStack } from 'tamagui';
import { useState, useEffect } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import ButtonComponent from 'components/button-component'
import axios from 'axios';

export default function setting() {
	const { userId } = useLocalSearchParams();
	const router = useRouter();
	const [user, setUser] = useState({
		id: '',
		name: '',
		email: '',
	});

	const getUser = async (id) => {
		try {
			const response = await axios.get('http://localhost:3000/api/user/' + id);
			if (!response.data) {
				return;
			}
			setUser(response.data);
		} catch (error) {
			console.error('Error:', error);
		}
	};

	useEffect(() => {
		try {
			getUser(userId)
		} catch (error) {
			console.error('Error:', error);
		}
	}, [])

	const handleClick = async () => {
		try {
			router.push('/auth/login');
		} catch (error) {
			console.error('Error:', error);
		}
	};

	return (
		<YStack f={1} ai="center" gap="$2" px="$4" pt="$12" bg="$background">
			<Text fontSize={20} pb="$4">Olá, {user.name}</Text>
			<Text fontSize={20} pb="$4">Email: {user.email}</Text>
			<YStack f={1} ai="center" position="absolute" bottom={20} left={0} right={0} padding={20} alignItems="center" justifyContent="center" bg="$background">
				<ButtonComponent title="Logout" func={handleClick} />
			</YStack>
		</YStack>
	)
}