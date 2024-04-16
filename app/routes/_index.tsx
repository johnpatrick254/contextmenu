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
  const handleMouseUp = (e: { pageX: any; pageY: any; }) => {
    const selection = window?.getSelection()
    if (selection?.toString()) {
      const x = e.pageX;
      const y = e.pageY;
      setHighlightedCords(x, y);
    }
  }
  useEffect(() => {
    document.addEventListener('keydown', displayMenu);
    document.addEventListener("mouseup", handleMouseUp)

    return () => {
      document.removeEventListener('keydown', displayMenu);
      document.removeEventListener("mouseup", handleMouseUp)
    }

  }
    , [showMenu])
  return (
    <div
      className="bg-main overflow-y-auto flex flex-col justify-start items-center min-h-screen w-full px-[7%] py-20 "
      onClick={closeMenu}
    >
      <div
        id="canvas"
        onKeyDown={(e) => {
          const highlightedText = window.getSelection();
          if ((highlightedText && highlightedText.toString().length > 0)) {
            const selection = window?.getSelection()
            if (selection?.toString()) {
              const rect = selection.getRangeAt(0).getBoundingClientRect();
              const x = rect.right + 5;
              const y = rect.bottom;
              console.log(x, y)
              setHighlightedCords(x, y);
              displayMenu(e)
            }
          }

        }}

        onContextMenu={(e) => {
          e.preventDefault()
          const x = e.clientX
          const y = e.clientY
          displayMenu(e as any, { x, y });

        }}

        contentEditable
        className="p-4 relative mx-auto border-none rounded-sm focus:border-none focus:outline-none h-[800px] w-full bg-white md:w-3/4 lg:w-[60%] max-w-[700px]"
      >
        {
          selection
        }
      </div>
      {
        showMenu.show
        &&
        <div
          className={`w-32 space-y-2 p-1.5 z-10  bg-menu_bg rounded-sm absolute top-[${showMenu.coords.y}px] left-[${showMenu.coords.x}px] text-primary font-open-sans transition-all ease-in-out duration-300 slide-up '}`}
          style={{
            top: (showMenu.coords.y + 6) + 'px',
            left: (showMenu.coords.x + 2) + 'px',
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
