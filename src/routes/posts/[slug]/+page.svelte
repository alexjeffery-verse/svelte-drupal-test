<script>
import { createForm } from "svelte-forms-lib";

export let data;

let post = data.data;
let id = data.id;
let categories = data.included.categories;
let testimonials = data.included.testimonials;
let createdTestimonialId;

const { form, handleChange, handleSubmit } = createForm({
    initialValues: {
    authorName: "",
    testimonialTitle: "",
	testimonialText:""
    },
    onSubmit: values => {
    	createTestimonial();
    }
});

function createTestimonial() {
    let url = 'http://localhost:8888/web/jsonapi/paragraph/testimonials';
    let method = "POST";
    let data = {
		"data": {
			"type": "paragraph--testimonials",
			"attributes": {
				"field_author_name": { 
					"value": $form.authorName,
					"format": "plain_text"
				},
				"field_author_title": {
					"value": $form.testimonialTitle,
					"format": "plain_text"
				},
				"field_text": {
					"value": $form.testimonialText,
					"format": "plain_text"
				}
			},
		}
    }

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
			createdTestimonialId = res.data.id;
			addTestimonialToPost( createdTestimonialId )
        }
    )
    .catch(error => {
        console.log(error);
        return [];
    });
}

async function addTestimonialToPost( createdTestimonialId ) {
    let url = 'http://localhost:8888/web/jsonapi/node/post/';
	url += id
    let method = "PATCH";
    let data = {
		"data": {
			"type": "node--post",
			"id": id,
			"relationships":{
				"field_paragraph":{
					"data": []
				}
			}
		},
    }

	// setup new testimonial
	let newTestimonial = {
		"type": "paragraph--testimonials",
		"id": createdTestimonialId,
		"meta": {
			"drupal_internal__target_id": "testimonials"
		}
	}

	// add exisiting testimonials
	testimonials.forEach(element => {
		data.data.relationships.field_paragraph.data.push(element)
	});
	
	// add new testimonial
	data.data.relationships.field_paragraph.data.push(
		newTestimonial
	)

    await fetch( url, { 
        method,
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/vnd.api+json',
            'Content-type': 'application/vnd.api+json',
        }
    })
    .then( response => response.json() )
    .then( res => { 
            console.log(res)
			// data.data.relationships.field_paragraph.data is returning an empty []
        }
    )
    .catch(error => {
        console.log(error);
        return [];
    });
}
</script>

<h1>{post.title}</h1>

{#if categories }
	<p>
		Categories: 
		{#each categories as category }
			<span>{category}</span>
		{/each}
	</p>
	{:else}
    <p>Unassigned Category</p>
{/if}

<p>{post.content}</p>

{#if testimonials }
<h2>Testimonials</h2>
	<div>
		{#each testimonials as testimonial }
			<h3>{testimonial.attributes.field_author_title.value}</h3>
			<p>{testimonial.attributes.field_text.value}</p>
			<p>{testimonial.attributes.field_author_name.value}</p>
		{/each}
	</div>
{/if}

<h3>Add a testimonial</h3>

<form on:submit={handleSubmit}>
    <label for="authorName">Author Name</label>
    <input
        id="authorName"
        name="authorName"
        on:change={handleChange}
        bind:value={$form.authorName}
    />
    <label for="testimonialTitle">Title</label>
    <input
        id="testimonialTitle"
        name="testimonialTitle"
        on:change={handleChange}
        bind:value={$form.testimonialTitle}
    />
    <label for="testimonialText">Text</label>
    <input
        id="testimonialText"
        name="testimonialText"
        on:change={handleChange}
        bind:value={$form.testimonialText}
    />


    <button type="submit">Add a testimonial</button>
</form>
<a href='/posts'>See all the posts</a>

<style>
	span {
		margin-right: 10px;
	} 
</style>