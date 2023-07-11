// #include "acc_const.h"

export const MSAA_ROLEBITS = {
    r_1_00_none               /**/: 0x00000001,    // 0                                 //00
    r_1_01_titlebar           /**/: 0x00000002,    // ROLE_SYSTEM_TITLEBAR              //01
    r_1_02_menubar            /**/: 0x00000004,    // ROLE_SYSTEM_MENUBAR               //02
    r_1_03_scrollbar          /**/: 0x00000008,    // ROLE_SYSTEM_SCROLLBAR             //03
    r_1_04_grip               /**/: 0x00000010,    // ROLE_SYSTEM_GRIP                  //04
    r_1_05_sound              /**/: 0x00000020,    // ROLE_SYSTEM_SOUND                 //05
    r_1_06_cursor             /**/: 0x00000040,    // ROLE_SYSTEM_CURSOR                //06
    r_1_07_caret              /**/: 0x00000080,    // ROLE_SYSTEM_CARET                 //07
    r_1_08_alert              /**/: 0x00000100,    // ROLE_SYSTEM_ALERT                 //08
    r_1_09_window             /**/: 0x00000200,    // ROLE_SYSTEM_WINDOW                //09
    r_1_0A_client             /**/: 0x00000400,    // ROLE_SYSTEM_CLIENT                //0A
    r_1_0B_menupopup          /**/: 0x00000800,    // ROLE_SYSTEM_MENUPOPUP             //0B
    r_1_0C_menuitem           /**/: 0x00001000,    // ROLE_SYSTEM_MENUITEM              //0C
    r_1_0D_tooltip            /**/: 0x00002000,    // ROLE_SYSTEM_TOOLTIP               //0D
    r_1_0E_application        /**/: 0x00004000,    // ROLE_SYSTEM_APPLICATION           //0E
    r_1_0F_document           /**/: 0x00008000,    // ROLE_SYSTEM_DOCUMENT              //0F
    r_1_10_pane               /**/: 0x00010000,    // ROLE_SYSTEM_PANE                  //10
    r_1_11_chart              /**/: 0x00020000,    // ROLE_SYSTEM_CHART                 //11
    r_1_12_dialog             /**/: 0x00040000,    // ROLE_SYSTEM_DIALOG                //12
    r_1_13_border             /**/: 0x00080000,    // ROLE_SYSTEM_BORDER                //13
    r_1_14_grouping           /**/: 0x00100000,    // ROLE_SYSTEM_GROUPING              //14
    r_1_15_separator          /**/: 0x00200000,    // ROLE_SYSTEM_SEPARATOR             //15
    r_1_16_toolbar            /**/: 0x00400000,    // ROLE_SYSTEM_TOOLBAR               //16
    r_1_17_statusbar          /**/: 0x00800000,    // ROLE_SYSTEM_STATUSBAR             //17
    r_1_18_table              /**/: 0x01000000,    // ROLE_SYSTEM_TABLE                 //18
    r_1_19_columnheader       /**/: 0x02000000,    // ROLE_SYSTEM_COLUMNHEADER          //19
    r_1_1A_rowheader          /**/: 0x04000000,    // ROLE_SYSTEM_ROWHEADER             //1A
    r_1_1B_column             /**/: 0x08000000,    // ROLE_SYSTEM_COLUMN                //1B
    r_1_1C_row                /**/: 0x10000000,    // ROLE_SYSTEM_ROW                   //1C
    r_1_1D_cell               /**/: 0x20000000,    // ROLE_SYSTEM_CELL                  //1D
    r_1_1E_link               /**/: 0x40000000,    // ROLE_SYSTEM_LINK                  //1E
    r_1_1F_helpballoon        /**/: 0x80000000,    // ROLE_SYSTEM_HELPBALLOON           //1F

    r_2_00_character          /**/: 0x00000001,    // ROLE_SYSTEM_CHARACTER             //20
    r_2_01_list               /**/: 0x00000002,    // ROLE_SYSTEM_LIST                  //21
    r_2_02_listitem           /**/: 0x00000004,    // ROLE_SYSTEM_LISTITEM              //22
    r_2_03_outline            /**/: 0x00000008,    // ROLE_SYSTEM_OUTLINE               //23
    r_2_04_outlineitem        /**/: 0x00000010,    // ROLE_SYSTEM_OUTLINEITEM           //24
    r_2_05_pagetab            /**/: 0x00000020,    // ROLE_SYSTEM_PAGETAB               //25
    r_2_06_propertypage       /**/: 0x00000040,    // ROLE_SYSTEM_PROPERTYPAGE          //26
    r_2_07_indicator          /**/: 0x00000080,    // ROLE_SYSTEM_INDICATOR             //27
    r_2_08_graphic            /**/: 0x00000100,    // ROLE_SYSTEM_GRAPHIC               //28
    r_2_09_statictext         /**/: 0x00000200,    // ROLE_SYSTEM_STATICTEXT            //29
    r_2_0A_text               /**/: 0x00000400,    // ROLE_SYSTEM_TEXT                  //2A
    r_2_0B_pushbutton         /**/: 0x00000800,    // ROLE_SYSTEM_PUSHBUTTON            //2B
    r_2_0C_checkbutton        /**/: 0x00001000,    // ROLE_SYSTEM_CHECKBUTTON           //2C
    r_2_0D_radiobutton        /**/: 0x00002000,    // ROLE_SYSTEM_RADIOBUTTON           //2D
    r_2_0E_combobox           /**/: 0x00004000,    // ROLE_SYSTEM_COMBOBOX              //2E
    r_2_0F_droplist           /**/: 0x00008000,    // ROLE_SYSTEM_DROPLIST              //2F
    r_2_10_progressbar        /**/: 0x00010000,    // ROLE_SYSTEM_PROGRESSBAR           //30
    r_2_11_dial               /**/: 0x00020000,    // ROLE_SYSTEM_DIAL                  //31
    r_2_12_hotkeyfield        /**/: 0x00040000,    // ROLE_SYSTEM_HOTKEYFIELD           //32
    r_2_13_slider             /**/: 0x00080000,    // ROLE_SYSTEM_SLIDER                //33
    r_2_14_spinbutton         /**/: 0x00100000,    // ROLE_SYSTEM_SPINBUTTON            //34
    r_2_15_diagram            /**/: 0x00200000,    // ROLE_SYSTEM_DIAGRAM               //35
    r_2_16_animation          /**/: 0x00400000,    // ROLE_SYSTEM_ANIMATION             //36
    r_2_17_equation           /**/: 0x00800000,    // ROLE_SYSTEM_EQUATION              //37
    r_2_18_buttondropdown     /**/: 0x01000000,    // ROLE_SYSTEM_BUTTONDROPDOWN        //38
    r_2_19_buttonmenu         /**/: 0x02000000,    // ROLE_SYSTEM_BUTTONMENU            //39
    r_2_1A_buttondropdowngrid /**/: 0x04000000,    // ROLE_SYSTEM_BUTTONDROPDOWNGRID    //3A
    r_2_1B_whitespace         /**/: 0x08000000,    // ROLE_SYSTEM_WHITESPACE            //3B
    r_2_1C_pagetablist        /**/: 0x10000000,    // ROLE_SYSTEM_PAGETABLIST           //3C
    r_2_1D_clock              /**/: 0x20000000,    // ROLE_SYSTEM_CLOCK                 //3D
    r_2_1E_splitbutton        /**/: 0x40000000,    // 0x3e//ie                          //3E
    r_2_1F_ipaddress          /**/: 0x80000000,    // ROLE_SYSTEM_IPADDRESS             //3F

    r_3_00_outlinebutton      /**/: 0x80000001,    // ROLE_SYSTEM_OUTLINEBUTTON         //40
}; //const MSAA_ROLEBITS

