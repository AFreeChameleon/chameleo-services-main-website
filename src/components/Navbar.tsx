import classes from './Navbar.module.scss';

function Navbar({ category, username }) {
    return (
        <div className={classes.root} id="top">
            <div className={classes.list}>
                <div className={classes.listItemHeader}>
                    {category}
                </div>
                <div className={classes.listItem}>
                    {username}
                </div>
            </div>
        </div>
    )
}

export default Navbar;