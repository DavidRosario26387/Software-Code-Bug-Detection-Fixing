// secret.ts
import * as vscode from 'vscode';

let secretStorage: vscode.SecretStorage;

export function setSecretStorage(storage: vscode.SecretStorage) {
  secretStorage = storage;
}

export async function getApiKey(): Promise<string | undefined> {
  return await secretStorage.get('huggingface-api-key');
}
export async function deleteApiKey(): Promise<void> {
  await secretStorage.delete('huggingface-api-key');
  vscode.window.showInformationMessage('Hugging Face API key has been reset.');
}

export async function promptAndStoreApiKey(): Promise<string | undefined> {
  const input = await vscode.window.showInputBox({
    prompt: 'Enter your Hugging Face API key',
    ignoreFocusOut: true,
    password: true
  });
  if (input) {
    await secretStorage.store('huggingface-api-key', input);
    vscode.window.showInformationMessage('Hugging Face API key saved securely.');
    return input;
  } else {
    vscode.window.showWarningMessage('No API key entered. Extension functionality will be limited.');
    return undefined;
  }
}
