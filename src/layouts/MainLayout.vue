<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-avatar class="name-page-back" @click="this.go_home()">
          <img src="icons\image.png" />
        </q-avatar>
        <q-toolbar-title class="name-page-back" @click="this.go_home()">
          Raíces Tecnológicas
        </q-toolbar-title>

        <q-btn
          stretch
          flat
          label="Lugares"
          @click="this.go_lugares()"
          style=".active"
        />
        <q-btn stretch flat label="Productos" @click="this.go_productos()" />

        <q-btn-dropdown
          stretch
          color="none"
          label="Servicios"
          dropdown-icon="calculate"
        >
          <q-list>
            <q-item clickable v-close-popup @click="this.go_calculadora()">
              <q-item-section>
                <q-item-label>Calculadora Contable</q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable v-close-popup @click="this.go_simulador_precio()">
              <q-item-section>
                <q-item-label>Simulador de precios</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>

        <q-separator dark vertical />
        <q-btn
          stretch
          flat
          label="Inventario"
          icon="inventory"
          @click="go_control_inventario()"
          v-if="(loged == true) & (user.tipoUsuario == 'Vendedor')"
        />

        <q-btn-dropdown
          stretch
          v-if="loged == true"
          color="none"
          :label="user.name"
          dropdown-icon="account_circle"
        >
          <q-list>
            <q-item clickable v-close-popup @click="this.logout()">
              <q-item-section>
                <q-item-label>
                  <q-icon
                    name="logout"
                    color="black"
                    style="align-self: center; margin-right: 5px"
                    size="30px"
                  />
                  Desconectar
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>

        <q-btn
          stretch
          flat
          label="Registrarse"
          icon="how_to_reg"
          @click="register_dialog = true"
          v-if="loged == false"
        />
        <q-btn
          stretch
          flat
          label="Ingresar"
          icon="login"
          @click="login_dialog = true"
          v-if="loged == false"
        />
      </q-toolbar>

      <!-- Dialogo de ingreso/login -->
      <q-dialog v-model="login_dialog">
        <q-card class="q-pa-md" style="width: 400px">
          <q-card-section>
            <div class="text-h6" style="justify-self: center">
              <q-icon name="login" />
              Iniciar sesión
            </div>
          </q-card-section>

          <q-card-section>
            <div class="text-h6">Ingresa tu correo</div>
            <q-input filled v-model="user.email" label="ejemplo@gmail.com" />
          </q-card-section>

          <q-card-section>
            <div class="text-h6">Ingresa tu constraseña</div>
            <q-input
              v-model="user.password"
              filled
              :type="isPwd ? 'password' : 'text'"
            >
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>
          </q-card-section>

          <q-card-actions>
            <q-btn
              style="width: 100%"
              label="Ingresar"
              color="secondary"
              v-close-popup
              type="submit"
              @click="this.login()"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>

      <!-- Dialogo de registro -->
      <q-dialog v-model="register_dialog">
        <q-card class="q-pa-md" style="width: 400px">
          <q-card-section>
            <div class="text-h6" style="justify-self: center">
              <q-icon name="logout" />
              Registrarse
            </div>
          </q-card-section>

          <q-card-section>
            <div class="text-h6">Ingresa tu Nombre</div>
            <q-input filled v-model="user.name" label="ejemplo: marco" />
            <div class="text-h6">Ingresa tu Apellido</div>
            <q-input filled v-model="user.lastname" label="ejemplo: López" />
          </q-card-section>

          <q-card-section>
            <div class="text-h6">Ingresa tu correo</div>
            <q-input filled v-model="user.email" label="ejemplo@gmail.com" />
          </q-card-section>

          <q-card-section>
            <div class="text-h6">Ingresa tu constraseña</div>
            <q-input
              v-model="user.password"
              filled
              :type="isPwd ? 'password' : 'text'"
            >
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>
          </q-card-section>

          <q-card-section>
            <div class="text-h6">Tipo Usuario:</div>
            <q-btn-dropdown
              stretch
              color="primary"
              :label="user.type"
              style="width: 100%"
              align="between"
            >
              <q-list>
                <q-item clickable v-close-popup @click="user.type = 'Vendedor'">
                  <q-item-section>
                    <q-item-label> Vendedor </q-item-label>
                  </q-item-section>
                </q-item>
                <q-item
                  clickable
                  v-close-popup
                  @click="user.type = 'Comprador'"
                >
                  <q-item-section>
                    <q-item-label> Comprador </q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
          </q-card-section>

          <q-card-actions>
            <q-btn
              style="width: 100%"
              label="Registrarse"
              color="secondary"
              v-close-popup
              type="submit"
              @click="this.registerUserWithProfile()"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";

import {
  auth,
  signInWithEmailAndPassword,
  getAuth,
  createUserWithEmailAndPassword,
  getFirestore,
  signOut,
  db,
  setDoc,
  getDoc,
  doc,
  collection,
  getDocs,
} from "src/firebase";
import { useRouter } from "vue-router";
import { Notify } from "quasar";

