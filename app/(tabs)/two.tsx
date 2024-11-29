import { ChevronDown } from '@tamagui/lucide-icons'
import { Text, View, Accordion, Paragraph, Square } from 'tamagui'

export default function TabTwoScreen() {
  return (
    <View flex={1} alignItems="center" justifyContent="center" bg="$background">
      <Text fontSize={20} pb="$4">
        History
      </Text>
      <Accordion overflow="hidden" width="$20" type="multiple">
        <Accordion.Item value="a1">
          <Accordion.Trigger flexDirection="row" justifyContent="space-between">
            {({
              open,
            }: {
              open: boolean
            }) => (
              <>
                <Paragraph>1. Take a cold shower</Paragraph>
                <Square animation="quick" rotate={open ? '180deg' : '0deg'}>
                  <ChevronDown size="$1" />
                </Square>
              </>
            )}
          </Accordion.Trigger>
          <Accordion.HeightAnimator animation="medium">
            <Accordion.Content animation="medium" exitStyle={{ opacity: 0 }}>
              <Paragraph>
                Cold showers can help reduce inflammation, relieve pain, improve
                circulation, lower stress levels, and reduce muscle soreness and fatigue.
              </Paragraph>
            </Accordion.Content>
          </Accordion.HeightAnimator>
        </Accordion.Item>
      </Accordion>
    </View>
  )
}
