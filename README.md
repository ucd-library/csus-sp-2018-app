### OCR Application
----
__Creating Local UC Davis LDP instance:__
1. git clone https://github.com/UCDavisLibrary/fin-example-repository.git
2. Execute following commands
```
cd ~/fin-example-repository
user=<your first name>
alias dc="docker-compose -p $user -f fin-example.yml"
dc up -d
```

__Getting data into your repo:__ 
```
user=<your first name>
email=<an email>
alias dc="docker-compose -p $user -f fin-example.yml"
dc exec basic-auth node service/cli create-user -u $user -p password -e $email
dc exec server node app/cli admin add-admin -u ${user}@local
source fin-example.env; fin jwt encode --admin --save=true $JWT_SECRET $JWT_ISSUER ${user}@local
fin config set host http://localhost:3000
fin http put -H prefer:return=minimal -H "Content-Type:text/turtle" -@ server.ttl -P h /
fin http get -P b /
sudo ./collection/example_3-catalogs/import.sh
```
