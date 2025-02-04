declare class InsuraceApi {
    static fetchCoverables(netId: any): Promise<object>;
    static getCurrencyList(_networkId: any): Promise<any>;
    static getCoverPremium(web3: any, amount: any, currency: any, period: any, protocolId: any, owner: any): Promise<any>;
    static getMultipleCoverPremiums(web3: any, amounts: any[], currency: any, periods: any[], protocolIds: any[]): Promise<any>;
    static confirmCoverPremium(chainSymbol: any, params: any): Promise<any>;
    static formatQuoteDataforInsurace(amount: any, currency: any, web3: any, protocol: any): Promise<{
        error: string;
        amountInWei?: undefined;
        currency?: undefined;
        selectedCurrency?: undefined;
    } | {
        amountInWei: any;
        currency: any;
        selectedCurrency: any;
        error?: undefined;
    }>;
    static formatCapacity(_currency: any, _quoteCapacity: any, _chain: any): any;
    static fetchInsuraceQuote(web3: any, amount: string | number, currency: string, period: number, protocol: any): Promise<object>;
}
export default InsuraceApi;
