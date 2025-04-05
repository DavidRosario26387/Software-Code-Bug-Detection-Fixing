import * as vscode from 'vscode';
import { BugFixPanel } from './panel';
import { setSecretStorage, promptAndStoreApiKey, deleteApiKey } from './secret'; 

export function activate(context: vscode.ExtensionContext) {
  setSecretStorage(context.secrets);

  context.subscriptions.push(
    vscode.commands.registerCommand('bugFixer.detectBugs', () => {
      BugFixPanel.render(context.extensionUri);
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('bugFixer.setApiKey', async () => {
      await promptAndStoreApiKey();
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('bugFixer.resetApiKey', async () => {
      await deleteApiKey();
    })
  );
}

export function deactivate() {}
