import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';


import { Notification } from '@jupyterlab/apputils';
import { ICompletionProviderManager } from '@jupyterlab/completer';
import AutoClose from './AutoClose';
import CompletionProvider from './CompletionProvider';
import ConfigManager from './ConfigManager';


/**
 * Initialization data for the saf extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'saf:plugin',
  description: 'A JupyterLab extension.',
  autoStart: true,
  requires: [ICompletionProviderManager],
  activate: async (app: JupyterFrontEnd,
    manager: ICompletionProviderManager) => {
    Notification.info("Saf's vLab extension is active!")

    const configManager = new ConfigManager(app)
    await configManager.fetchConfig()

    if (configManager.get("enableSnippets")) {
      console.log("snippets enabled")
      manager.registerProvider(
        new CompletionProvider(configManager)
      );
    }


    if (configManager.get("enableAutoClose")) {
      console.log("autoclose enabled")
      new AutoClose(app) // Initialise the auto-closing parenthesis, brackets, etc...
    }

    // Define a widget creator function,
    // then call it to make a new widget
    // const newWidget = () => {
    //   // Create a blank content widget inside of a MainAreaWidget
    //   const content = new Widget();
    //   content.addClass("drooling")
    //   const image = document.createElement("img")
    //   image.src = "https://www.shutterstock.com/shutterstock/photos/97934504/display_1500/stock-vector-drooling-emoticon-97934504.jpg"
    //   content.node.append(image)

    //   const widget = new MainAreaWidget({ content });
    //   widget.id = 'apod-jupyterlab';
    //   widget.title.label = 'drooling';
    //   widget.title.closable = true;
    //   return widget;
    // }
    // let widget = newWidget();

    // Add an application command
    const command: string = 'apod:open';
    app.commands.addCommand(command, {
      label: 'drooling',
      execute: async () => {

        // // Regenerate the widget if disposed
        // if (widget.isDisposed) {
        //   widget = newWidget();
        // }
        // if (!widget.isAttached) {
        //   // Attach the widget to the main work area if it's not there
        //   app.shell.add(widget, 'main');
        // }
        // // Activate the widget
        // app.shell.activateById(widget.id);
      }
    });

    // // Add the command to the palette.
    // palette.addItem({ command, category: 'idek' });
  }
};

export default plugin;