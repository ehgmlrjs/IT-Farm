import {SearchOutlined,ShoppingOutlined,HomeOutlined, KeyOutlined, StopOutlined  } from '@ant-design/icons'
import styles from './header.module.css'
import { IHeaderPageUIProps } from './header.types'


export default function HeaderPageUI(props:IHeaderPageUIProps):JSX.Element {
    return(
         <div className={`${styles.body} ${props.visible ? '' : styles.hidden}`}>
            <div onClick={props.onClickPurchase} className={styles.headerTitle}>
                IT-Farm
            </div>
            <div className={styles.headerInfoContainer}>
                <div className={styles.infoBox1}>
                </div>
                <div className={styles.infoBox2}>
                    <div className={styles.categorieBox}>
                        상품목록
                    </div>
                    <div className={styles.categorieBox}>
                        Today특가
                    </div>
                    <div className={styles.categorieBox}>
                        레시피
                    </div>
                    <div className={styles.categorieBox}>
                        EVENT
                    </div>
                    <div className={styles.categorieBox}>
                        고객센터
                    </div>
                </div>
                <div className={styles.infoBox3}>
                    <HomeOutlined onClick={props.onClickHome} className={styles.headerIcon} />
                    <SearchOutlined className={styles.headerIcon} />
                    {props.localLogin ?
                        <StopOutlined onClick = {props.onClickLogout} className={styles.headerIcon} />
                        : 
                        <KeyOutlined onClick = {props.onClickRegister} className={styles.headerIcon} />
                    }
                    <ShoppingOutlined className={styles.headerIcon} />
                </div>
            </div>
        </div> 
    )
}