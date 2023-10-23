import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { login as loginApi } from "../../services/apiAuth";

export function useLogin(){
    const queryClient=useQueryClient();
    const navigate =useNavigate();

    const{mutate: login, isLoading} =useMutation({
        mutationFn:({email,password})=>loginApi({
        email,password}),
        
        onSuccess: (user)=>{
            queryClient.setQueryData(['user'],user.user)
            console.log(user);
            navigate('/',  { replace: true });
        },

        onError:(err)=>{
            console.log('ERROR', err);
            alert('provided email or password are incorrect')
        }
    });
    return{login, isLoading};
}