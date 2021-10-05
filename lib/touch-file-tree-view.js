'use babel';

import { CompositeDisposable } from 'atom';
import { utimes } from 'fs';

export default {

  subscriptions: null,

  activate(state) {

    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'touch-file:refresh-file': () => this.refresh_file()
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  serialize() {
    return {  };
  },

  refresh_file() {
    let editor = atom.workspace.getActivePaneItem();
    let file = editor.list.querySelector('.selected').getPath();
    console.log('touch', file);
    return utimes(file, new Date(), new Date(), () => {});
  }

};
