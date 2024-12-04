import { YStack, XStack, Label, Input, SizableText, View } from 'tamagui'
import ButtonComponent from './button-component'
import { BotMessageSquare } from '@tamagui/lucide-icons'
import { useRouter } from 'expo-router';
import axios from 'axios';
import { useState } from 'react';

export default function NewUserComponent(props: any) {
	const router = useRouter();

	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
	});

	const handleInputChange = (name, value) => {
		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleCreateUserClick = async () => {
		try {
			const user = {
				name: formData.name,
				email: formData.email,
				password: formData.password
			};
			await axios.post('https://2a3c-201-76-113-98.ngrok-free.app/api/auth/register', user);
			const response = await axios.post('https://2a3c-201-76-113-98.ngrok-free.app/api/auth/login', user);
			if (!response.data || !response.data.token) {
				alert("Erro ao logar");
				return;
			}
			const userId = response.data.user.id;
			router.push({
				pathname: '/(tabs)',
				params: userId,
			});
		} catch (error) {
			console.error('Error:', error);
		}
	};

	return (
		<YStack f={1} ai="center" gap="$8" pt="$8" pb="$8" bg="$background">
			<BotMessageSquare size="$12" pt="$10" pb="$2" color="$orange9" />
			<SizableText size="$9" pb="$4">Create User</SizableText>
			<View flex={1} alignItems="center" gap="$2" bg="$background">
				<XStack pb="$2">
					<Label width={80} justifyContent="flex-start" htmlFor="user">
						User
					</Label>
					<Input flex={1} id="user" value={formData.name} onChangeText={(text) => handleInputChange('name', text)} />
				</XStack>
				<XStack pb="$2">
					<Label width={80} justifyContent="flex-start" htmlFor="email">
						Email:
					</Label>
					<Input id="email" value={formData.email} onChangeText={(text) => handleInputChange('email', text)} />
				</XStack>
				<XStack>
					<Label width={80} justifyContent="flex-start" htmlFor="password">
						Password:
					</Label>
					<Input secureTextEntry={true} id="password" value={formData.password} onChangeText={(text) => handleInputChange('password', text)} />
				</XStack>
				<ButtonComponent title="Create account" btColor="$orange9" func={handleCreateUserClick} />
			</View>
		</YStack>
	)

}