import React from "react";
import "./index.scss";

import classNames from "classnames";
import { ChevronDown } from "react-bootstrap-icons";
import AppHooks from "hooks/index";
import AppStructures from "structures/index";

interface DropdownProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  items: {
    name: string;
    image: string;
  }[];
  selectedItem: {
    name: string;
    image: string;
  };
  onClick: ({ name, image }: { name: string; image: string }) => void;
}
const Dropdown: React.FC<DropdownProps> = ({ isOpen, setIsOpen, items, selectedItem, onClick }) => {
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  AppHooks.useKeypress(AppStructures.Keys.Escape, () => {
    setIsOpen(false);
  });
  AppHooks.useOnClickOutside(dropdownRef, () => {
    setIsOpen(false);
  });

  const handleOnClick = ({ name, image }: { name: string; image: string }) => {
    onClick({ name, image });
    setIsOpen(false);
  };

  return (
    <div className="chains-dropdown__wrapper" ref={dropdownRef}>
      <div className="chains-dropdown__wrapper__button" onClick={() => setIsOpen(!isOpen)}>
        <img
          className={classNames("chains-dropdown__wrapper__button__icon")}
          src={selectedItem.image}
          alt={selectedItem.name}
        />
        {selectedItem.name.charAt(0).toUpperCase() + selectedItem.name.slice(1)}
        <div
          className={classNames(
            "chains-dropdown__wrapper__button__arrow",
            isOpen && "chains-dropdown__wrapper__button__arrow--rotate",
          )}
        >
          <ChevronDown color="white" size={15} />
        </div>
      </div>
      <div className={classNames("chains-dropdown", isOpen && "chains-dropdown--open")}>
        {items.map(({ name, image }) => {
          return (
            <div key={name} className="chains-dropdown__item" onClick={() => handleOnClick({ name, image })}>
              <img className={classNames("chains-dropdown__item__image")} src={image} alt={name} height={25} />
              <div className="chains-dropdown__item__name"> {name} </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dropdown;
