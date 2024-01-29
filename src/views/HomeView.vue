<template>
  <div class="w-3/4 mx-auto my-5 p-5 h-auto bg-white shadow-md rounded-md">
    <div
      v-for="post in posts"
      :key="post.id"
      class="flex justify-between my-5 p-5 shadow-sm rounded"
    >
      <div class="space-y-4">
        <div
          class="bg-blue-600 inline-block text-white p-2 text-2xl font-bold transform -rotate-2"
        >
          {{ post.title }}
        </div>
        <div class="text-gray-700">
          {{ post.content }}
        </div>
        <div class="text-gray-400 flex space-x-2">
          <span v-for="tag in post.tags" :key="tag"> # {{ tag }} </span>
        </div>
      </div>
      <div class="flex space-x-2 text-gray-400">
        <div>
          <svg
            @click="handleEdit(post.id)"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-6 h-6 cursor-pointer hover:text-blue-600 duration-300"
          >
            <path
              d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z"
            />
          </svg>
        </div>
        <div>
          <svg
            @click="handleDelete(post.id)"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-6 h-6 cursor-pointer hover:text-blue-600 duration-300"
          >
            <path
              fill-rule="evenodd"
              d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import getPost from "@/composible/GetPost";
import deletePost from "@/composible/DeletePost";
import { useRouter } from "vue-router";
import { onMounted } from "vue";
export default {
  setup() {
    const { fetching, posts, error } = getPost("posts");
    const { remove } = deletePost("posts");
    const router = useRouter();
    onMounted(async () => {
      await fetching();
    });
    const handleDelete = async (id) => {
      await remove(id);
    };
    const handleEdit = (id) => {
      router.push({
        name: "createpost",
        params: { id: id },
        query: { id: id },
      });
    };
    return {
      error,
      posts,
      handleDelete,
      handleEdit,
    };
  },
};
</script>
