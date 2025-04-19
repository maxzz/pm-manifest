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

/**
 * Clean up names_ext. We don't use any sub-class names (at least for now) for manual mode forms.
 * The rule is: don't look inside the window content.
 * @param form - Form to duplicate from
 * @returns New duplicated form
 */
export function createNewManualFormFrom(form: Mani.Form): Mani.Form {
    const rv: Mani.Form = {
        detection: { ...form.detection }, // spread since we modify names_ext
        options: { ...form.options }, // this optional and not relly needed
        fields: [],
    };

    rv.detection.names_ext = "";

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
