<template>
  <q-page>
    <q-section class="bg_control">
      <q-img src="images\bg_img1.png" style="width: 30%" id="img-1-left" />
      <q-img src="images\bg_img2.png" style="width: 30%" id="img-1-right" />
    </q-section>

    <q-section class="calculadora">
      <div class="calculadora-tittle">
        <p>Calculadora contable</p>
        <q-separator
          inset
          style="width: 20%; height: 4px; margin: 0px; padding: 0px"
        />
      </div>
      <div class="calculadora-campos">
        <p class="calculadora-text">Nombre del producto:</p>
        <q-input
          clearable
          filled
          class="calculadora-campo"
          v-model="cal_nombre"
          label="Nombre del producto"
        />
        <p class="calculadora-text">Cantidad:</p>
        <q-input
          v-model.number="cal_cantidad"
          type="number"
          class="calculadora-campo"
          filled
          label="Cantidad"
        />
        <p class="calculadora-text">Categoría:</p>
        <div class="calculadora-campo" id="categorias">
          <q-btn-dropdown
            color="primary"
            label="Dropdown Button"
            style="width: 85%"
            class="category_item_sta q-mr-lg"
            align="between"
          >
            <q-list>
              <q-item clickable v-close-popup @click="onItemClick">
                <q-item-section>
                  <q-item-label>Photos</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup @click="onItemClick">
                <q-item-section>
                  <q-item-label>Videos</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup @click="onItemClick">
                <q-item-section>
                  <q-item-label>Articles</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>

          <q-btn
            class="category_item_sta"
            push
            color="white"
            text-color="primary"
            round
            icon="card_giftcard"
            style="justify-self: right"
          />
        </div>
        <p class="calculadora-text">Precio:</p>
        <q-input
          v-model.number="cal_precio"
          class="calculadora-campo"
          type="number"
          filled
          label="Precio"
        />
      </div>
      <div class="calculadora-calcular" style="margin: 10px">
        <center>
          <q-btn
            color="primary"
            label="Calcular"
            style="width: 200px; letter-spacing: 5px"
            @click="dialog_calc = true"
          />
        </center>
      </div>
      <q-dialog v-model="dialog_calc" backdrop-filter="blur(4px)">
        <q-card>
          <q-card-section class="row items-center q-pb-none text-h6">
            Resultado
          </q-card-section>

          <q-card-section>
            El resultado de la operación es de {{ cal_cantidad * cal_precio }} .
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Close" color="primary" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </q-section>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "CalculadoraContable",
  setup() {},
  data() {
    return {
      cal_nombre: ref(""),
      cal_cantidad: ref(0),
      cal_precio: ref(0),
      dialog_calc: ref(false),
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

.calculadora {
  margin: 20px;
  padding: 20px;
  flex-grow: 1;
  background-color: #f0f0f0ec;
  border-radius: 25px;
  // border: 1px solid red;
  z-index: 2;

  .calculadora-tittle {
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

  .calculadora-campos {
    display: grid;
    grid-template-columns: 50% 50%;
    grid-template-rows: 1fr 1fr 1fr 1fr;
    gap: 10px;

    .calculadora-text {
      font-size: 10px;
      grid-column: 1 / 2;
      grid-row: 1fr;
      justify-self: end;
      align-self: center;
      font-weight: 600;
      font-size: 25px;
      margin: 0;
    }

    .calculadora-campo {
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
}
</style>
