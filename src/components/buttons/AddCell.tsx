import "../../styles/add-cell.css";
import { useAppDispatch, useAppSelector } from "../../state/helpers/hooks";
import { insertCellAfter } from "../../state/cellsReducer";

interface AddCellProps {
	prevCellID: string | null;
}

const AddCell: React.FC<AddCellProps> = ({ prevCellID }) => {
	const dispatch = useAppDispatch();
	const { order } = useAppSelector((store) => store.cell);
	return (
		<div className={`add-cell ${order.length <= 0 && `no-cells`}`}>
			<div className='add-buttons'>
				<button
					className='button is-rounded is-primary is-small'
					onClick={() =>
						dispatch(insertCellAfter({ id: prevCellID, type: "code" }))
					}
				>
					<span className='icon is-small'>
						<i className='fas fa-plus'></i>
					</span>
					<span>Code</span>
				</button>
				<button
					className='button is-rounded is-primary is-small'
					onClick={() =>
						dispatch(insertCellAfter({ id: prevCellID, type: "text" }))
					}
				>
					<span className='icon is-small'>
						<i className='fas fa-plus'></i>
					</span>
					<span>Text</span>
				</button>
			</div>
			<div className='divider'></div>
		</div>
	);
};

export default AddCell;
