import { View, Text, Image } from 'react-native';
import { Sneaker } from '@/types/Models';

export default function SneakerCard({ sneaker }: { sneaker: Sneaker }) {
    return (
        <View className="flex-1 bg-white rounded-md p-4 w-full h-fit gap-2 shadow-card">
            <Image source={{ uri: sneaker.images?.[0]?.url }} className="w-full h-48 rounded-md" />
            <View className="flex flex-row justify-between items-center px-1">
                <Text className="font-spacemono-bold text-lg">{sneaker.model}</Text>
                <Text className="text-primary font-spacemono-bold text-lg">{sneaker.size}US</Text>
            </View>
        </View>
    );
}