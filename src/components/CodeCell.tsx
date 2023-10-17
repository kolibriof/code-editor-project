import { useEffect } from "react";
import { CodeEditor } from "./CodeEditor";
import { Preview } from "./Preview";
import { Resizable } from "../utils/resizable-componets/Resizable";
import { useAppDispatch, useAppSelector } from "../state/helpers/hooks";
import React from "react";
import { Cell } from "../state/helpers/cell";
import { updateCell } from "../state/cellsReducer";
import { bundleCode } from "../state/bundlesReducer";
import "../styles/code-cell.css";

interface CodeCellProps {
	cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
	const bundleResult = useAppSelector((store) => store.bundle);

	const cumulativeCode = useAppSelector((store) => {
		const { data, order } = store.cell;
		const codeData = order.map((id) => {
			return data[id];
		});
		const showFunc = `
		 import _React from "react";
		 import _ReactDOM from "react-dom";

		 var show = (arg) => {
	            if (arg) {
		              if (typeof arg === "object") {
                    if (arg.$$typeof && arg.props) {
                      _ReactDOM.createRoot(document.querySelector("#root")).render(arg)        
                    } else {
			              document.getElementById("root").innerHTML = JSON.stringify(arg);
                    }
		              } else {
                      document.getElementById("root").innerHTML = arg;
                  }
                
	          } 
        }`;
		const showFuncNoop = "var show = () => {}";
		const cumulativeCode = [];
		for (let i of codeData) {
			if (i.type === "code") {
				if (i.id === cell.id) {
					cumulativeCode.push(showFunc);
				} else {
					cumulativeCode.push(showFuncNoop);
				}
				cumulativeCode.push(i.content);
			}
			if (i.id === cell.id) {
				break;
			}
		}
		return cumulativeCode;
	});

	const dispatch = useAppDispatch();
	useEffect(() => {
		if (!bundleResult) {
			dispatch(
				bundleCode({ cellID: cell.id, input: cumulativeCode.join("\n") }),
			);
		}
		const timer = setTimeout(async () => {
			dispatch(
				bundleCode({ cellID: cell.id, input: cumulativeCode.join("\n") }),
			);
		}, 750);
		return () => {
			clearTimeout(timer);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [cell.content, cell.id, cumulativeCode.join("\n")]);

	const getCodePreview = (type: string) => {
		switch (type) {
			case "code":
				return bundleResult[cell.id] ? bundleResult[cell.id].code : "";
			case "text":
				return bundleResult[cell.id] ? bundleResult[cell.id].error : "";
		}
	};
	return (
		<>
			<Resizable direction='y'>
				<div
					style={{
						height: "100%",
						display: "flex",
						flexDirection: "row",
						alignItems: "center",
					}}
				>
					<Resizable direction='x'>
						<CodeEditor
							initialValue={cell.content!}
							onChange={(value) =>
								dispatch(updateCell({ id: cell.id, content: value }))
							}
						/>
					</Resizable>
					{bundleResult[cell.id]?.loading || !bundleResult ? (
						<div className='progress-cover'>
							<progress
								className='progress is-small is-primary'
								max='100'
							></progress>
						</div>
					) : (
						<Preview
							code={getCodePreview("code")!}
							status={getCodePreview("text")}
						/>
					)}
				</div>
			</Resizable>
		</>
	);
};

export default CodeCell;
