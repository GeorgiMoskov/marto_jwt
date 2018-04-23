export class AppConfig {
    readonly apiUrl: string;
    readonly jwt_issuer: string;

    constructor() {
        this.apiUrl = 'http://localhost:8000/api';
        this.jwt_issuer = 'telerik';
    }
}
