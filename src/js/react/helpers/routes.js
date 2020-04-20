import React from 'react';
import HomeIcon from '@material-ui/icons/Home';
import {
    Home,
} from '../../pages';

export const ROUTE_HOME = {
    id: 'home',
    label: <HomeIcon />,
    link: '/',
    page: props => <Home  {...props} />,
};
