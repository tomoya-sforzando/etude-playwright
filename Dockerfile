FROM mcr.microsoft.com/playwright:v1.10.0-bionic

RUN apt-get update && \
    apt-get install --no-install-recommends -y \
    fonts-ipafont locales \
    python3.8 python3-pip python3.8-dev && \
    locale-gen ja_JP.UTF-8

ENV LANG ja_JP.UTF-8
ENV LANGUAGE ja_JP:ja
ENV LC_ALL=ja_JP.UTF-8
RUN localedef -f UTF-8 -i ja_JP ja_JP.utf8

WORKDIR /opt/app

COPY . .

RUN pip install --upgrade pip && \
    pip install playwright==1.10.0 && \
    python -m playwright install chromium
