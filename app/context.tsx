import React, { useEffect } from "react";
import { createContext, useState } from "react";

export const MenuContext = createContext({
    displayMenu: (e: {
        key: string;
        preventDefault: () => void;
    }, coords?: { x: number, y: number }) => { },
    closeMenu: () => { },
    showMenu: {
        show: false,
        coords: {
            x: 700, y: 20
        },
        currentOption: 0
    },
    setHighlightedCords: (x: number, y: number) => { },
    handleSelection: () => { },
    mouseOver: false,
    setMouseOver: (bool: boolean) => { },
    selection: '',
    handleMouseOver: (currentOption: number) => { },

})

export const MenuProvider = ({ children }: { children: React.ReactNode }) => {
    const [mouseOver, setMouseOver] = useState(false);
    const [selection, setSelection] = useState('');
    const [showMenu, setShowMenu] = useState({
        show: false, coords: {
            y: 0,
            x: 0
        },
        currentOption: 0
    })

    const displayMenu = (e: { key: string; preventDefault: () => void; }, coords?: { x: number, y: number }) => {

        
        if (showMenu.show) {
            if (e.key === 'ArrowUp') {
                e.preventDefault();
                if (showMenu.currentOption > 0) {
                    console.log('up')
                    setShowMenu(prev => {
                        return {
                            ...prev,
                            ['currentOption']: (prev.currentOption--)
                        }
                    });

                }
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                if (showMenu.currentOption < 2) {
                    console.log('down')
                    setShowMenu(prev => {
                        return {
                            ...prev,
                            ['currentOption']: (prev.currentOption++)
                        }
                    });
                }
            } else if (e.key === 'Enter') {
                e.preventDefault();
                handleSelection();
            }

        } else {
            if (e.key === "/" ) {
                e.preventDefault();
                setShowMenu(prev => {
                    return {
                        ...prev,
                        ['show']: true,
                    }
                });

            }
            if (e.key === "w" ) {
                e.preventDefault();
                setShowMenu(prev => {
                    return {
                        ...prev,
                        ['show']: true,
                        ['currentOption']:0
                    }
                });
                setSelection('This is a test of option 1')

            }
            if (e.key === "e" ) {
                e.preventDefault();
                setShowMenu(prev => {
                    return {
                        ...prev,
                        ['show']: true,
                        ['currentOption']:1
                    }
                });
                setSelection('This is a test of option 2')

            }
            if (e.key === "r" ) {
                e.preventDefault();
                setShowMenu(prev => {
                    return {
                        ...prev,
                        ['show']: true,
                        ['currentOption']:2
                    }
                });
                setSelection('This is a test of option 3')

            }

        };


        if (coords)
            setShowMenu(prev => {
                return {
                    ...prev,
                    ['show']: true,
                    ['coords']: coords
                }
            });
    }
    const updateHighlightedCords = (x: number, y: number) => {
        setShowMenu(prev => {
            return {
                ...prev,
                ['coords']: { x, y }
            }
        });
    }
    const closeMenu = () => {
        setShowMenu(prev => {
            return {
                ...prev,
                ['show']: false,
                ['currentOption']: 0
            }
        });
    }
    const handleSelection = () => {
        console.log('This is a test of option 1')
        switch (showMenu.currentOption) {
            case 0:
                setSelection('This is a test of option 1')
                break;
            case 1:
                setSelection('This is a test of option 2')
                break;
            case 2:
                setSelection('This is a test of option 3')
                break;
            default:
                setSelection('')
                break;
        }
        closeMenu()
    }

    const handleMouseOver = (currentOption: number) => {
        setShowMenu(prev => {
            return {
                ...prev,
                ['currentOption']: currentOption
            }
        });
    }

    useEffect(() => {
        const viewportHeight = window.innerHeight * 20 / 100;
        const viewportWidth = window.innerWidth * 40 / 100;
        updateHighlightedCords(viewportWidth, viewportHeight);
    }, [])
    return <MenuContext.Provider value={{ selection, handleMouseOver, mouseOver, setMouseOver, handleSelection, displayMenu, closeMenu, showMenu, setHighlightedCords: updateHighlightedCords }}>
        {children}
    </MenuContext.Provider>

}