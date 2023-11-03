import { useEffect, useState, useRef, useMemo } from "react";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { loginState } from "@/src/store/states";
import throttle from "lodash/throttle";
import HeaderPageUI from "./header.presenter";
import axios from "axios";

export default function HeaderPage():JSX.Element {
    /* 내렸을때 true 올릴때 false */
    const [visible, setVisible] = useState(true);

    const beforeScrollY = useRef(0);

    const router = useRouter();

    const [localLogin, setLocalLogin] = useRecoilState(loginState)

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);
    
      const handleScroll = useMemo(
        () =>
          throttle(() => {
            const currentScrollY = window.scrollY;
            if (beforeScrollY.current < currentScrollY) {
              setVisible(false);
            } else {
              setVisible(true);
            }
            beforeScrollY.current = currentScrollY;
          }, 250),
        [beforeScrollY]
      );

    const onClickHome = ()=> {
        router.push('/')
    }

    const onClickPurchase = () => {
        router.push('/purchase')
    }

    const onClickRegister = () => {
      router.push('./register')
    }

    const onClickLogout = async () => {
      try{
        const response = await axios.post('http://localhost:8000/users/logout/', {
          id : localStorage.getItem('id')
        })

        if (response.status === 200){
          console.log("로그아웃 성공")
        }

        localStorage.setItem('loginState', 'false')
        setLocalLogin(false)
        localStorage.removeItem('accesstoken');
        localStorage.removeItem('nickname');
        localStorage.removeItem('usertype');
        localStorage.removeItem('id');
        alert('로그아웃 하였습니다.')
      }catch(error){
        console.log('error', error)
      }
      
    }

    return(
        <HeaderPageUI
            visible = {visible}
            onClickHome = {onClickHome}
            onClickPurchase = {onClickPurchase}
            onClickRegister = {onClickRegister}
            onClickLogout = {onClickLogout}
            localLogin = {localLogin}
         />
    )
}