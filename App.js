import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './pages/login'
import RegisterScreen from './pages/register';
import HomeScreen from './pages/home';
import InformativeScreen from './pages/informative';
import AddBlockScreen from './pages/addblock';
import BlockScreen from './pages/block';
import AddInfoScreen from './pages/addinfo';
import InfoScreen from './pages/info';

export default function App() {
    const Stack = createNativeStackNavigator();
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name='login'
                    component={LoginScreen}
                    options={{ headerShown: false }} />
                <Stack.Screen
                    name='register'
                    component={RegisterScreen}
                    options={{ headerShown: false }} />
                <Stack.Screen
                    name='home'
                    component={HomeScreen}
                    options={{ headerShown: false }} />
                <Stack.Screen
                    name='informative'
                    component={InformativeScreen}
                    options={{ headerShown: false }} />
                <Stack.Screen
                    name='addblock'
                    component={AddBlockScreen}
                    options={{ headerShown: false }} />
                <Stack.Screen
                    name='block'
                    component={BlockScreen}
                    options={{ headerShown: false }} />
                <Stack.Screen
                    name='addinfo'
                    component={AddInfoScreen}
                    options={{ headerShown: false }} />
                <Stack.Screen
                    name='info'
                    component={InfoScreen}
                    options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}