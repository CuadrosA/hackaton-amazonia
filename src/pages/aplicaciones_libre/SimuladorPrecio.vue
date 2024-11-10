<template>
  <q-page>
    <q-section class="bg_control">
      <q-img src="images\bg_img1.png" style="width: 30%" id="img-1-left" />
      <q-img src="images\bg_img2.png" style="width: 30%" id="img-1-right" />
    </q-section>
    <q-section class="simulador">
      <div class="simulador-tittle">
        <p>Calculadora contable</p>
        <q-separator
          inset
          style="width: 20%; height: 4px; margin: 0px; padding: 0px"
        />
      </div>
      <div class="simulador-campos">
        <p class="simulador-text">Cantidad:</p>
        <q-input
          v-model.number="sim_cantidad"
          type="number"
          class="simulador-campo"
          filled
          label="Cantidad"
        />
        <p class="simulador-text">Costo de materiales:</p>
        <q-input
          v-model.number="sim_material"
          type="number"
          class="simulador-campo"
          filled
          label="Costo materiales"
        />
        <p class="simulador-text">Costo de transporte:</p>
        <q-input
          v-model.number="sim_transporte"
          type="number"
          class="simulador-campo"
          filled
          label="Costo transporte"
        />
        <p class="simulador-text">Costo de almacenamiento:</p>
        <q-input
          v-model.number="sim_almacenamiento"
          type="number"
          class="simulador-campo"
          filled
          label="Costo almacenamiento"
        />
      </div>
      <div style="margin: 20px">
        <center>
          <q-btn
            color="primary"
            label="Calcular"
            style="width: 300px; letter-spacing: 5px"
            @click="
              show_resultado = true;
              resultado =
                (sim_almacenamiento + sim_transporte + sim_material) /
                sim_cantidad;
            "
          />
        </center>
      </div>
      <div v-if="show_resultado | (resultado != 0)">
        <p class="simulador-resultado">
          El precio mínimo aplicable es de: S/<span>{{ resultado }}</span>
        </p>
      </div>
    </q-section>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "SimuladorPrecio",
  setup() {},
  data() {
    return {
      sim_cantidad: ref(0),
      sim_material: ref(0),
      sim_transporte: ref(0),
      sim_almacenamiento: ref(0),
      show_resultado: ref(false),
      resultado: ref(0),
    };
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

.simulador {
  margin: 20px;
  padding: 20px;
  flex-grow: 1;
  background-color: #f0f0f0ec;
  border-radius: 25px;
  // border: 1px solid red;
  z-index: 2;

  .simulador-tittle {
    align-items: center;
    justify-items: center;
    margin-bottom: 20px;

    p {
      font-size: 30px;
      font-weight: 600;
      text-transform: uppercase;
      margin-bottom: 0px;
    }
  }

  .simulador-campos {
    display: grid;
    grid-template-columns: 50% 50%;
    grid-template-rows: 1fr 1fr 1fr 1fr;
    gap: 10px;

    .simulador-text {
      font-size: 10px;
      grid-column: 1 / 2;
      grid-row: 1fr;
      justify-self: end;
      align-self: center;
      font-weight: 600;
      font-size: 25px;
      margin: 0;
    }

    .simulador-campo {
      width: 450px;
      justify-self: start;
      align-self: center;
      grid-column: 2 / 3;
      grid-row: 1fr;

      #categorias {
        display: grid;
        grid-template-columns: 1fr 1fr;

        .category_item_sta {
          grid-column: 1fr;
        }
      }
    }
  }

  .simulador-resultado {
    justify-self: center;
    align-self: center;
    font-size: 20px;
    font-weight: 700;

    span {
      color: red;
    }
  }
}
</style>
