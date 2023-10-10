import { Cell } from "../state/helpers/cell"
import ActionBar from "./ActionBar";
import CodeCell from "./CodeCell";
import TextEditor from "./TextEditor";
import "../styles/cell-list-item.css"

interface CellListItemProps {
    cell: Cell
}

const CellListItem: React.FC<CellListItemProps> = ({ cell }) => {
    if (cell.type === "code") {
        return (
            <div className="cell-list-item">
                <div className="action-bar-wrapper">
                    <ActionBar id={cell.id} />
                </div>
                <CodeCell cell={cell} />
            </div >

        )
    }
    return (
        <div className="cell-list-item">
            <ActionBar id={cell.id} />
            <TextEditor cell={cell} />
        </div >

    )
}
export default CellListItem