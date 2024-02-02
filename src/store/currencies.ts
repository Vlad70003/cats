import {makeAutoObservable} from "mobx";
import {Option} from "../components/select/CatRemoteTypes";

class Currencies {

    curent: Option | null = null
    constructor() {
        makeAutoObservable(this)
    }

    setCurent(data: any) {
        this.curent = data;
    }

}

export default new Currencies();