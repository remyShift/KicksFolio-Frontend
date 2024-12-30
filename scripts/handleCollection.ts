export const createCollection = async (name: string, userId: string, sessionToken: string) => {
    fetch(`${process.env.EXPO_PUBLIC_BASE_API_URL}/users/${userId}/collection`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionToken}`,
        },
        body: JSON.stringify({ collection: { name } }),
    })
    .then(response => {
        if (!response.ok) {
            console.log(response.json())
            throw new Error('Error when creating collection');
        }
        return response.json();
    })
    .catch(error => {
        console.error(`Error when creating collection: ${error}`);
    });
};