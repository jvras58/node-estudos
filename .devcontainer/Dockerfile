FROM ubuntu:24.10

RUN apt-get update && apt-get install -y \
    zsh \
    openssh-client \
    curl \
    git \
    build-essential \
    libssl-dev \
    zlib1g-dev \
    libbz2-dev \
    libreadline-dev \
    libsqlite3-dev \
    libncursesw5-dev \
    xz-utils \
    tk-dev \
    libxml2-dev \
    libxmlsec1-dev \
    libffi-dev \
    liblzma-dev \
    pipx \
    && apt-get clean && rm -rf /var/lib/apt/lists/* \
    && curl -sS https://starship.rs/install.sh | sh -s -- --yes 


RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs

RUN npm install -g typescript nodemon

RUN curl -sS https://starship.rs/install.sh | sh -s -- --yes

COPY --chown=ubuntu .zshrc /home/ubuntu
ENV ZSH_THEME starship


USER ubuntu
WORKDIR /workspace

COPY ../ ./

CMD ["tail", "-f", "/dev/null"]