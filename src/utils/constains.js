export const base_url = "https://apidev.kanvas.dev/v1";
export const end_point_user = "/users";
export const end_point_login = "/auth";
export const setKeyLocalStorage=(key,data)=>{
    window.localStorage.setItem(key, data);
}
export const getDataLocalStorage=(key)=>{
    
    return window.localStorage.getItem(key);
}