import { View, Text, Image } from 'react-native';
import { Sneaker } from '@/types/Models';

export default function SneakerCard({ sneaker }: { sneaker: Sneaker }) {
    return (
        <View className="flex-1 bg-white rounded-md p-3 w-full gap-2 shadow-card">
            <Image source={{ uri: sneaker.images?.[0]?.url }} className="w-full h-40 rounded-md" />
            <View className="flex flex-row justify-between items-center px-1">
                <Text className="font-spacemono-bold text-lg flex-1 mr-2 flex-shrink" numberOfLines={1} ellipsizeMode="tail">
                    {sneaker.model}
                </Text>
                <Text className="text-primary font-spacemono-bold text-lg flex-shrink-0">
                    {sneaker.size}US
                </Text>
            </View>
        </View>
    );
}