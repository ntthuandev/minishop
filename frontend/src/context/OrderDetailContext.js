import { createContext, useContext, useState } from "react";
import OrderDetailAdminPage from "../pages/AdminPages/OrderAdminPage/OrderDetailAdminPage";

const OrderDetailContext = createContext(
    {
        openOrderDetail: () => {},
        closeOrderDetail: () =>{},
        setIdOrder: () =>{},
        idOrder:"",
    }

)
export function useOrderDetail() {
    return useContext(OrderDetailContext)
}
export function OrderDetailProvider({children}) {
    const [isOpen, setIsOpen] = useState(false);
    const [idOderDetail, setIdOrderDetail]  = useState()

    const closeOrderDetail = () => setIsOpen(false);
    const openOrderDetail = () => setIsOpen(true)

    const setIdOrder = (id) => setIdOrderDetail(id);

    return(
        <OrderDetailContext.Provider value={{
            closeOrderDetail,
            openOrderDetail,
            setIdOrder,
 
        }}>
            {children}
            {isOpen && <OrderDetailAdminPage  isOpen={isOpen} idOrder={idOderDetail} />}
        </OrderDetailContext.Provider>
    )
}