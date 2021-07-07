/* 国密加密需要的配置 */


let sm_crypto = require('sm-crypto');
const sm2_public_key = "044FDA6F371D3CBA125F80D9A78DE6D2BE75E4E65DE215BB085F1E20F188EA308BF3E6FB1E889C78B2E1F44D1953698B9A6649CB87EF375092F3A7191DC3C99CBD";

export default {
    sm2: {
        doEncrypt: function (text) { return "04" + sm_crypto.sm2.doEncrypt(text, sm2_public_key, 0); },
    }
}
