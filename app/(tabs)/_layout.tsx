import { Tabs } from 'expo-router'
import { useTheme } from 'tamagui'
import { Bot, FileClock } from '@tamagui/lucide-icons'

export default function TabLayout() {
  const theme = useTheme()

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.red10.val,
        tabBarStyle: {
          backgroundColor: theme.background.val,
          borderTopColor: theme.borderColor.val,
          marginBottom: 20,
          paddingTop: 16,
          paddingHorizontal: 20
        },
        headerStyle: {
          backgroundColor: theme.background.val,
          borderBottomColor: theme.borderColor.val,
        },
        headerTintColor: theme.color.val,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: '',
          headerShown: false,
          tabBarIcon:
            ({ focused }) => <Bot size={focused ? 40 : 28} color={focused ? "$orange9" : "$gray10"} />
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: '',
          tabBarIcon: ({ focused }) => <FileClock size={focused ? 40 : 28} color={focused ? "$orange9" : "$gray10"} />
        }}
      />
    </Tabs>
  )
}
