import { useEffect, useState, useRef, useMemo } from "react";
import throttle from "lodash/throttle";
import { useRecoilState } from "recoil";
import { loginState } from "@/src/store/states";
import HeaderCenterPageUI from "./centerHeader.presenter";
import axios from "axios";
import { useRouter } from "next/router";

export default function CenterHeaderPage():JSX.Element{
    const router = useRouter()

    const [visible, setVisible] = useState(true);

    const beforeScrollY = useRef(0);

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

      const onClickLogout = async () => {
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
          alert('로그아웃 하였습니다.')
          router.push('/')
        }catch(error){
          console.log('error', error)
        }
      }

    const onClickBuy = () => {
      router.push('/purchase')
    }

    const onClickSell = () => {
      router.push('/seller')
    }

    const onClickApproval =() => {
      router.push('/center/approval')
    }
    
    const onClickCenter = () => {
      router.push('/center')
    }
    

    return(
        <HeaderCenterPageUI
            visible = {visible}
            localLogin = {localLogin}
            onClickLogout = {onClickLogout}
            onClickBuy = {onClickBuy}
            onClickSell = {onClickSell}
            onClickApproval = {onClickApproval}
            onClickCenter = {onClickCenter}
         />
    )
}