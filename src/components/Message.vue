<script>
export default {
  props: {
    name: String,
    message: String
  }
}
</script>
<template>
  <div class="d-flex justify-content-between mb-1" style="width: 95%; margin: 0px auto;">
    <img src="../assets/home6.jpg" class="rounded-circle mx-2" style="width: 40px; height: 40px" />
    <div class="mt-2">
      <h5 style="font-weight: bold" class="fs-7">{{ name }}</h5>
      <p class="fs-7">{{ message }}</p>
    </div>
  </div>
</template>
