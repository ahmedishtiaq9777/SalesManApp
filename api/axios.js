import React from 'react';
import axios from 'axios';
const instance = axios.create({
  baseURL: 'http://ahmedpos1997-001-site1.etempurl.com',
});
export default instance;
