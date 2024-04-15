import type { MetaFunction } from "@remix-run/node";
import { useContext, useEffect, useRef, useState } from "react";
import copy from "../icons/copy.svg"
import paste from "../icons/paste.svg"
import cut from "../icons/cut.svg"
import { MenuContext } from "~/context";

export const meta: MetaFunction = () => {
  return [
    { title: "Command Interface Test" },
    { name: "description", content: "Welcome to command interface test!" },
  ];
};
export const options = [
  { label: 'Cut', icon: cut, index: 0 },
  { label: 'Copy', icon: copy, index: 1 },
  { label: 'Paste', icon: paste, index: 2 }
];
export default function Index() {

  const { selection, handleMouseOver, mouseOver, setMouseOver, handleSelection, displayMenu, closeMenu, showMenu, setHighlightedCords } = useContext(MenuContext);
  console.log('called')
  useEffect(() => {
    document.querySelector('body')?.addEventListener('keydown', displayMenu);
    document.onmouseup = function F(e) {
      const selection = window?.getSelection()
      if (selection?.toString()) {
        
        const x = e.pageX;
        const y = e.pageY;
        setHighlightedCords(x, y);
      } else {
        const viewportHeight = window.innerHeight * 20 / 100;
        const viewportWidth = window.innerWidth * 40 / 100;
        setHighlightedCords(viewportWidth, viewportHeight);
      }
    }

  }
    , [])
  return (
    <div
      className="bg-main overflow-y-auto flex justify-center items-center min-h-screen w-full"
      style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}
      onKeyDown={displayMenu}
      onClick={closeMenu}
    >
      <div
        id="canvas"
        onKeyDown={(e) => {
          const highlightedText = window.getSelection();
          if ((highlightedText && highlightedText.toString().length > 0) ) {
            e.preventDefault();
          } else {
            displayMenu(e)
          };

        }}

        onContextMenu={(e) => {
          e.preventDefault()
          const x = e.clientX
          const y = e.clientY
          displayMenu(e as any, { x, y });

        }}

        contentEditable
        className="p-6 relative mx-auto border-none rounded-sm focus:border-none focus:outline-none w-[595px] h-[80vh] bg-white"
      >{
         selection
        }
      </div>
      {
        showMenu.show
        &&
        <div
            className={`w-32 space-y-2 p-1.5 z-10  bg-menu_bg rounded-sm absolute top-[${showMenu.coords.y}px] left-[${showMenu.coords.x}px] text-primary font-open-sans transition-all ease-in-out duration-300 slide-up '}`}
          style={{
            top: (showMenu.coords.y + 2) + 'px',
            left: (showMenu.coords.x +2)+ 'px',
          }}
        >
          {
            options.map((option, i) => {
              return <div
                key={i}
                className={`flex gap-x-2 item-center hover:cursor-pointer hover:bg-secondary p-1 rounded-sm ${option.index === showMenu.currentOption && !mouseOver ? 'bg-secondary' : ''}`}
                onClick={handleSelection}
                onMouseEnter={() => {
                  setMouseOver(true);
                  handleMouseOver(i)
                }}
                onMouseLeave={() => {
                  setMouseOver(false)
                  handleMouseOver(i)
                }}
              >
                <img src={option.icon} alt={option.label} />
                {option.label}
              </div>
            })
          }
        </div>
      }
    </div >
  );
}
