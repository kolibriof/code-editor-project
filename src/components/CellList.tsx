import { useAppSelector } from "../state/helpers/hooks";
import CellListItem from "./CellListItem";
import AddCell from "./buttons/AddCell";

const CellList: React.FC = () => {
	const cells = useAppSelector(({ cell: { order, data } }) => {
		return order.map((id) => {
			return data[id];
		});
	});
	const renderedCells = cells.map((cell) => {
		return (
			<div key={cell.id}>
				<CellListItem key={cell.id} cell={cell} />
				<AddCell prevCellID={cell.id} />
			</div>
		);
	});

	return (
		<div>
			<AddCell prevCellID={null} />
			{renderedCells}
		</div>
	);
};
export default CellList;
