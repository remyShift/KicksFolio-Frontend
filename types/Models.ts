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
    brand: string;
    size: number;
    release_date: string;
    collection_id: string;
    created_at: string;
    updated_at: string;
}