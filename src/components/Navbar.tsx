import { makeStyles } from '@material-ui/core/styles';
import navbarStyles from '../styles/dashboard/components/navbarStyles';

function Navbar({ category, username }) {
    const classes = makeStyles(navbarStyles)();
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