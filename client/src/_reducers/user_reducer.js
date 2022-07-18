import { LOGIN_USER } from "../_actions/types";
//이전 state와 현재 action을 다음 state로 보내는 것
//다른 타입이 올때마다 보내는 타입이 다르기 때문에 switch 문법을 이용해서 조건별로 맞게 보내준다.
export default function (state= {} , action) {
    switch (action.type) {
        case LOGIN_USER:
            return { ...state, loginSuccess: action.payload }
            break;
    
        default:
            return state;
    }
}