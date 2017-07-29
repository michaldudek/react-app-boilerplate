FROM node:7-alpine
EXPOSE 80

ARG VERSION=prod

# Add and run the build script explicitly so that this step is cached
ADD build/scripts/build-host.sh /build-host.sh
RUN sh /build-host.sh && rm -f /build-host.sh

# Mount anything that is to be mounted
ADD build/mount/ /

WORKDIR /app

# Pre-build dependencies to speed up builds
# If dependencies don't change, this will be cached.
ADD build/scripts/deps.sh /deps.sh
ADD Makefile /app/Makefile
ADD package.json /app/package.json
ADD package-lock.json /app/package-lock.json
RUN bash /deps.sh && rm -f /deps.sh

# Add everything else - changes to code won't trigger vendor installs on cached builds
ADD . /app
ADD build/scripts/build.sh /build.sh
RUN sh /build.sh && rm -rf /build.sh

ADD build/scripts/start.sh /start.sh
CMD ["bash", "/start.sh"]
