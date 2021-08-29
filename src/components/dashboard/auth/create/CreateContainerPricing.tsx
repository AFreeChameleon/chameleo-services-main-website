import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import { Button, Typography } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { setContainerTier } from '../../../../redux/container/auth/config/actions';

type CreateContainerPricingProps = {
    classes: any;
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
        const { classes, changeSelectedPage } = this.props;
        return (
            <div className={classes.root}>
                <div className={classes.cards}>
                    <div className={classes.card} onClick={(e) => this.selectPlan('hobby')}>
                        <Typography
                            component="div"
                            variant="h3"
                            color="textPrimary"
                            className={`${classes.cardTitle} ${classes.letterSpacing}`}
                        >
                            Hobby
                        </Typography>
                        <div className={classes.cardPrice}>
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
                        </div>
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
                    </div>
                    <div className={classes.card} onClick={(e) => this.selectPlan('entrepreneur')}>
                        <Typography
                            component="div"
                            variant="h3"
                            color="textPrimary"
                            className={`${classes.cardTitle} ${classes.letterSpacing}`}
                        >
                            Entrepreneur
                        </Typography>
                        <div className={classes.cardPrice}>
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
                        </div>
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
                    </div>
                    <div className={classes.card} onClick={(e) => this.selectPlan('professional')}>
                        <Typography
                            component="div"
                            variant="h3"
                            color="textPrimary"
                            className={`${classes.cardTitle} ${classes.letterSpacing}`}
                        >
                            Professional
                        </Typography>
                        <div className={classes.cardPrice}>
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
                        </div>
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
                    </div>
                </div>
                <div className={`${classes.cards}`}>
                    <div className={classes.card} onClick={(e) => this.selectPlan('enterprise')}>
                        <Typography
                            component="div"
                            variant="h3"
                            color="textPrimary"
                            className={`${classes.cardTitle} ${classes.letterSpacing}`}
                        >
                            Enterprise
                        </Typography>
                        <div className={classes.cardPrice}>
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
                        </div>
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
                    </div>
                    <div className={classes.card} onClick={(e) => this.selectPlan('global')}>
                        <Typography
                            component="div"
                            variant="h3"
                            color="textPrimary"
                            className={`${classes.cardTitle} ${classes.letterSpacing}`}
                        >
                            Global
                        </Typography>
                        <div className={classes.cardPrice}>
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
                        </div>
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
                    </div>
                </div>
                <div className={classes.backButtonContainer}>
                    <Button
                        variant="outlined"
                        color="primary"
                        startIcon={<ArrowBackIcon/>}
                        onClick={(e) => changeSelectedPage(0)}
                    >
                        GO BACK TO CONFIG
                    </Button>
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
    connect(mapStateToProps, mapDispatchToProps),
    withStyles((theme) => ({
        root: {

        },
        cards: {
            display: 'flex',
            columnGap: '30px',
            paddingTop: '30px',
            justifyContent: 'center',
        },
        card: {
            width: '300px',
            minHeight: '350px',
            boxShadow: theme.shadows['2'],
            padding: '40px 20px 20px 20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            transition: '0.25s',
            cursor: 'pointer',
            '&:hover': {
                boxShadow: theme.shadows['4'],
                backgroundColor: '#C8FACD44'
            }
        },
        cardTitle: {
            color: theme.palette.text.secondary
        },
        cardPrice: {
            paddingTop: '5px',
            color: theme.palette.primary.main,
            display: 'flex',
            alignItems: 'flex-end',
        },
        cardPriceValue: {
            fontSize: '40px',
            fontWeight: 700
        },
        cardPricePeriod: {
            paddingBottom: '12px'
        },
        cardPriceHour: {
            paddingTop: '5px',
            fontSize: '18px',
            fontWeight: 300,
        },
        separator: {
            border: `1px solid ${theme.palette.primary.main}`,
            width: '30px',
            margin: '20px 0'
        },
        letterSpacing: {
            letterSpacing: '1px'
        },
        backButtonContainer: {
            paddingTop: '40px'
        }
    }))
)(CreateContainerPricing);