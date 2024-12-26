import { Text, View } from 'react-native';

export default function ErrorMsg({ content, display }: { content: string, display: boolean }) {
    return (
        <View className="absolute w-full flex items-center" style={{ top: -50 }}>
            <Text className={`text-red-500 font-spacemono-bold ${display ? 'block' : 'hidden'}`}>
                {content}
            </Text>
        </View>
    );
}