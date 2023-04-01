<template>
    <div class="w-full absolute top-0 left-0 h-20 flex justify-between items-center p-5 bg-dark dark:bg-white bg-opacity-95 backdrop-blur-lg">
        <div id="sidebar-toggle" class="flex text-light dark:text-dark gap-5 items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
        </div>
        <div class="flex text-dark dark:text-white items-center gap-3">
            <div class="flex bg-primary bg-opacity-10 rounded-full py-2 pl-4 pr-2 items-center gap-1">
                <p class="text-light">351</p>
                <img src="~/assets/imgs/icons/coin.svg" class="w-6 h-6 object-cover object-center rounded-full" />
            </div>
            <img src="~/assets/imgs/photo.jpg" class="w-10 h-10 object-cover object-center rounded-full shadow-md" />
        </div>
    </div>
</template>