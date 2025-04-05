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
exports.BugFixPanel = void 0;
const vscode = __importStar(require("vscode"));
const api_1 = require("./api");
class BugFixPanel {
    static currentPanel;
    _panel;
    _disposables = [];
    static render(extensionUri) {
        if (this.currentPanel) {
            this.currentPanel._panel.reveal(vscode.ViewColumn.Beside);
            return;
        }
        const panel = vscode.window.createWebviewPanel('bugFixer', 'Bug Detector & Fixer', vscode.ViewColumn.Beside, {
            enableScripts: true
        });
        this.currentPanel = new BugFixPanel(panel, extensionUri);
    }
    async _getActiveEditorWithFocus() {
        let editor = vscode.window.activeTextEditor;
        if (!editor) {
            await vscode.commands.executeCommand('workbench.action.focusActiveEditorGroup');
            await new Promise(resolve => setTimeout(resolve, 200));
            const visibleEditors = vscode.window.visibleTextEditors;
            if (visibleEditors.length > 0) {
                editor = visibleEditors[0];
                await vscode.window.showTextDocument(editor.document, editor.viewColumn);
            }
            await new Promise(resolve => setTimeout(resolve, 200));
            editor = vscode.window.activeTextEditor;
        }
        return editor || null;
    }
    constructor(panel, extensionUri) {
        this._panel = panel;
        this._panel.webview.html = this._getHtml();
        this._panel.webview.onDidReceiveMessage(async (message) => {
            if (message.command === 'checkBugs') {
                const editor = await this._getActiveEditorWithFocus();
                if (!editor) {
                    this._panel.webview.postMessage({ error: 'No active editor found even after refocus.' });
                    return;
                }
                const code = editor.document.getText();
                const result = await (0, api_1.queryHuggingFace)(code);
                this._panel.webview.postMessage({ result });
            }
            if (message.command === 'integrateFix') {
                const editor = await this._getActiveEditorWithFocus();
                if (!editor) {
                    vscode.window.showErrorMessage('No active editor found even after attempting to focus.');
                    return;
                }
                const edit = new vscode.WorkspaceEdit();
                const fullRange = new vscode.Range(editor.document.positionAt(0), editor.document.positionAt(editor.document.getText().length));
                edit.replace(editor.document.uri, fullRange, message.fixedCode);
                await vscode.workspace.applyEdit(edit);
                await editor.document.save();
                vscode.window.showInformationMessage('Fixed code integrated successfully.');
            }
        }, undefined, this._disposables);
        this._panel.onDidDispose(() => this.dispose(), null, this._disposables);
    }
    _getHtml() {
        return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <style>
        body {
          font-family: 'Segoe UI', sans-serif;
          padding: 20px;
          background-color: #1e1e1e;
          color: #d4d4d4;
        }
  
        h2 {
          color: #3794ff;
          margin-bottom: 16px;
          font-size: 20px;
        }
  
        button {
          background-color: #0e639c;
          color: white;
          border: none;
          padding: 10px 18px;
          font-size: 14px;
          border-radius: 4px;
          cursor: pointer;
          transition: background 0.2s;
        }
  
        button:hover {
          background-color: #1177bb;
        }
  
        button:disabled {
          background-color: #444;
          cursor: not-allowed;
        }
  
        .group-container {
          background-color: #252526;
          border: 1px solid #333;
          border-radius: 8px;
          padding: 20px;
          margin-top: 24px;
        }
  
        .card {
          background-color: #2a2a2a;
          padding: 16px;
          border-radius: 6px;
          border: 1px solid #333;
          width: 100%;
          box-sizing: border-box;
          margin-top: 16px;
        }
  
        .card-label {
          font-size: 15px;
          font-weight: bold;
          margin-bottom: 8px;
          color: #cccccc;
        }
  
        .card-content {
          font-size: 16px;
          color: #ffffff;
          word-wrap: break-word;
        }
  
        pre {
          background: #1b1b1b;
          color: #dcdcdc;
          padding: 12px;
          border-radius: 4px;
          font-size: 13px;
          max-height: 300px;
          overflow: auto;
          white-space: pre-wrap;
          word-break: break-word;
          margin-top: 8px;
          margin-bottom: 12px;
        }
  
        #spinner {
          display: none;
          margin-top: 12px;
          width: 20px;
          height: 20px;
          border: 3px solid #444;
          border-top: 3px solid #3794ff;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
  
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      </style>
    </head>
    <body>
      <h2>Bug Detector & Fixer</h2>
      <button id="checkBtn">Check</button>
      <div id="spinner"></div>
      <div id="output"></div>
  
      <script>
  const vscode = acquireVsCodeApi();
  const checkBtn = document.getElementById('checkBtn');
  const spinner = document.getElementById('spinner');
  const output = document.getElementById('output');

  checkBtn.addEventListener('click', () => {
    output.innerHTML = "";
    spinner.style.display = 'block';
    checkBtn.disabled = true;
    vscode.postMessage({ command: 'checkBugs' });
  });

  window.addEventListener('message', event => {
    const { result, error } = event.data;
    spinner.style.display = 'none';
    checkBtn.disabled = false;

    if (error) {
      output.innerHTML = '<p style="color:red;">' + error + '</p>';
    } else if (result) {
      const { bug_status, bug_type, fixed_code } = result;

      output.innerHTML = \`
        <div class="group-container">
          <div class="card">
            <div class="card-label">🟡 Bug Status</div>
            <div class="card-content">\${bug_status}</div>
          </div>

          <div class="card">
            <div class="card-label">⚠️ Bug Type</div>
            <div class="card-content">\${bug_type || 'None'}</div>
          </div>

          <div class="card">
            <div class="card-label">🛠️ Fixed Code</div>
            <pre id="fixedCodeBlock">\${fixed_code ? fixed_code.replace(/</g, '&lt;').replace(/>/g, '&gt;') : 'N/A'}</pre>
            <button id="integrateBtn">Integrate Fix</button>
          </div>
        </div>
      \`;

      document.getElementById('integrateBtn').addEventListener('click', () => {
        const codeText = document.getElementById('fixedCodeBlock').innerText;
        vscode.postMessage({ command: 'integrateFix', fixedCode: codeText });
      });
    }
  });
</script>

    </body>
    </html>
    `;
    }
    dispose() {
        BugFixPanel.currentPanel = undefined;
        this._panel.dispose();
        while (this._disposables.length) {
            const d = this._disposables.pop();
            if (d)
                d.dispose();
        }
    }
}
exports.BugFixPanel = BugFixPanel;
//# sourceMappingURL=panel.js.map