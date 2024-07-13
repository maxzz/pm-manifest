export const actionKeys: (readonly [dispalyName: string, fileName: string])[] = [
    ['Tab',                   /**/ 'tab',       /**/],
    ['Enter',                 /**/ 'enter',     /**/],
    ['Esc',                   /**/ 'escape',    /**/],
    ['Left arrow',            /**/ 'left',      /**/],
    ['Right arrow',           /**/ 'right',     /**/],
    ['Up arrow',              /**/ 'up',        /**/],
    ['Down arrow',            /**/ 'down',      /**/],
    ['Page Up',               /**/ 'prior',     /**/],
    ['Page Down',             /**/ 'next',      /**/],
    ['Home',                  /**/ 'home',      /**/],
    ['End',                   /**/ 'end',       /**/],
    ['Ins',                   /**/ 'ins',       /**/],
    ['Del',                   /**/ 'del',       /**/],
    ['Backspace',             /**/ 'back',      /**/],
    ['Spacebar',              /**/ 'space',     /**/],
    ['Shift / Control / Alt', /**/ 'none',      /**/], // <- just to press shift-ctrl-alt wo/ any key
    ['F1',                    /**/ 'f1',        /**/],
    ['F2',                    /**/ 'f2',        /**/],
    ['F3',                    /**/ 'f3',        /**/],
    ['F4',                    /**/ 'f4',        /**/],
    ['F5',                    /**/ 'f5',        /**/],
    ['F6',                    /**/ 'f6',        /**/],
    ['F7',                    /**/ 'f7',        /**/],
    ['F8',                    /**/ 'f8',        /**/],
    ['F9',                    /**/ 'f9',        /**/],
    ['F10',                   /**/ 'f10',       /**/],
    ['F11',                   /**/ 'f11',       /**/],
    ['F12',                   /**/ 'f12',       /**/],
];

export function actionKeyIndexFromFileName(fileNameKey: string): number {
    return actionKeys.findIndex(([, fileName]) => fileName === fileNameKey);
}
