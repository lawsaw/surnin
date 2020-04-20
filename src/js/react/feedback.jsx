import React from 'react';
import ReactDOM from 'react-dom';
import { withStyles, Box, Grid, Button } from '@material-ui/core';
import { wrapForm, VALIDATORS } from "./helpers/validation";
import FormField from './components/FormField';
import FormRow from './components/FormRow';
import { apiPost } from './helpers/etc';
//import Captcha from '../react/Captcha';

const INITIAL_DATA = {
    name: '',
    email: '',
    message: '',
    //recaptcha: null,
};

const styles = () => ({
    field: {
        width: '100%',
    },
});

class Feedback extends React.PureComponent {

    handleTest = async () => {
        let data = await apiPost(`forms/feedback`, {test: '556'});
        console.log(data);
    }

    handleSubmit = () => {
        const { form: { submitForm, values, custom: { recaptcha } } } = this.props;
        submitForm(
            // () => {
            //     console.log('Это успех')
            // }
            //() => sendToServer(values)
            () => apiPost(`forms/feedback`, {...values})
        );
    }

    render() {
        const { classes, form: { custom: { getFieldProps, recaptcha } } } = this.props;
        return (
            <div>

                <FormRow>
                    <FormField
                        className={classes.field}
                        label="Name"
                        {...getFieldProps('name', {
                            rules: [
                                VALIDATORS.not_empty,
                                VALIDATORS.not_long(5),
                            ],
                        })}
                    />
                </FormRow>
                <FormRow>
                    <FormField
                        className={classes.field}
                        label="Email"
                        {...getFieldProps('email', {
                            rules: [
                                VALIDATORS.not_empty,
                                //VALIDATORS.email,
                            ],
                        })}
                    />
                </FormRow>
                <FormRow>
                    <FormField
                        className={classes.field}
                        label="Сообщение"
                        multiline
                        rows={6}
                        {...getFieldProps('message', {
                            rules: [
                                VALIDATORS.not_empty,
                            ],
                        })}
                    />
                </FormRow>
                <FormRow>
                    <Grid
                        container
                        direction="row"
                        justify="flex-end"
                        alignItems="center"
                    >
                        <Button
                            onClick={this.handleSubmit}
                            color="primary"
                            variant="contained"
                        >
                            Отправить
                        </Button>
                    </Grid>
                </FormRow>

            </div>
        )
    }
}

const FeedbackContainer = withStyles(styles)(
    wrapForm(Feedback, {
        initialValues: INITIAL_DATA,
    })
);

ReactDOM.render(
    <FeedbackContainer />,
    document.getElementById('feedback')
);
