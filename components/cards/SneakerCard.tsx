import { View, Text, Image } from 'react-native';

export default function SneakerCard() {
    return (
        <View className="flex-1 bg-white rounded-md p-2 w-full h-fit gap-2 shadow-card">
            <Image source={require('@/assets/images/sneaker1.jpg')} className="w-full h-48 rounded-md" />
            <View className="flex flex-row justify-between items-center">
                <Text className="font-spacemono-bold text-lg">Asics Gel Mai x Patta</Text>
                <Text className="text-primary font-spacemono-bold text-lg">10US</Text>
            </View>
        </View>
    );
}