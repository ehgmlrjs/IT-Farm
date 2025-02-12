export interface IHeaderPageUIProps {
    visible : boolean;
    localLogin : boolean;
    usertype : string;
    onClickHome : () => void;
    onClickPurchase : () => void;
    onClickRegister : () => void;
    onClickLogout : () => void;
    onClickCenter : () => void;
    onClickRecipe : () => void;
    onClickEvent : () => void;
    onClickPurchaseList : () => void;
    onClickSale : () => void;
    onClickBasket : () => void;
    onClickCart : () => void;
}