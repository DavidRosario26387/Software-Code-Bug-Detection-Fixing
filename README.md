# Bug-Fixer Extension

**Bug-Fixer** is a Visual Studio Code extension designed to identify and automatically fix bugs in code using Hugging Face's `mistralai/Mistral-7B-Instruct-v0.3` model. It integrates seamlessly into the editor through a side panel interface, providing actionable results directly from large language model inference.

---

## Features

- Detects a wide range of Python code issues, including:
  - Syntax errors  
  - Semantic errors  
  - Logical errors  
  - Runtime errors  
  - Type errors  
  - Infinite loops  
  - Indentation issues  
- Utilizes the open-source `mistralai/Mistral-7B-Instruct-v0.3` model hosted on Hugging Face.

## UI and Interaction

- **Interactive Analysis Panel**:
  - Presents a structured diagnostic result consisting of:
    - `bug_status`: Indicates whether the input code is `"Buggy"` or `"Not Buggy"`.
    - `bug_type`: Provides a concise description of the detected issue, if any.
    - `fixed_code`: Displays the suggested corrected version of the input code.
  - Includes a clearly labeled **"Check"** button to initiate bug detection and correction.
  - Results are displayed in a clean, organized layout adjacent to the original code for easy comparison.

- **Secure Credential Handling**:
  - The Hugging Face API key is requested once during the initial setup.
  - The key is securely stored and encrypted using Visual Studio Code’s `SecretStorage` API.


---

## Requirements

- Visual Studio Code (v1.98.0 or higher recommended)
- A valid Hugging Face account and API access token

---

## Getting Started

1. Install the extension from a `.vsix` package using the command:

code --install-extension bug-fixer-extension-0.0.1.vsix

2. Open the Command Palette (`Ctrl+Shift+P`), then run:

Bugfixer Extension


3. On first launch, the extension will prompt you to enter your Hugging Face API key.
- The key is securely stored via SecretStorage.
- You can generate your token from: [https://huggingface.co/settings/tokens](https://huggingface.co/settings/tokens)

4. The side panel will open. Paste or write your Python code in the editor, then click "Check" in the panel to run analysis.

---

## Managing the API Key

The API key is securely stored and only prompted for once.

To modify the stored key run the following command from the Command Palette: 
 
press `ctrl + shift + p`

 * Reset:
 
`Reset Hugging Face API Key`

* Set

`Set Hugging Face API Key`


---

## Extension Commands

This extension contributes the following commands:

- `bugFixer.detectBugs` – Opens the bug-fix panel and analyzes the current code.
- `bugFixer.setApiKey` – Prompts for a new Hugging Face API key.

- `bugFixer.resetApiKey`- Reset Hugging Face API Key
---

## Known Limitations

- Response formatting assumes a valid JSON structure from the Hugging Face API.
- Processing large code snippets may result in slower inference times depending on model latency.

---

## Release Notes

### v1.0.0

- Initial release
- Integrated LLM inference via Hugging Face
- Secure API key handling using SecretStorage
- Interactive side panel UI for bug analysis and fixes

---

## License

This extension is currently distributed for internal research, educational, or demonstration purposes only.

