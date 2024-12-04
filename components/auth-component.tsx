import { YStack, XStack, Label, View, Input, SizableText, Separator } from 'tamagui'
import ButtonComponent from './button-component'
import { BotMessageSquare } from '@tamagui/lucide-icons'
import { useRouter } from 'expo-router';
import { useState } from 'react';
import axios from 'axios';

export default function LoginComponent(props: any) {
	const router = useRouter();

	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const handleInputChange = (name, value) => {
		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleCreateAccountClick = async () => {
		try {
			router.push('/auth/new-user');
		} catch (error) {
			console.error('Error:', error);
		}
	};

	const handleLoginClick = async () => {
		try {
			const response = await axios.post('https://2a3c-201-76-113-98.ngrok-free.app/api/auth/login', formData);
			if (!response.data || !response.data.token) {
				alert("Erro ao logar");
				return;
			}
			const userId = response.data.user.id;
			console.log(response.data)
			console.log(userId)
			router.push({
				pathname: '/(tabs)',
				params: { userId: userId },
			});
		} catch (error) {
			console.error('Error:', error);
		}
	};

	return (
		<YStack f={1} ai="center" gap="$8" pt="$8" pb="$8" bg="$background">
			<BotMessageSquare size="$12" pt="$10" pb="$2" color="$orange9" />
			<SizableText size="$9" pb="$4">Login</SizableText>
			<View flex={1} alignItems="center" gap="$2" bg="$background">
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
				<ButtonComponent title="Log in" btColor="$orange9" func={handleLoginClick} />
			</View>
			<SizableText size="$6" pt="$3" onPress={handleCreateAccountClick}>or create an account</SizableText>
		</YStack>
	)

}