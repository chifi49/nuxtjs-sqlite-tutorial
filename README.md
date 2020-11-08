# Installation
### 1st step

create a nuxt app
`npm create nuxt-app <project-name>`
e.x.
`npm create nuxt-app nuxtjs-sqlite-tutorial`

### 2nd step

move to project
`cd nuxtjs-sqlite-tutorial`

### 3rd step
install packages `sqlite3` and `@nuxtp/http`

`npm install --save sqlite3 @nuxt/http`

### 4th step
enable nuxt/http in nuxt.config.js

```
modules:[
    '@nuxt/http'
]
```


