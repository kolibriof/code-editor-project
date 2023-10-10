import { useAppSelector } from "../state/helpers/hooks"
import CellListItem from "./CellListItem"

const CellList: React.FC = () => {
    const cells = useAppSelector(({ cell: { order, data } }) => {
        return order.map((id) => {
            return data[id]
        })
    })
    const renderedCells = cells.map(cell => <CellListItem key={cell.id} cell={cell} />)

    return <div>{renderedCells}</div>
}
export default CellList