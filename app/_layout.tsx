import '../tamagui-web.css'
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginComponent from 'components/auth-component';
import { useEffect, useState } from 'react'
import { StatusBar, useColorScheme } from 'react-native'
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { SplashScreen, Stack } from 'expo-router'
import { Provider } from './Provider'
import WelcomeComponent from 'components/welcone-component';
import execute from 'service/start-timers';
import { useRouter } from 'expo-router';

export {
  ErrorBoundary,
} from 'expo-router'

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [interLoaded, interError] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  })

  useEffect(() => {
    if (interLoaded || interError) {
      SplashScreen.hideAsync()
    }
  }, [interLoaded, interError])


  if (!interLoaded && !interError) {
    return null
  }

  return (
    <Providers>
      <RootLayoutNav />
    </Providers>
  )
}

const Providers = ({ children }: { children: React.ReactNode }) => {
  return <Provider>{children}</Provider>
}

function RootLayoutNav() {
  const [isFirstLaunch, setIsFirstLaunch] = useState(true);
  const [isLoggedIn, setILoggedIn] = useState(false);
  const colorScheme = useColorScheme()
  const router = useRouter();

  useEffect(() => {
    try {
      execute();
      if (!isLoggedIn) {
        router.push('/auth/login');
      }
    } catch (error) { }
  });

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} />
      {isFirstLaunch ?
        (
          <WelcomeComponent onFinish={() => setIsFirstLaunch(false)} />
        ) : (
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen
              name="(tabs)"
              options={{
                headerShown: false,
              }}
            />
          </Stack>
        )
      }
    </ThemeProvider>
  )
}
