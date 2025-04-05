"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.setSecretStorage = setSecretStorage;
exports.getApiKey = getApiKey;
exports.deleteApiKey = deleteApiKey;
exports.promptAndStoreApiKey = promptAndStoreApiKey;
// secret.ts
const vscode = __importStar(require("vscode"));
let secretStorage;
function setSecretStorage(storage) {
    secretStorage = storage;
}
async function getApiKey() {
    return await secretStorage.get('huggingface-api-key');
}
async function deleteApiKey() {
    await secretStorage.delete('huggingface-api-key');
    vscode.window.showInformationMessage('Hugging Face API key has been reset.');
}
async function promptAndStoreApiKey() {
    const input = await vscode.window.showInputBox({
        prompt: 'Enter your Hugging Face API key',
        ignoreFocusOut: true,
        password: true
    });
    if (input) {
        await secretStorage.store('huggingface-api-key', input);
        vscode.window.showInformationMessage('Hugging Face API key saved securely.');
        return input;
    }
    else {
        vscode.window.showWarningMessage('No API key entered. Extension functionality will be limited.');
        return undefined;
    }
}
//# sourceMappingURL=secret.js.map