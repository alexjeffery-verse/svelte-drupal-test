let data;
const fetchData = fetch("http://localhost:8888/web/jsonapi/node/discussion",{})
    .then(response => response.json())
    .then(res => {
      data = res.data.map(({ id, attributes: { title , body: { value } } }) => {
          return {
            id,
            title,
            value
          };
        });
    })
    .catch(error => {
    console.log(error);
    return [];
});

export function load() {
  return {data};
};
