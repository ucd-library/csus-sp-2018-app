# __OCR Application Setup__

----
### Creating Local UC Davis LDP instance:
1. `git clone https://github.com/UCDavisLibrary/fin-example-repository.git`
2. Run `sudo apt install npm`
2. Run `sudo sysctl -w vm.max_map_count=262144`
2. Add fin-cli `npm install -g @ucd-lib/fin-cli`
2. Add this code to conf/default_services.js
```https://github.com/ucd-library/csus-sp-2018-app/issues
  { 
    id : 'tesseract',
    description : 'Image OCR',
    type : 'ProxyService',
    supportedType : 'http://www.w3.org/ns/ldp#NonRDFSource',
    urlTemplate : 'http://tesseract:3333{{fcPath}}?svcPath={{svcPath}}'
  },
```
3. Execute following commands
```
cd ~/fin-example-repository
user=csus
alias dc="docker-compose -p $user -f fin-example.yml"
dc up -d
```

### Getting data into LDP
1. Run these commands
```
user=csus
email=s.project.csus@gmail.com
alias dc="docker-compose -p $user -f fin-example.yml"
dc exec basic-auth node service/cli create-user -u $user -p password -e $email
dc exec server node app/cli admin add-admin -u ${user}@local
source fin-example.env; fin jwt encode --admin --save=true $JWT_SECRET $JWT_ISSUER ${user}@local
fin config set host http://localhost:3000
fin http put -H prefer:return=minimal -H "Content-Type:text/turtle" -@ server.ttl -P h /
fin http get -P b /
sudo ./collection/example_3-catalogs/import.sh
```

### Starting and stopping docker containers
1. After running these commands if you want to stop your sever run `docker-compose -p csus -f fin-example.yml stop`
2. To start the containers (Usually after a reboot) run `docker-compose -p csus -f fin-example.yml start` 

### Installing our application
1. Get our git repo `git clone https://github.com/ucd-library/csus-sp-2018-app.git`
2. Get into our repo locally `cd csus-sp-2018-app`
3. Run `npm install` to bring all the dependencies from the `package.json` 
4. Run `node server.js` to start it up

### Getting Sample Tesseract Data
1. Run this command.
```
curl -H accept:application/hocr+xml http://localhost:3000/fcrepo/rest/collection/example_3-catalogs/catalogs/199/media/images/199-3/svc:tesseract/full/full/0/default.jpg
```
