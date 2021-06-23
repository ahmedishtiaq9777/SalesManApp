import React from 'react';
import Moment from 'moment';
const GetCurDate = () => {
  let strdate = Moment(new Date()).format('DD/MM/YYYY HH:mm:ss');
  console.log('curdate:', strdate);
  console.log('type:', typeof strdate);
  return strdate;
};

export default GetCurDate;