export enum MSAA_ROLE {
    none                      /**/ = 0x00,    //00
    titlebar                  /**/ = 0x01,    //ROLE_SYSTEM_TITLEBAR          
    menubar                   /**/ = 0x02,    //ROLE_SYSTEM_MENUBAR           
    scrollbar                 /**/ = 0x03,    //ROLE_SYSTEM_SCROLLBAR         
    grip                      /**/ = 0x04,    //ROLE_SYSTEM_GRIP              
    sound                     /**/ = 0x05,    //ROLE_SYSTEM_SOUND             
    cursor                    /**/ = 0x06,    //ROLE_SYSTEM_CURSOR            
    caret                     /**/ = 0x07,    //ROLE_SYSTEM_CARET             
    alert                     /**/ = 0x08,    //ROLE_SYSTEM_ALERT             
    window                    /**/ = 0x09,    //ROLE_SYSTEM_WINDOW            
    client                    /**/ = 0x0A,    //ROLE_SYSTEM_CLIENT            
    menupopup                 /**/ = 0x0B,    //ROLE_SYSTEM_MENUPOPUP         
    menuitem                  /**/ = 0x0C,    //ROLE_SYSTEM_MENUITEM          
    tooltip                   /**/ = 0x0D,    //ROLE_SYSTEM_TOOLTIP           
    application               /**/ = 0x0E,    //ROLE_SYSTEM_APPLICATION       
    document                  /**/ = 0x0F,    //ROLE_SYSTEM_DOCUMENT          
    pane                      /**/ = 0x10,    //ROLE_SYSTEM_PANE              
    chart                     /**/ = 0x11,    //ROLE_SYSTEM_CHART             
    dialog                    /**/ = 0x12,    //ROLE_SYSTEM_DIALOG            
    border                    /**/ = 0x13,    //ROLE_SYSTEM_BORDER            
    grouping                  /**/ = 0x14,    //ROLE_SYSTEM_GROUPING          
    separator                 /**/ = 0x15,    //ROLE_SYSTEM_SEPARATOR         
    toolbar                   /**/ = 0x16,    //ROLE_SYSTEM_TOOLBAR           
    statusbar                 /**/ = 0x17,    //ROLE_SYSTEM_STATUSBAR         
    table                     /**/ = 0x18,    //ROLE_SYSTEM_TABLE             
    columnheader              /**/ = 0x19,    //ROLE_SYSTEM_COLUMNHEADER      
    rowheader                 /**/ = 0x1A,    //ROLE_SYSTEM_ROWHEADER         
    column                    /**/ = 0x1B,    //ROLE_SYSTEM_COLUMN            
    row                       /**/ = 0x1C,    //ROLE_SYSTEM_ROW               
    cell                      /**/ = 0x1D,    //ROLE_SYSTEM_CELL              
    link                      /**/ = 0x1E,    //ROLE_SYSTEM_LINK              
    helpballoon               /**/ = 0x1F,    //ROLE_SYSTEM_HELPBALLOON       
    character                 /**/ = 0x20,    //ROLE_SYSTEM_CHARACTER         
    list                      /**/ = 0x21,    //ROLE_SYSTEM_LIST              
    listitem                  /**/ = 0x22,    //ROLE_SYSTEM_LISTITEM          
    outline                   /**/ = 0x23,    //ROLE_SYSTEM_OUTLINE           
    outlineitem               /**/ = 0x24,    //ROLE_SYSTEM_OUTLINEITEM       
    pagetab                   /**/ = 0x25,    //ROLE_SYSTEM_PAGETAB           
    propertypage              /**/ = 0x26,    //ROLE_SYSTEM_PROPERTYPAGE      
    indicator                 /**/ = 0x27,    //ROLE_SYSTEM_INDICATOR         
    graphic                   /**/ = 0x28,    //ROLE_SYSTEM_GRAPHIC           
    statictext                /**/ = 0x29,    //ROLE_SYSTEM_STATICTEXT        
    text                      /**/ = 0x2A,    //ROLE_SYSTEM_TEXT              
    pushbutton                /**/ = 0x2B,    //ROLE_SYSTEM_PUSHBUTTON        
    checkbutton               /**/ = 0x2C,    //ROLE_SYSTEM_CHECKBUTTON       
    radiobutton               /**/ = 0x2D,    //ROLE_SYSTEM_RADIOBUTTON       
    combobox                  /**/ = 0x2E,    //ROLE_SYSTEM_COMBOBOX          
    droplist                  /**/ = 0x2F,    //ROLE_SYSTEM_DROPLIST          
    progressbar               /**/ = 0x30,    //ROLE_SYSTEM_PROGRESSBAR       
    dial                      /**/ = 0x31,    //ROLE_SYSTEM_DIAL              
    hotkeyfield               /**/ = 0x32,    //ROLE_SYSTEM_HOTKEYFIELD       
    slider                    /**/ = 0x33,    //ROLE_SYSTEM_SLIDER            
    spinbutton                /**/ = 0x34,    //ROLE_SYSTEM_SPINBUTTON        
    diagram                   /**/ = 0x35,    //ROLE_SYSTEM_DIAGRAM           
    animation                 /**/ = 0x36,    //ROLE_SYSTEM_ANIMATION         
    equation                  /**/ = 0x37,    //ROLE_SYSTEM_EQUATION          
    buttondropdown            /**/ = 0x38,    //ROLE_SYSTEM_BUTTONDROPDOWN    
    buttonmenu                /**/ = 0x39,    //ROLE_SYSTEM_BUTTONMENU        
    buttondropdowngrid        /**/ = 0x3A,    //ROLE_SYSTEM_BUTTONDROPDOWNGRID
    whitespace                /**/ = 0x3B,    //ROLE_SYSTEM_WHITESPACE        
    pagetablist               /**/ = 0x3C,    //ROLE_SYSTEM_PAGETABLIST       
    clock                     /**/ = 0x3D,    //ROLE_SYSTEM_CLOCK             
    splitbutton               /**/ = 0x3e,    //3E //ROLE_SYSTEM_SPLITBUTTON  //ie
    ipaddress                 /**/ = 0x3f,    //3F //ROLE_SYSTEM_IPADDRESS    
    outlinebutton             /**/ = 0x40,    //40 //ROLE_SYSTEM_OUTLINEBUTTON

