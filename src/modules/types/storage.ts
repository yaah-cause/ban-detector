export interface Storage<T> {
    get(key: string): Promise<null | T>;
    set(key: string, data: T): Promise<T>;
    delete(key: string): Promise<boolean>;
}
