import SellerHeaderPageUI from "./sellerHeader.presenter";
import { useEffect, useState, useRef, useMemo } from "react";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { loginState } from "@/src/store/states";
import throttle from "lodash/throttle";
import axios from "axios";

export default function SellerHeaderPage():JSX.Element {
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

    const onClickLogout = async ()=> {
        const response = await axios.post('http://localhost:8000/users/logout/', {
          id : localStorage.getItem('id')
        })

        if (response.status === 201){
          console.log("로그아웃 성공")
        }

        localStorage.setItem('loginState', 'false')
        setLocalLogin(false)
        localStorage.removeItem('accesstoken');
        localStorage.removeItem('nickname');
        localStorage.removeItem('usertype');
        localStorage.removeItem('id');
        router.push('/')
    }

    const onClickLogo = () => {
      router.push('/seller')
    }

    const onClickMy = () => {
      router.push(`/seller/my/${localStorage.getItem('id')}`)
    }


    return(
        <SellerHeaderPageUI
            visible = {visible}
            onClickLogout = {onClickLogout}
            onClickLogo = {onClickLogo}
            onClickMy = {onClickMy}
         />
    )
}