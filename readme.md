<h1 align=center> Crypt Demo </h1>

# Description

Basic demonstration of some cryptography methods.  

---

# Installing

``` 
npm i
```

# Hasing

Run hashing tests

```sh
npm run test:hash
```

# Symmetric-key

Run symmetric-key tests

```sh
npm run test:sym
```

# Asymmetric-key

In order to properly run the asymmetric-key based encryption method you must first generate the [rsa](<https://en.wikipedia.org/wiki/RSA_(cryptosystem)>)keys. To do so, just run:

```sh
npm run asym:gen-keys
```

Run symmetric-key tests

```sh
npm run test:asym
```
