import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

/**
 * Initialization data for the saf extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'saf:plugin',
  description: 'A JupyterLab extension.',
  autoStart: true,
  activate: (app: JupyterFrontEnd) => {
    console.log('JupyterLab extension saf is activated!');
  }
};

export default plugin;
