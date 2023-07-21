import { NavLink } from "react-router-dom";
import styles from "./main.module.scss"

export const Main = () => {
    return (
        <div className={styles.container}>
            <h1>Main</h1>
            <NavLink to='/posts'>Go to Posts page</NavLink>
            <NavLink to='/'>Log out</NavLink>
        </div>
    )
}