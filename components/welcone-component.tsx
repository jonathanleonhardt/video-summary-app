import { YStack, Text } from 'tamagui'
import ButtonComponent from 'components/button-component';

export default function WelcomeComponent(props: any) {
	return (
		<YStack f={1} ai="center" gap="$2" px="$4" pt="$12" bg="$background">
			<Text>Like watching</Text>
			<Text>a video</Text>
			<Text color="orange">but easier</Text>
			<Text>🤖📚👩🏽‍🎓</Text>
			<ButtonComponent title="Let's get started" func={props.onFinish} />
		</YStack>
	);
}


