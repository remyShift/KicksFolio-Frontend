export const createCollection = async (name: string, userId: string, sessionToken: string) => {
    return fetch(`${process.env.EXPO_PUBLIC_BASE_API_URL}/users/${userId}/collection`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionToken}`,
        },
        body: JSON.stringify({ collection: { name } }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error when creating collection');
        }
        return response.json();
    });
}