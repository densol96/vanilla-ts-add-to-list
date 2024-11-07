import ListItem from "./ListItem";

interface List {
    list: ListItem[],
    load(): void,
    save(): void,
    clearList(): void,
    addItem(itemObj: ListItem): void;
    removeItem(id: string): void;
}


export default class FullList implements List {

    static instance: FullList = new FullList();

    private _list: ListItem[];
    
    private constructor(list: ListItem[] = []) {
        this._list = list;
    }

    get list(): ListItem[] {
        return this._list;
    }

    load(): void {
        const loadedJSON: string | null = localStorage.getItem("list");
        if(!loadedJSON) return;
        const parsedList: {_id: string, _item: string, _checked: boolean}[] = JSON.parse(loadedJSON);
        this._list = parsedList.map(item => new ListItem(item._id, item._item, item._checked));
    }

    save(): void {
        localStorage.setItem("list", JSON.stringify(this._list));
    }

    clearList(): void {
        this._list = [];
        this.save();
    }

    addItem(itemObj: ListItem): void {
        if(itemObj) {
            this._list.push(itemObj);
            this.save();
        }
    }

    removeItem(id: string): void { 
        this._list = this._list.filter(item => item.id !== id);
        this.save();
    }
}