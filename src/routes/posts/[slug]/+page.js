let data;
let includes;
let filteredCategories;
let testimonials;

export async function load( { fetch, params } ) {
  let request = "http://localhost:8888/web/jsonapi/node/post";
  request += '/' + params.slug;
  request += "?include=field_category,field_paragraph";
  
  const fetchData = await fetch( request, {} )
    .then( response => response.json() )
    .then( res => {
      data = res.data;
      includes = res.included;

      let categories = includes.filter(function(category) {
        return category.type == 'taxonomy_term--category'
      });

      filteredCategories = categories.map(({ attributes: { name } }) => {
        return name;
      });

      testimonials = includes.filter(function(testimonial) {
        return testimonial.type == 'paragraph--testimonials'
      });
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
      categories: filteredCategories,
      testimonials: testimonials
    }
  }
}