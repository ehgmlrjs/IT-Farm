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
    const [usertype, setUsertype] = useState('')

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

    useEffect(() => {
      if (localStorage.getItem('usertype') === 'admin'){
        setUsertype('admin')
      }else {
        setUsertype('')
      }
    },[usertype])

    const onClickLogout = async ()=> {
        try{
          const response = await axios.delete('http://localhost:8000/users/logout/')

        if (response.status === 200){
          console.log("로그아웃 성공")
        }

          localStorage.setItem('loginState', 'false')
          setLocalLogin(false)
          localStorage.removeItem('nickname');
          localStorage.removeItem('usertype');
          localStorage.removeItem('id');
          router.push('/')
          }catch(error){
            console.log('error',error)
          }
    }

    const onClickLogo = () => {
      router.push('/seller')
    }

    const onClickMy = () => {
      router.push(`/seller/my/${localStorage.getItem('id')}`)
    }

    const onClickCenter = () => {
      router.push('/center')
    }

    return(
        <SellerHeaderPageUI
            visible = {visible}
            onClickLogout = {onClickLogout}
            onClickLogo = {onClickLogo}
            onClickMy = {onClickMy}
            usertype = {usertype}
            onClickCenter = {onClickCenter}
         />
    )
}