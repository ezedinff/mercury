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


CMD ["./run.sh"]   


