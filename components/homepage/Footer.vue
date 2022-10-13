<template>
    <div class="footer">
        <div class="column-cont">
            <div class="column">
                <div class="column-content">
                    <h5>Nos produits</h5>
                    <nuxt-link v-for="(categorie, i) in categories.data" :key="i" tag="a" to="">
                        {{categorie.attributes.name}}</nuxt-link>
                </div>
                <div class="column-content">
                    <h5>Support</h5>
                    <nuxt-link tag="a">Fonds d’écran</nuxt-link>
                    <nuxt-link tag="a">Brochures</nuxt-link>
                    <nuxt-link tag="a">Guides de l’utilisateur</nuxt-link>
                </div>
            </div>
            <div class="column">
                <div class="column-content">
                    <h5>Mentions Légales</h5>
                    <nuxt-link tag="a">Conditions d’utilisation</nuxt-link>
                    <nuxt-link tag="a">Politique de confidentialité</nuxt-link>
                    <nuxt-link tag="a">Cookies</nuxt-link>
                </div>

            </div>
            <div class="column">
                <div class="column-content">
                    <h5>Canaux officiels</h5>
                    <nuxt-link tag="a">Facebook</nuxt-link>
                    <nuxt-link tag="a">Instagram</nuxt-link>
                    <nuxt-link tag="a">Twitter</nuxt-link>
                    <nuxt-link tag="a">YouTube</nuxt-link>
                    <nuxt-link tag="a">Pinterest</nuxt-link>
                    <nuxt-link tag="a">LinkedIn</nuxt-link>
                    <nuxt-link tag="a">Youku</nuxt-link>
                    <nuxt-link tag="a">WeChat</nuxt-link>
                    <nuxt-link tag="a">Weibo</nuxt-link>
                </div>
            </div>
        </div>
        <a href="#vitrineSection">
            <div class="go-upside">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true"
                role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                <path fill="#3f8f51"
                    d="M10 19a1 1 0 0 1-.64-.23a1 1 0 0 1-.13-1.41L13.71 12L9.39 6.63a1 1 0 0 1 .15-1.41a1 1 0 0 1 1.46.15l4.83 6a1 1 0 0 1 0 1.27l-5 6A1 1 0 0 1 10 19Z" />
            </svg>
        </div>
        </a>
    </div>
</template>

<script setup>

onMounted(() => {
    console.log(props.categories)
})

const props = defineProps({
    categories: Array,
})

</script>

<style lang="css" scoped>
.footer {
    height: 80vh;
    width: 100%;
    background: var(--title);
}

.column-cont {
    height: 70%;
    width: calc(100% - 20%);
    display: flex;
    padding: 100px 10% 0px 10%;
    justify-content: space-between;
}

.column {
    height: 100%;
    width: 32%;
    display: flex;
    flex-direction: column;
}

.column-content {
    display: flex;
    width: 100%;
    flex-direction: column;
    margin-bottom: 25px;
}

.column-content h5 {
    text-transform: uppercase;
    font-size: 15px;
    padding-bottom: 7px;
    margin-bottom: 15px;
    line-height: 90%;
    font-family: "Nimbus";
    color: #bcbcbc;
    font-weight: 200;
    position: relative;

}

.column-content h5:before {
    position: absolute;
    left: 0;
    bottom: 0;
    content: '';
    height: 0.5px;
    width: 100%;
    background: #444444;

}

.column-content a {
    font-family: "Nimbus";
    font-size: 14px;
    font-weight: 800;
    letter-spacing: 0px;
    line-height: 17px;
    color: #bcbcbc;
    margin-bottom: 5px;
}

.go-upside {
    width: 100%;
    height: 13%;
    border-top: 1px solid #444444;
    display: flex;
    justify-content: center;
    align-items: center;

}

.go-upside svg {
    height: 40px;
    width: 40px;
    transform: rotate(-90deg);
}

.go-upside svg path{
    fill: #bcbcbc;
    transition: 0.3s;
}

.go-upside:hover svg path{
    fill: var(--background);
}

@media (max-width: 500px) {
    .column-cont{
        flex-wrap: wrap;

    }

    .column{
        width: 49%;
        height: auto;
    }
}
</style>