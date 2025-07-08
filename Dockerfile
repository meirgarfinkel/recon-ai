FROM node:20-slim

RUN apt-get update \
    && apt-get install -y git openssh-client bash sudo \
    && npm install -g pnpm \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy dependency files
COPY package.json pnpm-lock.yaml* ./

# Copy prisma schema before install
COPY prisma ./prisma

# Ensure /app and /app/prisma are owned by node
RUN chown -R node:node /app

USER node
RUN pnpm install --frozen-lockfile

# Copy the rest of the code
COPY --chown=node:node . .

# Optionally add passwordless sudo for node user
USER root
RUN echo "node ALL=(root) NOPASSWD:ALL" > /etc/sudoers.d/node \
    && chmod 0440 /etc/sudoers.d/node

USER node
CMD ["pnpm", "dev"]
