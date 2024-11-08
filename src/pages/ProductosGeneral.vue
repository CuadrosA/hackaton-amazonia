<template>
  <q-page class="q-pa-md">
    <q-section> </q-section>
    <q-section id="productos">
      <q-card
        class="my-card"
        flat
        bordered
        v-for="producto in productos"
        :key="producto.id"
      >
        <q-img src="https://cdn.quasar.dev/img/chicken-salad.jpg" />

        <q-card-section>
          <q-btn
            fab
            color="primary"
            icon="place"
            class="absolute"
            style="top: 0; right: 12px; transform: translateY(-50%)"
          />

          <div class="row no-wrap items-center">
            <div class="col text-h6 ellipsis">{{ producto.nombre }}</div>
            <div
              class="col-auto text-grey text-caption q-pt-md row no-wrap items-center"
            >
              <q-icon name="place" />
              {{ producto.origen.region }}
            </div>
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="text-subtitle1">
            S/{{ producto.precio }} ・{{ producto.categoria }}
          </div>
          <div class="text-caption text-grey">
            {{ producto.descripcion }}
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions>
          <q-btn flat round icon="event" />
          <q-btn flat color="primary"> Reserve </q-btn>
        </q-card-actions>
      </q-card>
    </q-section>
  </q-page>
</template>
<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "ProductosPage",
  setup() {},
  data() {
    return {
      // Lógica con Options API

      productos: [
        {
          id: 1,
          nombre: "Hamaca Shipiba Tradicional",
          categoria: "Artesanía",
          precio: 180.5,
          descripcion:
            "Hamaca tejida a mano por artesanas de la comunidad Shipiba de Ucayali",
          origen: {
            region: "Ucayali",
            comunidad: "Comunidad Shipiba de San Francisco",
            coordenadas: {
              latitud: -8.3758,
              longitud: -74.5538,
            },
          },
          productor: {
            nombre: "Asociación de Artesanas Shipibas del Ucayali",
            tipoOrganizacion: "Cooperativa",
            añoFundacion: 2005,
            contacto: {
              telefono: "+51 961 234 567",
              email: "artesanias.shipibas@gmail.com",
            },
          },
          caracteristicas: {
            material: "Algodón natural",
            dimensiones: "2.5m x 1.8m",
            tecnica: "Tejido tradicional",
          },
          stock: 25,
          imagenes: ["hamaca-shipiba-1.jpg", "hamaca-shipiba-2.jpg"],
        },
        {
          id: 2,
          nombre: "Aceite de Sacha Inchi",
          categoria: "Alimentación",
          precio: 35.9,
          descripcion: "Aceite orgánico de Sacha Inchi, rico en omega 3, 6 y 9",
          origen: {
            region: "Loreto",
            provincia: "Maynas",
            localidad: "Comunidad de San Juan",
          },
          productor: {
            nombre: "Amazonía Orgánica SAC",
            tipoOrganizacion: "Empresa Social",
            añoFundacion: 2012,
            certificaciones: ["Orgánico", "Comercio Justo"],
          },
          caracteristicas: {
            presentacion: "Botella de 250ml",
            propiedades: [
              "Alto contenido nutricional",
              "Sin conservantes",
              "Prensado en frío",
            ],
          },
          stock: 50,
          imagenes: ["sacha-inchi-1.jpg", "sacha-inchi-2.jpg"],
        },
        {
          id: 3,
          nombre: "Cerámica Ceremonial Asháninka",
          categoria: "Arte",
          precio: 250.0,
          descripcion:
            "Vasija ceremonial tradicional pintada a mano por artesanos Asháninka",
          origen: {
            region: "Junín",
            comunidad: "Comunidad Asháninka de Satipo",
            coordenadas: {
              latitud: -11.2533,
              longitud: -75.3343,
            },
          },
          productor: {
            nombre: "Colectivo de Artesanos Asháninka",
            tipoOrganizacion: "Asociación Comunitaria",
            añoFundacion: 1998,
          },
          caracteristicas: {
            material: "Arcilla local",
            tecnica: "Modelado y pintado tradicional",
            dimensiones: "30cm x 25cm",
          },
          stock: 15,
          imagenes: ["ceramica-ashaninka-1.jpg", "ceramica-ashaninka-2.jpg"],
        },
        {
          id: 4,
          nombre: "Chocolate de Cacao Nativo",
          categoria: "Alimentación",
          precio: 22.5,
          descripcion:
            "Chocolate 70% cacao, elaborado por comunidades de la selva central",
          origen: {
            region: "Junín",
            provincia: "Chanchamayo",
            zona: "Valle de la Merced",
          },
          productor: {
            nombre: "Cooperativa de Cacaoteros del Centro",
            tipoOrganizacion: "Cooperativa Agrícola",
            añoFundacion: 2010,
            certificaciones: ["Comercio Justo", "Agricultura Orgánica"],
          },
          caracteristicas: {
            presentacion: "Barra de 80g",
            propiedades: [
              "100% cacao peruano",
              "Sin azúcares añadidos",
              "Elaboración artesanal",
            ],
          },
          stock: 40,
          imagenes: ["chocolate-cacao-1.jpg", "chocolate-cacao-2.jpg"],
        },
        {
          id: 5,
          nombre: "Medicina Natural de Uña de Gato",
          categoria: "Salud",
          precio: 45.0,
          descripcion:
            "Extracto concentrado de Uña de Gato, tradicional medicina amazónica",
          origen: {
            region: "Madre de Dios",
            provincia: "Tambopata",
            zona: "Reserva Nacional de Tambopata",
          },
          productor: {
            nombre: "Plantas Medicinales Amazonía",
            tipoOrganizacion: "Empresa Comunitaria",
            añoFundacion: 2008,
            conocimientoTradicional:
              "Recolección y preparación según métodos ancestrales",
          },
          caracteristicas: {
            presentacion: "Frasco de 100ml",
            propiedades: [
              "Antiinflamatorio natural",
              "Fortalece sistema inmunológico",
              "Extracto 100% natural",
            ],
          },
          stock: 30,
          imagenes: ["una-gato-1.jpg", "una-gato-2.jpg"],
        },
      ],
    };
  },
  methods: {},
});
</script>

<style scoped lang="scss">
.q-page {
  background-color: white;
  display: grid;
  grid-template-columns: 20% auto;
  gap: 10px;
  .q-section {
    grid-column: 1fr;
  }

  #productos {
    gap: 30px;
    display: flex;
    flex-flow: row wrap;
    // justify-content: center;
  }
  .my-card {
    width: 100%;
    max-width: 325px;
  }
}
</style>
