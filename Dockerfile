# Waterwings API Dockerfile
# Ubuntu + Node.js

# Pull base images
FROM ubuntu:14.04

# Set bash as default shell
RUN rm /bin/sh && ln -s /bin/bash /bin/sh

ENV appDir /var/www/app/current

# Install.
RUN \
  sed -i 's/# \(.*multiverse$\)/\1/g' /etc/apt/sources.list \
  && apt-get update \
  && apt-get -y upgrade \
  && apt-get install -y build-essential \
  && apt-get install -y software-properties-common \
  && apt-get install -y byobu curl git htop man unzip vim wget \
  && rm -rf /var/lib/apt/lists/* \
  && apt-get -y autoclean

ENV NVM_DIR /usr/local/nvm
ENV NODE_VERSION 4.2.2

RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.26.0/install.sh | bash \
  && source $NVM_DIR/nvm.sh \
  && nvm install $NODE_VERSION \
  && nvm alias default $NODE_VERSION \
  && nvm use default

ENV NODE_PATH $NVM_DIR/versions/node/v$NODE_VERSION/lib/node_modules
ENV PATH $NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH

WORKDIR ${appDir}
RUN mkdir -p /var/www/app/current

ADD package.json ./
RUN npm i --production --no-spin

ADD . /var/www/app/current

EXPOSE 4500
