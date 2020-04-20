import React, { createElement, PureComponent } from 'react';
import { isEmpty } from 'lodash';
import { Formik } from 'formik';
import SnackbarContext from './SnackbarContext';
import { FORM_VALIDATION_MAP } from './constants';
import { objFilter } from './etc';
import withSnack from '../hoc/withSnackbar';

const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// const TELEPHONE_REGEXP = /^[\d]{7,15}$/;
// const POST_CODE_REGEXP = /^[\dA-Za-z -]{3,10}$/;
// const NULLABLE_TELEPHONE_REGEXP = /^[\d]{0,12}$/;
// const USERNAME = /^[a-zA-Z0-9_.]*$/;
// const PLAIN_TEXT = /^[a-zA-Z0-9_ [\]().,]*$/;

const makeValidation = (rule, message) => [rule, message];

export const VALIDATORS = {
    not_long: size => makeValidation(value => value.length < size, 'Мало символов' ),
    not_empty: makeValidation(value => !value, FORM_VALIDATION_MAP.invalid_empty ),
    email: makeValidation(value => !EMAIL_REGEXP.test(value), FORM_VALIDATION_MAP.invalid_email_format ),
};

export const wrapForm = (component, formik_props={}) => {
    return (() => {
        class Form extends PureComponent {

            constructor(props) {
                super(props);
                this.recaptcha_instance = null;
                this.state = {
                    server_errors: {},
                    recaptcha_token: null,
                };
            }

            validate = rules => value => {
                for(let [rule, message] of rules) {
                    let is_error = rule(value);
                    if(is_error) return message;
                }
            }

            handleSubmit = async callback => {
                const { form: { handleSubmit, validateForm, errors } } = this.props;
                const { server_errors } = this.state;
                if(!isEmpty(errors) || !isEmpty(objFilter(server_errors, err => err !== 'recaptcha'))) return false;
                let new_errors = await validateForm();
                if(isEmpty(new_errors)) this.submitCallback(callback);
                handleSubmit();
            }

            onSuccess = (response) => {
                const { form: { resetForm } } = this.props;
                const showSnackbar = this.context;
                showSnackbar('Спасибо за сообщение. Мы думали вы не напишите!', 'success');
                this.resetServerErrors();
                resetForm();
                //console.log(response);
            }

            resetServerError = (field_errored) => {
                this.setState(state => ({
                    server_errors: objFilter(state.server_errors, error => error !== field_errored),
                }));
            }

            resetServerErrors = (withRecaptchaReset=true) => {
                const { server_errors } = this.state;
                if(withRecaptchaReset && this.recaptcha_instance) this.resetRecaptcha();
                if(!isEmpty(server_errors)) {
                    this.setState(state => ({
                        server_errors: {},
                    }));
                }
            }

            handleChange = field => e => {
                const { form } = this.props;
                const { onChange } = form.getFieldProps();
                this.resetServerError(field);
                onChange(e);
            }

            submitCallback = async (promise) => {
                let response = await promise();
                console.log(response);
                this.handlerServerResponse(response);
            }

            handlerServerResponse = (response) => {
                const response_obj = typeof response === 'object' ? response : JSON.parse(response);
                const { errors } = response_obj;
                if(!errors) this.onSuccess(response_obj);
                else this.storeServerErrors(errors);
            }

            storeServerErrors = (errors) => {
                let format_errors = {};
                for(let error in errors) {
                    let separator = error.search('-');
                    let key = separator ? error.slice(separator+1) : error;
                    let error_id = errors[error][0];
                    format_errors[key] = error_id in FORM_VALIDATION_MAP ? FORM_VALIDATION_MAP[error_id] : error_id;
                    if(error_id === 'invalid_recaptcha_repeat') this.resetRecaptcha();
                }
                this.setState(state => ({
                    server_errors: {
                        ...state.server_errors,
                        ...format_errors,
                    },
                }));
            }

            resetRecaptcha = () => {
                this.recaptcha_instance.reset();
                this.setState(() => ({
                    recaptcha_token: null,
                }));
            }

            validateRecaptcha = (token) => {
                this.setState(() => ({
                    recaptcha_token: token,
                }));
            }

            expiredRecaptcha = () => {
                this.setState(() => ({
                    recaptcha_token: null,
                }));
            }

            onloadRecaptcha = () => {
                //console.log('onloadRecaptcha');
            }

            initRecaptcha = (recaptcha_instance) => {
                if(!this.recaptcha_instance) this.recaptcha_instance = recaptcha_instance;
            }

            render() {
                const { form, ...props } = this.props;
                const { server_errors, recaptcha_token } = this.state;
                const { touched, errors } = form;
                return (
                    createElement(component, {
                        form: {
                            ...form,
                            submitForm: this.handleSubmit,
                            custom: {
                                getFieldProps: (field, { rules, recaptcha_instance }) => {
                                    this.initRecaptcha(recaptcha_instance);
                                    return {
                                        name: field,
                                        onChange: this.handleChange(field),
                                        error: (touched[field] && errors[field]) || server_errors[field],
                                        validate: this.validate(rules),
                                    }
                                },
                                recaptcha: {
                                    instance: this.recaptcha_instance,
                                    token: recaptcha_token,
                                    reset: this.resetRecaptcha,
                                    callbacks: {
                                        onload: this.onloadRecaptcha,
                                        verify: this.validateRecaptcha,
                                        expired: this.expiredRecaptcha,
                                    },
                                },
                            },
                        },
                        ...props,
                    })
                )
            }

        }
        Form.contextType = SnackbarContext;
        return withSnack(props => <Formik
            validateOnBlur={false}
            {...formik_props}
            children={
                form_props => <Form
                    form={form_props}
                    {...props}
                />
            }
        />);
    })();
};