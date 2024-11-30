import '../tamagui-web.css'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react'
import { StatusBar, useColorScheme } from 'react-native'
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { SplashScreen, Stack } from 'expo-router'
import { Provider } from './Provider'
import WelcomeComponent from 'components/welcone-component';

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
  const colorScheme = useColorScheme()

  // useEffect(() => {
  //   const checkFirstLaunch = async () => {
  //     // const firstLaunched = await AsyncStorage.getItem('firstLaunched');
  //     if (isFirstLaunch) {//if (firstLaunched) {
  //       setIsFirstLaunch(false);
  //     } else {
  //       setIsFirstLaunch(true);
  //       // await AsyncStorage.setItem('firstLaunched', isFirstLaunch.toString());
  //     }
  //   };
  //   checkFirstLaunch();
  // }, []);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} />
      { isFirstLaunch ? (
            <WelcomeComponent onFinish={ () => setIsFirstLaunch( false ) } />
        ) : (
          <Stack>
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
