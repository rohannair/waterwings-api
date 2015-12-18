# Project Waterwings (IE, name TBD)
[ ![Codeship Status for rohannair/waterwings](https://codeship.com/projects/d1f636e0-864c-0133-fa94-7e4402abc12c/status?branch=master)](https://codeship.com/projects/122626)

# To build the docker image:
docker build -t dev ./

# To run it interactively
run -it test dev

# To run it backgrounded
docker run -d dev

# To run it interactively, but run bash instead of start.sh
run -it test dev bash
