<template>
  <div>
    <Banner />
    <Section/>
  </div>
</template>

<script>
import Banner from "@/components/Banner.vue";
import Section from "@/components/Section.vue";

export default {
  name: "HomeView",
  components: {
    Banner,
    Section
   },
}
</script>

<style scoped>

</style>
