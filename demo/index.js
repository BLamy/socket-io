'use strict';
const electron = require('electron');
const app = electron.app;

// report crashes to the Electron project
require('crash-reporter').start();

// adds debug features like hotkeys for triggering dev tools and reload
require('electron-debug')();

// prevent window being garbage collected
let clientWindow;
let serverWindow;

function onClosed() {
	// dereference the window
	// for multiple windows store them in an array
	clientWindow = null;
	serverWindow = null;
}

function createWindow(pageName) {
	const win = new electron.BrowserWindow({
		width: 600,
		height: 400
	});

	win.loadURL(`file://${__dirname}/${pageName}.html`);
	win.on('closed', onClosed);

	return win;
}

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if (!clientWindow) {
		clientWindow = createWindow("index");
	}
	if (!clientWindow) {
		serverWindow = createWindow("server");
	}
});

app.on('ready', () => {
	clientWindow = createWindow("index");
	serverWindow = createWindow("server");
});
