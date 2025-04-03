import { type Mani } from "../../all-types";

type CreateNewManualFormParams = {
    detection: Mani.Detection;
    options: Mani.Options;
    fields: Mani.Field[];
};

export function createNewManualForm({ detection, options, fields }: CreateNewManualFormParams): Mani.Form {
    const rv: Mani.Form = {
        detection,
        options,
        fields,
    };
    return rv;
}

type CreateManualFormDetectionParams = {
    caption: string;
    dlg_class: string;
    processname: string;
    commandline: string;
};

/**
 * Minimal set to create new manual form detection
 */
export function createManualFormDetection({ caption, dlg_class, processname, commandline }: CreateManualFormDetectionParams): Mani.Detection {
    return {
        caption,
        dlg_class,
        processname,
        commandline,
    };
}

/**
 * Minimal set to create new manual form options
 */
export function createManualFormOptions(): Mani.Options {
    return {
    };
}

/**
 * Default set of fields to create new manual form
 */
export function createManualFormFields(): Mani.Field[] {
    return [];
}

/**
 * Form created by createNewManualForm() will be marked as PChange form
 */
export function markFormAsPChange({ form, asPchange }: { form: Mani.Form; asPchange: boolean; }): void {
    if (asPchange) {
        form.fcontext = {
            type: 'pchange',
            name: 1,
        };
    } else {
        delete form.fcontext;
    }
}

// TODO: if we need to create new manifest from scratch
// import { createManualFormDetection, createManualFormFields, createManualFormOptions, createNewManualForm } from '@/store/manifest';
// if (fileCnt.newFile) {
//     //TODO: create new mani field
//     //TODO: call createNewManualForm() here

//     // const detection = createManualFormDetection({ caption: 'todo', dlg_class: 'todo', processname: 'todo', commandline: 'todo' });
//     // const options = createManualFormOptions();
//     // const fields = createManualFormFields();
//     // const form = createNewManualForm({ detection, options, fields });
// }
