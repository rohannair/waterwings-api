# Project Waterwings (IE, name TBD)
[ ![Codeship Status for rohannair/waterwings](https://codeship.com/projects/d1f636e0-864c-0133-fa94-7e4402abc12c/status?branch=master)](https://codeship.com/projects/122626)

# To build the docker image:
docker build -t dev ./

# To run it interactively
docker run -it dev

# To run it backgrounded
docker run -d dev

# To run it interactively, but run bash instead of start.sh
docker run -it dev bash

# Then, to run start.sh interactively, run:
./start.sh

# To check what is listening on what ports within the container, you can do:
./start.sh < /dev/null &
netstat -nap

# To see what the output of netstat will look like if there is something actually listening, do:
nc -l 8080 &
netstat -nap
