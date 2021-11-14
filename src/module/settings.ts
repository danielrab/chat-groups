export function registerSettings(): void {
  (game as Game).settings.register('chat-groups', 'groups', {
    default: {},
    type: Object,
    scope: 'world',
  });
}
