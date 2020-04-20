import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import { red, grey, gold, blue, green } from './palette';

//const fontSize = 15; // It doesn't place style on html tag, but it have to, so I dublicated it in index.scss

const theme = createMuiTheme({
    typography: {
        //fontSize,
        htmlFontSize: 16,
        //pxToRem: size => `${(size / fontSize)}rem`,
        //fontFamily: '"robotoRegular", "sans-serif"',

        table: {
            head: {
                fontSize: '0.75rem',
            },
            body: {
                fontSize: '0.75rem',
            },
        },
    },
    palette: {
        red,
        grey,
        gold,
        blue,
        green,
    },

});

export default responsiveFontSizes(theme);