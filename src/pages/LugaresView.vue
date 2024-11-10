<template>
  <q-page>
    <q-section class="layout-lugares">
      <div class="mapa">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2243268.6873089503!2d-71.74012581318996!3d-11.948906902037693!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x917062a3448d3cdb%3A0x11479a993ef58d1c!2sMadre%20de%20Dios!5e0!3m2!1ses!2spe!4v1731169901506!5m2!1ses!2spe"
          width="100%"
          height="100%"
          style="border: 0; border-radius: 10px"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <div class="mapa-zona-seleccionada"></div>
    </q-section>
  </q-page>
</template>

<script></script>

<style scoped lang="scss">
.q-page {
  // border: 1px solid red;
  background-image: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);
  display: flex;
}

.layout-lugares {
  flex-grow: 1;
  margin: 5px 15px;
  display: grid;
  grid-template-columns: 50% 50%;

  div {
    grid-column: 1fr;
  }

  .mapa {
    margin: 20px;
    padding: 20px;
    border: 1px solid red;
    background-color: white;
    border-radius: 10px;
  }
}
</style>
