import { projectFirestore } from "@/firebase/config";
import { doc, getDoc } from "@firebase/firestore";
import { ref } from "vue";

const getPostById = (collectionName) => {
    const error = ref(null);
    const post = ref(null);

    const fetchPostById = async (id) => {
        error.value = null;
        try {
            const postRef = doc(projectFirestore, collectionName, id);
            const result = await getDoc(postRef);

            if (result.exists()) {
                post.value = { id: result.id, ...result.data() };
                console.log("Fetched post data:", post.value);
            } else {
                error.value = `Post with ID ${id} does not exist.`;
            }
        } catch (error) {
            error.value = error.message;
        }
    };

    return { error, post, fetchPostById };
};

export default getPostById;
