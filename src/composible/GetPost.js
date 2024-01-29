import { projectFirestore } from "@/firebase/config";
import { collection, getDocs, onSnapshot } from "@firebase/firestore";
import { ref } from "vue";

const getPost = (collectionName) => {
    const error = ref(null);
    const posts = ref([]);

    const documentRef = collection(projectFirestore, collectionName);
    const unsubscribe = onSnapshot(documentRef, (snapshot) => {
        const results = [];
        snapshot.forEach((doc) => {
            results.push({ id: doc.id, ...doc.data() });
        });

        posts.value = results;
        error.value = null;
    }, (error) => {
        error.value = error.message;
        posts.value = [];
    });

    return { posts, error, unsubscribe };
};

export default getPost;
