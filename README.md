#AEM Module Boilerplate

This boilerplate should help to create AEM modules from html, css and js files.

##Structure

    .
    ├── gulp                    
    │   ├── tasks               # Gulp tasks for build process
    │   ├── config.js           # Gulp config, add modules and languages here
    │   └── index.js
    │
    ├── src                     
    │   └── example-aem-module  # Module source
    │       ├── _preview
    │       ├── _templates
    │       ├── css
    │       ├── fonts
    │       ├── img
    │       └── js
    │
    ├── dev                     # Directory for dev build and dev server
    ├── dist                    # Dist directory, the modules get built in
    │
    └── ...
    
##Start Development Server

To run the development server, just run

```
gulp watch
```


##Build Modules

To build a module for preview run

```
gulp build:dev
```

for distribution you have to run

```
gulp build
```

This will also create a development build so you preview and dist directory are on the same level.



##AEM Module Development
To develop you own module, take a look at the folder structure of the example app "example-aem-module"

    example-aem-module              # Module source
    │
    ├── _preview                    # Resources only used in preview mode
    ├── _templates                  # Template data
    │   │
    │   ├── _partials               # Partials used in the module
    │   ├── en                      
    │   │   ├── module.tpl.hmtl     # The actual module file for the english version
    │   │   └── preview.tpl.html    # The preview wrapper file for the english version
    │   ├── de                      
    │   │   ├── module.tpl.hmtl     # The actual module file for the german version
    │   │   └── preview.tpl.html    # The preview wrapper file for the german version
    │   └── ...
    ├── css
    ├── fonts
    ├── img
    └── js
        ├── vendor
        └── ...
        
All of the modules HTML markup needs to go into the module.tpl.html file, with the module div element directly as root element.
It's not allowed to add a head, body or html tag around it.

The module div needs to have an unique id which you use to scope your CSS and Javascript, so no other elements in AEM are getting influenced from your application.
```
<div id="example-aem-module">
	...
</div>
```

After you finished developing your own module, you have to add its folder name to the gulp config file modules array and run

```
gulp build
```