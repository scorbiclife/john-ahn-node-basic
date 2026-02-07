FROM mcr.microsoft.com/devcontainers/javascript-node:22-bookworm

# Run `apt-get update` and `apt-get install` as one command
# https://docs.docker.com/build/building/best-practices/#apt-get
RUN apt-get update && apt-get install -y --no-install-recommends \
    postgresql-client
