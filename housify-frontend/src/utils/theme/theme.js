import { createTheme } from '@material-ui/core';
import { pxToRem, pxToVh, pxToVw } from './themeUtils';

export const theme = createTheme({
  palette: {
    primaryBlue: '#2064eb',
    light: {
      text: '#161414',
      bgc: '#efeaea',
    },
    dark: {
      text: '#efeaea',
      bgc: '#161414',
    },
  },
  typography: {
    pxToVw: (px) => pxToVw(px),
    pxToVh: (px) => pxToVh(px),
    pxToRem: (px) => pxToRem(px),
    fontFamily: 'Poppins',
  },
  spacing: 5,
});

export default theme;
