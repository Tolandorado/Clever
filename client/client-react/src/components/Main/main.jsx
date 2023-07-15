import { NavLink } from "react-router-dom";

export const Main = () => {
    return (
        <div className="main">
            <h1>Main</h1>
            <NavLink to='/posts'>Go to Posts page</NavLink>
        </div>
    )
}