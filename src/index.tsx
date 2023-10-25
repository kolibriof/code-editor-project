import "bulmaswatch/superhero/bulmaswatch.min.css";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import CellList from "./components/CellList";
import "@fortawesome/fontawesome-free/css/all.min.css";

const App = () => {
	return (
		<Provider store={store}>
			<div>
				<CellList />
			</div>
		</Provider>
	);
};

ReactDOM.render(<App />, document.querySelector("#root"));
