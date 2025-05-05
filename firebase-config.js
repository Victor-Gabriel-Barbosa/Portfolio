// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyB0OjGGiGVWmsHQ2zaKBBhKZsF_VcysQRc",
  authDomain: "sample-firebase-ai-app-7e44f.firebaseapp.com",
  projectId: "sample-firebase-ai-app-7e44f",
  storageBucket: "sample-firebase-ai-app-7e44f.firebasestorage.app",
  messagingSenderId: "231779930004",
  appId: "1:231779930004:web:be09c5b49456022a518981"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);

// Obter referência ao Firestore
const db = firebase.firestore();

// Obter referência à Autenticação
const auth = firebase.auth();

// Configurar provedores de autenticação
const googleProvider = new firebase.auth.GoogleAuthProvider();
const githubProvider = new firebase.auth.GithubAuthProvider();

// Lista de emails autorizados a gerenciar projetos
const adminEmails = [
  'seu.email@exemplo.com',
  'outro.admin@exemplo.com'
];

// Verificar se o usuário é admin
function isAdmin(email) {
  return adminEmails.includes(email);
}