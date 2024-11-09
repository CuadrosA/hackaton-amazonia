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

        <!-- <q-btn-toggle
          v-model="model"
          flat
          stretch
          toggle-color="yellow"
          :options="nav_options"
          @update:model-value="nav_seleccionado"
        /> -->

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
          dropdown-icon="none"
        >
          <q-list>
            <q-item clickable v-close-popup @click="onItemClick">
              <q-item-section>
                <q-item-label>Calculadora Contable</q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable v-close-popup @click="onItemClick">
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
          label="Ingresar"
          icon="login"
          @click="login_dialog = true"
        />
      </q-toolbar>
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
            <q-input filled v-model="user.password" label="contraseña" />
          </q-card-section>

          <q-card-actions>
            <q-btn
              style="width: 100%"
              label="Ingresar"
              color="secondary"
              v-close-popup
              type="submit"
              @click="
                this.login();
                this.fetchUserData();
              "
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
import { auth, signInWithEmailAndPassword } from "src/firebase";
import { db, doc, getDoc, collection, getDocs } from "src/firebase";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "MainLayout",

  components: {},

  setup() {
    const model = ref("one");
    const router = useRouter();

    const nav_options = [
      { label: "Lugares", value: "lugar" },
      { label: "Productos", value: "producto" },
    ];

    const nav_seleccionado = (value) => {
      console.log(`Opción seleccionada: ${value}`);
      switch (value) {
        case "lugar":
          console.log("Se seleccionó la función lugar");
          break;
        case "producto":
          router.push("/productos");
          console.log("Se seleccionó la función producto");
          break;
        case "three":
          console.log("Función para la opción Three");
          break;
      }
    };

    return {
      model,
      nav_options,
      nav_seleccionado,
      router,
    };
  },

  data() {
    return {
      login_dialog: ref(false),
      user: {
        email: ref("test@gmail.com"),
        password: ref("testing"),
        data: {},
      },
      userData: {},
      productos: {},
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
      this.$router.push("/");
    },
    async login() {
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          this.user.email,
          this.user.password
        );
        console.log("Usuario logueado", userCredential.user);
        //router.push("/dashboard"); // Redirige al dashboard o página principal
      } catch (error) {
        console.error("Error al iniciar sesión:", error.message);
        // Aquí puedes mostrar un mensaje de error en la UI si lo deseas
      }
    },

    async logout() {
      const router = useRouter();
      try {
        await signOut(auth);
        console.log("Sesión cerrada");
        router.push("/login"); // Redirige a la página de login
      } catch (error) {
        console.error("Error al cerrar sesión:", error.message);
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
