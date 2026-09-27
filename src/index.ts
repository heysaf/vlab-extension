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


    // // Add the command to the palette.
    // palette.addItem({ command, category: 'idek' });
  }
};

export default plugin;