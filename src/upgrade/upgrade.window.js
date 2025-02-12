/*
 * @copyright Copyright (c) 2023 Maksim Sukharev <antreesy.web@gmail.com>
 *
 * @license AGPL-3.0-or-later
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

const { BASE_TITLE } = require('../constants.js')
const { BrowserWindow } = require('electron')
const { applyExternalLinkHandler } = require('../app/externalLinkHandlers.js')

/**
 *
 * @return {import('electron').BrowserWindow}
 */
function createUpgradeWindow() {
	const WIDTH = 350
	const HEIGHT = 300
	const TITLE = `Upgrade required - ${BASE_TITLE}`
	const window = new BrowserWindow({
		title: TITLE,
		width: WIDTH,
		height: HEIGHT,
		show: false,
		maximizable: false,
		resizable: false,
		fullscreenable: false,
		autoHideMenuBar: true,
		webPreferences: {
			preload: UPGRADE_WINDOW_PRELOAD_WEBPACK_ENTRY,
		},
	})

	window.removeMenu()

	window.loadURL(UPGRADE_WINDOW_WEBPACK_ENTRY)

	applyExternalLinkHandler(window)

	window.on('ready-to-show', () => {
		window.show()
	})

	return window
}

module.exports = {
	createUpgradeWindow,
}
