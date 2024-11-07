import "./css/style.css";

import FullList from "./model/FullList";
import ListItem from "./model/ListItem";
import ListTemplate from "./templates/ListTemplate";

const initApp = (): void => {

  const fullList: FullList = FullList.instance;
  const listTemplate: ListTemplate = ListTemplate.instance;

  const itemEntryForm = document.querySelector("#itemEntryForm") as HTMLFormElement;
  itemEntryForm.addEventListener("submit", (e: SubmitEvent): void => {
    e.preventDefault();

    const input = document.querySelector("#newItem") as HTMLInputElement;
    const newEntryText: string = input.value.trim();
    if(!newEntryText.length) return;
    
    const itemId: number = fullList.list.length ? parseInt(fullList.list[fullList.list.length - 1].id) + 1 : 1;

    const newItem: ListItem = new ListItem(itemId.toString(), newEntryText);
    fullList.addItem(newItem);
    listTemplate.render(fullList);
  })

  const clearItemsBtn = document.querySelector("#clearItemsButton") as HTMLButtonElement;
  clearItemsBtn.addEventListener("click", () => {
    fullList.clearList();
    listTemplate.clear();
  })

  fullList.load();
  listTemplate.render(fullList);
}

document.addEventListener("DOMContentLoaded", initApp);