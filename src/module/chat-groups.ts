/**
 * This is your TypeScript entry file for Foundry VTT.
 * Register custom settings, sheets, and constants using the Foundry API.
 * Change this heading to be more descriptive to your module, or remove it.
 * Author: [your name]
 * Content License: [copyright and-or license] If using an existing system
 * 					you may want to put a (link to a) license or copyright
 * 					notice here (e.g. the OGL).
 * Software License: [your license] Put your desired license here, which
 * 					 determines how others may use and modify your module.
 */

// Import TypeScript modules
import { registerSettings } from './settings';
import { preloadTemplates } from './preloadTemplates';
import { showGroupsDialog } from './groups-dialog';

// Initialize module
Hooks.once('init', async () => {
  console.log('chat-groups | Initializing chat-groups');

  // Assign custom classes and constants here

  // Register custom module settings
  registerSettings();

  // Preload Handlebars templates
  await preloadTemplates();

  // Register custom sheets (if any)
});

Hooks.on('chatMessage', (log: unknown, content: unknown, message: any) => {
  const groups = <Record<string, string>>(game as Game).settings.get('chat-groups', 'groups');
  const myGroup = groups[(game as Game).user!.id];
  if (!myGroup) return;
  message.whisper = (game as Game).users!.map((u) => u.id).filter((id) => groups[id] === myGroup);
  message.type = 4;
});

(window as any).ChatGroups = {
  showGroupsDialog,
};
