export class LocalStorageManager {

    public static isLoggedIn(): boolean {
        return this.getToken() != null;
    }

    public static setTokenAndUsername(token: string, username: string) {
        this.setLocalStorage("token", token);
        this.setLocalStorage("username", username);
    }

    public static getToken(): string | null{
        return this.getLocalStorage("token");
    }

    public static getUsername(): string | null{
        return this.getLocalStorage("username");
    }

    public static removeTokenAndUsername() {
        this.removeLocalStorage("token");
        this.removeLocalStorage("username");
    }

    private static setLocalStorage(key: string, value: string) {
        localStorage.setItem(key, value);
    }

    private static getLocalStorage(key: string): string | null{
        return localStorage.getItem(key);
    }

    private static removeLocalStorage(key: string) {
        localStorage.removeItem(key);
    }
}
