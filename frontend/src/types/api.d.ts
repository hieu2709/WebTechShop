export interface ApiResponse<T> {
    success: boolean;
    data: T;
    error?: string;
    message: string;
}

export interface PaginatedData<T> {
    data: T[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}
