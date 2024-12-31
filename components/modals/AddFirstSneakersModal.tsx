import { Text, View, Pressable, Image, ImageBackground } from 'react-native';
import BackButton from '@/components/buttons/BackButton';
import NextButton from '@/components/buttons/NextButton';
import MainButton from '@/components/buttons/MainButton';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { TextInput } from 'react-native-gesture-handler';
import { useState } from 'react';
import DropdownInput from '../inputs/DropDownInput';
import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';
import { handleAddSneaker } from '@/scripts/handleSneakers';
import { useSession } from '@/context/authContext';

type AddSneakersModalProps = {
    modalStep: 'index' | 'box' | 'noBox';
    setModalStep: (step: 'index' | 'box' | 'noBox') => void;
    closeModal: () => void;
}

const BRANDS = ['Nike', 'Adidas', 'Jordan', 'New Balance', 'Asics', 'Puma', 'Reebok', 'Converse', 'Vans', ];
const STATUS = ['Stocking', 'Selling', 'Rocking'];

export const renderModalContent = ({ modalStep, setModalStep, closeModal }: AddSneakersModalProps) => {
    const [sneakerName, setSneakerName] = useState('');
    const [isSneakerNameError, setIsSneakerNameError] = useState(false);
    const [isSneakerNameFocused, setIsSneakerNameFocused] = useState(false);
    const [sneakerBrand, setSneakerBrand] = useState('');
    const [isSneakerBrandError, setIsSneakerBrandError] = useState(false);
    const [isSneakerBrandFocused, setIsSneakerBrandFocused] = useState(false);
    const [sneakerStatus, setSneakerStatus] = useState('');
    const [isSneakerStatusError, setIsSneakerStatusError] = useState(false);
    const [isSneakerStatusFocused, setIsSneakerStatusFocused] = useState(false);
    const [sneakerSize, setSneakerSize] = useState('');
    const [isSneakerSizeError, setIsSneakerSizeError] = useState(false);
    const [isSneakerSizeFocused, setIsSneakerSizeFocused] = useState(false);
    const [sneakerCondition, setSneakerCondition] = useState('');
    const [isSneakerConditionFocused, setIsSneakerConditionFocused] = useState(false);
    const [isSneakerConditionError, setIsSneakerConditionError] = useState(false);
    const [sneakerImage, setSneakerImage] = useState<string | null>(null);

    const { user, sessionToken, getUserSneakers } = useSession();
    const userId = user?.id;

    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Sorry, we need permissions to access your photos!');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: "images",
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setSneakerImage(result.assets[0].uri);
        }
    };

    const takePhoto = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            alert('Sorry, we need permissions to access your camera!');
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setSneakerImage(result.assets[0].uri);
        }
    };

    switch (modalStep) {
        case 'index':
            return (
                <>
                    <Text className="font-actonia text-primary text-4xl text-center">Add your first sneaker</Text>
                    <View className="flex-1 justify-center items-center gap-8">
                        <Text className="font-spacemono-bold text-2xl text-center">Do you have the box ?</Text>
                        <View className="flex justify-center items-center gap-4">
                            <MainButton
                                content="Yes" 
                                backgroundColor="bg-primary" 
                                onPressAction={() => setModalStep('box')} 
                            />
                            <MainButton 
                                content="No" 
                                backgroundColor="bg-gray-400" 
                                onPressAction={() => setModalStep('noBox')} 
                            />
                        </View>
                    </View>
                </>
            );
        case 'box':
            return (
                <>
                    <Text className="font-actonia text-primary text-4xl text-center">Scan your sneaker box</Text>
                    <View className="flex-1 justify-center items-center gap-8">
                        <Text className="font-spacemono-bold text-2xl text-center">Feature incoming 🚀</Text>
                        <MainButton 
                            content="Back" 
                            backgroundColor="bg-gray-400" 
                            onPressAction={() => setModalStep('index')} 
                        />
                    </View>
                </>
            );
        case 'noBox':
            return (
                <>
                    <View className="flex-1 h-full p-2 gap-4">
                        {sneakerImage ? (
                            <ImageBackground
                                source={{ uri: sneakerImage }} 
                                className="h-48 w-full rounded-md"
                                resizeMode="cover"
                                imageStyle={{ borderRadius: 10 }}
                            />
                        ) : (
                            <Pressable 
                                onPress={() => {
                                    Alert.alert(
                                        'Ajouter une photo',
                                        'Choisissez une source',
                                        [
                                            {
                                                text: 'Prendre une photo',
                                                onPress: takePhoto
                                            },
                                            {
                                                text: 'Choisir depuis la galerie',
                                                onPress: pickImage
                                            },
                                            {
                                                text: 'Annuler',
                                                style: 'cancel'
                                            }
                                        ]
                                    );
                                }}
                                className="bg-gray-400 rounded-md h-48 w-full p-4 flex items-center justify-center"
                            >
                                <MaterialIcons name="add-a-photo" size={30} color="white" />
                            </Pressable>
                        )}
                        <View className='flex flex-col gap-1 w-full justify-center'>
                            <Text className='font-spacemono-bold text-lg'>*Sneaker name :</Text>
                            <TextInput 
                                className={`bg-white rounded-md p-3 w-2/3 font-spacemono-bold ${
                                    isSneakerNameError ? 'border-2 border-red-500' : ''
                                } ${isSneakerNameFocused ? 'border-2 border-primary' : ''}`} 
                                placeholder="Air Jordan 1"
                                placeholderTextColor='gray'
                                value={sneakerName}
                                onChangeText={setSneakerName}
                                onFocus={() => setIsSneakerNameFocused(true)}
                                onBlur={() => setIsSneakerNameFocused(false)}
                            />
                        </View>
                        <View className='flex flex-col gap-1 w-full justify-center'>
                            <Text className='font-spacemono-bold text-lg'>*Brand :</Text>
                            <DropdownInput
                                value={sneakerBrand}
                                onSelect={setSneakerBrand}
                                options={BRANDS}
                                placeholder="Select a brand"
                                isError={isSneakerBrandError}
                                isFocused={isSneakerBrandFocused}
                            />
                        </View>
                        <View className="flex-row justify-between items-center w-full">
                            <View className='flex-col gap-1 justify-center w-[45%]'>
                                <Text className='font-spacemono-bold text-lg'>*Size :</Text>
                                <TextInput
                                    className={`bg-white rounded-md p-3 w-full font-spacemono-bold ${
                                        isSneakerSizeError ? 'border-2 border-red-500' : ''
                                    } ${isSneakerSizeFocused ? 'border-2 border-primary' : ''}`} 
                                    placeholder="9" 
                                    value={sneakerSize}
                                    onChangeText={setSneakerSize}
                                    onFocus={() => setIsSneakerSizeFocused(true)}
                                        onBlur={() => setIsSneakerSizeFocused(false)}
                                />
                            </View>
                            
                            <View className='flex-col gap-1 justify-center w-[45%]'>
                                <Text className='font-spacemono-bold text-lg'>*Condition :</Text>
                                <TextInput
                                    className={`bg-white rounded-md p-3 w-full font-spacemono-bold ${
                                        isSneakerConditionError ? 'border-2 border-red-500' : ''
                                    } ${isSneakerConditionFocused ? 'border-2 border-primary' : ''}`} 
                                    placeholder="9/10" 
                                    value={sneakerCondition}
                                    onChangeText={setSneakerCondition}
                                    onFocus={() => setIsSneakerConditionFocused(true)}
                                    onBlur={() => setIsSneakerConditionFocused(false)}
                                />
                            </View>
                        </View>
                        <View className='flex flex-col gap-1 w-full justify-center'>
                            <Text className='font-spacemono-bold text-lg'>*Status :</Text>
                            <DropdownInput
                                value={sneakerStatus}
                                onSelect={setSneakerStatus}
                                options={STATUS}
                                placeholder="Select a status"
                                isError={isSneakerStatusError}
                                isFocused={isSneakerStatusFocused}
                            />
                        </View>
                        <View className="flex-row gap-44 items-end w-full mt-10">
                            <BackButton 
                                onPressAction={() => setModalStep('index')} 
                            />
                            <NextButton
                                content="Add" 
                                backgroundColor="bg-primary"
                                onPressAction={async () => {
                                    await handleAddSneaker({
                                        image: sneakerImage || '',
                                        name: sneakerName,
                                        brand: sneakerBrand,
                                        size: Number(sneakerSize),
                                        condition: Number(sneakerCondition),
                                        status: sneakerStatus,
                                        userId: userId || '',
                                    }, sessionToken || null)
                                    .then(async data => {
                                        console.log('Sneaker added successfully:', data);
                                        await getUserSneakers();
                                        closeModal();
                                    })
                                    .catch(error => {
                                        console.error('Error adding sneaker:', error);
                                    });
                                }}
                            />
                        </View>
                    </View>
                </>
            );
    }
};