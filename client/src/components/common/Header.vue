<script setup lang="ts">
import ThemeToggle from '@/components/common/ThemeToggle.vue';
</script>

<template>
    <header class="flex items-center justify-between p-4 bg-orange-50">
        <router-link to="/" class="logo">
            <svg class="logo-text" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 330 130">
                <g transform="translate(168 55)" text-anchor="middle">
                    <text class="text-primary" font-size="72" x="0" y="0">AM<tspan fill="#8B0000">:</tspan>PM</text>
                    <text class="text-sub" font-size="14" x="0" y="40">BARISTA &amp; SOMMELIER</text>
                    <line class="line" x1="-80" y1="65" x2="80" y2="65" stroke="#1A1A1A" stroke-width="1.5"></line>
                    <circle cx="0" cy="65" r="3" fill="#8B0000"></circle>
                </g>
            </svg>
        </router-link>
<!--            <svg class="logo"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 525 202">
                &lt;!&ndash; GRAPHIC BLOCK: occupies x 5–250, y 5–196 &ndash;&gt;
                <g data-v-dc13a441="" transform="translate(-60, -50)" style="
        fill: red;
        background: red;
        stroke: red;
    ">&lt;!&ndash; Day / Night Backdrop Circles &ndash;&gt;
                    <circle data-v-dc13a441="" cx="110" cy="130" r="75" class="accent-sun"></circle>
                    <circle data-v-dc13a441="" cx="190" cy="130" r="75" class="accent-moon"></circle>
                    &lt;!&ndash; COFFEE CUP (AM) &ndash;&gt;
                    <g data-v-dc13a441="">
                        <path data-v-dc13a441="" d="M 85 130 C 85 170, 100 185, 125 185 C 150 185, 165 170, 165 130 Z"
                              class="coffee-fill"></path>
                        <path data-v-dc13a441=""
                              d="M 75 110 L 85 170 C 88 188, 105 195, 125 195 C 145 195, 162 188, 165 170 L 175 110 Z"
                              class="line-art"></path>
                        <ellipse data-v-dc13a441="" cx="125" cy="110" rx="50" ry="8" class="line-art"
                                 fill="#FFFFFF"></ellipse>
                        <path data-v-dc13a441="" d="M 80 120 C 55 120, 55 160, 83 162" class="line-art"></path>
                        <path data-v-dc13a441="" d="M 60 200 C 60 200, 90 207, 125 207 C 160 207, 190 200, 190 200"
                              class="line-art"></path>
                        <path data-v-dc13a441="" d="M 110 90 C 105 80, 115 70, 110 60" class="line-art"
                              stroke-width="2.5"></path>
                        <path data-v-dc13a441="" d="M 125 85 C 120 75, 130 65, 125 55" class="line-art"
                              stroke-width="2.5"></path>
                        <path data-v-dc13a441="" d="M 140 90 C 135 80, 145 70, 140 60" class="line-art"
                              stroke-width="2.5"></path>
                    </g>&lt;!&ndash; RED WINE GLASS (PM) &ndash;&gt;
                    <g data-v-dc13a441="">
                        <path data-v-dc13a441=""
                              d="M 183 125 C 185 155, 205 173, 225 173 C 245 173, 265 155, 267 125 C 250 130, 200 130, 183 125 Z"
                              class="wine-fill"></path>
                        <path data-v-dc13a441="" d="M 190 85 C 170 125, 175 175, 225 175 C 275 175, 280 125, 260 85 Z"
                              class="line-art"></path>
                        <ellipse data-v-dc13a441="" cx="225" cy="85" rx="35" ry="5" class="line-art"
                                 fill="none"></ellipse>
                        <line data-v-dc13a441="" x1="225" y1="175" x2="225" y2="245" class="line-art"></line>
                        <path data-v-dc13a441="" d="M 190 245 C 190 245, 210 242, 225 242 C 240 242, 260 245, 260 245"
                              class="line-art"></path>
                    </g>&lt;!&ndash; Transition Sparkle &ndash;&gt;
                    <path data-v-dc13a441=""
                          d="M 175 75 L 178 83 L 186 86 L 178 89 L 175 97 L 172 89 L 164 86 L 172 83 Z"
                          fill="#E67E22"></path>
                </g>&lt;!&ndash; TYPOGRAPHY BLOCK: centered on x=405, vertically centered against graphic &ndash;&gt;
                <g data-v-dc13a441="" transform="translate(400, 100)" text-anchor="middle">
                    <text data-v-dc13a441="" class="text-primary" font-size="72" x="0" y="0">AM
                        <tspan data-v-dc13a441="" fill="#8B0000">:</tspan>
                        PM
                    </text>
                    <text data-v-dc13a441="" class="text-sub" font-size="14" x="0" y="40">BARISTA &amp; SOMMELIER</text>
                    <line data-v-dc13a441="" x1="-80" y1="65" x2="80" y2="65" stroke="#1A1A1A"
                          stroke-width="1.5"></line>
                    <circle data-v-dc13a441="" cx="0" cy="65" r="3" fill="#8B0000"></circle>
                </g>
            </svg>-->
        <nav class="menu flex">
            <ul class="flex gap-4 items-center uppercase">
                <li class="flex"><router-link to="/sommelier">Sommelier</router-link></li>
                <li class="flex"><router-link to="/barista">Barista</router-link></li>
                <li class="flex"><router-link to="/recipes">Recipes</router-link></li>
                <li class="flex"><ThemeToggle/></li>
            </ul>
        </nav>
    </header>
</template>

<style scoped lang="scss">
.logo {
    background: url("@/assets/img/logoNew1.png") no-repeat;
    background-size: contain;
    width: 4rem;
    height: 6.5rem;
    position: relative;
}

.logo-text {
    position: absolute;
    width: 10rem;
    left: 4.5rem;
    top: 1.8rem;
}

.text-primary {
    font-family: 'Montserrat', 'Helvetica Neue', Arial, sans-serif;
    font-weight: 800;
    fill: #1A1A1A;
    font-size: 4.5rem;
}

.text-sub {
    font-family: 'Montserrat', 'Helvetica Neue', Arial, sans-serif;
    font-weight: 500;
    fill: #666666;
    letter-spacing: 0.375rem;
    font-size: 1.2em;
}

.line-art {
    fill: none;
    stroke: #1A1A1A;
    stroke-width: 3.5;
    stroke-linecap: round;
    stroke-linejoin: round;
}

.wine-fill {
    fill: #8B0000;
    opacity: 0.85;
}

.coffee-fill {
    fill: #6F4E37;
    opacity: 0.85;
}

.accent-sun {
    fill: #E67E22;
    opacity: 0.15;
}

.accent-moon {
    fill: #2C3E50;
    opacity: 0.15;
}

html.dark {
    .logo {
        background: url("@/assets/img/logoNew2.png") no-repeat;
        background-size: contain;
    }

    header {
        background-color: var(--color-gray-950);
    }

    .text-primary {
        fill: #fff;
    }

    .text-sub {
        fill: #fff;
    }

    .line {
        stroke: #fff;
    }
}


</style>
