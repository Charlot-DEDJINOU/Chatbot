<script>
export default {
  props: {
    name: String,
    message: String
  }
}
</script>
<template>
  <div class="d-flex justify-content-between mb-2 border-bottom" style="width: 95%; margin: 0px auto">
    <img src="../assets/home6.jpg" class="rounded-circle mx-2" style="width: 40px; height: 40px" />
    <div class="mt-2" style="width: 85%">
      <h5 style="font-weight: bold; font-size: 15px">{{ name }}</h5>
      <span style="font-size: 13px; padding-bottom: 2px;">{{ message }}</span>
    </div>
  </div>
</template>
