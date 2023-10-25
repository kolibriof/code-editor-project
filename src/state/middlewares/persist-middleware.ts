import { saveCells } from "../cellsReducer";

export const persistMiddleware = ({ dispatch }: { dispatch: any }) => {
	let timer: any;
	return (next: (action: any) => void) => {
		return (action: any) => {
			next(action);
			if (
				[
					"cells/updateCell",
					"cells/deleteCell",
					"cells/moveCell",
					"cells/insertCellAfter",
				].includes(action.type)
			) {
				if (timer) {
					clearTimeout(timer);
				}
				timer = setTimeout(() => {
					dispatch(saveCells());
				}, 250);
			}
		};
	};
};
