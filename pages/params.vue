<template>
    <div>
        <NuxtLayout>
            <Transition name="swipe-right" mode="in-out">
                <div v-if="show">
                    <Toast v-for="error in errors" :key="error.message" :data="{message:error.message, color: error.color}" ></Toast>
                    <div class="flex flex-col gap-5">
                        <div class="w-full flex flex-col">
                            <button @click="handleClickUpload" id="avatar-upload-button" class="group bg-light active:bg-slate-50 dark:bg-secondary dark:active:bg-opacity-50 text-dark dark:text-white text-lg py-3.5 px-6 first:rounded-t-2xl last:rounded-b-2xl w-full cursor-pointer flex items-center gap-2 justify-between transition-all z-10">
                                <div class="flex items-center gap-2">
                                    <div class="w-fit h-fit p-2 bg-">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-6 h-6 group-active:scale-95 transition-all">
                                            <path fill-rule="evenodd" d="M9.664 1.319a.75.75 0 01.672 0 41.059 41.059 0 018.198 5.424.75.75 0 01-.254 1.285 31.372 31.372 0 00-7.86 3.83.75.75 0 01-.84 0 31.508 31.508 0 00-2.08-1.287V9.394c0-.244.116-.463.302-.592a35.504 35.504 0 013.305-2.033.75.75 0 00-.714-1.319 37 37 0 00-3.446 2.12A2.216 2.216 0 006 9.393v.38a31.293 31.293 0 00-4.28-1.746.75.75 0 01-.254-1.285 41.059 41.059 0 018.198-5.424zM6 11.459a29.848 29.848 0 00-2.455-1.158 41.029 41.029 0 00-.39 3.114.75.75 0 00.419.74c.528.256 1.046.53 1.554.82-.21.324-.455.63-.739.914a.75.75 0 101.06 1.06c.37-.369.69-.77.96-1.193a26.61 26.61 0 013.095 2.348.75.75 0 00.992 0 26.547 26.547 0 015.93-3.95.75.75 0 00.42-.739 41.053 41.053 0 00-.39-3.114 29.925 29.925 0 00-5.199 2.801 2.25 2.25 0 01-2.514 0c-.41-.275-.826-.541-1.25-.797a6.985 6.985 0 01-1.084 3.45 26.503 26.503 0 00-1.281-.78A5.487 5.487 0 006 12v-.54z" clip-rule="evenodd" />
                                        </svg>
                                    </div>

                                    <div class="flex flex-col justify-start">
                                        <p class="text-lg font-bold text-left">Changer sa photo</p>
                                        <p class="text-sm truncate text-left -mt-1">Utilise une photo de profil différente</p>
                                    </div>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-6 h-6 text-slate-400 dark:text-slate-300 group-active:translate-x-1 transition-all">
                                    <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
                                </svg>
                                <input @change="handleChange" type="file" name="file" class="hidden" id="avatar_image" accept="image/*" />
                            </button>
                            <div class="w-full px-5 bg-light dark:bg-secondary"><div class="bg-slate-200 dark:bg-dark h-[1px] w-full rounded-full"></div></div>
                            <NuxtLink v-if="[50, 99].includes(user?.role)" to="/admin/users" class="group bg-light active:bg-slate-50 dark:bg-secondary dark:active:bg-opacity-50 text-dark dark:text-white text-lg py-3.5 px-6 first:rounded-t-2xl last:rounded-b-2xl w-full cursor-pointer flex items-center gap-2 justify-between transition-all z-10">
                                <div class="flex items-center gap-2">
                                    <div class="w-fit h-fit p-2 bg-">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-6 h-6 group-active:scale-95 transition-all">
                                            <path d="M10 9a3 3 0 100-6 3 3 0 000 6zM6 8a2 2 0 11-4 0 2 2 0 014 0zM1.49 15.326a.78.78 0 01-.358-.442 3 3 0 014.308-3.516 6.484 6.484 0 00-1.905 3.959c-.023.222-.014.442.025.654a4.97 4.97 0 01-2.07-.655zM16.44 15.98a4.97 4.97 0 002.07-.654.78.78 0 00.357-.442 3 3 0 00-4.308-3.517 6.484 6.484 0 011.907 3.96 2.32 2.32 0 01-.026.654zM18 8a2 2 0 11-4 0 2 2 0 014 0zM5.304 16.19a.844.844 0 01-.277-.71 5 5 0 019.947 0 .843.843 0 01-.277.71A6.975 6.975 0 0110 18a6.974 6.974 0 01-4.696-1.81z" />
                                        </svg>

                                    </div>

                                    <div class="flex flex-col justify-start">
                                        <p class="text-lg font-bold text-left">Liste users</p>
                                        <p class="text-sm truncate text-left -mt-1">Voir la liste des utilisateurs</p>
                                    </div>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-6 h-6 text-slate-400 dark:text-slate-300 group-active:translate-x-1 transition-all">
                                    <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
                                </svg>
                            </NuxtLink>
                            <div class="w-full px-5 bg-light dark:bg-secondary"><div class="bg-slate-200 dark:bg-dark h-[1px] w-full rounded-full"></div></div>
                            <button @click="logout()" class="group bg-light active:bg-slate-50 dark:bg-secondary text-dark dark:text-white dark:active:bg-opacity-50 text-lg py-3.5 px-6 first:rounded-t-2xl last:rounded-b-2xl w-full cursor-pointer flex items-center gap-2 justify-between transition-all">
                                <div class="flex items-center gap-2">
                                    <div class="w-fit h-fit p-2 bg-">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-6 h-6 group-active:scale-95 transition-all">
                                            <path fill-rule="evenodd" d="M3 4.25A2.25 2.25 0 015.25 2h5.5A2.25 2.25 0 0113 4.25v2a.75.75 0 01-1.5 0v-2a.75.75 0 00-.75-.75h-5.5a.75.75 0 00-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 00.75-.75v-2a.75.75 0 011.5 0v2A2.25 2.25 0 0110.75 18h-5.5A2.25 2.25 0 013 15.75V4.25z" clip-rule="evenodd" />
                                            <path fill-rule="evenodd" d="M6 10a.75.75 0 01.75-.75h9.546l-1.048-.943a.75.75 0 111.004-1.114l2.5 2.25a.75.75 0 010 1.114l-2.5 2.25a.75.75 0 11-1.004-1.114l1.048-.943H6.75A.75.75 0 016 10z" clip-rule="evenodd" />
                                        </svg>
                                    </div>
                                    <div class="flex flex-col justify-start">
                                        <p class="text-lg font-bold text-left">Se déconnecter</p>
                                        <p class="text-sm truncate text-left -mt-1">Retournez à la page de connexion</p>
                                    </div>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-6 h-6 text-slate-400 dark:text-slate-300 group-active:translate-x-1 transition-all">
                                    <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
                                </svg>

                            </button>
                        </div>
                        <div class=" text-dark dark:text-white text-lg py-3.5 px-6 rounded-xl w-full bg-light dark:bg-secondary flex flex-col gap-3 transition-all">
                            <p class="text-md font-medium text-dark dark:text-white !text-opacity-50">Le top contributeurs</p>
                            <div class="flex flex-col gap-3">
                                <div v-if="loading" class="h-[calc(100%-2rem)] w-full flex items-center justify-between gap-2 group">
                                    <div class="flex items-center gap-4">
                                        <div class="w-10 h-10 rounded-full bg-white dark:bg-dark animate-pulse"></div>
                                        <div class="flex flex-col gap-1">
                                            <div class="h-4 rounded-full bg-white dark:bg-dark w-32 animate-pulse"></div>
                                            <div class="h-3 rounded-full bg-white dark:bg-dark w-44 animate-pulse"></div>
                                        </div>
                                    </div>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-6 h-6 text-white dark:text-dark group-active:translate-x-1 transition-all animate-pulse">
                                        <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
                                    </svg>
                                </div>
                                <div v-if="loading" class="h-[calc(100%-2rem)] w-full flex items-center justify-between gap-2 group">
                                    <div class="flex items-center gap-4">
                                        <div class="w-10 h-10 rounded-full bg-white dark:bg-dark animate-pulse"></div>
                                        <div class="flex flex-col gap-1">
                                            <div class="h-4 rounded-full bg-white dark:bg-dark w-32 animate-pulse"></div>
                                            <div class="h-3 rounded-full bg-white dark:bg-dark w-44 animate-pulse"></div>
                                        </div>
                                    </div>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-6 h-6 text-white dark:text-dark group-active:translate-x-1 transition-all animate-pulse">
                                        <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
                                    </svg>
                                </div>
                                <div v-if="loading" class="h-[calc(100%-2rem)] w-full flex items-center justify-between gap-2 group">
                                    <div class="flex items-center gap-4">
                                        <div class="w-10 h-10 rounded-full bg-white dark:bg-dark animate-pulse"></div>
                                        <div class="flex flex-col gap-1">
                                            <div class="h-4 rounded-full bg-white dark:bg-dark w-32 animate-pulse"></div>
                                            <div class="h-3 rounded-full bg-white dark:bg-dark w-44 animate-pulse"></div>
                                        </div>
                                    </div>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-6 h-6 text-white dark:text-dark group-active:translate-x-1 transition-all animate-pulse">
                                        <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
                                    </svg>
                                </div>
                                <div v-if="loading" class="h-[calc(100%-2rem)] w-full flex items-center justify-between gap-2 group">
                                    <div class="flex items-center gap-4">
                                        <div class="w-10 h-10 rounded-full bg-white dark:bg-dark animate-pulse"></div>
                                        <div class="flex flex-col gap-1">
                                            <div class="h-4 rounded-full bg-white dark:bg-dark w-32 animate-pulse"></div>
                                            <div class="h-3 rounded-full bg-white dark:bg-dark w-44 animate-pulse"></div>
                                        </div>
                                    </div>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-6 h-6 text-white dark:text-dark group-active:translate-x-1 transition-all animate-pulse">
                                        <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
                                    </svg>
                                </div>
                                <div v-if="loading" class="h-[calc(100%-2rem)] w-full flex items-center justify-between gap-2 group">
                                    <div class="flex items-center gap-4">
                                        <div class="w-10 h-10 rounded-full bg-white dark:bg-dark animate-pulse"></div>
                                        <div class="flex flex-col gap-1">
                                            <div class="h-4 rounded-full bg-white dark:bg-dark w-32 animate-pulse"></div>
                                            <div class="h-3 rounded-full bg-white dark:bg-dark w-44 animate-pulse"></div>
                                        </div>
                                    </div>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-6 h-6 text-white dark:text-dark group-active:translate-x-1 transition-all animate-pulse">
                                        <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
                                    </svg>
                                </div>
                                <a :href="'https://github.com/'+user.login" target="_blank" class="flex items-center gap-3 justify-between group" v-for="user in contribuators" :key="user">
                                    <div class="flex items-center gap-4">
                                        <img class="w-10 h-10 rounded-full" :src="user.avatar_url" />
                                        <div class="flex flex-col">
                                            <p class="text-md font-bold">{{ user.login }}</p>
                                            <p class="text-md font-medium text-sm -mt-1 text-dark dark:text-white !text-opacity-50">{{ user.contributions }} contributions</p>
                                        </div>
                                    </div>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-6 h-6 text-slate-400 dark:text-slate-300 group-active:translate-x-1 transition-all">
                                        <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                        <div class="w-full bg-light dark:bg-secondary dark:active:bg-gray-800 rounded-xl flex flex-col">
                            <a href="https://discord.gg/yaprof" target="_blank" class="group text-dark dark:text-white text-lg py-3.5 px-6 rounded-xl w-full  cursor-pointer flex items-center gap-2 justify-between transition-all">
                                <div class="flex items-center gap-2">
                                    <div class="w-fit h-fit p-2 bg-">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 group-active:scale-95 transition-all">
                                            <path d="M18.9308 5.64145C17.6561 5.05655 16.2892 4.62562 14.8599 4.37881C14.8339 4.37405 14.8079 4.38595 14.7945 4.40976C14.6187 4.72244 14.4239 5.13036 14.2876 5.45098C12.7503 5.22084 11.221 5.22084 9.71527 5.45098C9.57887 5.12323 9.37707 4.72244 9.20048 4.40976C9.18707 4.38675 9.16107 4.37484 9.13504 4.37881C7.70659 4.62483 6.33963 5.05576 5.06411 5.64145C5.05307 5.64622 5.04361 5.65416 5.03732 5.66447C2.44449 9.5381 1.73421 13.3165 2.08265 17.0481C2.08423 17.0664 2.09447 17.0838 2.10867 17.0949C3.81934 18.3512 5.47642 19.1139 7.10273 19.6194C7.12876 19.6273 7.15634 19.6178 7.1729 19.5964C7.55761 19.071 7.90054 18.5171 8.19456 17.9346C8.21192 17.9004 8.19535 17.86 8.15989 17.8465C7.61594 17.6401 7.098 17.3886 6.59977 17.1029C6.56037 17.0799 6.55721 17.0235 6.59347 16.9965C6.69831 16.9179 6.80318 16.8362 6.9033 16.7537C6.92141 16.7386 6.94665 16.7354 6.96794 16.7449C10.2411 18.2393 13.7846 18.2393 17.0191 16.7449C17.0404 16.7346 17.0657 16.7378 17.0846 16.7529C17.1847 16.8354 17.2895 16.9179 17.3952 16.9965C17.4314 17.0235 17.4291 17.0799 17.3897 17.1029C16.8914 17.3941 16.3735 17.6401 15.8288 17.8457C15.7933 17.8592 15.7775 17.9004 15.7949 17.9346C16.0952 18.5163 16.4381 19.0702 16.8157 19.5956C16.8315 19.6178 16.8599 19.6273 16.8859 19.6194C18.5201 19.1139 20.1772 18.3512 21.8879 17.0949C21.9028 17.0838 21.9123 17.0671 21.9139 17.0489C22.3309 12.7348 21.2154 8.98734 18.9568 5.66526C18.9513 5.65416 18.9419 5.64622 18.9308 5.64145ZM8.68335 14.776C7.69792 14.776 6.88594 13.8713 6.88594 12.7602C6.88594 11.6491 7.68217 10.7444 8.68335 10.7444C9.69239 10.7444 10.4965 11.6571 10.4807 12.7602C10.4807 13.8713 9.68451 14.776 8.68335 14.776ZM15.329 14.776C14.3435 14.776 13.5316 13.8713 13.5316 12.7602C13.5316 11.6491 14.3278 10.7444 15.329 10.7444C16.338 10.7444 17.1421 11.6571 17.1264 12.7602C17.1264 13.8713 16.338 14.776 15.329 14.776Z" fill="currentColor"/>
                                        </svg>
                                    </div>

                                    <div class="flex flex-col justify-start">
                                        <p class="text-sm truncate text-left -mt-1 !text-opacity-50 text-dark dark:text-white">Communauté</p>
                                        <p class="text-base font-bold text-left">Rejoindre le Discord</p>
                                    </div>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-6 h-6 text-slate-400 dark:text-slate-300 group-active:translate-x-1 transition-all">
                                    <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
                                </svg>
                            </a>
                            <div class="w-full px-5"><div class="bg-slate-200 dark:bg-dark h-[1px] w-full rounded-full"></div></div>
                            <a href="https://docs.yaprof.fr" target="_blank" class="group text-dark dark:text-white text-lg py-3.5 px-6 rounded-xl w-full  cursor-pointer flex items-center gap-2 justify-between transition-all">
                                <div class="flex items-center gap-2">
                                    <div class="w-fit h-fit p-2 bg-">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-6 h-6 group-active:scale-95 transition-all">
                                            <path fill-rule="evenodd" d="M2 3.5A1.5 1.5 0 013.5 2h9A1.5 1.5 0 0114 3.5v11.75A2.75 2.75 0 0016.75 18h-12A2.75 2.75 0 012 15.25V3.5zm3.75 7a.75.75 0 000 1.5h4.5a.75.75 0 000-1.5h-4.5zm0 3a.75.75 0 000 1.5h4.5a.75.75 0 000-1.5h-4.5zM5 5.75A.75.75 0 015.75 5h4.5a.75.75 0 01.75.75v2.5a.75.75 0 01-.75.75h-4.5A.75.75 0 015 8.25v-2.5z" clip-rule="evenodd" />
                                            <path d="M16.5 6.5h-1v8.75a1.25 1.25 0 102.5 0V8a1.5 1.5 0 00-1.5-1.5z" />
                                        </svg>
                                    </div>

                                    <div class="flex flex-col justify-start">
                                        <p class="text-sm truncate text-left -mt-1 !text-opacity-50 text-dark dark:text-white">Légalité</p>
                                        <p class="text-base font-bold text-left">Politiques et légal</p>
                                    </div>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-6 h-6 text-slate-400 dark:text-slate-300 group-active:translate-x-1 transition-all">
                                    <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
                                </svg>
                            </a>
                            <div class="w-full px-5"><div class="bg-slate-200 dark:bg-dark h-[1px] w-full rounded-full"></div></div>
                            <nuxt-link to="/changelog" class="group text-dark dark:text-white text-lg py-3.5 px-6 rounded-xl w-full  cursor-pointer flex items-center gap-2 justify-between transition-all">
                                <div class="flex items-center gap-2">
                                    <div class="w-fit h-fit p-2 bg-">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-6 h-6 group-active:scale-95 transition-all">
                                            <path d="M15.98 1.804a1 1 0 00-1.96 0l-.24 1.192a1 1 0 01-.784.785l-1.192.238a1 1 0 000 1.962l1.192.238a1 1 0 01.785.785l.238 1.192a1 1 0 001.962 0l.238-1.192a1 1 0 01.785-.785l1.192-.238a1 1 0 000-1.962l-1.192-.238a1 1 0 01-.785-.785l-.238-1.192zM6.949 5.684a1 1 0 00-1.898 0l-.683 2.051a1 1 0 01-.633.633l-2.051.683a1 1 0 000 1.898l2.051.684a1 1 0 01.633.632l.683 2.051a1 1 0 001.898 0l.683-2.051a1 1 0 01.633-.633l2.051-.683a1 1 0 000-1.898l-2.051-.683a1 1 0 01-.633-.633L6.95 5.684zM13.949 13.684a1 1 0 00-1.898 0l-.184.551a1 1 0 01-.632.633l-.551.183a1 1 0 000 1.898l.551.183a1 1 0 01.633.633l.183.551a1 1 0 001.898 0l.184-.551a1 1 0 01.632-.633l.551-.183a1 1 0 000-1.898l-.551-.184a1 1 0 01-.633-.632l-.183-.551z" />
                                        </svg>

                                    </div>

                                    <div class="flex flex-col justify-start">
                                        <p class="text-sm truncate text-left -mt-1 !text-opacity-50 text-dark dark:text-white">Changelog</p>
                                        <p class="text-base font-bold text-left">Nouveautés sur l'app</p>
                                    </div>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-6 h-6 text-slate-400 dark:text-slate-300 group-active:translate-x-1 transition-all">
                                    <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
                                </svg>
                            </nuxt-link>
                        </div>
                        <div class="w-full bg-light dark:bg-secondary dark:active:bg-gray-800 rounded-xl flex flex-col">
                            <a href="https://discord.gg/yaprof" target="_blank" class="group text-dark dark:text-white text-lg py-3.5 px-6 rounded-xl w-full  cursor-pointer flex items-center gap-2 justify-between transition-all">
                                <div class="flex items-center gap-2">
                                    <div class="w-fit h-fit p-2 bg-">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-6 h-6 group-active:scale-95 transition-all">
                                            <path d="M3.196 12.87l-.825.483a.75.75 0 000 1.294l7.25 4.25a.75.75 0 00.758 0l7.25-4.25a.75.75 0 000-1.294l-.825-.484-5.666 3.322a2.25 2.25 0 01-2.276 0L3.196 12.87z" />
                                            <path d="M3.196 8.87l-.825.483a.75.75 0 000 1.294l7.25 4.25a.75.75 0 00.758 0l7.25-4.25a.75.75 0 000-1.294l-.825-.484-5.666 3.322a2.25 2.25 0 01-2.276 0L3.196 8.87z" />
                                            <path d="M10.38 1.103a.75.75 0 00-.76 0l-7.25 4.25a.75.75 0 000 1.294l7.25 4.25a.75.75 0 00.76 0l7.25-4.25a.75.75 0 000-1.294l-7.25-4.25z" />
                                        </svg>
                                    </div>

                                    <div class="flex flex-col justify-start">
                                        <p class="text-sm truncate text-left -mt-1 !text-opacity-50 text-dark dark:text-white">Version de l'app</p>
                                        <p class="text-base font-bold text-left">{{ versionPkg }}</p>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </Transition>
        </NuxtLayout>
    </div>

