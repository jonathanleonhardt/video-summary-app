import { YStack, XStack, Label, Input, SizableText } from 'tamagui'
import ButtonComponent from './button-component'
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
			const response = await axios.post('http://localhost:3000/api/auth/login', formData);
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
		<YStack f={1} ai="center" gap="$2" pt="$8" pb="$8" bg="$background">
			<SizableText size="$9" pt="$16" pb="$10">Login</SizableText>
			<XStack px="$6" pb="$2">
				<Label width={60} justifyContent="flex-start" htmlFor="email">
					Email
				</Label>
				<Input flex={1} id="email" value={formData.email} onChangeText={(text) => handleInputChange('email', text)} />
			</XStack>
			<XStack px="$6" pb="$4">
				<Label width={60} justifyContent="flex-start" htmlFor="password">
					Senha
				</Label>
				<Input secureTextEntry={true} flex={1} id="password" value={formData.password} onChangeText={(text) => handleInputChange('password', text)} />
			</XStack>
			<ButtonComponent title="Login" btColor="$orange9" func={handleLoginClick} />
			<SizableText size="$6" pt="$3" onPress={handleCreateAccountClick}>or create an account</SizableText>
		</YStack>
	)

}