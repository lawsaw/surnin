import React from 'react';
import { SnackbarProvider } from 'notistack';
import { withSnackbar } from 'notistack';
import SnackbarContext from "../helpers/SnackbarContext";

const Comp = Component => {
    const ComponentWithSnackbarProvider = props => {
        return (
            <SnackbarProvider maxSnack={3} anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}>
                <Component {...props} />
            </SnackbarProvider>
        )
    }
    return ComponentWithSnackbarProvider;
};

const Comp2 = Component => {
    const ComponentWithNotistack = props => {
        const showSnackbar = (message, type="default") => {//TODO: type: 'default' | 'success' | 'error' | 'info
            const { enqueueSnackbar } = props;
            enqueueSnackbar(message, {
                variant: type,
                autoHideDuration: 2500,
            });
        };
        return (
            <SnackbarContext.Provider value={showSnackbar}>
                <Component {...props} />
            </SnackbarContext.Provider>
        )
    };
    return Comp(withSnackbar(ComponentWithNotistack));
};

export default Comp2;