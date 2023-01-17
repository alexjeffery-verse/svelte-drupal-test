let data;
const fetchData = fetch("http://localhost:8888/web/jsonapi/node/discussion",{})
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

export function load({ params }) {
	const discussion = data.find((discussion) => discussion.title === params.slug);
	return {
		discussion
	};
}