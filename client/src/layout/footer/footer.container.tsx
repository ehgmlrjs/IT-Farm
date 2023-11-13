import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { loginState } from "@/src/store/states";
import FooterPageUI from "./footer.presenter";
import axios from "axios";

export default function FooterPage():JSX.Element{
    const router = useRouter()

    const [localLogin, setLocalLogin] = useRecoilState(loginState)

    const onClickHome = ()=> {
        router.push('/')
    }

    const onClickRegister = ()=> {
        router.push('/register')
    }

    const onClickBasket = () => {
        router.push('/purchase/basket/회원아이디')
      }
  
    const onClickCart = () => {
      router.push('/purchase/cart/회원아이디')
    }

    const onClickLogout = async () => {
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
    }

    return(
        <FooterPageUI
            onClickHome = {onClickHome}
            onClickRegister = {onClickRegister}
            onClickLogout = {onClickLogout}
            localLogin = {localLogin}
            onClickBasket = {onClickBasket}
            onClickCart = {onClickCart}
         />
    )
}