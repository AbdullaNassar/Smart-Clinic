import { useNavigate } from "react-router-dom";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import styled from "styled-components";
import { useEffect } from "react";

const FullPage=styled.div`
height: 100vh;
background-color: var(--color-grey-50);
display: flex;
align-items: center;
justify-content: center;
`

function ProtectedRoute({children}){
    const navigate=useNavigate();

    // 1.load the authnitcated user

    const{isLoading,isAuthenticated}=useUser();


    useEffect(function(){
        if(!isAuthenticated&&!isLoading)navigate('/login')
    },[isAuthenticated,isLoading,navigate])

    // 2.while hapening, show spinner
    if(isLoading)return <FullPage><Spinner/></FullPage>
    
    //  3. if there is no authnticated user, then redirect to login page
    // if(!user)navigate('/login');
    // 4. if there is user render the app

    return children;
}
export default ProtectedRoute;