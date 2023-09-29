import { ResizableBox } from "react-resizable";
import "../../styles/resizable.css"

interface ResizableProp {
    direction: 'y' | 'x';
}

export const Resizable: React.FC<ResizableProp> = ({ direction, children }) => {
    return (
        <ResizableBox axis={direction} height={200} width={Infinity} resizeHandles={['s']} maxConstraints={[Infinity, window.innerHeight * 0.9]} minConstraints={[Infinity, window.innerHeight * 0.1]}>
            {children}
        </ResizableBox>
    )
}