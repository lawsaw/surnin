import React, { PureComponent } from 'react';
import cx from 'classnames';
import withWidth from '@material-ui/core/withWidth';
import Recaptcha from 'react-recaptcha';
import Box from '@material-ui/core/Box';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import { withStyles } from '@material-ui/core/styles';
import { RECAPTCHA_PUBLIC } from "../helpers/constants";

const styles = theme => ({
    captcha: {
        position: 'relative',
        '& #g-recaptcha': {
            [theme.breakpoints.down('xs')]: {
                transformOrigin: '0 0',
                transform: 'scale(0.77)',
            },
        },
    },
});

class Captcha extends PureComponent {

    constructor(props) {
        super(props);
        this.instance = null;
    }

    componentDidMount() {
        const { storeInstance } = this.props;
        if(storeInstance && typeof storeInstance === 'function') storeInstance(this.instance);
    }

    handleOnLoad = () => {}

    handleVerify = () => {}

    handleExpired = () => {}

    render() {
        const { forwardedRef, classes, className, label, error, helperText, storeMethods, callbacks={}, ...props } = this.props;
        return (
            <Box
                className={cx(classes.captcha, className)}

            >
                {
                    label && (
                        <FormLabel>
                            {label}
                        </FormLabel>
                    )
                }
                <Recaptcha
                    sitekey={RECAPTCHA_PUBLIC}
                    render="explicit"
                    badge="inline"
                    hl="ru"
                    ref={e => this.instance = e}
                    onloadCallback={callbacks.onload || this.handleOnLoad}
                    verifyCallback={callbacks.verify || this.handleVerify}
                    expiredCallback={callbacks.expired || this.handleExpired}
                    {...props}
                    size="normal"
                    //size={isWidthDown('xs', this.props.width) ? 'compact' : 'normal'}
                />
                {//TODO: helperText is for rc-form and error is for formik
                    error && (
                        <FormHelperText error={true}>
                            {helperText || error}
                        </FormHelperText>
                    )
                }
            </Box>
        )
    }
};

//export default withStyles(styles)(Captcha);

export default withStyles(styles)(withWidth()(Captcha));

// const Comp = withStyles(styles)(withWidth()(Captcha));
//
// export default forwardRef((props, ref) => (
//     <Comp {...props} forwardedRef={ref} />
// ));