</template>

<script setup>
    definePageMeta({
        middleware: ["auth"]
    })

</script >

<script>
import { updateUser, uploadUserPp } from '~~/mixins/user';
import pkg from '~/package.json'
import axios from 'axios'
export default {
    data() {
        return {
            contribuators: [],
            loading: true,
            user: {},
            versionPkg: pkg['version'],
            config: useRuntimeConfig(),
            show: false,
            errors: []
        }
    },
    methods: {
        logout: function () {
            window.localStorage.clear();
            window.location.replace('/auth/login')
        },
        fetchContribuators: async function () {
            this.loading = true
            let organizationName = "yaprof"

            const repositoriesResponse = await axios.get(`https://api.github.com/orgs/${organizationName}/repos`).catch(e=>{ return false })
            const repositories = repositoriesResponse.data;
            const contributorsMap = new Map();

            for (const repository of repositories) {
            const repositoryName = repository.name;
            const contributorsResponse = await axios.get(`https://api.github.com/repos/${organizationName}/${repositoryName}/contributors`).catch(e=>{ return false })
            const contributors = contributorsResponse.data;

            for (const contributor of contributors) {
                const contributorId = contributor.id;
                const contributorLogin = contributor.login;
                const contributorAvatarUrl = contributor.avatar_url;
                const contributorContributions = contributor.contributions;

                if (contributorsMap.has(contributorId)) {
                const existingContributor = contributorsMap.get(contributorId);
                existingContributor.contributions += contributorContributions;
                } else {
                const newContributor = {
                    login: contributorLogin,
                    avatar_url: contributorAvatarUrl,
                    contributions: contributorContributions
                };
                contributorsMap.set(contributorId, newContributor);
                }
            }
            }

            const sortedContributors = Array.from(contributorsMap.values()).sort((a, b) => b.contributions - a.contributions);

            return sortedContributors.map(contributor => ({
                login: contributor.login,
                contributions: contributor.contributions,
                avatar_url: contributor.avatar_url
            }))
        },
        handleChange(event) {
            const file = event.target.files[0];
            try {
                const reader = new FileReader();
                reader.onload = async () => {
                    if (file.size > 10485760) {
                        this.errors.push({ message: "Image trop grande", color: "danger" })
                        this.value = "";
                        return;
                    };
                    let userdb = await uploadUserPp(this.config.public.API_URL, reader.result)
                    if (!userdb) return this.errors.push({ message: "Impossible de changer l'image", color: "danger" })
                    this.errors.push({ message: "Photo de profile changée", color: "success" })
                };
                reader.readAsDataURL(file);
            } catch (e) {
                console.log(e)
                return this.errors.push({ message: "Image trop lourde", color: "danger" })
            }
        },
        handleClickUpload(event) {
            let FILE_INPUT = window.document.getElementById("avatar_image");
            FILE_INPUT.click()
        },
    },
    async mounted() {
        this.show = true
        this.user = JSON.parse(window?.localStorage.getItem('user'))
        this.contribuators = await this.fetchContribuators()
        this.contribuators.splice(5)
        this.loading = false
    }
}
</script>