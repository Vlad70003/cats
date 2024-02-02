import React, {useState} from 'react';
import CatWrapper from "../components/wrapper/catWrapper/CatWrapper";
import {WrapperSizesEnum} from "../services/emun/wrapperSizes";
import BaseHeading from "../components/heading/base/BaseHeading";
import CatRemoteSelect from "../components/select/CatRemoteSelect";
import Kat from "../assets/img/Kitten.png";
import CatDndWrapper from "../components/wrapper/catDndWrapper/CatDndWrapper";
import {observer} from "mobx-react-lite";
import currencies from "../store/currencies";
import {Option} from "../components/select/CatRemoteTypes";
import {SelectType} from "../services/emun/selectType";
import styles from "./MainPage.module.scss"


const MainPage = observer(() => {

    const [prepare, setPrepare] = useState<boolean>(false);

    const handleMonthSelect = (value: Option) => {
        currencies.setCurent(value);
    };

    const changeSelectType = (settings: string) => {
        localStorage.setItem('select-type', settings);
        window.location.reload();
    }

    const getSelectType = () => {
        return localStorage.getItem('select-type');
    }

    const isLazyLoad = () => {
        return getSelectType() === SelectType.lazyLoad || false
    }

    const changePrepare = (status: boolean) => {
        setPrepare(status)
    }


    return (
        <>
            <main className={styles.mainPage} >
                <CatWrapper size={WrapperSizesEnum.base}>
                    <div
                        className={styles.headWrapper}
                    >
                        <div className="flex column">
                            <div className={styles.headingWrapper}>
                                <BaseHeading></BaseHeading>
                            </div>
                            <div className={styles.remoteSelectWrapper}>
                                <CatRemoteSelect
                                    value={currencies.curent}
                                    url="https://api.coinbase.com/v2/currencies"
                                    onChange={handleMonthSelect}
                                    placeholder="Выберите валюту"
                                    lazyLoad={isLazyLoad()}
                                    prepare={prepare}
                                    changePrepare={changePrepare}
                                ></CatRemoteSelect>
                                <div className={styles.btnWrapper}>
                                    {[SelectType.default, SelectType.lazyLoad]?.map((item) => {
                                        return <button
                                            onClick={() => changeSelectType(item)}
                                            key={item}
                                        >{item}</button>
                                    })}

                                </div>
                            </div>
                        </div>
                        <div className={styles.catWrapper}>
                            <img
                                src={Kat}
                                alt="kat"
                            />
                        </div>
                    </div>
                </CatWrapper>
                <CatDndWrapper
                    startHeight="50%"
                    dnd
                >
                    <CatWrapper
                        size={WrapperSizesEnum.medium}
                        centerHeight
                    >
                        <div
                            className={`${styles.currenciesName} kreon-400`}
                        >
                            {currencies.curent?.name || ''}
                        </div>
                    </CatWrapper>
                </CatDndWrapper>
            </main>
        </>
    );
})

export default MainPage;