import React, { PureComponent } from 'react';
import { withStyles, Box } from '@material-ui/core';

const styles = theme => ({
    formRow: {
        margin: `${theme.spacing(2)}px ${theme.spacing(1)}px`,
    },
});

class FormRow extends PureComponent {

    render() {
        const { classes, children } = this.props;
        return (
            <Box
                className={classes.formRow}
            >
                {children}
            </Box>
        );
    }

}

export default withStyles(styles)(FormRow);