export type User = {
    id: string;
    email: string;
    username: string;
    first_name: string;
    last_name: string;
    sneaker_size: number;
    gender: string;
    created_at: string;
    updated_at: string;
    collection: Collection;
    friends: User[];
    sneakers: Sneaker[];
}

export type Collection = {
    id: string;
    name: string;
    user_id: string;
    created_at: string;
    updated_at: string;
}

export type Sneaker = {
    id: string;
    name: string;
    image: string;
    brand: string;
    size: number;
    condition: number;
    status: string;
    release_date: string | null;
    collection_id: string;
    created_at: string;
    updated_at: string;
    images: {
        id: string;
        url: string;
    }[];
}