import { YStack, SizableText } from 'tamagui'
import ButtonComponent from 'components/button-component';

export default function WelcomeComponent(props: any) {
	return (
		<YStack f={1} gap="$2" pt="$8" pb="$8" bg="$background">
			<YStack f={1} px="$4" pt="$8" ai="flex-start" bg="$background">
				<SizableText size="$9" pl="$6">Like watching</SizableText>
				<SizableText size="$9" pl="$6">a video,</SizableText>
				<SizableText size="$9" pl="$6" color="$orange10Dark">but easier</SizableText>
				<SizableText size="$9" pt="$2" pl="$10">🤖📚👩🏽‍🎓</SizableText>
			</YStack>
			<YStack f={1} ai="center" position="absolute" bottom={20} left={0} right={0} padding={20} alignItems="center" justifyContent="center" bg="$background">
				<ButtonComponent title="Let's get started" btColor="$orange9" func={props.onFinish} />
			</YStack>
		</YStack>
	);
}