    dpinfo                    /**/ = 0x96,    //60 // for dp debugging only
    dpattention               /**/ = 0x97,    //61 // for dp debugging only
    html_script               /**/ = 0x98,    //62 // for dp debugging only
    html_text                 /**/ = 0x99,    //63 // for dp debugging only
} //enum MSAA_ROLE

export enum MSAA_STATE {
    none                      /**/ = 0x00000000,      //01 // 0x00000000
    unavailable               /**/ = 0x00000001,      //02 // STATE_SYSTEM_UNAVAILABLE      // Disabled
    selected                  /**/ = 0x00000002,      //03 // STATE_SYSTEM_SELECTED        
    focused                   /**/ = 0x00000004,      //04 // STATE_SYSTEM_FOCUSED         
    pressed                   /**/ = 0x00000008,      //05 // STATE_SYSTEM_PRESSED         
    checked                   /**/ = 0x00000010,      //06 // STATE_SYSTEM_CHECKED         
    mixed                     /**/ = 0x00000020,      //07 // STATE_SYSTEM_MIXED            // 3-state checkbox or toolbar button
    readonly                  /**/ = 0x00000040,      //08 // STATE_SYSTEM_READONLY        
    hottracked                /**/ = 0x00000080,      //09 // STATE_SYSTEM_HOTTRACKED      
    defaulT                   /**/ = 0x00000100,      //0A // STATE_SYSTEM_DEFAULT         
    expanded                  /**/ = 0x00000200,      //0B // STATE_SYSTEM_EXPANDED        
    collapsed                 /**/ = 0x00000400,      //0C // STATE_SYSTEM_COLLAPSED       
    busy                      /**/ = 0x00000800,      //0D // STATE_SYSTEM_BUSY            
    floating                  /**/ = 0x00001000,      //0E // STATE_SYSTEM_FLOATING         // Children "owned" not "contained" by parent
    marqueed                  /**/ = 0x00002000,      //0F // STATE_SYSTEM_MARQUEED        
    animated                  /**/ = 0x00004000,      //10 // STATE_SYSTEM_ANIMATED        
    invisible                 /**/ = 0x00008000,      //11 // STATE_SYSTEM_INVISIBLE       
    offscreen                 /**/ = 0x00010000,      //12 // STATE_SYSTEM_OFFSCREEN       
    sizeable                  /**/ = 0x00020000,      //13 // STATE_SYSTEM_SIZEABLE        
    moveable                  /**/ = 0x00040000,      //14 // STATE_SYSTEM_MOVEABLE        
    selfvoicing               /**/ = 0x00080000,      //15 // STATE_SYSTEM_SELFVOICING     
    focusable                 /**/ = 0x00100000,      //16 // STATE_SYSTEM_FOCUSABLE       
    selectable                /**/ = 0x00200000,      //17 // STATE_SYSTEM_SELECTABLE      
    linked                    /**/ = 0x00400000,      //18 // STATE_SYSTEM_LINKED          
    traversed                 /**/ = 0x00800000,      //19 // STATE_SYSTEM_TRAVERSED       
    multiselectable           /**/ = 0x01000000,      //1A // STATE_SYSTEM_MULTISELECTABLE  // Supports multiple selection
    extselectable             /**/ = 0x02000000,      //1B // STATE_SYSTEM_EXTSELECTABLE    // Supports extended selection
    alert_low                 /**/ = 0x04000000,      //1C // STATE_SYSTEM_ALERT_LOW        // This information is of low priority
    alert_medium              /**/ = 0x08000000,      //1D // STATE_SYSTEM_ALERT_MEDIUM     // This information is of medium priority
    alert_high                /**/ = 0x10000000,      //1E // STATE_SYSTEM_ALERT_HIGH       // This information is of high priority
    protected                 /**/ = 0x20000000,      //1F // STATE_SYSTEM_PROTECTED      
    valid                     /**/ = 0x3fffffff,           // STATE_SYSTEM_VALID            // mask
} //enum MSAA_STATE

