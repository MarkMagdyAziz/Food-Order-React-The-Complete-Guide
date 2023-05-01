import React, { Component, useState } from 'react';

const ModalContext = React.createContext({
 isShow:false,
 showHandler:()=>{},
 hideHandler:()=>{}
})

export const ModalContextProvider = (props) => {
    const [ isShow, setIsShow ] = useState( false );

    const showHandler = () =>
    {
        setIsShow( true );
    };
    const hideHandler = () =>
    {
        setIsShow( false );
    }
    return (
        <ModalContext.Provider value={{isShow,showHandler,hideHandler}}>
            {props.children}
        </ModalContext.Provider>
    );
}


export default ModalContext