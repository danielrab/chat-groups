export function showGroupsDialog(groups = [1, 2]) {
  const header = `<tr>` + groups.map((g) => `<th>Group${g}<th>`).join('') + `</tr>`;
  const tableContent = (game as Game)
    .users!.map(
      (user) =>
        `<tr>` +
        groups
          .map(
            (g) => `
            <td>
              <input type="radio" id="group-${g}-${user.id}" name="${user.id}" value="${g}"
            checked>
              <label for="group-${g}-${user.id}">${user.name}</label>
            <td>`,
          )
          .join('') +
        `</tr>`,
    )
    .join('');
  new Dialog({
    title: 'Set Groups',
    content: '<table>' + header + tableContent + '</table>',
    default: 'confirm',
    buttons: {
      confirm: {
        icon: "<i class='fas fa-check'></i>",
        label: `Apply`,
        callback: (html) => {
          const checkedButtons = Object.fromEntries(
            [...(html as JQuery).find('input:checked')].map((e) => {
              const elem = $(e);
              return [elem.attr('name'), elem.val()];
            }),
          );
          (game as Game).settings.set('chat-groups', 'groups', checkedButtons);
        },
      },
      reset: {
        icon: "<i class='fas fa-refresh'></i>",
        label: `Reset Groups`,
        callback: () => {
          (game as Game).settings.set('chat-groups', 'groups', {});
        },
      },
    },
  }).render(true);
}
