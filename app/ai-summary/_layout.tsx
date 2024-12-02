import { useState } from 'react';
import { useRouter } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';
import { Text, XStack, YStack, ScrollView } from 'tamagui';
import ButtonComponent from 'components/button-component';
import { X, Laugh, Frown } from '@tamagui/lucide-icons'
import axios from 'axios';

export default function AIResponse() {
	// const [question, setQuestion] = useState('');
	const router = useRouter();
	const { summary, userId, videoURL, hint } = useLocalSearchParams();
	const [history, setHistory] = useState({});

	const handleClick = async () => {
		try {
			setHistory({
				userId: userId,
				videoURL: videoURL,
				hint: hint,
				question: '',
				aiSummary: summary,
				feedback: '',
				feedbackDescription: '',
			});
			await axios.post('http://localhost:3000/api/user-history/create', history);
			router.push("/(tabs)");
		} catch (error) {
			console.error('Error:', error);
		}
	};

	return (
		<ScrollView>
			<YStack ai="center" gap="$2" px="$4" pt="$4" pb="$10" bg="$background">
				<Text
					alignSelf="center"
					mt="$10"
					mb="$2"
					fontSize={18}
				>🤖📚👩🏽‍🎓</Text>
				<Text
					alignSelf="center"
					mb="$4"
					fontWeight="$16"
					fontSize={20}>
					AI VIDEO SUMMARY
				</Text>
				<YStack backgroundColor="$gray12" borderRadius="$6" mx='$3'>
					<Text
						alignSelf="flex-start"
						mx={20}
						my="$6"
						px="$2"
						fontSize={18}
						color="black"
					>
						{summary}
					</Text>
				</YStack>
				{/* <TextInputComponent
					titleMarginTop="$6"
					textAreaHeight="$6"
					value={question}
					onChange={(value) => setQuestion(value)}
					examples="How exactly this that?"
					mb="$4"
					title="Ask something else:" /> */}
				<XStack backgroundColor="$black4" flex={1} gap="$4" borderRadius="$6" borderColor="$white10" borderWidth="$1" mt="$8">
					<YStack pl="$2">
						<Text
							mx={10}
							my="$4"
							mb="$5"
							px="$2"
							fontSize={18}
							color="white"
						>
							GIVE A FEEDBACK
						</Text>
					</YStack>
					<YStack pt="$4" pr="$3">
						<Laugh color="green" />
					</YStack>
					<YStack pt="$4" pr="$6">
						<Frown color="red" />
					</YStack>
				</XStack>
				<ButtonComponent pb="$4" title="Convert Next" btColor="$orange9" mt="$5" func={handleClick} />
			</YStack>
		</ScrollView>
	);
}