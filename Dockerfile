
FROM bitwalker/alpine-elixir-phoenix:latest
# install yarn


# Set exposed ports
EXPOSE 4000
ENV PORT=4000 MIX_ENV=dev
# Cache elixir deps
ADD mix.exs mix.lock ./
RUN mix do deps.get, deps.compile


RUN npm install -g yarn

# Same with npm deps
ADD assets/ assets/
RUN cd assets && \
    yarn install

ADD . .






#FROM elixir:1.6.1
#
## Install debian packages
#RUN apt-get update
#RUN apt-get install --yes build-essential inotify-tools postgresql-client
#
## Install Phoenix packages
#RUN mix local.hex --force
#RUN mix local.rebar --force
#RUN mix archive.install --force https://github.com/phoenixframework/archives/raw/master/phx_new.ez
#
## Install node
#RUN curl -sL https://deb.nodesource.com/setup_6.x -o nodesource_setup.sh
#RUN bash nodesource_setup.sh
#RUN apt-get install nodejs
#
#WORKDIR /app

