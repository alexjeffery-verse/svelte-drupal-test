let data;
let included;

export async function load( {fetch, params} ) {
  let request = "http://localhost:8888/web/jsonapi/node/post";
  request += '/' + params.slug;
  request += "?include=field_category";
  
  const fetchData = await fetch( request, {} )
    .then(response => response.json())
    .then(res => {
      data = res.data
      included = res.included
    })
    .catch(error => {
    console.log(error);
    return [];
  });

  return {
    data: {
      title: data.attributes.title,
      content: data.attributes.body.value
    },
    included: {
      categoryNames: included.map(({ attributes: { name } }) => {
        return {
          name
        };
      })
    }
  }
}
