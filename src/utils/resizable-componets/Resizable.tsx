import { ResizableBox, ResizableBoxProps } from "react-resizable";
import "../../styles/resizable.css"
import { useEffect, useState } from "react";


interface ResizableProp {
    direction: 'y' | 'x';
}

export const Resizable: React.FC<ResizableProp> = ({ direction, children }) => {
    let resizableProps: ResizableBoxProps;
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });
    const [widthState, setWidthState] = useState<number>(window.innerWidth * 0.5)

    useEffect(() => {
        let timer: any;
        const listener = () => {
            if (timer) {
                clearTimeout(timer)
            }
            timer = setTimeout(() => {
                setWindowSize({
                    width: window.innerWidth,
                    height: window.innerHeight
                })
                if (window.innerWidth * 0.75 < widthState) {
                    setWidthState(window.innerWidth * 0.75)
                }
            }, 200)
        }
        window.addEventListener('resize', listener)
        return () => {
            window.removeEventListener('resize', listener)
        }
    }, [])
    switch (direction) {
        case "x":
            resizableProps = {
                className: 'resize-horizontal',
                height: Infinity,
                width: widthState,
                resizeHandles: ['e'],
                minConstraints: [windowSize.width * 0.1, Infinity],
                maxConstraints: [windowSize.width * 0.9, Infinity],
                onResizeStop: (e, data) => {
                    setWidthState(data.size.width)
                }
            }
            break;
        case "y":
            resizableProps = {
                height: windowSize.height * 0.2,
                width: Infinity,
                resizeHandles: ['s'],
                maxConstraints: [Infinity, windowSize.height * 0.9],
                minConstraints: [Infinity, windowSize.height * 0.1]
            }
            break
    }

    return (
        <ResizableBox {...resizableProps}>
            {children}
        </ResizableBox>
    )
}