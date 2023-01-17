let data;
const fetchData = fetch("http://localhost:8888/web/jsonapi/node/post",{})
    .then(response => response.json())
    .then(res => {
        data = res.data.map(({ attributes: { title , body: { value } } }) => {
            return {
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
