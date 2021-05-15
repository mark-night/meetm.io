FROM --platform=linux/amd64 python:3.9.5-slim
LABEL io.meetm.app='main' release='20210515' maintainer='Mark Ye <mark@meetm.io>'
ENV PYTHONUNBUFFERED=1

WORKDIR /app
COPY . .
RUN pip install -r requirements.txt

# media/static files are to be served by dedicated server (site root)
# location /app/media must be exposed and mounted from host so user uploads can be preserved.
VOLUME [ "/app/media" ]

EXPOSE 80

ENTRYPOINT [ "/app/docker-entrypoint.sh" ]
CMD [ "production" ]