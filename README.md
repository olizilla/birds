```

88           88                       88
88           ""                       88
88                                    88
88,dPPYba,   88  8b,dPPYba,   ,adPPYb,88  ,adPPYba,  
88P'    "8a  88  88P'   "Y8  a8"    `Y88  I8[    ""  
88       d8  88  88          8b       88   `"Y8ba,
88b,   ,a8"  88  88          "8a,   ,d88  aa    ]8I  
8Y"Ybbd8"'   88  88           `"8bbdP"Y8  `"YbbdP"'

```

A database of birds.

1. a rethinkdb table o birds.
2. a generic html template for a bird page.
3. Allow specific bird pages to have custom templates.
4. Generate html for each bird on db change.

To get us started we'll need a rethinkdb, node and some npm...

```sh
# get the dependencies
cd birds
brew update
brew install rethinkdb
npm install

# start the fans
rethinkdb &
npm start
```



Some birds:

```js
[
  {
    name: 'Eurasian blue tit',
    species: 'C. caeruleus',
    genus: 'Cyanistes',
    image:'https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Eurasian_blue_tit_Lancashire.jpg/1920px-Eurasian_blue_tit_Lancashire.jpg'
  }
  ,
  {
    name: 'Steller\'s jay',
    species: 'C. stelleri',
    genus: 'Cyanocitta',
    image:'http://media.columbian.com/img/croppedphotos/2013/06/17/stellar-jay.jpg'
  }
]
```