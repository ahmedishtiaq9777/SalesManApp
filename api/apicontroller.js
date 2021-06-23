import React from 'react';
import instance from './axios';
class ApiController {
  constructor() {}

  Login = async (username, password) => {
    var responce = await instance.post('/Api/Login', {
      username: username,
      password: password,
    });
    let result = responce.data.result;
    let salemanid = responce.data.salesmanId;

    if (responce.data.result == 'success') {
      console.log('inresponce:', result);
      return salemanid;
    } else if (responce.data.result == 'notmatch') {
      console.log('result:', result);
      return '0';
    } else {
      return '0';
    }

    /*
      .then(responce => {
        let result = responce.data.result;
        if (responce.data.result == 'success') {
          console.log('inresponce:', result);
          return '1';
        } else {
          console.log('result:', result);
          return '0';
        }
      })
      .catch(error => {
        return 'error:' + error;
      });
      */
  };

  getproductofContainer = async value => {
    let responce = await instance.post('/Api/GetproductofContainer', {
      containerid: value,
    });
    let result = responce.data;
    return result;
  };
  getsaleofSaleman = async salemanid => {
    let responce = await instance.post('/Api/getSaleofSalesman', {
      saleman: salemanid,
    });
    let result = responce.data;
    return result;
  };
  getsaledetailofSaleman = async salemanId => {
    let responce = await instance.post('/Api/getSaleDetailsofsalesman', {
      saleman: salemanId,
    });
    let result = responce.data;
    return result;
  };
  getremainingRecoveryofSaleman = async salemanId => {
    let responce = await instance.post('/Api/PendingRecoveriesOfSalesman', {
      saleman: salemanId,
    });
    let result = responce.data;
    return result;
  };
  billviseReceiving = async (item, salesmanId, amount, strdate) => {
    let responce = await instance.post('/Api/BillviseReceiving', {
      billno: item.billno,
      shopid: item.shopid,
      salemanid: salesmanId,
      receivingamount: amount,
      curdate: strdate,
    });
    let result = responce.data;
    return result;
  };
  getReceivingLogsofSalesman = async salesmanId => {
    let responce = await instance.post('/Api/getReceivingLogOfSaleman', {
      saleman: salesmanId,
    });
    let result = responce.data;
    return result;
  };
}
export default ApiController;
