
import { Text, TextArea } from 'tamagui'

export default function TestInputComponent(props: any) {
	return (
		<>
			<Text
				alignSelf="flex-start"
				ml={28}
				mt={props.titleMarginTop}
				fontSize={18}
			>
				{props.title}
			</Text>
			<TextArea
				size='$12'
				height={props.textAreaHeight}
				borderRadius={20}
				borderWidth={2}
				bg="$white7"
				color="$black1"
				fontSize={12}
				lineHeight={14}
				value={props.value}
				onChangeText={(text) => props.onChange(text)}
			/>
		</>
	)
}