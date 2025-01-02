import { useSession } from '../context/authContext';

type SneakerProps = {
    image: string;
    name: string;
    brand: string;
    size: number;
    condition: number;
    status: string;
    userId: string;
}

export const handleAddSneaker = async (sneaker: SneakerProps, sessionToken: string | null) => {
    if (!sessionToken) return;

    const formData = new FormData();
    formData.append('sneaker[model]', sneaker.name);
    formData.append('sneaker[brand]', sneaker.brand);
    formData.append('sneaker[size]', sneaker.size.toString());
    formData.append('sneaker[condition]', sneaker.condition.toString());
    formData.append('sneaker[status]', sneaker.status);
    
    const imageUriParts = sneaker.image.split('.');
    const fileType = imageUriParts[imageUriParts.length - 1];
    
    const imageFile = {
        uri: sneaker.image,
        type: 'image/jpeg',
        name: `photo.${fileType}`
    };

    formData.append('sneaker[images][]', imageFile as any);

    return fetch(`${process.env.EXPO_PUBLIC_BASE_API_URL}/users/${sneaker.userId}/collection/sneakers`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${sessionToken}`,
            'Accept': 'application/json',
        },
        body: formData,
    })
    .then(async response => {
        const text = await response.text();
        console.log(text);
        return JSON.parse(text);
    })
    .catch(error => {
        console.error('Error details:', error);
        throw error;
    });
};