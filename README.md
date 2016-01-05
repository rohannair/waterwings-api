# Project Waterwings (IE, name TBD)
[ ![Codeship Status for rohannair/waterwings](https://codeship.com/projects/d1f636e0-864c-0133-fa94-7e4402abc12c/status?branch=master)](https://codeship.com/projects/122626)

## Set-up
Install dependencies
```bash
$ npm install
```

Install postgres and create databases
```bash
$ brew install postgres
$ # Follow instructions to set up /usr/local/var/postgres
$ initdb /usr/local/var/postgres
$ pg_ctl -D /usr/local/var/postgres -l logfile start
$ createuser root
$ createdb -Oroot -Eutf8 waterwings
```

Do database migrations
```bash
$ npm run db:migrate
```
### Start application
```bash
$ npm run dev
```

## Docker instructions
### Build the docker image:
```bash
docker build -t dev ./
```
### Run it interactively
```bash
docker run -it dev
```
### Run it backgrounded
```bash
docker run -d dev
```
### Run it interactively, but run bash instead of start.sh
```bash
docker run -it dev bash
```
### Then, to run start.sh interactively, run:
```bash
./start.sh
```
### Check what is listening on what ports within the container, you can do:
```bash
./start.sh < /dev/null &
netstat -nap
```
### See what the output of netstat will look like if there is something actually listening, do:
```bash
nc -l 8080 &
netstat -nap
```
