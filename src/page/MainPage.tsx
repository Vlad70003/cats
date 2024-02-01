import React, {useState} from 'react';
import CenterWrapper from "../components/wrapper/centerWrapper/CenterWrapper";
import {WrapperSizesEnum} from "../services/emun/wrapperSizes";
import BaseHeading from "../components/heading/base/BaseHeading";
import "./MainPage.scss";
import CatRemoteSelect from "../components/select/CatRemoteSelect";


function MainPage({}) {

    const [month, setMonthValue] = useState("");
    const handleMonthSelect = (value: string) => {
        setMonthValue(value);
    };

    return (
        <>
            <main className="main-page">
                <CenterWrapper size={WrapperSizesEnum.base}>
                    <div className=" flex column main-page__inner">
                        <div className="main-page__heading-wrapper">
                            <BaseHeading></BaseHeading>
                        </div>
                        <div>
                            <CatRemoteSelect
                                value={month}
                                url="https://api.coinbase.com/v2/currencies"
                                onChange={handleMonthSelect}
                                placeholder="Выберите месяц"
                            ></CatRemoteSelect>
                        </div>
                    </div>
                </CenterWrapper>
            </main>

        </>
    );
}

export default MainPage;