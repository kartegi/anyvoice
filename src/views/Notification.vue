<template>
<form class="box">
    <b-field label="Title">
        <b-input></b-input>
    </b-field>
    

    <b-field label="Message">
        <b-input type="textarea"></b-input>
    </b-field>

    <b-button type="is-primary">Send</b-button>
</form>
</template>

<style scoped>
.box {
    width: 100%;
    max-width: 600px;
}
</style>