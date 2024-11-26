
import { useLocalSearchParams } from 'expo-router';
import { Text, TextArea, YStack } from 'tamagui'

export default function AIResponse() {
	const { summary } = useLocalSearchParams(); // Recupera o parâmetro 'summary'

	return (
		<YStack ai="center" gap="$2" px="$4" pt="$4" bg="$background">
			<Text
				alignSelf="flex-start"
				ml={30}
				mt="$2"
				fontSize={18}
			>
				AI SUMMARY
			</Text>
			<YStack backgroundColor="$gray8" borderRadius="$3">

				<Text
					alignSelf="flex-start"
					ml={30}
					mt="$2"
					fontSize={18}
				>
					{summary}
				</Text>
			</YStack>
			{/* <TextArea
				size='$12'
				borderRadius={20}
				borderWidth={2}
				bg="$white7"
				color="$black1"
				fontSize={16}
				lineHeight={20}
				value={summary.toString()}
			/> */}
		</YStack>
	);
}