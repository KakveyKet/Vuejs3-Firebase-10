import { projectFirestore } from "@/firebase/config";
import { collection, doc, updateDoc } from "@firebase/firestore";
import { ref } from "vue/";

const UpdatePost = () => {
    const error = ref(null);

    const update = async (post) => {
        error.value = null;
        try {
            const postRef = doc(projectFirestore, "posts", post.id);
            await updateDoc(postRef, {
                title: post.title,
                content: post.content,
                tags: post.tags,
            });
        } catch (error) {
            error.value = error.message;
        }
    };

    return { error, update };
};

export default UpdatePost;
