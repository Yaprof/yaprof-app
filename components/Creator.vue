<template>
    <div>
        <div id="popup_creator_toggler" class="absolute bottom-5 right-5 rounded-full w-14 h-14 flex items-center justify-center shadow-xl bg-primary bg-opacity-50 text-dark dark:text-white active:scale-95 active:brightness-105 transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
        </div>

        <div id="popup_creator_parent"  class="absolute top-0 left-0 flex items-center h-screen w-full overflow-hidden z-[-1]">
            <div id="popup_creator" class="flex flex-col items-center bg-light dark:bg-secondary rounded-t-xl shadow-xl h-full w-full mt-20 drop-shadow-lg translate-y-full py-10 px-5 gap-5">
                <div class="w-full flex items-center justify-between">
                    <div onclick="togglePopupCreator()" class="text-primary cursor-pointer text-lg">Annuler</div>
                    <a class="text-dark dark:text-white cursor-pointer text-lg font-medium">Créer un post</a>
                    <div onclick="createPost()" class="text-primary cursor-pointer text-lg">Créer</div>
                </div>

                <div class="flex flex-col">
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {


}
</script>