FROM ubuntu

ADD . /application

RUN apt-get update && \
    apt-get install -y wget nodejs npm

EXPOSE 8080 8080

CMD ["bash", "/application/initialization_script"]