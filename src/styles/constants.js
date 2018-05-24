
export const no = 'none';
export const inherit = 'inherit';
export const fix = 'fixed';
export const abs = 'absolute';
export const rel = 'relative';
export const flx = 'flex';
export const auto = 'auto';
export const row = 'row';
export const col = 'column';
export const fs = 'flex-start';
export const fe = 'flex-end';
export const cen = 'center';
export const sb = 'space-between';
export const sa = 'space-around';
export const se = 'space-evenly';
export const scroll = 'scroll';
export const bold = 'bold';
export const wd = 'width';
export const ht = 'height';
export const hzl = 'horizontal';
export const vtl = 'vertical';
export const transparent = 'transparent';


const cenFlex = {
    display: flx,
    justifyContent: cen,
    alignItems: cen,
};

const startFlex = {
    display: flx,
    justifyContent: fs,
    alignItems: fs
};

const endFlex = {
    display: flx,
    justifyContent: fe,
    alignItems: fe
};

const xFlex = {
    display: flx,
    flxDirection: row,
    justifyContent: sb,
    alignItems: cen
};

const yFlex = {
    display: flx,
    flxDirection: col,
    justifyConent: sb,
    alignItems: cen
}

const reset = {
    background: no,
    border: no,
    outline: no,
    margin: 0,
    padding: 0,
    textDecoration: no
};


