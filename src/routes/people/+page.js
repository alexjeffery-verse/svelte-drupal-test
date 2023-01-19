let data;
let includes;
let mergedData;

export async function load( { fetch } ) {
  let request = "http://localhost:8888/web/jsonapi/node/user";
  request += "?include=field_avatar_image";
  
  const fetchData = await fetch( request, {} )
    .then( response => response.json() )
    .then( res => {
      data = res.data;
      includes = res.included;

      data = res.data.map(({ attributes, relationships: { field_avatar_image : { data: { id, meta: { alt }} }} }) => {
        return {
          attributes,
          id,
          alt
        };
      });

      includes = res.included.map(({ id, attributes: { image_style_uri : {avatar}} }) => {
        return {
          id,
          avatar
        };
      });

      // map the two arrays together to match field_avatar_image id's

      mergedData = data.map(item => ({...item, 
        includes: includes.filter(i => i.id == item.id )
      }))
  
      return mergedData;
    
    })
    .catch(error => {
    console.log(error);
    return [];
  });

  return {
    mergedData
  }
}
