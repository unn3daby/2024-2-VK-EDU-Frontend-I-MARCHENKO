export function filterChatlist(fullChatList, username) {
  console.log(fullChatList);

  return Object.entries(fullChatList)
    .filter(([_, item]) => item.users.includes(username))
    .reduce((acc, [id, item]) => {
      acc[id] = item;

      return acc;
    }, {});
}
