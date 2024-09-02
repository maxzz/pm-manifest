import { v4 as uuidv4 } from 'uuid';

export function createGuid(): string {
    return uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
}

/**
 * This is how filenames were generated in the old PM days.
 * @returns a GUID wrapped in curly braces
 */
export function createGuidWrapped(): string {
    const rv = `{${createGuid()}}`;
    return rv;
}
