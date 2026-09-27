import { JupyterFrontEnd } from "@jupyterlab/application";
import { DocumentWidget } from "@jupyterlab/docregistry";

export default class AutoClose {
    private app: JupyterFrontEnd;
    constructor(app: JupyterFrontEnd) {
        this.app = app

        this.app.shell.currentChanged?.connect(this.onShellChange)
    }

    // // helper function to check if string is alphanumeric.
    public isAlphanumeric(str: string | undefined): boolean {
        if (str == null) str = "";

        console.log(str, /[a-zA-Z0-9]/.test(str))
        return /[a-zA-Z0-9]/.test(str);
    }

    // Janky BS to avoid the keyup listener getting attached twice.
    private currentEditor: any;
    private listenerAttached: boolean = false;

    // Need this to be a named function for adding/removing listeners.
    private onKeyUp = (event: KeyboardEvent) => {
        let content = this.currentEditor.model.sharedModel.getSource().split("\n")
        const cursorPos = this.currentEditor.getCursorPosition() // Note: column starts at 1

        // Does the actual auto-closing bit - saves repeated code.
        const doAutoclose = (key: string) => {
            content[cursorPos.line] = content[cursorPos.line].slice(0, cursorPos.column) + key + content[cursorPos.line].slice(cursorPos.column)
            content = content.join("\n")
            this.currentEditor.model.sharedModel.setSource(content)
            this.currentEditor.setCursorPosition({ column: cursorPos.column, line: cursorPos.line })
        }

        /* FOR SINGLE/DOUBLE quotes:
            - Should not be an alphanumerical character to the left of the cursor.
            - Should not be an alphanumerical character to the right of the cursor.
            - TODO: If the pressed character is next to the cursor, move the cursor one place ahead. 
        */
        if (event.key === `"` || event.key === `'`) {
            if (this.isAlphanumeric(content[cursorPos.line][cursorPos.column - 2])) return;
            if (this.isAlphanumeric(content[cursorPos.line][cursorPos.column])) return;
            doAutoclose(event.key)
        }

        /* FOR PARENTHESIS, CURLY BRACES, SQUARE BRACKETS:
            - Same as above.
            - Should not be a single/double quote to the right of the cursor.
            - TODO: If the pressed character is next to the cursor, move the cursor one place ahead. 
        */
        if (event.key === "(" || event.key === "{" || event.key === "[") {
            if (this.isAlphanumeric(content[cursorPos.line][cursorPos.column - 2])) return;
            if (this.isAlphanumeric(content[cursorPos.line][cursorPos.column])) return;
            if ([`"`, `'`].includes(content[cursorPos.line][cursorPos.column])) return;
            // i dont like this but idc atp
            if (event.key === "(") doAutoclose(")")
            if (event.key === "{") doAutoclose("}")
            if (event.key === "[") doAutoclose("]")

        }
    }

    // peak type safety laziness here
    private onShellChange = async (a: any, e: any): Promise<void> => {
        // Don't care if what's on screen is not a code editor.
        if (!(e.newValue instanceof DocumentWidget)) return;
        await e.newValue.context.ready;
        if (e.newValue.content.editor == null) return

        // Remove the keyUp listener from the old code editor if there's one attached.
        if (this.listenerAttached) {
            this.currentEditor.host.removeEventListener('keyup', this.onKeyUp)
            this.listenerAttached = false

        }

        const currentWidget = e.newValue
        await currentWidget.context.ready;
        this.currentEditor = currentWidget.content.editor


        // Add the keyUp listener to the new one.
        this.currentEditor.host.addEventListener('keyup', this.onKeyUp);
        this.listenerAttached = true

    }
}