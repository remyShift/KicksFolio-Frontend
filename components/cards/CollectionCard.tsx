import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Image, Text, View } from 'react-native';

export default function SneakerCard() {
    return (
        <View className="flex-1 bg-white rounded-md p-4 w-full h-fit gap-2 shadow-card">
            <View className="flex flex-row items-center gap-2 w-full h-24">
                <Image source={require('@/assets/images/sneaker1.jpg')} className="w-1/2 h-full rounded-md" />
                <Image source={require('@/assets/images/sneaker1.jpg')} className="w-1/2 h-full rounded-md" />
            </View>
            <View className="flex flex-row items-center gap-2 w-full h-24">
                <View className="w-1/2 h-full bg-slate-200 rounded-md flex flex-row items-center justify-center">
                    <MaterialCommunityIcons name="shoe-sneaker" size={24} color="white" />
                </View>
                <View className="w-1/2 h-full bg-slate-200 rounded-md flex flex-row items-center justify-center">
                    <MaterialCommunityIcons name="shoe-sneaker" size={24} color="white" />
                </View>
            </View>
            <View className="flex flex-row justify-between items-center">
                <Text className="font-spacemono-bold text-lg">My awesome sneaker</Text>
                <Text className="text-primary font-spacemono-bold text-lg">2 shoes</Text>
            </View>
        </View>
    );
}