FROM python:3.12.0a4-alpine3.17

ENV PYTHONBUFFERED 1
RUN pip install uvicorn envparse fastapi selenium
RUN mkdir /app

COPY ./app /app
WORKDIR /app
ENTRYPOINT [ "sh", "entrypoint.sh" ]
