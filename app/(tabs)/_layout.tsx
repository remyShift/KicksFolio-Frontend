import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Tabs } from 'expo-router';

export default function TabLayout() {
    return (
        <Tabs screenOptions={{ 
            tabBarActiveTintColor: '#F27329',
            tabBarShowLabel: false,
            tabBarStyle: {
                borderColor: 'black',
                borderTopWidth: 0.2,
                borderBottomWidth: 0,
                height: 85,
                paddingTop: 10,
            }
        }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color }) => <Ionicons name="home-outline" size={25} color={color} />,
                }}
            />
            <Tabs.Screen
                name="friends"
                options={{
                    title: 'Friends',
                    tabBarIcon: ({ color }) => <Feather name="users" size={25} color={color} />,
                }}
            />
            <Tabs.Screen
                name="wishlist"
                options={{
                    title: 'Wishlist',
                    tabBarIcon: ({ color }) => <AntDesign name="hearto" size={25} color={color} />,
                }}
            />
            <Tabs.Screen
                name="user"
                options={{
                    title: 'User',
                    tabBarIcon: ({ color }) => <Feather name="user" size={25} color={color} />,
                }}
            />
        </Tabs>
    );
}
