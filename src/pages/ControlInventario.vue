<template>
  <q-page>
    <q-section class="bg_control">
      <q-img src="images\bg_img1.png" style="width: 30%" id="img-1-left" />
      <q-img src="images\bg_img2.png" style="width: 30%" id="img-1-right" />
    </q-section>

    <q-section class="inventory">
      <div class="i-superior">
        <q-section class="i-tittle">
          <p>Mi Inventario</p>
        </q-section>

        <q-section class="var-options">
          <q-btn
            color="primary"
            icon="add"
            label="Agregar producto"
            @click="this.dialog_add_product = true"
          />
        </q-section>
      </div>
      <div class="i-productos">
        <q-card
          flat
          bordered
          style="width: 350px"
          v-for="producto in this.products"
          :key="producto.id"
        >
          <q-img src="https://cdn.quasar.dev/img/chicken-salad.jpg" />

          <q-card-section>
            <div class="row no-wrap items-center">
              <div class="col text-h6 ellipsis">{{ producto.nombre }}</div>
            </div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <div class="text-subtitle1">
              S/{{ producto.precio }}・{{ producto.categoria }}
            </div>
            <div class="text-caption text-grey">
              Stock Disponible: {{ producto.stock }} unidades
            </div>
          </q-card-section>
        </q-card>
      </div>
    </q-section>

    <!-- Dialogo de registro -->
    <q-dialog v-model="dialog_add_product">
      <q-card class="q-pa-md" style="width: 400px">
        <q-card-section>
          <div class="text-h6" style="justify-self: center">
            <q-icon name="grocery" />
            Registrar Producto
          </div>
        </q-card-section>

        <q-card-section>
          <div class="text-h6">Nombre Producto:</div>
          <q-input
            filled
            v-model="n_product.nommbre"
            label="ejemplo: castaña"
          />
          <div class="text-h6">Cantidad:</div>
          <q-input
            v-model.number="n_product.cantidad"
            type="number"
            filled
            label="Cantidad"
          />

          <div class="text-h6">Seleccione la Categoría:</div>
          <q-btn-dropdown
            stretch
            color="primary"
            :label="n_product.categoria"
            style="width: 100%"
            align="between"
          >
            <q-list>
              <q-item
                clickable
                v-close-popup
                @click="n_product.categoria = 'Frutos Secos'"
              >
                <q-item-section>
                  <q-item-label> Frutos Secos </q-item-label>
                </q-item-section>
              </q-item>
              <q-item
                clickable
                v-close-popup
                @click="n_product.categoria = 'Frescos'"
              >
                <q-item-section>
                  <q-item-label> Frescos </q-item-label>
                </q-item-section>
              </q-item>
              <q-item
                clickable
                v-close-popup
                @click="n_product.categoria = 'Procesados'"
              >
                <q-item-section>
                  <q-item-label> Procesados </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
          <div class="text-h6">Precio</div>
          <q-input
            v-model.number="n_product.precio"
            type="number"
            filled
            label="ejemplo: 19.7"
          />
        </q-card-section>

        <q-card-actions>
          <q-btn
            style="width: 100%"
            label="Registrar"
            color="secondary"
            v-close-popup
            type="submit"
            @click="this.registerProduct()"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { serverTimestamp, query, where } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";
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
import { useQuasar } from "quasar";

export default defineComponent({
  name: "ControlInventario",
  setup() {},
  computed() {},
  data() {
    return {
      items: "",
      dialog_add_product: ref(false),
      n_product: {
        nombre: "Nuez Perlada",
        cantidad: 20,
        categoria: "Frutos Secos",
        precio: 15.8,
        user: "",
        description: "",
      },
      products: {},
    };
  },
  methods: {
    async registerProduct() {
      try {
        // Obtener el usuario actual
        const user = auth.currentUser;
        if (!user) {
          throw new Error("Usuario no autenticado");
        }
        // Referencia a la colección de productos
        const productsCollection = collection(db, "products");

        // Crear un nuevo documento con un ID generado automáticamente
        const newProductRef = doc(productsCollection);

        // Datos del producto
        const productData = {
          id: newProductRef.id, // ID único generado por Firestore
          nombre: this.n_product.nombre,
          descripcion: this.n_product.description,
          precio: this.n_product.precio,
          categoria: this.n_product.categoria,
          stock: this.n_product.cantidad,
          fechaCreacion: serverTimestamp(),
          user: user.uid, // UID del usuario que crea el producto
          estado: "activo", // Estado por defecto
        };

        // Guardar el producto en Firestore
        await setDoc(newProductRef, productData);

        // Notificación de éxito
        // this.$q.notify({
        //   message: "Producto registrado exitosamente",
        //   color: "positive",
        // });

        // Limpiar formulario
        this.n_product = {
          nommbre: "",
          cantidad: 0,
          categoria: "Frutos Secos",
          precio: 0,
          user: "",
          description: "",
        };

        return newProductRef.id;
      } catch (error) {
        console.error("Error al registrar producto:", error);

        // Notificación de error
        // this.$q.notify({
        //   message: "Error al registrar producto",
        //   color: "negative",
        // });

        throw error;
      }
    },
    async getProducts() {
      try {
        // Obtener el usuario actual
        const user = getAuth().currentUser;
        if (!user) {
          throw new Error("Usuario no autenticado");
        }

        const db = getFirestore();
        const productsCollection = collection(db, "products");

        // Crear una consulta para obtener productos donde el campo 'user' sea igual al UID del usuario
        const q = query(productsCollection, where("user", "==", user.uid));

        // Obtener los documentos que coinciden con la consulta
        const querySnapshot = await getDocs(q);
        console.log(querySnapshot);
        // Procesar los resultados y almacenarlos en la variable reactiva
        this.products = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        console.log(this.products);
      } catch (error) {
        console.error("Error al recuperar productos:", error);
      }
    },
  },
  mounted() {
    this.getProducts();
  },
});
</script>

<style scoped lang="scss">
.q-page {
  // border: 1px solid red;
  background-image: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);
  display: flex;
}

.bg_control {
  background-color: #f0f0f0;

  #img-1-left {
    position: absolute;
    top: 0px;
    left: 0;
    z-index: 1;
  }

  #img-1-right {
    position: absolute;
    bottom: 0;
    right: 0;
    z-index: 1;
  }
}

.inventory {
  margin: 20px;
  padding: 20px;
  flex-grow: 1;
  background-color: #f0f0f0ec;
  border-radius: 25px;
  // border: 1px solid red;
  z-index: 2;

  .i-superior {
    display: grid;
    grid-template-columns: 1fr 1fr;

    .q-section {
      grid-area: 1fr;
    }

    .i-tittle {
      p {
        margin: 0;
        font-size: 40px;
        font-weight: bold;
      }
    }

    .var-options {
      // border: 1px solid red;
      align-content: center;
      justify-self: end;

      .q-btn {
        align-self: end;
      }
    }
  }

  .i-productos {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }
}
</style>
