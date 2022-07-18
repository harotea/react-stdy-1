import axios from "axios";
import { LOGIN_USER } from './types';

export function loginUser(dataToSubmit) {

    //req를 reducer에 넘겨주는 작업
    const request = axios.post('/api/users/login', dataToSubmit)
      .then(response => response.data)

    return {
        type: LOGIN_USER,
        payload: request
    }

}