import { projectFirestore } from "@/firebase/config";
import { addDoc, collection } from "@firebase/firestore";
import { ref } from "vue";

const addPost = (collectionName) => {
    const error = ref(null);
    const load = async (post) => {
        error.value = null;
        try {
            const postCollection = collection(projectFirestore, collectionName);
            const result = await addDoc(postCollection, post);
            return result;
        } catch (error) {
            error.value = error.message;
        }
    };

    return { error, load };
};

export default addPost;
