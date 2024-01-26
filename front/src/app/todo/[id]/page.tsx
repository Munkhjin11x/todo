
import TodoList from "../../components/AddCard";
import Navbar from "../../components/Navbar";
const Todo = () => {
    return(
        <div className="flex flex-col items-center justify-center w-full">
            <Navbar/>
        <TodoList/>
        </div>
    )
}
export default Todo