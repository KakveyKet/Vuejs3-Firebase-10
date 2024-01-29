import { projectFirestore } from "@/firebase/config";
import { doc, deleteDoc } from "@firebase/firestore";
import { ref } from "vue";

const deletePost = (collectionName) => {
    const error = ref(null);

    const remove = async (id) => {
        error.value = null;
        try {
            const postRef = doc(projectFirestore, collectionName, id);
            await deleteDoc(postRef);
        } catch (error) {
            error.value = error.message;
        }
    };

    return { error, remove };
};

export default deletePost;
