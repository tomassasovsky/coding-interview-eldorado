FROM node:20

# Install basic development tools
RUN apt update && apt install -y less man-db sudo

# Ensure default `node` user has access to `sudo`
ARG USERNAME=node
RUN echo $USERNAME ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/$USERNAME \
    && chmod 0440 /etc/sudoers.d/$USERNAME

# Set `DEVCONTAINER` environment variable to help with orientation
ENV DEVCONTAINER=true

# Set the working directory
WORKDIR /workspace

# Copy package files first to leverage Docker cache for dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port your app will run on (e.g., 3000)
ARG NODE_PORT
EXPOSE $NODE_PORT

# Switch to the non-root user (already present in the official Node image)
USER node

# Command to build the application
COPY --chown=node:node --chmod=0755 entrypoint.sh .
CMD [ "./entrypoint.sh" ]
