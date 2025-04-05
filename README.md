# Software Code Bug Detection & Fixing

A VS Code extension for detecting and fixing bugs in Python code using generative AI (Mistral-7B-Instruct-v0.3). Developed under Intel Unnati Industrial Training Program 2025.

---

## Features

Interactive Editor Integration (Frontend)

- Analyzes Python code in your current VS Code editor.

- Highlights bug status and bug type in a side panel.

- Displays AI-generated suggestions for corrected code.

- One-click fix integration to replace buggy code seamlessly.

Secure API Communication (Backend)

- Uses the Mistral-7B-Instruct-v0.3 model via Hugging Face API.

- Secure, persistent storage of Hugging Face API token using VS Code’s SecretStorage API.

## Tech Stack

- **Frontend:** VS Code API (TypeScript)
- **Backend:** Hugging Face model endpoint (Mistral-7B-Instruct-v0.3)
- **Language Support:** Python
- **Secure Storage:** VS Code Secrets API

---
## Running the compiled VS Code extension

#### Requirements

- Visual Studio Code (v1.98.0 or higher recommended)
- A valid Hugging Face account and API access token

1. Download the Extension (`bug-fixer-extension-0.0.1.vsix`) from this repository

    1. Go to the Extensions view on VS Code (Ctrl+Shift+X or Cmd+Shift+X on macOS).

    2. Click on the More Actions menu (⋮) in the top-right corner.

    3. Select “Install from VSIX…”.
    
    4. Browse and select the downloaded .vsix file from the project directory

2. Generate free Hugging Face read access token : https://huggingface.co/docs/hub/en/security-tokens

3. Launch the Extension by pressing `Ctrl+Shift+P` (Cmd+Shift+P on macOS) to open the Command Palette.

    Type and select ```Bugfixer Extension``` to activate it.

4. Set the Hugging Face Access Token
When you run the extension for the first time, it will automatically prompt you to enter your Hugging Face access token (must start with hf_...).

Paste the token and press Enter — it will be securely stored using VS Code’s built-in SecretStorage API. This token will be reused in future runs without asking again.

The extension is fully set up and ready to run within VS Code.

---

After installing the `.vsix` file press `ctrl+shift+p` to open command palette and search `Bugfixer Extension`


![command pallete launch](https://github.com/user-attachments/assets/b1640854-4167-4a7a-a8dd-5e149ff7e2c6)

On first run, use the Command Palette (Ctrl+Shift+P) and select `Set Hugging Face API Key` or click `check` button. You’ll be prompted to securely enter your token (starting with `hf_...`). It will be stored using VS Code’s built-in SecretStorage.

![enter access token](https://github.com/user-attachments/assets/eea7856a-6b36-4ba3-8aca-87b4d9e78135)

Click the `check` button to see bug status and fixes

![exr2](https://github.com/user-attachments/assets/e35254dd-f521-4e6c-b819-64baf2b9aa2d)

Click `Integrate Fix` to integrate the fixed code to the code editor

![integrate](https://github.com/user-attachments/assets/d1354758-4caa-4887-8e45-bd4e2df49557)

---


##  Project Setup Instructions

### 1. Clone the Repository

```
git clone https://github.com/DavidRosario26387/Software-Code-Bug-Detection-Fixing.git
```

### 2. Install Dependencies
Make sure you have Node.js installed.

Install all required packages:

```
npm install vscode
npm install node-fetch
npm install --save-dev @types/node-fetch
```

### 3. Launch the Extension

1) Press F5 or click on "Run > Start Debugging" in the top menu.

2) This opens a new Extension Development Host window of VS Code.

3) In this new window, go to the Command Palette (Ctrl+Shift+P) and type:

```
> Bugfixer Extension
```

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

## Managing the API Key

To modify the stored key run the following command from the Command Palette: 
 
press `ctrl + shift + p`

* Reset: `Reset Hugging Face API Key`

* Set: `Set Hugging Face API Key`

---

## Extension Commands

This extension contributes the following commands:

- `Bugfixer Extension` -> `bugFixer.detectBugs` – Opens the bug-fix panel and analyzes the current code.
  
- `Set Hugging Face API Key` -> `bugFixer.setApiKey` – Prompts for a new Hugging Face API key.

- `Reset Hugging Face API Key` -> `bugFixer.resetApiKey`- Reset Hugging Face API Key
  
---

## Known Limitations

- Response formatting assumes a valid JSON structure from the Hugging Face API.
- Processing large code snippets may result in slower inference times depending on model latency.

---
## Conclusion

This project provides a practical, automated solution for identifying and fixing bugs in Python code using generative AI. With a smooth VS Code integration and secure key management, it bridges the gap between code quality and development speed.

---

## License

This extension is currently distributed for internal research, educational, or demonstration purposes only.

