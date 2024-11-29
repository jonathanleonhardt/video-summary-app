
import { Text, TextArea } from 'tamagui'

export default function TextInputComponent(props: any) {
	return (
		<>
			<Text
				alignSelf="flex-start"
				ml={30}
				mt={props.titleMarginTop}
				fontSize={18}
			>
				{props.title}
			</Text>
			<TextArea
				size="$14"
				height={props.textAreaHeight}
				borderRadius={20}
				borderWidth={2}
				bg="$white7"
				color="$black1"
				fontSize={12}
				lineHeight={14}
				value={props.value}
				placeholder={props.examples}
				onChangeText={(text) => props.onChange(text)}
			/>
		</>
	)
}