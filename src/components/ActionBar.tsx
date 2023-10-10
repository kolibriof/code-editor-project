import { deleteCell, moveCell } from "../state/cellsReducer";
import ActionBarButton from "./buttons/ActionBarButton";
import "../styles/action-bar.css"

interface ActionBarProps {
    id: string;
}

const ActionBar: React.FC<ActionBarProps> = ({ id }) => {
    return (
        <div className="action-bar">
            <ActionBarButton action={moveCell({ id, direction: "up" })} type="arrow-up" />
            <ActionBarButton action={moveCell({ id, direction: "down" })} type="arrow-down" />
            <ActionBarButton action={deleteCell(id)} type="times" />
        </div>
    )
}

export default ActionBar