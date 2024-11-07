import FullList from "../model/FullList";

interface DOMList {
    ul: HTMLUListElement,
    clear(): void,
    render(fullList: FullList): void
}

export default class ListTemplate implements DOMList {
    static instance = new ListTemplate();
    
    private _ul: HTMLUListElement;

    private constructor() {
        this._ul = document.querySelector("#listItems") as HTMLUListElement;
    }

    get ul(): HTMLUListElement {
        return this._ul;
    }

    set ul(ul: HTMLUListElement) {
        this._ul = ul;
    }

    clear(): void {
        this._ul.innerHTML = '';
    }

    render(fullList: FullList): void {
        this.clear();
        fullList.list.forEach((listItem, i) => {
            const li: HTMLLIElement = document.createElement("li");
            li.className = "item";

            const check: HTMLInputElement = document.createElement("input");
            check.type = "checkbox";
            check.id = listItem.id;
            check.checked = listItem.checked;
            li.append(check);

            check.addEventListener("change", ()=> {
                check.checked = !check.checked;
                fullList.save();
            })

            const label: HTMLLabelElement = document.createElement("label");
            label.htmlFor = listItem.id;
            label.textContent = listItem.item;
            li.append(label);

            const button: HTMLButtonElement = document.createElement("button");
            button.className = "button";
            button.textContent = "X";
            li.append(button);

            button.addEventListener("click", () => {
                fullList.removeItem(listItem.id);
                this.render(fullList);
            })

            this._ul.append(li);
        });
    }
    


}
