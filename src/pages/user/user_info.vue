<template>

    <div class="temp">
        <div class="lie">日期设置-1:<input  id="beginTime" class="kbtn" /></div>
        <div id="datePlugin"></div>
    </div>
</template>

<script>
    import '../../plugins/date/date.css'
    import '../../plugins/date/date.js'

    export default {
        data() {
            return {

            }
        },
        mounted() {
            $('#beginTime').date();
        }
    }
</script>

<style scoped>
    .temp {
        padding-top: 30px;
    }
</style>


<style>
    .footer_bar {
        display: none;
    }
</style>
