import {
    CompletionHandler,
    ICompletionContext,
    ICompletionProvider
} from '@jupyterlab/completer';
import ConfigManager from './ConfigManager';

export default class CompletionProvider implements ICompletionProvider {
    readonly identifier = 'saf:completion-provider';

    // Optional: higher numbers get higher priority.
    readonly rank = 6767;

    private configManager: ConfigManager // more type safety laziness

    constructor(configManager: ConfigManager) {
        this.configManager = configManager
    }

    async isApplicable(
        context: ICompletionContext
    ): Promise<boolean> {
        // console.log('isApplicable called', context);
        return context.widget.title.label.split(".")[1] === "java";
    }

    async fetch(
        request: CompletionHandler.IRequest, context: ICompletionContext
    ): Promise<CompletionHandler.ICompletionItemsReply> {
        const { text, offset } = request
        // Everything before the cursor.
        const beforeCursor = text.slice(0, offset);

        // Find the current word.
        const match = beforeCursor.match(/[a-zA-Z_]\w*$/);

        const filename = context.widget.title.label.split(".")[0] // without extension

        if (match == null) return { start: offset, end: offset, items: [] };

        const snippetList: Record<string, string> = {
            ...this.configManager.get("snippets"), // Load in custom snippets from config.
            "sout": `System.out.println("");`,
            [`public class ${filename}`]: `public class ${filename} {
  public static void main(String[] args) {
      
  }
}`};


        const items = Object.keys(snippetList).filter(s => s.startsWith(match[0])).map(item => {
            return { label: item, insertText: snippetList[item], type: "snippet" }
        })

        return {
            start: offset - match[0].length,
            end: offset,
            items
        };
    }
}