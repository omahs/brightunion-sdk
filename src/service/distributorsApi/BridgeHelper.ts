
import CatalogHelper from '../helpers/catalogHelper'
import CurrencyHelper from '../helpers/currencyHelper';
import RiskCarriers from '../config/RiskCarriers';
import { toWei, hexToBytes, numberToHex } from "web3-utils"


class BridgeHelper {

  static async catalogDataFormat(_stats :any, _policyBooksArr:any) {

    let trustWalletAssets: { [key: string]: any } = {};
    trustWalletAssets = await CatalogHelper.getTrustWalletAssets();

    let policyBooksArray = [];
    for (let i = 0; i < _stats.length; i++) {
      if (!_stats[i].whitelisted) {
        continue;
      }

      if( // bmiV2LevPf1Cover -> disable
        _policyBooksArr[i] == "0x421e747B172E2Cc132dD8ABd71f6F430CB7d3408"
      ){
        continue;
      }

      let asset: any = undefined;
      Object.keys(trustWalletAssets).find((key) => {
        if (key === _stats[i].insuredContract) {
          asset = trustWalletAssets[key];
        }
      });

      const name = asset ? asset.name : _stats[i][0]

      let logo =  await CatalogHelper.getLogoUrl(name, _stats[i].insuredContract, 'bridge');

      let type = CatalogHelper.commonCategory(_stats[i].contractType, 'bridge')
      let typeDescr = type ? type : 'protocol';

        policyBooksArray.push(CatalogHelper.createCoverable({
          bridgeProductAddress: _policyBooksArr[i],
          bridgeCoverable: _stats[i].insuredContract,
          protocolAddress: _stats[i].insuredContract,
          bridgeAPY: Number(_stats[i].APY) / (10 ** 5),
          logo: logo,
          name: CatalogHelper.unifyCoverName(name, 'bridge' ),
          type: type,
          typeDescription: CatalogHelper.descriptionByCategory(typeDescr),
          source: 'bridge',
          rawDataBridge: _stats[i],
          // stats: _stats,
        }))
      }

      return policyBooksArray;
  }

  static preQuoteDataFormat(_amount : any, _currency : any, _period: any ) {

    let amountInWei:any = toWei(_amount.toString(), 'ether');
    let initialBridgeCurrency: any = "USD"
    let currency = _currency;

    if (currency === 'ETH') {
      amountInWei = CurrencyHelper.eth2usd(amountInWei);
      initialBridgeCurrency = 'ETH';
    }
    currency = RiskCarriers.BRIDGE.fallbackQuotation;

    const bridgeEpochs = Math.min(52, Math.ceil(Number(_period) / 7));

    return {amountInWei, currency, bridgeEpochs, initialBridgeCurrency};

    // let quote:any = {}

  }


}

export default BridgeHelper;
