<template>
  <div>
    <VitePwaManifest />
    <NuxtPage />
    <intent-filter>
        <action android:name="android.intent.action.VIEW" />
        <category android:name="android.intent.category.DEFAULT" />
        <category android:name="android.intent.category.BROWSABLE" />
        <data
            android:scheme="https"
            android:host="yaprof.fr"
            android:pathPrefix="/" />
    </intent-filter>
  </div>

</template>