export function getEnumNumberEntries<T extends object>(objEnum: T) {
    return Object.entries(objEnum).filter(([key]) => Number.isInteger(+key));
}

export function getEnumNamedEntries<T extends object>(objEnum: T) {
    return Object.entries(objEnum).filter(([key]) => !Number.isInteger(+key));
}

let MSAA_STATE_NAMED: [string, number][] | undefined;

export function getStateEntries(state: string | undefined): string[] | undefined {
    if (!state) {
        return;
    }

    let rv: string[] = [];
    let num = parseInt(state, 16);

    if (!Number.isNaN(num) && num) {
        if (!MSAA_STATE_NAMED) {
            MSAA_STATE_NAMED = getEnumNamedEntries(MSAA_STATE) as [string, number][];
        }

        let key = 0;
        while (num && key < MSAA_STATE_NAMED.length) {
            const [k, v] = MSAA_STATE_NAMED[key++];
            if ((num & v) !== 0) {
                num = num & ~v;
                rv.push(k);
            }
        }
    }

    return rv.length ? rv : undefined;
}

export type RoleStateNames = {
    role: string | undefined;
    states: string[] | undefined;
};

export function getRoleStateNames(roleString: string | undefined): RoleStateNames | undefined {
    if (!roleString) {
        return;
    }

    const parts = roleString.split('_');
    if (!parts[0] || !parts[1]) {
        return;
    }

    const roleNum = parseInt(parts[0], 16);
    if (Number.isNaN(roleNum)) {
        return;
    }

    return {
        role: MSAA_ROLE[roleNum],
        states: getStateEntries(parts[1]),
    };
}
