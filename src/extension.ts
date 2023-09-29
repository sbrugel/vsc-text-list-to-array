// The module 'vscode' contains the VS Code extensibility API
import * as vscode from 'vscode';

// This method is called when your extension is activated
export function activate(context: vscode.ExtensionContext) {
	console.log('Extension loaded!');

	// The command has been defined in the package.json file
	let disposable = vscode.commands.registerCommand('text-list-to-array.convertToArray', () => {
		const strip = (inputString: string): string => {
			return inputString.replace(/^\s+|\s+$/g, '');
		};

		// The code you place here will be executed every time your command is executed
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			const document = editor.document;
			const selection = editor.selection;
			
			if (!selection.isEmpty) {
				let modifiedText: string;
				const splitAtNewline = document.getText(selection).split("\n");
				if (splitAtNewline.length > 1) {
					modifiedText = `[${splitAtNewline.map((item: string) => `'${strip(item)}'`).join(", ")}]`;
				} else {
					modifiedText = `[${document.getText(selection).split(",").map((item: string) => `'${strip(item).replace(",", "")}'`).join(", ")}']`;
				}

				editor.edit(editBuilder => {
					editBuilder.replace(selection, modifiedText);
				})
			} else {
				vscode.window.showErrorMessage("No selected text!");
			}
		} else {
			vscode.window.showErrorMessage("No active editor!");
		}
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
