export const getServers = async () => {
  return fetch(`https://api.nexushub.co/wow-classic/v1/servers/full`).then(
    (res) => {
      if (res.ok) {
        return res.json();
      }
    }
  );
};
