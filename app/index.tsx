import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './pages/login'
import RegisterScreen from './pages/register';
import HomeScreen from './pages/home';
import InformativeScreen from './pages/informative';
import AddBlockScreen from './pages/addblock';
import BlockScreen from './pages/block';
import AddInfoScreen from './pages/addinfo';
import InformationScreen from './pages/information';
import SimulatorScreen from './pages/simulator';
import SettingsScreen from './pages/settings';

export default function App() {
    const Stack = createNativeStackNavigator();
    return (
        <NavigationContainer independent = {true}>
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
                    name='information'
                    component={InformationScreen}
                    options={{ headerShown: false }} />
                <Stack.Screen
                    name='simulator'
                    component={SimulatorScreen}
                    options={{ headerShown: false }} />
                <Stack.Screen
                    name='settings'
                    component={SettingsScreen}
                    options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}