export default defineComponent({
  name: "MainLayout",

  components: {},

  setup() {},

  computed() {},

  data() {
    return {
      login_dialog: ref(false),
      register_dialog: ref(false),
      isPwd: ref(true),
      user: {
        name: ref(""),
        email: ref("test@gmail.com"),
        password: ref("testing"),
        type: ref("Comprador"),
        lastname: ref(""),
        data: {},
      },
      userData: {},
      productos: {},
      loged: ref(false),
    };
  },
  methods: {
    go_home() {
      this.$router.push("/");
    },
    go_productos() {
      this.$router.push("/productos");
    },
    go_lugares() {
      this.$router.push("/lugares");
    },
    go_calculadora() {
      this.$router.push("/calculadora-contable");
    },
    go_simulador_precio() {
      this.$router.push("/simulador-precio");
    },
    go_control_inventario() {
      this.$router.push("/control-inventario");
    },

    async login() {
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          this.user.email,
          this.user.password
        );

        //Almacenamiento del uid y el tiempo de login
        localStorage.setItem("user_uid", userCredential.user.uid);
        localStorage.setItem("login", Date.now());
        this.fetchUserInfo();

        this.loged = true;

        // console.log("Usuario logueado", userCredential.user);
      } catch (error) {
        console.error("Error al iniciar sesión:", error.message);
      }
    },

    // Método de logout modificado
    async logout() {
      try {
        await signOut(auth);

        // Eliminar datos del localStorage
        localStorage.removeItem("user_uid");
        localStorage.removeItem("login");
        localStorage.removeItem("user_data");
        this.loged = false;

        // console.log("Sesión cerrada");
      } catch (error) {
        console.error("Error al cerrar sesión:", error.message);
      }
    },

    // Método para verificar la validez de la sesión
    checkSessionValidity() {
      const userUID = localStorage.getItem("user_uid");
      const loginTimestamp = localStorage.getItem("login");

      if (userUID && loginTimestamp) {
        const currentTime = Date.now();
        const sessionDuration = currentTime - parseInt(loginTimestamp);
        const oneHour = 60 * 60 * 1000; // 1 hora en milisegundos

        if (sessionDuration > oneHour) {
          // La sesión ha expirado, eliminar datos del localStorage
          this.logout();
          return false;
        }
        return true;
      }
      return false;
    },

    async registerUserWithProfile() {
      const auth = getAuth();
      const db = getFirestore();

      try {
        // Crear usuario en Authentication
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          this.user.email,
          this.user.password
        );

        const user = userCredential.user;

        // Crear documento en Firestore
        const userDocRef = doc(db, "users", user.uid);
        await setDoc(userDocRef, {
          uid: user.uid,
          email: this.user.email,
          nombre: this.user.name,
          apellido: this.user.lastname,
          tipoUsuario: this.user.type,
          fechaRegistro: new Date(),
        });

        this.login();
      } catch (error) {
        console.error("Error de registro:", error);
        throw error;
      }
    },

    async fetchUserData() {
      const user = auth.currentUser;
      if (user) {
        try {
          // Referencia al documento en la colección "users" con el UID del usuario
          const userDocRef = doc(db, "users", user.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            this.userData = userDoc.data(); // Almacena los datos del documento
            console.log("Datos del usuario:", this.userData);

            // Ahora accedemos a la subcolección 'orders' dentro de ese documento
            const ordersCollectionRef = collection(userDocRef, "productos");
            const ordersSnapshot = await getDocs(ordersCollectionRef);

            // Extraemos los datos de la subcolección 'orders'
            const productos = ordersSnapshot.docs.map((doc) => doc.data());

            console.log("productos del usuario:", productos);
            this.productos = productos;
          } else {
            console.log("No se encontró el documento del usuario");
          }
        } catch (error) {
          console.error(
            "Error al obtener los datos del usuario: ",
            error.message
          );
        }
      } else {
        console.log("No hay usuario autenticado");
      }
    },
    async fetchUserInfo() {
      const user = auth.currentUser;
      if (user) {
        try {
          const userDocRef = doc(db, "users", user.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const userData = userDoc.data();
            this.user.tipoUsuario = userData.tipoUsuario;
            this.user.name = userData.nombre;

            localStorage.setItem("user_data", JSON.stringify(userData));
          } else {
            console.log("No se encontró el documento del usuario");
            return null;
          }
        } catch (error) {
          console.error("Error al obtener el usuario:", error);
          return null;
        }
      }
    },
  },

  mounted() {
    this.checkSessionValidity();
    if (localStorage.getItem("user_uid")) {
      this.loged = true;
      this.fetchUserInfo();
    }
  },
});
</script>

<style scoped lang="scss">
.q-layout {
  // background-image: linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%);
  //background-color: #85ffbd;
  //background-image: linear-gradient(45deg, #85ffbd 0%, #fffb7d 100%);
  .name-page-back {
    cursor: pointer;
  }

  .btn-grad {
    background-image: linear-gradient(
      to right,
      #348f50 0%,
      #56b4d3 51%,
      #348f50 100%
    );
  }
  .btn-grad {
    margin: 10px;
    padding: 15px 45px;
    text-align: center;
    text-transform: uppercase;
    transition: 0.5s;
    background-size: 200% auto;
    color: white;
    box-shadow: 0 0 20px #eee;
    border-radius: 10px;
    display: block;
  }

  .btn-grad:hover {
    background-position: right center; /* change the direction of the change here */
    color: #fff;
    text-decoration: none;
  }
}

.q-header {
  //background-image: linear-gradient(-60deg, #ff5858 0%, #f09819 100%);
  max-width: 1500px;
  background-color: rgb(0, 0, 0);
  justify-self: center;
  width: 100%;
}

.q-page-container {
  max-width: 1500px;
  width: 100%;
  justify-self: center;
}
</style>
