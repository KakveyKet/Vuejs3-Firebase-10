<template>
  <div class="w-3/4 mx-auto my-5 shadow-md rounded-md">
    <form @submit.prevent="handleSubmit" class="w-2/4 mx-auto p-5">
      <div>
        <label class="block text-gray-700 font-semibold">Title</label>
        <input
          class="w-full p-1 border-2 border-gray-200 focus:outline-none focus:border-blue-700 rounded"
          type="text"
          v-model="title"
          required
        />
      </div>
      <div>
        <label class="block text-gray-700 font-semibold">Content</label>
        <textarea
          class="w-full p-1 border-2 border-gray-200 focus:outline-none focus:border-blue-700 rounded"
          v-model="content"
          required
        ></textarea>
      </div>
      <div>
        <label class="block text-gray-700 font-semibold"
          >Tag (Hint space in order to add tag)</label
        >
        <input
          @keypress.space="handleAddTag"
          class="w-full p-1 border-2 border-gray-200 focus:outline-none focus:border-blue-700 rounded"
          type="text"
          required
          v-model="tag"
        />
      </div>
      <div v-for="tag in tags" :key="tag"># {{ tag }}</div>

      <button
        class="bg-blue-600 text-white px-4 py-2 rounded-md my-2 hover:translate-y-1 duration-300 transform transition"
      >
        {{ title ? "Update Post" : "Add Post" }}
      </button>
    </form>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import addPost from "@/composible/AddPost";
import UpdatePost from "@/composible/UpdatePost";
import getPostById from "@/composible/GetPosts";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
export default {
  props: ["id"],
  setup(props) {
    const title = ref("");
    const tag = ref("");
    const tags = ref([]);
    const content = ref("");
    const { post, fetchPostById } = getPostById("posts");
    const { update } = UpdatePost("posts");
    const route = useRoute();
    const router = useRouter();
    console.log(route.query);
    onMounted(async () => {
      if (route.query.id) {
        await fetchPostById(route.query.id);
      }
      if (post.value) {
        title.value = post.value.title;
        content.value = post.value.content;
        tags.value = post.value.tags;
      }
    });
    const handleAddTag = () => {
      tags.value.push(tag.value);
      tag.value = "";
    };
    const { load, error } = addPost("posts");
    const handleSubmit = async () => {
      if (route.query.id) {
        await update({
          id: route.query.id,
          title: title.value,
          content: content.value,
          tags: tags.value,
        });
      } else {
        await load({
          title: title.value,
          content: content.value,
          tags: tags.value,
        });
      }
      if (!error.value) {
        router.push({ name: "home" });
      }
      title.value = "";
      content.value = "";
      tags.value = "";
      tag.value = "";
    };
    return { title, tags, content, tag, handleAddTag, handleSubmit };
  },
};
</script>
