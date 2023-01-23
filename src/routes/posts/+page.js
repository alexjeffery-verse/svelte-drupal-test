let data;

export async function load( { fetch } ) {
  let request = "http://localhost:8888/web/jsonapi/node/post";
  request += "?page[limit]=10";
  
  const fetchData = await fetch( request, {} )
    .then( response => response.json() )
    .then( res => {
      data = res
    })
    .catch(error => {
    console.log(error);
    return [];
  });

  return data 
}
