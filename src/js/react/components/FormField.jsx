import React, { PureComponent } from 'react';
import cx from 'classnames';
import { Field } from 'formik';
import { withStyles, FormControl, InputLabel, FilledInput, FormHelperText } from '@material-ui/core';

const styles = () => ({
    formField: {},
});

class FormField extends PureComponent {

    render() {
        const { classes, className, label, error, ...props } = this.props;
        return (
            <FormControl
                className={cx(classes.formField, className)}
                error={!!error}
                variant="filled"
            >
                <InputLabel>{label}</InputLabel>
                <Field
                    as={FilledInput}
                    {...props}
                />
                {
                    error ? <FormHelperText>{error}</FormHelperText> : null
                }
            </FormControl>
        );
    }

}

export default withStyles(styles)(FormField);