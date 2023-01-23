<script>
import { createForm } from "svelte-forms-lib";

const { form, handleChange, handleSubmit } = createForm({
    initialValues: {
    title: "",
    body: "",
    },
    onSubmit: values => {
    createPost();
    }
});

function createPost() {
    let url = 'http://localhost:8888/web/jsonapi/node/post';
    let method = "POST";
    let data = {
            "data": {
            "type": "node--post",
            "attributes": {
                "title": $form.title,
                "body": {
                    "value": $form.body,
                    "format": "plain_text"
                }
            }
        }
    };

    const fetchData = fetch( url, { 
        method,
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/vnd.api+json',
            'Content-type': 'application/vnd.api+json',
        }
    })
    .then( response => response.json() )
    .then( res => { 
            let newCreatedPostId = res.data.id
            window.location.href = '/posts/' + newCreatedPostId;
        }
    )
    .catch(error => {
        console.log(error);
        return [];
    });
}

</script>

<form on:submit={handleSubmit}>
    <label for="title">Title</label>
    <input
        id="title"
        name="title"
        on:change={handleChange}
        bind:value={$form.title}
    />

    <label for="body">Text</label>
    <textarea
        id="body"
        name="body"
        on:change={handleChange}
        bind:value={$form.body}
    />

    <button type="submit">Submit</button>
</form>