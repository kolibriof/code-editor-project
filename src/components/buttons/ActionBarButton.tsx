import { useAppDispatch } from "../../state/helpers/hooks";
import type { AnyAction } from "@reduxjs/toolkit";

interface ActionBarButtonProps {
    type: "arrow-up" | "arrow-down" | "times";
    action: AnyAction;
}

const ActionBarButton: React.FC<ActionBarButtonProps> = ({ type, action }) => {
    const dispatch = useAppDispatch()
    return (
        <button className="button is-primary is-small" onClick={() => dispatch(action)}>
            <span className="icon">
                <i className={`fas fa-${type}`}>
                </i>
            </span>
        </button>
    )
}
export default ActionBarButton