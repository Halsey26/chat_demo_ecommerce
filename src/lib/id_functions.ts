// Funciones Genera un id aleatorio

// permite que el id del usuario se genere solo una vez por navegador
export function getOrCreateUserId(){
    if (typeof window === 'undefined') return 'anon'; // fallback para SSR
    let id = localStorage.getItem("user_id");
    // si no hay user_id
    if (!id) {
        id= crypto.randomUUID();
        localStorage.setItem("user_id", id);
    }
    return id;
}

// Permite que se genere por sesión
export function getOrCreateConversationId (){
      if (typeof window === 'undefined') return crypto.randomUUID(); // fallback para SSR

    let id = sessionStorage.getItem("conversation_id");
    // si no hay user_id
    if (!id) {
        id= crypto.randomUUID();
        sessionStorage.setItem("conversation_id", id);
    }
    return id;
}
