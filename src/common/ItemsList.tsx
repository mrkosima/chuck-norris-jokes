import React, { ReactElement } from "react";
import "./ItemsList.css";

export interface ItemsListPros<T> {
  items: T[];
  render: (item: T) => ReactElement;
  keyProp?: keyof T;
}
export function ItemsList<T>({ items, render, keyProp }: ItemsListPros<T>) {
  return (
    <ol className="items-list">
      {items.map(item => (
        <li
          className="items-list-item"
          key={keyProp ? item[keyProp].toString() : String(item)}
        >
          {render(item)}
        </li>
      ))}
    </ol>
  );
}
