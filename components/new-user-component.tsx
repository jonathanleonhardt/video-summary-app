import { YStack, XStack, Label, Input, SizableText } from 'tamagui'
import ButtonComponent from './button-component'
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
			await axios.post('http://localhost:3000/api/auth/register', user);
			const response = await axios.post('http://localhost:3000/api/auth/login', user);
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
		<YStack f={1} ai="center" gap="$2" pt="$8" pb="$8" bg="$background">
			<SizableText size="$9" pt="$16" pb="$10">Login</SizableText>
			<XStack px="$6" pb="$2">
				<Label width={60} justifyContent="flex-start" htmlFor="user">
					User
				</Label>
				<Input flex={1} id="user" value={formData.name} onChangeText={(text) => handleInputChange('name', text)} />
			</XStack>
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
			<ButtonComponent title="Create account" btColor="$orange9" func={handleCreateUserClick} />
		</YStack>
	)

}