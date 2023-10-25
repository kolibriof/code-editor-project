import { useAppSelector } from "../state/helpers/hooks";
import CellListItem from "./CellListItem";
import AddCell from "./buttons/AddCell";
import "../styles/cell-list.css";
import {
	deleteCell,
	fetchCells,
	insertCellAfter,
	moveCell,
	saveCells,
	updateCell,
} from "../state/cellsReducer";
import { useAppDispatch } from "../state/helpers/hooks";
import { useEffect } from "react";

const CellList: React.FC = () => {
	const cells = useAppSelector(({ cell: { order, data } }) => {
		return order.map((id) => {
			return data[id];
		});
	});
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(fetchCells());
	}, []);
	useEffect(() => {
		dispatch(saveCells());
	}, []);
	const renderedCells = cells.map((cell) => {
		return (
			<div key={cell.id}>
				<CellListItem key={cell.id} cell={cell} />
				<AddCell prevCellID={cell.id} />
			</div>
		);
	});

	return (
		<div className='cell-list'>
			<AddCell prevCellID={null} />
			{renderedCells}
		</div>
	);
};
export default CellList;
