import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './pages/login'
import RegisterScreen from './pages/register';
import HomeScreen from './pages/home';
import InfoScreen from './pages/info';
import AddScreen from './pages/addblock';

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
                    name='info'
                    component={InfoScreen}
                    options={{ headerShown: false }} />
                <Stack.Screen
                    name='add'
                    component={AddScreen}
                    options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}