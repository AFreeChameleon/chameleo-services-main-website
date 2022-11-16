import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { 
    Button, 
    Typography, 
    Box 
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { setContainerTier } from '../../../../redux/container/auth/config/actions';

import classes from './CreateContainerPricing.module.scss';

type CreateContainerPricingProps = {
    changeSelectedPage: (val: number) => void;
    dispatchSetContainerTier: (value: string) => void;
    dispatchSetContainerLocation: (value: string) => void;
}

class CreateContainerPricing extends React.Component<CreateContainerPricingProps> {
    constructor(props) {
        super(props);

        this.selectPlan = this.selectPlan.bind(this);
    }

    selectPlan(plan) {
        const { changeSelectedPage, dispatchSetContainerTier } = this.props;
        dispatchSetContainerTier(plan);
        changeSelectedPage(2);
    }

    render() {
        const { changeSelectedPage } = this.props;
        return (
            <div className={classes.root}>
                <div className={classes.backButtonContainer}>
                    <Button
                        variant="outlined"
                        color="primary"
                        startIcon={<ArrowBackIcon/>}
                        onClick={(e) => changeSelectedPage(0)}
                        sx={{
                            marginTop: '20px'
                        }}
                    >
                        BACK
                    </Button>
                </div>
                <div className={classes.cards}>
                    <Box component="div" sx={{ boxShadow: 2, '&:hover': { boxShadow: 4 } }} className={classes.card} onClick={(e) => this.selectPlan('Hobby')}>
                        <Typography
                            component="div"
                            variant="h3"
                            color="textPrimary"
                            className={`${classes.cardTitle} ${classes.letterSpacing}`}
                            sx={{ color: 'text.secondary' }}
                        >
                            Hobby
                        </Typography>
                        <Box component="div" sx={{ color: 'primary.main' }} className={classes.cardPrice}>
                            <Typography
                                className={`${classes.cardPriceValue} ${classes.letterSpacing}`}
                            >
                                $5
                            </Typography>
                            <Typography
                                variant="h3"
                                className={`${classes.cardPricePeriod} ${classes.letterSpacing}`}
                            >
                                /mo
                            </Typography>
                        </Box>
                        <Typography
                            className={`${classes.cardPriceHour} ${classes.letterSpacing}`}
                        >
                            $0.007/hour
                        </Typography>
                        <hr className={classes.separator} />
                        <Typography
                            variant="body1"
                            className={classes.letterSpacing}
                            gutterBottom
                        >
                            <strong>40,000</strong> users
                        </Typography>
                        <Typography
                            variant="body1"
                            className={classes.letterSpacing}
                            gutterBottom
                        >
                            <strong>512MB</strong> memory
                        </Typography>
                        <Typography
                            variant="body1"
                            className={classes.letterSpacing}
                            gutterBottom
                        >
                            <strong>1</strong> vCPU
                        </Typography>
                    </Box>
                    <Box component="div" sx={{ boxShadow: 2, '&:hover': { boxShadow: 4 } }} className={classes.card} onClick={(e) => this.selectPlan('Entrepreneur')}>
                        <Typography
                            component="div"
                            variant="h3"
                            color="textPrimary"
                            className={`${classes.cardTitle} ${classes.letterSpacing}`}
                            sx={{ color: 'text.secondary' }}
                        >
                            Entrepreneur
                        </Typography>
                        <Box component="div" sx={{ color: 'primary.main' }} className={classes.cardPrice}>
                            <Typography
                                className={`${classes.cardPriceValue} ${classes.letterSpacing}`}
                            >
                                $15
                            </Typography>
                            <Typography
                                variant="h3"
                                className={`${classes.cardPricePeriod} ${classes.letterSpacing}`}
                            >
                                /mo
                            </Typography>
                        </Box>
                        <Typography
                            className={`${classes.cardPriceHour} ${classes.letterSpacing}`}
                        >
                            $0.021/hour
                        </Typography>
                        <hr className={classes.separator} />
                        <Typography
                            variant="body1"
                            className={classes.letterSpacing}
                            gutterBottom
                        >
                            <strong>Unlimited</strong> users
                        </Typography>
                        <Typography
                            variant="body1"
                            className={classes.letterSpacing}
                            gutterBottom
                        >
                            <strong>2GB</strong> memory
                        </Typography>
                        <Typography
                            variant="body1"
                            className={classes.letterSpacing}
                            gutterBottom
                        >
                            <strong>1</strong> vCPUs
                        </Typography>
                    </Box>
                    <Box component="div" sx={{ boxShadow: 2, '&:hover': { boxShadow: 4 } }} className={classes.card} onClick={(e) => this.selectPlan('Professional')}>
                        <Typography
                            component="div"
                            variant="h3"
                            color="textPrimary"
                            className={`${classes.cardTitle} ${classes.letterSpacing}`}
                            sx={{ color: 'text.secondary' }}
                        >
                            Professional
                        </Typography>
                        <Box component="div" sx={{ color: 'primary.main' }} className={classes.cardPrice}>
                            <Typography
                                className={`${classes.cardPriceValue} ${classes.letterSpacing}`}
                            >
                                $25
                            </Typography>
                            <Typography
                                variant="h3"
                                className={`${classes.cardPricePeriod} ${classes.letterSpacing}`}
                            >
                                /mo
                            </Typography>
                        </Box>
                        <Typography
                            className={`${classes.cardPriceHour} ${classes.letterSpacing}`}
                        >
                            $0.028/hour
                        </Typography>
                        <hr className={classes.separator} />
                        <Typography
                            variant="body1"
                            className={classes.letterSpacing}
                            gutterBottom
                        >
                            <strong>Unlimited</strong> users
                        </Typography>
                        <Typography
                            variant="body1"
                            className={classes.letterSpacing}
                            gutterBottom
                        >
                            <strong>4GB</strong> memory
                        </Typography>
                        <Typography
                            variant="body1"
                            className={classes.letterSpacing}
                            gutterBottom
                        >
                            <strong>2</strong> vCPUs
                        </Typography>
                    </Box>
                </div>
                <div className={`${classes.cards}`}>
                    <Box component="div" sx={{ boxShadow: 2, '&:hover': { boxShadow: 4 } }} className={classes.card} onClick={(e) => this.selectPlan('Enterprise')}>
                        <Typography
                            component="div"
                            variant="h3"
                            color="textPrimary"
                            className={`${classes.cardTitle} ${classes.letterSpacing}`}
                            sx={{ color: 'text.secondary' }}
                        >
                            Enterprise
                        </Typography>
                        <Box component="div" sx={{ color: 'primary.main' }} className={classes.cardPrice}>
                            <Typography
                                className={`${classes.cardPriceValue} ${classes.letterSpacing}`}
                            >
                                $55
                            </Typography>
                            <Typography
                                variant="h3"
                                className={`${classes.cardPricePeriod} ${classes.letterSpacing}`}
                            >
                                /mo
                            </Typography>
                        </Box>
                        <Typography
                            className={`${classes.cardPriceHour} ${classes.letterSpacing}`}
                        >
                            $0.014/hour
                        </Typography>
                        <hr className={classes.separator} />
                        <Typography
                            variant="body1"
                            className={classes.letterSpacing}
                            gutterBottom
                        >
                            <strong>Unlimited</strong> users
                        </Typography>
                        <Typography
                            variant="body1"
                            className={classes.letterSpacing}
                            gutterBottom
                        >
                            <strong>8GB</strong> memory
                        </Typography>
                        <Typography
                            variant="body1"
                            className={classes.letterSpacing}
                            gutterBottom
                        >
                            <strong>4</strong> vCPUs
                        </Typography>
                    </Box>
                    <Box component="div" sx={{ boxShadow: 2, '&:hover': { boxShadow: 4 } }} className={classes.card} onClick={(e) => this.selectPlan('global')}>
                        <Typography
                            component="div"
                            variant="h3"
                            color="textPrimary"
                            className={`${classes.cardTitle} ${classes.letterSpacing}`}
                            sx={{ color: 'text.secondary' }}
                        >
                            Global
                        </Typography>
                        <Box component="div" sx={{ color: 'primary.main' }} className={classes.cardPrice}>
                            <Typography
                                className={`${classes.cardPriceValue} ${classes.letterSpacing}`}
                            >
                                $125
                            </Typography>
                            <Typography
                                variant="h3"
                                className={`${classes.cardPricePeriod} ${classes.letterSpacing}`}
                            >
                                /mo
                            </Typography>
                        </Box>
                        <Typography
                            className={`${classes.cardPriceHour} ${classes.letterSpacing}`}
                        >
                            $0.021/hour
                        </Typography>
                        <hr className={classes.separator} />
                        <Typography
                            variant="body1"
                            className={classes.letterSpacing}
                            gutterBottom
                        >
                            <strong>Unlimited</strong> users
                        </Typography>
                        <Typography
                            variant="body1"
                            className={classes.letterSpacing}
                            gutterBottom
                        >
                            <strong>2GB</strong> memory
                        </Typography>
                        <Typography
                            variant="body1"
                            className={classes.letterSpacing}
                            gutterBottom
                        >
                            <strong>1</strong> vCPUs
                        </Typography>
                    </Box>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({
    dispatchSetContainerTier: (value: string) => dispatch(setContainerTier(value)),
})

export default compose<any>(
    connect(mapStateToProps, mapDispatchToProps)
)(CreateContainerPricing);