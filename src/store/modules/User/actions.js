import connectionAxios from "../../../configAxios/configAxios";
import { end_point_user,end_point_login,getDataLocalStorage,setKeyLocalStorage} from "../../../utils/constains";
import { handleError } from '../../../helpers/helpers';
import router from "../../../router/index";
export const getUsersAction = (async ({ commit }) => {
    try {
        const response = await connectionAxios().get(end_point_user );
        commit("SET_USERS", response.data);
        identifyUser(response.data);
        return response.data;
    } catch (e) {
   
        return e.response;
    }
});

export const registerUser = (async ({ commit }, { user }) => {
    try {
      
       let response= await connectionAxios().post(end_point_user, user);
       commit("SET_AUTH", response.data.session);
       setKeyLocalStorage('token', response.data.session.token);
       setKeyLocalStorage('id', response.data.session.id);
        return true;
    } catch (e) {
        await handleError(e.response);;
        return  false
    }
});

export const login = (async ({ commit }, { user }) => {
    try {
      
       let response= await connectionAxios().post(end_point_login, user);
       commit("SET_AUTH", response.data);
       setKeyLocalStorage('token', response.data.token);
       setKeyLocalStorage('id', response.data.id);
        return true;
    } catch (e) {
        await handleError(e.response);;
        return  false
    }
});
const identifyUser=(data)=>{
  const result=data.find(u=>u.id==getDataLocalStorage('id'));
  setKeyLocalStorage('firstName', result.email);
}
export const singOut = async ({ commit }) => {
    try {
        window.localStorage.removeItem('token');
        router.replace({
            name: "login"
        });
    } catch (err) {
        throw err;
    }
}